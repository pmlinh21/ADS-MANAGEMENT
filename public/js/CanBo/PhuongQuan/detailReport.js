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
  const storedEmail = localStorage.getItem('email');
  const role = localStorage.getItem('role');

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

      $.get(`http://localhost:8080/api/basic/getAdsReportByID/${id_report}`, function(data) {
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
            url:  `http://localhost:8080/api/basic/updateAdsReportByID/${id_report}`,
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

    $.get(`http://localhost:8080/api/basic/getAdsLocReportByID/${id_report}`, function(data) {
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
      $('#method').val(info?.resolved);
      $('.image-report-1').attr('src', info?.photo1 ? `../../../../public/image/${info?.photo1}` : '`../../../../public/image/image-placeholder.jpg');
      $('.image-report-2').attr('src', info?.photo2 ? `../../../../public/image/${info?.photo2}` : '`../../../../public/image/image-placeholder.jpg');


      $('.style1-button').on('click', function() {
        const updatedMethod = $('#method').val();
        const updatedStatus = $('input[name="status"]:checked').val();

        var formData = new FormData();
        formData.append('resolve', updatedMethod);
        formData.append('email', storedEmail);
        formData.append('role', parseInt(role));
        formData.append('status', parseInt(updatedStatus));

        $.ajax({
          url:  `http://localhost:8080/api/basic/updateAdsLocReprtById/${id_report}`,
          type: 'PUT',
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            // Handle the successful response here
            console.log(response);
          },
          error: function(xhr, status, error) {
            // Handle the error here
            console.error(error);
          }
        })
        location.reload();
      });
    
    }).fail(function(error) {
      console.log(error);
    });
  }
    
  // else if (table == "loc"){
  //   $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo địa điểm")
  //   const pos = document.querySelector('.form-pos');
  //   const formHtml = `
  //   <form class="row g-3 form-ads-create-details">
  //     <div class="col-md-12">
  //         <label class="form-label" style="font-weight: 600; font-size: 1rem;">Chi tiết báo cáo địa điểm vi phạm</label>
  //     </div>
  //     <div class="col-md-12">
  //         <label for="id_loc_report" class="form-label">ID Báo cáo</label>
  //         <input type="number" class="form-control input-details" id="id_loc_report" readonly>
  //     </div>
  //     <div class="col-md-12">
  //       <label for="address" class="form-label">Địa chỉ</label>
  //       <textarea type="number" class="form-control input-details fixed-size-textarea" id="address" readonly></textarea>
  //     </div>

  //     <div class="col-md-6">
  //       <label for="report_type" class="form-label">Loại hình báo cáo</label>
  //       <input type="text" class="form-control input-details" id="report_type" readonly>
  //     </div>
  //     <div class="col-md-6">
  //       <label for="name" class="form-label">Họ tên người báo cáo</label>
  //       <input type="text" class="form-control input-details" id="name" readonly>
  //     </div>

  //     <div class="col-md-6">
  //         <label for="email" class="form-label">Email người báo cáo</label>
  //         <input type="email" class="form-control input-details" id="email" readonly>
  //     </div>
  //     <div class="col-md-6">
  //         <label for="phone" class="form-label">Số điện thoại người báo cáo</label>
  //         <input type="phone" class="form-control input-details" id="phone" readonly>
  //     </div>

  //     <div class="col-md-12">
  //         <label for="report" class="form-label">Nội dung báo cáo</label>
  //         <textarea type="text" class="form-control input-details" id="report" readonly></textarea>
  //     </div>

  //     <div class="col-md-4">
  //       <label for="time" class="form-label">Thời điểm gửi</label>
  //       <input type="date" class="form-control input-details" id="time" readonly>
  //     </div>
  //     <div class="col-md-4">
  //       <label for="officer" class="form-label">Người xử lý</label>
  //       <input type="text" class="form-control input-details" id="officer" readonly>
  //     </div>
  //     <div class="col-md-4">
  //       <label for="office" class="form-label">Đơn vị xử lý</label>
  //       <input type="text" class="form-control input-details" id="office" readonly>
  //     </div>
      
  //     <div class="col-md-12">
  //       <label for="status" class="form-label" style="display: block;">Trạng thái xử lý</label>
  //       <div class="form-check">
  //         <input type="radio" class="form-check-input" id="statusProcessed" name="status" value="1" readonly>
  //         <label class="form-check-label" for="statusProcessed">Đã xử lý</label>
  //       </div>
  //       <div class="form-check">
  //         <input type="radio" class="form-check-input" id="statusPending" name="status" value="0" readonly>
  //         <label class="form-check-label" for="statusPending">Chưa xử lý</label>
  //       </div>
  //     </div>

  //     <div class="col-md-12">
  //         <label for="method" class="form-label">Cách thức xử lý</label>
  //         <textarea class="form-control edit-input fixed-size-textarea" id="method"></textarea>
  //     </div>
  //   </form>
  //   `;
    
  //   pos.insertAdjacentHTML('afterend', formHtml);

  //   const storedLocReport = localStorage.getItem('loc_report');
  //   let loc_report = storedLocReport ? JSON.parse(storedLocReport) : [];
  //   console.log("loc_report:", loc_report );

  //   let info = loc_report.find(item => item[0] == id_report);
    
  //   function formatDate(inputDate) {
  //     const date = new Date(inputDate);
  //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  //     const day = date.getDate().toString().padStart(2, '0');
  //     const year = date.getFullYear();

  //     return `${year}-${month}-${day}`;
  //   }
  //   function getAddressFromCoordinates(latitude, longitude) {
  //     return new Promise((resolve, reject) => {
  //       const accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  //       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
  //       $.ajax({
  //         url: url,
  //         method: 'GET',
  //         success: function (data) {
  //           if (data.features && data.features.length > 0) {
  //             if (data.features[0].place_name) {
  //               const fullAddress = data.features[0].place_name;
  //               const addressComponents = fullAddress.split(', ');
  //               const simplifiedAddress = addressComponents.slice(0, 2).join(', ');
    
  //               resolve(simplifiedAddress);
  //             } else {
  //               console.error('Dữ liệu không chứa thuộc tính "place_name".', data.features[0]);
  //               reject('Địa chỉ không khả dụng');
  //             }
  //           } else {
  //             console.error('Dữ liệu không đúng định dạng hoặc không chứa thuộc tính "features".', data);
  //             reject('Địa chỉ không khả dụng');
  //           }
  //         },
  //         error: function (error) {
  //           console.error('Error fetching address:', error);
  //           reject('Địa chỉ không khả dụng');
  //         }
  //       });
  //     });
  //   }
    
  //   function updateAddressField(latitude, longitude) {
  //     getAddressFromCoordinates(latitude, longitude)
  //       .then((address) => {
  //         $('#address').val(address);
  //       })
  //       .catch((error) => {
  //         console.error('Có lỗi xảy ra:', error);
  //         // Xử lý lỗi nếu cần
  //       });
  //   }
  //   console.log(info)
    
  //   if (info.length > 0) {
  //     $('#id_loc_report').val(info[0]);
  //     if (role == 2){
  //       $('#address').val(info[5]);
  //       $('#report_type').val(report_type[info[6] - 1][1]);
  //       $('#name').val(info[7]);
  //       $('#email').val(info[8]);
  //       $('#phone').val(info[9]);
  //       $('#report').val(info[10]);
  //       $('#time').val(formatDate(info[13]));
  //       if (info[14] === 1) {
  //         $('#statusProcessed').prop('checked', true);
  //         $('#statusPending').prop('disabled', true);
  //       } else {
  //         $('#statusPending').prop('checked', true);
  //       }
  //       $('#method').val(info[15]);
  //       $('.image-report-1').attr('src', info[9] ? `../../../../public/image/${info[11]}` : `../../../../public/image/image-placeholder.jpg`);
  //       $('.image-report-2').attr('src', info[10] ? `../../../../public/image/${info[12]}` : `../../../../public/image/image-placeholder.jpg`);

  //     } else if (role == 1){
  //       $('#address').val(`${info[18]}, phường ${info[17]}`);
  //       $('#report_type').val(info[16]);
  //       $('#name').val(info[6]);
  //       $('#email').val(info[7]);
  //       $('#phone').val(info[8]);
  //       $('#report').val(info[9]);
  //       $('#time').val(formatDate(info[12]));
  //       if (info[13] === 1) {
  //         $('#statusProcessed').prop('checked', true);
  //         $('#statusPending').prop('disabled', true);
  //       } else {
  //         $('#statusPending').prop('checked', true);
  //       }
  //       $('#method').val(info[14]);
  //       $('.image-report-1').attr('src', info[10] ? `../../../../public/image/${info[10]}` : `../../../../public/image/image-placeholder.jpg`);
  //       $('.image-report-2').attr('src', info[11] ? `../../../../public/image/${info[11]}` : `../../../../public/image/image-placeholder.jpg`);
  //     }
    
  //     $('#officer').val(info[1]);
  //     $('#office').val(info[2] === 1 ? "Quận" : (info[2] === 2 ? "Phường" : ""));
       
  //   }

  //   $('.style1-button').on('click', function() {
  //     const updatedMethod = $('#method').val();
  //     const updatedStatus = $('input[name="status"]:checked').val();
  //     const indexToUpdate = loc_report.findIndex(item => item[0] == id_report);

  //     loc_report[indexToUpdate][15] = updatedMethod;
  //     loc_report[indexToUpdate][1] = storedEmail;
  //     loc_report[indexToUpdate][2] = parseInt(role);
  //     loc_report[indexToUpdate][14] = parseInt(updatedStatus);
  //     localStorage.setItem('loc_report', JSON.stringify(loc_report)); 
  //     location.reload();
  //   });
  // }
})