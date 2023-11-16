$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_report = urlParams.get('id_report');
  const table = urlParams.get('table');
  const storedEmail = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  let report_type = [[1, "Tố giác sai phạm"], [2, "Đăng ký nội dung"], [3, "Đóng góp ý kiến"], [4, "Giải đáp thắc mắc"]];

  if (table == "ads"){
    $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo quảng cáo");
    const pos = document.querySelector('.form-pos');
    const formHtml = `
    <form class="row g-3 form-ads-create-details">
      <div class="col-md-12">
        <label class="form-label" style="font-weight: 600; font-size: 1rem;">Chi tiết báo cáo quảng cáo vi phạm</label>
      </div>

      <div class="col-md-6">
        <label for="id_ads_report" class="form-label">ID Báo cáo</label>
        <input type="number" class="form-control input-details" id="id_ads_report" readonly>
      </div>
      <div class="col-md-6">
        <label for="id_ads" class="form-label">ID Quảng cáo</label>
        <input type="number" class="form-control input-details" id="id_ads" readonly>
      </div>

      <div class="col-md-6">
        <label for="report_type" class="form-label">Loại hình báo cáo</label>
        <input type="text" class="form-control input-details" id="report_type" readonly>
      </div>
      <div class="col-md-6">
        <label for="name" class="form-label">Họ tên người báo cáo</label>
        <input type="text" class="form-control input-details" id="name" readonly>
      </div>

      <div class="col-md-6">
        <label for="email" class="form-label">Email người báo cáo</label>
        <input type="email" class="form-control input-details" id="email" readonly>
      </div>
      <div class="col-md-6">
        <label for="phone" class="form-label">Số điện thoại người báo cáo</label>
        <input type="phone" class="form-control input-details" id="phone" readonly>
      </div>

      <div class="col-md-12">
        <label for="report" class="form-label">Nội dung báo cáo</label>
        <textarea type="text" class="form-control input-details fixed-size-textarea" id="report" readonly></textarea>
      </div>

      <div class="col-md-4">
        <label for="time" class="form-label">Thời điểm gửi</label>
        <input type="date" class="form-control input-details" id="time" readonly>
      </div>
      <div class="col-md-4">
        <label for="officer" class="form-label">Người xử lý</label>
        <input type="text" class="form-control input-details" id="officer" readonly>
      </div>
      <div class="col-md-4">
        <label for="office" class="form-label">Đơn vị xử lý</label>
        <input type="text" class="form-control input-details" id="office" readonly>
      </div>
      
      <div class="col-md-12">
        <label for="status" class="form-label" style="display: block;">Trạng thái xử lý</label>
        <div class="form-check">
          <input type="radio" class="form-check-input" id="statusProcessed" name="status" value="1" readonly>
          <label class="form-check-label" for="statusProcessed">Đã xử lý</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" id="statusPending" name="status" value="0" readonly>
          <label class="form-check-label" for="statusPending">Chưa xử lý</label>
        </div>
      </div>

      <div class="col-md-12">
        <label for="method" class="form-label">Cách thức xử lý</label>
        <textarea class="form-control edit-input fixed-size-textarea" id="method"></textarea>
      </div>
    </form>
    `;
    
    pos.insertAdjacentHTML('afterend', formHtml);

    const storedAdsReport = localStorage.getItem('ads_report');
    let ads_report = storedAdsReport ? JSON.parse(storedAdsReport) : [];
    console.log("ads_report:", ads_report );

    let info = ads_report.find(item => item[0] == id_report);
    
    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    }
    
    if (info.length > 0) {
      $('#id_ads_report').val(info[0]);
      $('#id_ads').val(info[3]);
      $('#report_type').val(report_type[info[4] - 1][1]);
      $('#name').val(info[5]);
      $('#email').val(info[6]);
      $('#phone').val(info[7]);
      $('#report').val(info[8]);
      $('#time').val(formatDate(info[11]));
      $('#officer').val(info[1]);
      $('#office').val(info[2] === 1 ? "Quận" : (info[2] === 2 ? "Phường" : ""));
      if (info[12] === 1) {
        $('#statusProcessed').prop('checked', true);
        $('#statusPending').prop('disabled', true);
      } else {
        $('#statusPending').prop('checked', true);
      }
      $('#method').val(info[13]);
      $('.image-report-1').attr('src', info[9] ? `../../../../public/image/${info[9]}` : '`../../../../public/image/image-placeholder.jpg');
      $('.image-report-2').attr('src', info[10] ? `../../../../public/image/${info[10]}` : '`../../../../public/image/image-placeholder.jpg');
    }

    $('.style1-button').on('click', function() {
      const updatedMethod = $('#method').val();
      const updatedStatus = $('input[name="status"]:checked').val();
      const indexToUpdate = ads_report.findIndex(item => item[0] == id_report);

      ads_report[indexToUpdate][13] = updatedMethod;
      ads_report[indexToUpdate][1] = storedEmail;
      ads_report[indexToUpdate][2] = parseInt(role);
      ads_report[indexToUpdate][12] = parseInt(updatedStatus);
      localStorage.setItem('ads_report', JSON.stringify(ads_report)); 
      location.reload();
    });
  }
    
  else if (table == "adsloc"){
    $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo điểm đặt");
    const pos = document.querySelector('.form-pos');
    const formHtml = `
    <form class="row g-3 form-ads-create-details">
      <div class="col-md-12">
          <label class="form-label" style="font-weight: 600; font-size: 1rem;">Chi tiết báo cáo điểm đặt vi phạm</label>
      </div>
      <div class="col-md-6">
          <label for="id_ads_loc_report" class="form-label">ID Báo cáo</label>
          <input type="number" class="form-control input-details" id="id_ads_loc_report" readonly>
      </div>
      <div class="col-md-6">
        <label for="id_ads_loc" class="form-label">ID Điểm đặt</label>
        <input type="number" class="form-control input-details" id="id_ads_loc" readonly>
      </div>

      <div class="col-md-6">
        <label for="report_type" class="form-label">Loại hình báo cáo</label>
        <input type="text" class="form-control input-details" id="report_type" readonly>
      </div>
      <div class="col-md-6">
        <label for="name" class="form-label">Họ tên người báo cáo</label>
        <input type="text" class="form-control input-details" id="name" readonly>
      </div>

      <div class="col-md-6">
          <label for="email" class="form-label">Email người báo cáo</label>
          <input type="email" class="form-control input-details" id="email" readonly>
      </div>
      <div class="col-md-6">
          <label for="phone" class="form-label">Số điện thoại người báo cáo</label>
          <input type="phone" class="form-control input-details" id="phone" readonly>
      </div>

      <div class="col-md-12">
          <label for="report" class="form-label">Nội dung báo cáo</label>
          <textarea type="text" class="form-control input-details fixed-size-textarea" id="report" readonly></textarea>
      </div>

      <div class="col-md-6">
          <label for="time" class="form-label">Thời điểm gửi</label>
          <input type="date" class="form-control input-details" id="time" readonly>
      </div>
      <div class="col-md-6">
          <label for="officer" class="form-label">Người xử lý</label>
          <input type="text" class="form-control input-details" id="officer" readonly>
      </div>

      <div class="col-md-6">
          <label for="office" class="form-label">Đơn vị xử lý</label>
          <input type="text" class="form-control input-details" id="office" readonly>
      </div>
      <div class="col-md-6">
          <label for="status" class="form-label">Trạng thái xử lý</label>
          <div class="form-check">
            <input type="radio" class="form-check-input" id="statusProcessed" name="status" value="1" readonly>
            <label class="form-check-label" for="statusProcessed">Đã xử lý</label>
          </div>
          <div class="form-check">
            <input type="radio" class="form-check-input" id="statusPending" name="status" value="0" readonly>
            <label class="form-check-label" for="statusPending">Chưa xử lý</label>
          </div>
      </div>

      <div class="col-md-12">
          <label for="method" class="form-label">Cách thức xử lý</label>
          <textarea class="form-control edit-input fixed-size-textarea" id="method"></textarea>
      </div>
    </form>
    `;
    
    pos.insertAdjacentHTML('afterend', formHtml);

    const storedAdsLocReport = localStorage.getItem('ads_loc_report');
    let ads_loc_report = storedAdsLocReport ? JSON.parse(storedAdsLocReport) : [];
    console.log("ads_loc_report:", ads_loc_report );

    let info = ads_loc_report.find(item => item[0] == id_report);
    
    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    }
    
    if (info.length > 0) {
      $('#id_ads_loc_report').val(info[0]);
      $('#id_ads_loc').val(info[3]);
      $('#report_type').val(report_type[info[4] - 1][1]);
      $('#name').val(info[5]);
      $('#email').val(info[6]);
      $('#phone').val(info[7]);
      $('#report').val(info[8]);
      $('#time').val(formatDate(info[11]));
      $('#officer').val(info[1]);
      $('#office').val(info[2] === 1 ? "Quận" : (info[2] === 2 ? "Phường" : ""));
      if (info[12] === 1) {
        $('#statusProcessed').prop('checked', true);
      } else {
        $('#statusPending').prop('checked', true);
      }
      $('#method').val(info[13]);
      $('.image-report-1').attr('src', info[9] ? `../../../../public/image/${info[9]}` : '');
      $('.image-report-2').attr('src', info[10] ? `../../../../public/image/${info[10]}` : '');
    }

    $('.style1-button').on('click', function() {
      const updatedMethod = $('#method').val();
      const updatedStatus = $('input[name="status"]:checked').val();
      const indexToUpdate = ads_loc_report.findIndex(item => item[0] == id_report);

      ads_loc_report[indexToUpdate][13] = updatedMethod;
      ads_loc_report[indexToUpdate][1] = storedEmail;
      ads_loc_report[indexToUpdate][2] = parseInt(role);
      ads_loc_report[indexToUpdate][12] = parseInt(updatedStatus);
      localStorage.setItem('ads_loc_report', JSON.stringify(ads_loc_report)); 
      location.reload();
    });
  }
    
  else if (table == "loc"){
    $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo địa điểm")
    const pos = document.querySelector('.form-pos');
    const formHtml = `
    <form class="row g-3 form-ads-create-details">
      <div class="col-md-12">
          <label class="form-label" style="font-weight: 600; font-size: 1rem;">Chi tiết báo cáo địa điểm vi phạm</label>
      </div>
      <div class="col-md-12">
          <label for="id_loc_report" class="form-label">ID Báo cáo</label>
          <input type="number" class="form-control input-details" id="id_loc_report" readonly>
      </div>
      <div class="col-md-12">
        <label for="address" class="form-label">Địa chỉ</label>
        <textarea type="number" class="form-control input-details fixed-size-textarea" id="address" readonly></textarea>
      </div>

      <div class="col-md-6">
        <label for="report_type" class="form-label">Loại hình báo cáo</label>
        <input type="text" class="form-control input-details" id="report_type" readonly>
      </div>
      <div class="col-md-6">
        <label for="name" class="form-label">Họ tên người báo cáo</label>
        <input type="text" class="form-control input-details" id="name" readonly>
      </div>

      <div class="col-md-6">
          <label for="email" class="form-label">Email người báo cáo</label>
          <input type="email" class="form-control input-details" id="email" readonly>
      </div>
      <div class="col-md-6">
          <label for="phone" class="form-label">Số điện thoại người báo cáo</label>
          <input type="phone" class="form-control input-details" id="phone" readonly>
      </div>

      <div class="col-md-12">
          <label for="report" class="form-label">Nội dung báo cáo</label>
          <textarea type="text" class="form-control input-details" id="report" readonly></textarea>
      </div>

      <div class="col-md-6">
          <label for="time" class="form-label">Thời điểm gửi</label>
          <input type="date" class="form-control input-details" id="time" readonly>
      </div>
      <div class="col-md-6">
          <label for="officer" class="form-label">Người xử lý</label>
          <input type="text" class="form-control input-details" id="officer" readonly>
      </div>

      <div class="col-md-6">
          <label for="office" class="form-label">Đơn vị xử lý</label>
          <input type="text" class="form-control input-details" id="office" readonly>
      </div>
      <div class="col-md-6">
          <label for="status" class="form-label">Trạng thái xử lý</label>
          <div class="form-check">
            <input type="radio" class="form-check-input" id="statusProcessed" name="status" value="1" readonly>
            <label class="form-check-label" for="statusProcessed">Đã xử lý</label>
          </div>
          <div class="form-check">
            <input type="radio" class="form-check-input" id="statusPending" name="status" value="0" readonly>
            <label class="form-check-label" for="statusPending">Chưa xử lý</label>
          </div>
      </div>

      <div class="col-md-12">
          <label for="method" class="form-label">Cách thức xử lý</label>
          <textarea class="form-control edit-input fixed-size-textarea" id="method"></textarea>
      </div>
    </form>
    `;
    
    pos.insertAdjacentHTML('afterend', formHtml);

    const storedLocReport = localStorage.getItem('loc_report');
    let loc_report = storedLocReport ? JSON.parse(storedLocReport) : [];
    console.log("loc_report:", loc_report );

    let info = loc_report.find(item => item[0] == id_report);
    
    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    }
    function getAddressFromCoordinates(latitude, longitude) {
      return new Promise((resolve, reject) => {
        const accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
        $.ajax({
          url: url,
          method: 'GET',
          success: function (data) {
            if (data.features && data.features.length > 0) {
              if (data.features[0].place_name) {
                const fullAddress = data.features[0].place_name;
                const addressComponents = fullAddress.split(', ');
                const simplifiedAddress = addressComponents.slice(0, 2).join(', ');
    
                resolve(simplifiedAddress);
              } else {
                console.error('Dữ liệu không chứa thuộc tính "place_name".', data.features[0]);
                reject('Địa chỉ không khả dụng');
              }
            } else {
              console.error('Dữ liệu không đúng định dạng hoặc không chứa thuộc tính "features".', data);
              reject('Địa chỉ không khả dụng');
            }
          },
          error: function (error) {
            console.error('Error fetching address:', error);
            reject('Địa chỉ không khả dụng');
          }
        });
      });
    }
    
    function updateAddressField(latitude, longitude) {
      getAddressFromCoordinates(latitude, longitude)
        .then((address) => {
          $('#address').val(address);
        })
        .catch((error) => {
          console.error('Có lỗi xảy ra:', error);
          // Xử lý lỗi nếu cần
        });
    }
    
    if (info.length > 0) {
      $('#id_loc_report').val(info[0]);
      updateAddressField(info[3], info[4]);
      $('#report_type').val(report_type[info[5] - 1][1]);
      $('#name').val(info[6]);
      $('#email').val(info[7]);
      $('#phone').val(info[8]);
      $('#report').val(info[9]);
      $('#time').val(formatDate(info[12]));
      $('#officer').val(info[1]);
      $('#office').val(info[2] === 1 ? "Quận" : (info[2] === 2 ? "Phường" : ""));
      if (info[13] === 1) {
        $('#statusProcessed').prop('checked', true);
      } else {
        $('#statusPending').prop('checked', true);
      }
      $('#method').val(info[14]);
      $('.image-report-1').attr('src', info[9] ? `../../../../public/image/${info[10]}` : '');
      $('.image-report-2').attr('src', info[10] ? `../../../../public/image/${info[11]}` : '');
    }

    $('.style1-button').on('click', function() {
      const updatedMethod = $('#method').val();
      const updatedStatus = $('input[name="status"]:checked').val();
      const indexToUpdate = loc_report.findIndex(item => item[0] == id_report);

      loc_report[indexToUpdate][14] = updatedMethod;
      loc_report[indexToUpdate][1] = storedEmail;
      loc_report[indexToUpdate][2] = parseInt(role);
      loc_report[indexToUpdate][13] = parseInt(updatedStatus);
      localStorage.setItem('loc_report', JSON.stringify(loc_report)); 
      location.reload();
    });
  }
      
  const manageButton = $('#manage');
  const manageMenu = $('#manage .manage-menu');

  manageButton.hover(
    function () {
      $(this).addClass('li-hover');
      $('#manage .nav-link').addClass('nav-link-hover');
      manageMenu.show();
      $('.black-bg').show()
    },
    function () {
      $(this).removeClass('li-hover');
      $('#manage .nav-link').removeClass('nav-link-hover');
      manageMenu.hide();
      $('.black-bg').hide()
    }
  );
})