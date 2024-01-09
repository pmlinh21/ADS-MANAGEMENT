$(document).ready(function(){
  $("#baocao").addClass("snb-li-active");

  let id = $('#report-location input[name="id_report"]').val();
  $.ajax({
    url: '/api/so/getBaoCaoDDById/' + id,
    type: 'GET',
    catch: false,
    dataType: 'json',
    success: function(data) {
      let report = data.content[0];
      buildForm(report);
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
});

function buildForm(data) {
  console.log(data);
  let form = $("#report-location");
  // form.find("input[name='id_report']").val(data.id_report);
  form.find("input[name='address']").val(data.address + ", P." + data.address_ward + ", Q." + data.address_district);
  form.find("input[name='report_type']").val(data.report_type);
  form.find("input[name='fullname']").val(data.fullname);
  form.find("input[name='email']").val(data.email);
  form.find("input[name='phone']").val(data.phone);
  form.find("textarea[name='content']").val(data.content);
  
  form.find("input[name='report_time']").val(data.report_time.split("T")[0]);
  if (data.status == true) {
    form.find("input[name='status']").val("Đã xử lý");
    form.find("textarea[name='resolve']").val(data.resolve);
  } else {
    form.find("input[name='status']").val("Chưa xử lý");
    form.find("textarea[name='resolve']").val("-");
  }
  
  form.find("input[name='officer']").val(data.officer);
  if (data.office == 1) {
    form.find("input[name='office']").val("Quận " + data.district);  
  } else if (data.office == 2) {
    form.find("input[name='office']").val("Phường " + data.ward + ", Quận " + data.district);
  } else {
    form.find("input[name='office']").val("-");
    form.find("input[name='officer']").val("-");
  }

  if (data.photo1 == null || data.photo1 == "") {
    $("#image1").attr("src", "../../../public/image/image-placeholder.jpg");  
  } else {
    $("#image1").attr("src", data.photo1);
  }

  if (data.photo2 == null || data.photo2 == "") {
    $("#image2").attr("src", "../../../public/image/image-placeholder.jpg");  
  } else {
    $("#image2").attr("src", data.photo2);
  }
}