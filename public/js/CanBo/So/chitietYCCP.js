$(document).ready(function () {
  $("#capphep").addClass("snb-li-active");

  let id = $("#create-ads #id").val();
  $.ajax({
    url: '/api/so/getYeuCauCapPhepById/' + id,
    type: 'GET',
    catch: false,
    dataType: 'json',
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      $("#loading-bg").hide()
      let yccp = data.content[0];
      buildForm(yccp);

      $("#create-ads button[value='deny']").on("click", async function (e) {
        e.preventDefault();
        $.ajax({
          url: '/api/so/updateYeuCauCapPhep/' + id + '/false' + '/null',
          type: 'PUT',
          dataType: 'json',
          contentType: 'application/json',
          beforeSend: function () {
            $("#loading-bg").show()
          },
          success: function (data) {
            $("#loading-bg").hide()
            location.reload();
            alert("Từ chối yêu cầu thành công!");
          },
          error: function (xhr, status, err) {
            $("#loading-bg").hide()
            alert("Từ chối yêu cầu thất bại!");
            console.log(err);
          }
        })
      })

      $("#create-ads button[value='accept']").on("click", async function (e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("id_ads_location", yccp.id_ads_location);
        formData.append("id_board_type", yccp.id_board_type);
        formData.append("width", yccp.width);
        formData.append("height", yccp.height);
        formData.append("quantity", yccp.quantity);
        formData.append("expired_date", yccp.end_date);
        formData.append("photo", yccp.photo);

        let createData = Object.fromEntries(formData.entries());
        $.ajax({
          url: '/api/so/createBangQuangCao',
          type: 'POST',
          catch: false,
          dataType: 'json',
          data: createData,

          beforeSend: function () {
            $("#loading-bg").show()
          },
          success: function (data) {
            let new_id_ads = data.content.id_ads;
            $.ajax({
              url: '/api/so/updateYeuCauCapPhep/' + id + '/true' + '/' + new_id_ads,
              type: 'PUT',
              dataType: 'json',
              contentType: 'application/json',
              beforeSend: function () {
                $("#loading-bg").show()
              },
              success: function (data) {
                $("#loading-bg").hide()
                location.reload();
                alert("Duyệt yêu cầu và tạo bảng quảng cáo thành công!");
              },
              error: function (xhr, status, err) {
                $("#loading-bg").hide()
                alert("Duyệt yêu cầu thất bại!");
                console.log(err);
              }
            })
          },
          error: function (xhr, status, err) {
            $("#loading-bg").hide()
            alert("Duyệt yêu cầu thất bại!");
            console.log(err);
          }
        })
      })
    }
  })
})

function buildForm(data) {
  let form = $("#create-ads");
  form.find("#id-ads-location").val(data.id_ads_location);
  form.find("#address").val(data.id_ads_location + ", P." + data.address_ward + ", Q." + data.address_district);
  form.find("#board-type").val(data.board_type);
  form.find("#height").val(data.height);
  form.find("#width").val(data.width);
  form.find("#quantity").val(data.quantity);
  form.find("#company").val(data.company);
  form.find("#company-address").val(data.address);
  form.find("#company-email").val(data.email);
  form.find("#company-phone").val(data.phone);
  form.find("#start-date").val(data.start_date.split("T")[0]);
  form.find("#end-date").val(data.end_date.split("T")[0]);
  form.find("#content").val(data.content);
  form.find("#officer").val(data.officer);
  if (data.office == 1) {
    form.find("#office").val("Quận " + data.district);
  }
  else if (data.office == 2) {
    form.find("#office").val("Phường " + data.ward + ", Quận " + data.district);
  }

  if (data.status == true) {
    $("button[name='process']").hide();
    $(".processed").show();
    $(".processed").text("Đã duyệt");
  }
  else if (data.status == false) {
    $("button[name='process']").hide();
    $(".processed").show();
    $(".processed").text("Đã từ chối");
  }

  if (data.photo != null && data.photo != "") {
    form.find("#image-preview").attr("src", data.photo);
  } else {
    form.find("#image-preview").attr("src", "../../../public/image/image-placeholder.jpg");
  }
}