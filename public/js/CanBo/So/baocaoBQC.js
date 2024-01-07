$(document).ready(function(){
  $("#baocao").addClass("snb-li-active");

  let id = $('#report-ads input[name="id_report"]').val();
  $.ajax({
    url: '/api/so/getBaoCaoBQCById/' + id,
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

  $("textarea").on("selectstart dragstart", function (e) {
    e.preventDefault();
    return false;
  });
});

function buildForm(data) {
  console.log(data);
  let form = $("#report-ads");
  // form.find("input[name='id_report']").val(data.id_report);
  form.find("input[name='id_ads']").val(data.id_ads);
  form.find("input[name='report_type']").val(data.report_type);
  form.find("input[name='fullname']").val(data.fullname);
  form.find("input[name='email']").val(data.email);
  form.find("input[name='phone']").val(data.phone);
  form.find("textarea[name='content']").val(data.content);
  // $("#content").text(data.content);
  startRender();
  
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

function render() {
  let inp = $("#content")[0];
  let d = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${inp.offsetWidth}" height="${inp.offsetHeight}">
    <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Montserrat', sans-serif; font-size:18px; font-weight: 500;
    color: #7E94AB;">
    ${inp.value}
    </div>
    </foreignObject>
    </svg>`;
  let blob = new Blob( [d], {type:'image/svg+xml'} );
  let url=URL.createObjectURL(blob);
  inp.style.backgroundImage="url("+url+")";
}

function startRender(){
  render();
  const ro = new ResizeObserver(render);
  ro.observe($("#content")[0]);
}