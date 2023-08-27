export const BASE_URL = "https://64d6fadf2a017531bc12e6fd.mockapi.io/food";
const MON_CHAY = true;
const CON_MON = true;
let renderFoodList = (list) => {
    let contentHTML = "";
    list.reverse().forEach((food) => {
        let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhMon, moTa } = food;
        let trString = /* html */ `
                        <tr>
                            <td>${ma}</td>
                            <td>${ten}</td>
                            <td>${loai == MON_CHAY ? "chay" : "<h6 class='text-danger' >mặn</h6>"}</td>                            
                            <td>${gia}</td>                            
                            <td>${khuyenMai}</td>                            
                            <td>0</td>                            
                            <td>${tinhTrang == CON_MON ? "còn" : "hết"}</td>
                            <td>
                            <button class="btn btn-primary" onclick='editFood(${ma})'>Sửa</button>
                            <button class="btn btn-danger" onclick='deleteFood(${ma})'>Xoá</button>
                            </td>                            

                        </tr>`
        contentHTML += trString;
    });
    document.getElementById("tbodyFood").innerHTML = contentHTML;
}

export let fetchFoodList = () => {
    axios({
        url: BASE_URL,
        method: "GET",
    })
        .then((res) => {
            console.log(res);
            renderFoodList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
export let showMessage = (message, isSuccess = true) => {
    Toastify({
        text: message,
        className: "info",
        style: {
            background: isSuccess ? "green" : "red",
        }
    }).showToast();
}
export let layThongTinTuForm = () => {
    let ma = document.getElementById("foodID").value;
    let ten = document.getElementById("tenMon").value;
    let loai = document.getElementById("loai").value;
    let gia = document.getElementById("giaMon").value;
    let khuyenMai = document.getElementById("khuyenMai").value;
    let tinhTrang = document.getElementById("tinhTrang").value;
    let hinhMon = document.getElementById("hinhMon").value;
    let moTa = document.getElementById("moTa").value;
    return {
        ma, ten, loai, gia, khuyenMai, tinhTrang, hinhMon, moTa
    }
}
export let showThongTinLenForm = (food) => {
    let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhMon, moTa } = food;
    document.getElementById("foodID").value = ma;
    document.getElementById("tenMon").value = ten;
    document.getElementById("loai").value = loai == MON_CHAY ? "loai1" : "loai2";
    document.getElementById("giaMon").value = gia;
    document.getElementById("khuyenMai").value = khuyenMai;
    document.getElementById("tinhTrang").value = tinhTrang ? "1" : "0";
    document.getElementById("hinhMon").value = hinhMon;
    document.getElementById("moTa").value = moTa;
}