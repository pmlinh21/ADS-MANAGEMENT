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
      $("#loading-bg").hide()
      $('#id').val(info.id_create);
      $('#board_type').val(info.board_type);
      $('#size').val(info.width + 'm x ' + info.height + "m");
      $('#quantity').val(info.quantity);
      $('#content').val(info.content);
      $('#adsloc').val(`${info.address_adsloc}, phường ${info.ward}, ${info.district}`);
      $('#company').val(info.company);
      $('#email').val(info.email);
      $('#phone').val(info.phone);
      $('#address').val(info.address);
      $('#start_date').val(formatSQLDate_ymd(info.start_date));
      $('#end_date').val(formatSQLDate_ymd(info.end_date));
      $('#status').val(info.status === 1 ? "Đã xét duyệt" : "Chưa xét duyệt");
      $('#officer').val(info.officer);
      $('#office').val(info.office === 1 ? "Quận" : (info.office === 2 ? "Phường" : ""));
      if (info.photo !== "")
        $('.image-details').attr('src', `../../../../public/image/${info.photo}`);
      else
        $('.image-details').attr('src', `../../../../public/image/image-placeholder.jpg`);
      if (info.status === 1)
        $('.style3-button').hide()

      $('.style3-button').on('click', function() {
        if (confirm('Bạn có chắc chắn muốn xóa cấp phép này không?')) {
          $.ajax({
            url: `/api/basic/deleteAdsCreateByID/${id_create}`,
            type: 'DELETE',
            dataType: 'json',
            success: function(response) {
              // Request was successful
              window.location.href = '/createAds';
              console.log(response);
            },
            error: function(xhr, status, error) {
              // Request failed
              console.log('Error deleting data:', error);
            }
          })
        }
      })
    }
  })
})