$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_report = urlParams.get('id_report');
  const table = urlParams.get('table');

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
          <input type="text" class="form-control input-details" id="status" readonly>
      </div>

      <div class="col-md-12">
          <label for="method" class="form-label">Cách thức xử lý</label>
          <textarea class="form-control edit-input" id="method"></textarea>
      </div>
    </form>
    `;
    
    pos.insertAdjacentHTML('afterend', formHtml);

    const storedAdsReport = localStorage.getItem('ads_report');
    let ads_report = storedAdsReport ? JSON.parse(storedAdsReport) : [];
    console.log("ads_report:", ads_report );

    let info1 = ads_report.find(item => item[0] == id_report);
    
    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    }
    
    if (info1.length > 0) {
      $('#id_ads_report').val(info1[0]);
      $('#id_ads').val(info1[3]);
      $('#report_type').val(report_type[info1[4] - 1][1]);
      $('#name').val(info1[5]);
      $('#email').val(info1[6]);
      $('#phone').val(info1[7]);
      $('#report').val(info1[8]);
      $('#time').val(formatDate(info1[11]));
      $('#officer').val(info1[1]);
      $('#office').val(info1[2] === 1 ? "Quận" : "Phường");
      $('#status').val(info1[12] === 1 ? "Đã xét duyệt" : "Chưa xét duyệt");
      $('#method').val(info1[13]);
      $('.image-report-1').attr('src', `../../../../public/image/${info1[9]}`);
      $('.image-report-2').attr('src', `../../../../public/image/${info1[10]}`);
    }

    $('.style1-button').on('click', function() {
      const updatedMethod = $('#method').val();
      const indexToUpdate = ads_report.findIndex(item => item[0] == id_report);

      ads_report[indexToUpdate][13] = updatedMethod;
      localStorage.setItem('ads_report', JSON.stringify(ads_report)); 
      location.reload();
    });
  }
    
  else if (table == "adsloc")
    $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo điểm đặt")
  else if (table == "loc")
    $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo địa điểm")

  

        
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