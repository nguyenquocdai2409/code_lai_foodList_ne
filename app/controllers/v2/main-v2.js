import { BASE_URL, fetchFoodList } from "./controller.js";
import { showMessage, layThongTinTuForm, showThongTinLenForm } from "./controller.js";


//fetch : LẤY danh sách món ăn mới nhất từ server
fetchFoodList();

let deleteFood = (id) =>{
    console.log(id);
    axios.delete(`${BASE_URL}/${id}`)
    .then((res)=>{
        // gọi lại api lấy danh sách mới nhất từ server và render ra
        fetchFoodList();
        showMessage("Xoá thành công");
    })
    .catch((err)=>{
        showMessage("Xoá thất bại", false);
    })
}
window.deleteFood = deleteFood;

let addFood =()=>{
    let data = layThongTinTuForm();
    console.log(data);
    axios.post(BASE_URL,data)
    .then((res)=>{
        // thêm thành công thì tắt form
        $("#exampleModal").modal("hide");
        fetchFoodList();
        showMessage("Thêm thành công");
    })
    .catch((err)=>{
        console.log(err);
    })
}
window.addFood =  addFood;

window.editFood = (id) =>{
    console.log(id);
    $("#exampleModal").modal("show");
    // chặn k cho user sửa mã     // read only js
    document.getElementById("foodID").readOnly = true;
    // getbyid
    let url = `${BASE_URL}/${id}`
    axios.get(url)
    .then((res)=>{
        console.log(res);
        showThongTinLenForm(res.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}


window.updateFood = ()=>{
    let data = layThongTinTuForm();
    axios.put(`${BASE_URL}/${data.ma}`, data)
    .then((res)=>{
        console.log(res);
        $("#exampleModal").modal("hide");
        showMessage("thêm thành công");
        fetchFoodList();
    })
    .catch((err)=>{
        console.log(err);
    })
}
