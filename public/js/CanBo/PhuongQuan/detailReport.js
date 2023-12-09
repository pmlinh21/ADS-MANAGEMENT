function formatDate(inputDate) {
  const date = new Date(inputDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_report = urlParams.get('id_report');
  const table = urlParams.get('table');
  const storedEmail = email

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

    $.get(`/api/basic/getAdsReportByID/${id_report}`, function(data) {
      info = data.content[0]
      console.log(info)

      
      $('#id_ads_report').val(info?.id_report);
      $('#id_ads').val(info?.id_ads);
      $('#report_type').val(info?.report_type);
      $('#name').val(info?.fullname);
      $('#email').val(info?.email);
      $('#phone').val(info?.phone);
      $('#report').val(info?.content);
      $('#time').val(formatSQLDate_ymd(info?.report_time));
      $('#officer').val(info?.officer);
      $('#office').val(info?.office === 1 ? "Quận" : (info?.office === 2 ? "Phường" : ""));
      if (info?.status === 1) {
        $('#statusProcessed').prop('checked', true);
        $('#statusPending').prop('disabled', true);
      } else {
        $('#statusPending').prop('checked', true);
      }
      $('#method').val(info?.resolve);
      $('.image-report-1').attr('src', info?.photo1 ? `../../../../public/image/${info?.photo1}` : '`../../../../public/image/image-placeholder.jpg');
      $('.image-report-2').attr('src', info?.photo2 ? `../../../../public/image/${info?.photo2}` : '`../../../../public/image/image-placeholder.jpg');
  
      $('.style1-button').on('click', function() {
        const updatedMethod = $('#method').val();
        const updatedStatus = $('input[name="status"]:checked').val();
  
        const data = {
          resolve: updatedMethod,
          email: storedEmail,
          role: parseInt(role),
          status: parseInt(updatedStatus)
        }

        // console.log(JSON.stringify(data));

        $.ajax({
          url:  `/api/basic/updateAdsReportByID/${id_report}`,
          type: 'PUT',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function(response) {
            // Handle the successful response here
            console.log(response);
          },
          error: function(xhr, status, error) {
            // Handle the error here
            console.error(error);
          }
        })

        // location.reload();
      });

    }).fail(function(error) {
      console.log(error);
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

    $.get(`/api/basic/getAdsLocReportByID/${id_report}`, function(data) {
      info = data.content[0]
      console.log(info)

      $('#id_ads_loc_report').val(info?.id_report);
      $('#id_ads_loc').val(info?.id_ads_location);
      $('#report_type').val(info?.report_type);
      $('#name').val(info?.fullname);
      $('#email').val(info?.email);
      $('#phone').val(info?.phone);
      $('#report').val(info?.content);
      $('#time').val(formatSQLDate_ymd(info?.report_time));
      $('#officer').val(info?.officer);
      $('#office').val(info?.office === 1 ? "Quận" : (info?.office === 2 ? "Phường" : ""));
      if (info?.status === 1) {
        $('#statusProcessed').prop('checked', true);
        $('#statusPending').prop('disabled', true);
      } else {
        $('#statusPending').prop('checked', true);
      }
      $('#method').val(info?.resolved);
      $('.image-report-1').attr('src', info?.photo1 ? `../../../../public/image/${info?.photo1}` : '`../../../../public/image/image-placeholder.jpg');
      $('.image-report-2').attr('src', info?.photo2 ? `../../../../public/image/${info?.photo2}` : '`../../../../public/image/image-placeholder.jpg');


      $('.style1-button').on('click', function() {
        const updatedMethod = $('#method').val();
        const updatedStatus = $('input[name="status"]:checked').val();

        const data = {
          resolve: updatedMethod,
          email: storedEmail,
          role: parseInt(role),
          status: parseInt(updatedStatus)
        }

        $.ajax({
          url:  `/api/basic/updateAdsLocReportByID/${id_report}`,
          type: 'PUT',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function(response) {
            // Handle the successful response here
            console.log(response);
            location.reload();
          },
          error: function(xhr, status, error) {
            // Handle the error here
            console.error(error);
          }
        })
      });
    
    }).fail(function(error) {
      console.log(error);
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

    $.ajax({
      url: `/api/basic/getLocReportByID/${id_report}`,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        info = data.content[0]
        console.log(info)
        $('#id_loc_report').val(info.id_report);
        $('#address').val(info.address + ', phường ' + info.ward + ', ' + info.district);
        $('#report_type').val(info.report_type);
        $('#name').val(info.fullname);
        $('#email').val(info.email);
        $('#phone').val(info.phone);
        $('#report').val(info.content);
        $('#time').val(formatSQLDate_ymd(info.report_time));
        if (info.status === 1) {
          $('#statusProcessed').prop('checked', true);
          $('#statusPending').prop('disabled', true);
        } else {
          $('#statusPending').prop('checked', true);
        }
        $('#method').val(info.resolve);
        $('.image-report-1').attr('src', info.photo1 ? `../../../../public/image/${info.photo1}` : `../../../../public/image/image-placeholder.jpg`);
        $('.image-report-2').attr('src', info.photo2 ? `../../../../public/image/${info.photo2}` : `../../../../public/image/image-placeholder.jpg`);
      
        $('#officer').val(info.officer);
        $('#office').val(info.office === 1 ? "Quận" : (info.office === 2 ? "Phường" : ""));

        $('.style1-button').on('click', function() {
          const updatedMethod = $('#method').val();
          const updatedStatus = $('input[name="status"]:checked').val();
          
          const data = {
            resolve: updatedMethod,
            email: storedEmail,
            role: parseInt(role),
            status: parseInt(updatedStatus)
          }

          $.ajax({
            url: `/api/basic/updateLocReportByID/${id_report}`,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
              // Handle the successful response here
              console.log(response);
              location.reload();
            },
            error: function(xhr, status, error) {
              // Handle the error here
              console.error(error);
            }
          })
        });
      }
    })
  }
})