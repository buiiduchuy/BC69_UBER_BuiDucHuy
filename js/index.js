// Tạo hằng số lưu lại các giá trị từ loại xe giúp dễ bảo trì code hơn
const UBER_CAR = "uberCar";
const UBER_SUV = "uberSUV";
const UBER_Black = "uberBlack";

let tinhGiaKmDauTien = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 8000;
    case UBER_SUV:
      return 9000;
    case UBER_Black:
      return 10000;
  }
};

// Thực hiện tại 1 hàm kiểm tra giá tiền từ 1 đến 19
let tinhGiaTu1Den19 = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 7500;
    case UBER_SUV:
      return 8500;
    case UBER_Black:
      return 9500;
  }
};
// Thực hiện tại 1 hàm kiểm tra giá tiền từ 19km trở đi
let tinhGiaTu19TroLen = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 7000;
    case UBER_SUV:
      return 8000;
    case UBER_Black:
      return 9000;
  }
};
// Thực hiện tại 1 hàm kiểm tra lấy giá tiền thời gian chờ
let tinhGiaThoiGianCho = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 2000;
    case UBER_SUV:
      return 3000;
    case UBER_Black:
      return 3500;
  }
};

function domID(id) {
  return document.getElementById(id);
}

// NV1 : thực hiện 1 sự kiện onclick tới btn tính tiền

let btnTinhTien = document.querySelector(".contact100-form-btn");
btnTinhTien.addEventListener("click", function () {
  // NV2 : thực hiện lấy dữ liệu , loại xe người dùng đi , số km , số thời gian
  let loaiXe = document.querySelector("input[type='radio']:checked").value;
  let giaKmDauTien = tinhGiaKmDauTien(loaiXe);
  let giaTu1Den19 = tinhGiaTu1Den19(loaiXe);
  let giaTu19TroLen = tinhGiaTu19TroLen(loaiXe);
  let giathoiGianCho = tinhGiaThoiGianCho(loaiXe);
  let soKM = Number(domID("txt-km").value);
  let thoiGianCho = Number(domID("txt-thoiGianCho").value);

  let tongTien = 0;
  if(soKM <= 19) {
    tongTien = giaKmDauTien + (soKM - 1) * giaTu1Den19
  }else {
    tongTien = giaKmDauTien + 18 * giaTu1Den19 + (soKM - 19) * giaTu19TroLen
  }
  let tienCho = 0
  if(thoiGianCho > 3) {
    tienCho = Math.floor((thoiGianCho - 3) /3) * giathoiGianCho
  }

  tongTien = tongTien + tienCho;

  // DOM tới div có id divThanhTien và hiển thị lên giao diện
 domID("divThanhTien").style.display = "block"
  // DOM tới thẻ span có id xuatTien và hiển thị tongTien lên (nhớ chuyển đổiv ề kiểu tiền tệ Việt Nam)

 domID("xuatTien").innerHTML = tongTien.toLocaleString (
    "vi", {
      currency : "VND",
      style: "currency"
    }
  )

});


let btnInHoaDon = document.querySelector("[data-toggle='modal']")
btnInHoaDon.onclick = function (){
  let soKM = Number(domID("txt-km").value);
  let loaiXe = document.querySelector("input[type='radio']:checked").value;
  let thoiGianCho = Number(domID("txt-thoiGianCho").value);
  let content = document.querySelector(".modal-body")
  let soTienKmDauTien = 0;
  let soTien1Den19 = 0;
  let soTienTren19 = 0;
  let soTienCho = 0;
  content.innerHTML = `
  <div class="table-responsive">
      <table class="table table-primary">
        <thead>
          <tr>
            <th>CHI TIẾT HOÁ ĐƠN</th>
          </tr>
        </thead>
        <tbody>
          <tr class="">
            <td>CHI TIẾT</td>
            <td>SỬ DỤNG</td>
            <td>ĐƠN GIÁ (1000đ)</td>
            <td>THÀNH TIỀN (1000đ)</td>
          </tr>
          <tr class="">
            <td>KM ĐẦU TIÊN</td>
            <td>1</td>
            <td>${tinhGiaKmDauTien(loaiXe)}</td>
            <td>${soTienKmDauTien = tinhGiaKmDauTien(loaiXe)}</td>
          </tr>
          <tr class="">
            <td>${soKM > 1 ?`Từ 1 đến 19 km` :'Từ ... đến '}</td>
            <td>${soKM > 1 ? soKM > 19 ? 19 : soKM - 1 : ""}</td>
            <td>${soKM > 1 ? tinhGiaTu1Den19(loaiXe): ""}</td>
            <td>${soKM > 1 ? soTien1Den19 = tinhGiaTu1Den19(loaiXe) * (soKM - 1) : ""}</td>
          </tr>
          <tr class="">
          <td>${soKM > 19 ?`Từ 19 đến ${soKM} km` :'Từ ... đến '}</td>
          <td>${soKM > 19 ? soKM - 19 : ""}</td>
          <td>${soKM > 19 ? tinhGiaTu19TroLen(loaiXe): ""}</td>
          <td>${soKM > 19 ? soTienTren19 = tinhGiaTu19TroLen(loaiXe) * (soKM - 19) : ""}</td>
          </tr>
          <tr class="">
            <td>Thời gian chờ</td>
            <td>${thoiGianCho ? thoiGianCho : ""}</td>
            <td>${thoiGianCho ? thoiGianCho > 3 ? tinhGiaThoiGianCho(loaiXe) : "0" : ""}</td>
            <td>${thoiGianCho ? soTienCho = thoiGianCho > 3 ? Math.floor((thoiGianCho - 3) / 3) * tinhGiaThoiGianCho(loaiXe) : soTienCho = 0 :""}</td>
          </tr>
          <tr>
            <td>Tổng tiền: ${soTienKmDauTien + soTien1Den19 + soTienTren19 + soTienCho}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}


// toFixed làm tròn số thập phân
// console.log((1.123123).toFixed(2))