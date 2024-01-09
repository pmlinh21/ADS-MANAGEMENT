$(document).ready(function () {
  $("#chinhsua").addClass("snb-li-active");

  let id = $("#update-ads #id").val();
  $.ajax({
    url: '/api/so/getYeuCauChinhSuaBQCById/' + id,
    type: 'GET',
    catch: false,
    dataType: 'json',
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      $("#loading-bg").hide()
      let bqcChinhSua = data.content[0];
      buildForm(bqcChinhSua);

      $("#update-ads button[value='deny']").on("click", async function (e) {
        e.preventDefault();
        $.ajax({
          url: '/api/so/updateYeuCauChinhSuaBQC/' + id + '/true',
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

      $("#update-ads button[value='accept']").on("click", async function (e) {
        e.preventDefault();

        $.ajax({
          url: '/api/so/getBangQuangCaoById/' + id,
          type: 'GET',
          catch: false,
          dataType: 'json',
          beforeSend: function () {
            $("#loading-bg").show()
          },
          success: function (data) {
            let old_photo = data.content[0].photo;

            let formData = new FormData();
            formData.append("id_ads", bqcChinhSua.id_ads);
            formData.append("id_ads_location", bqcChinhSua.id_ads_location);
            formData.append("id_board_type", bqcChinhSua.id_board_type);
            formData.append("height", bqcChinhSua.height);
            formData.append("width", bqcChinhSua.width);
            formData.append("quantity", bqcChinhSua.quantity);
            formData.append("expired_date", bqcChinhSua.expired_date);
            formData.append("photo", bqcChinhSua.photo);
            formData.append("old_photo", old_photo);

            let updateData = Object.fromEntries(formData.entries());
            $.ajax({
              url: '/api/so/updateBangQuangCao',
              type: 'PUT',
              contentType: 'application/json',
              data: JSON.stringify(updateData),
              success: function (res) {
                $.ajax({
                  url: '/api/so/updateYeuCauChinhSuaBQC/' + id + '/true',
                  type: 'PUT',
                  catch: false,
                  dataType: 'json',
                  success: function (data) {
                    $("#loading-bg").hide()
                    location.reload();
                    alert("Chỉnh sửa thành công");
                  },
                  error: function (xhr, status, err) {
                    $("#loading-bg").hide()
                    alert("Chỉnh sửa thất bại");
                    console.log(err);
                  }
                })
              },
              error: function (xhr, status, err) {
                $("#loading-bg").hide()
                alert("Xử lí thất bại");
                console.log(err);
              }
            })
          },
          error: function (xhr, status, err) {
            $("#loading-bg").hide()
            console.log(err);
          }
        })
      });
    },
    error: function (xhr, status, err) {
      $("#loading-bg").hide()
      console.log(err);
    }
  });
})

function buildForm(data) {
  let form = $("#update-ads");
  // form.find("#id").val(data.id_req);
  form.find("#id-ads").val(data.id_ads);
  form.find("#id-ads-location").val(data.id_ads_location);
  form.find("#board-type").val(data.board_type);
  form.find("#height").val(data.height);
  form.find("#width").val(data.width);
  form.find("#quantity").val(data.quantity);
  form.find("#expired-date").val(data.expired_date.split("T")[0]);
  form.find("#reason").val(data.reason);
  form.find("#req-time").val(data.req_time.split("T")[0]);
  if (data.status == true) {
    form.find("#status").val("Đã xử lí");
    $("button[name='process']").hide();
    $(".processed").show();
  }
  form.find("#officer").val(data.officer);
  if (data.office == 1) {
    form.find("#office").val("Quận " + data.district);
  } else if (data.office == 2) {
    form.find("#office").val("Phường " + data.ward + ", Quận " + data.district);
  }
  if (data.photo != null && data.photo != "") {
    form.find("#image-preview").attr("src", data.photo);
  } else {
    form.find("#image-preview").attr("src", "../../../public/image/image-placeholder.jpg");
  }
}