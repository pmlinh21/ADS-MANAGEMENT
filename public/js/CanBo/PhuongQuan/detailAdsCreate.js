$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_create = parseInt(urlParams.get('id_create'))
  $("#loading-bg").show()
  $.ajax({
    url: `/api/basic/getAdsCreateByID/${id_create}`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      info = data.content[0]
      console.log(info)
      if ((id_ward && id_ward != info.id_ward) || (id_district && id_district != info.id_district)){
        alert("Bạn không có quyền truy cập trang này")
        window.location.href = "/createAds"
      }

      $("#loading-bg").hide()
      $('#id').val(info.id_create);
      $('#board_type').val(info.board_type);
      $('#size').val(info.width + 'm x ' + info.height + "m");
      $('#quantity').val(info.quantity);
      $('#content').val(info.content);
      $('#adsloc').val(`${info.address_adsloc}, phường ${info.ward}, quận ${info.district}`);
      $('#company').val(info.company);
      $('#email').val(info.email);
      $('#phone').val(info.phone);
      $('#address').val(info.address);
      $('#start_date').val(formatSQLDate_ymd(info.start_date));
      $('#end_date').val(formatSQLDate_ymd(info.end_date));
      $('#status').val(info.status === true ? "Đã duyệt" : ( info.status == false ? "Đã từ chối" : "Chưa xét duyệt"));
      $('#officer').val(info.officer);
      $('#office').val(info.office === 1 ? "Quận" : (info.office === 2 ? "Phường" : ""));
      if (info.photo !== "" && info.photo !== null)
        $('.image-details').attr('src', info.photo);
      else
        $('.image-details').attr('src', `../../../../public/image/image-placeholder.jpg`);
      if (info.status === true || info.status === false)
        $('.style3-button').hide()

      $('.style3-button').on('click', function() {
        console.log(info.photo)
        if (confirm('Bạn có chắc chắn muốn xóa cấp phép này không?')) {
          $("#loading-bg").show()
          $.ajax({
            url: `/api/basic/deleteAdsCreateByID/${id_create}`,
            type: 'DELETE',
            dataType: 'json',
            success: function(response) {
              // Request was successful
              $("#loading-bg").hide()
              window.location.href = '/createAds';
              console.log(response);
            },
            error: function(xhr, status, error) {
              // Request failed
              $("#loading-bg").hide()
              console.log('Error deleting data:', error);
            }
          })
        }
      })
    }
  })
})