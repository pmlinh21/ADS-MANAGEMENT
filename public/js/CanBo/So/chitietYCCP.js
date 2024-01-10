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
      let yccp = data.content[0];
      buildForm(yccp);
      $.ajax({
        url: '/api/so/getAdsCreateByIdAdsNotIdCreate/' + yccp.id_ads + '/' + id,
        type: 'GET',
        catch: false,
        dataType: 'json',
        success: function (data) {
          $("#loading-bg").hide()
          if (data.content.length == 0) {
            // tạo cấp phép mới
            // từ chối: 
            // - cập nhật ads create với status = false
            // - xóa ads (nhưng không xóa ảnh)
            $("#create-ads button[value='deny']").on("click", async function (e) {
              e.preventDefault();
              $.ajax({
                url: '/api/so/updateYeuCauCapPhep/' + id + '/false',
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () {
                  $("#loading-bg").show()
                },
                success: function (data) {
                  let deleteForm = new FormData();
                  deleteForm.append("id", yccp.id_ads);
                  deleteForm.append("photo", "");
                  let deleteData = Object.fromEntries(deleteForm.entries());
                  $.ajax({
                    url: '/api/so/deleteBangQuangCao', 
                    type: 'DELETE',
                    catch: false,
                    dataType: 'json',
                    data: deleteData,
                    success: function (res) {
                      $("#loading-bg").hide()
                      location.reload();
                      alert("Từ chối yêu cầu thành công! tạo mới");
                    },
                    error: function (xhr, status, err) {
                      $("#loading-bg").hide()
                      alert("Từ chối yêu cầu thất bại.");
                      console.log(err);
                    }
                  })
                },
                error: function (xhr, status, err) {
                  $("#loading-bg").hide()
                  alert("Từ chối yêu cầu thất bại!");
                  console.log(err);
                }
              })
            })
            // duyệt: 
            // - cập nhật ads create với status = true
            $("#create-ads button[value='accept']").on("click", async function (e) {
              e.preventDefault();
              $.ajax({
                url: '/api/so/updateYeuCauCapPhep/' + id + '/true',
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () {
                  $("#loading-bg").show()
                },
                success: function (data) {
                  $("#loading-bg").hide()
                  location.reload();
                  alert("Duyệt yêu cầu thành công!");
                },
                error: function (xhr, status, err) {
                  $("#loading-bg").hide()
                  alert("Duyệt yêu cầu thất bại!");
                  console.log(err);
                }
              })
            })
          }
          else {
            // gia hạn cấp phép
            // từ chối:
            // - cập nhật ads create với status = false
            // - ko xóa ads
            $("#create-ads button[value='deny']").on("click", async function (e) {
              e.preventDefault();
              $.ajax({
                url: '/api/so/updateYeuCauCapPhep/' + id + '/false',
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () {
                  $("#loading-bg").show()
                },
                success: function (data) {
                  $("#loading-bg").hide()
                  location.reload();
                  alert("Từ chối yêu cầu thành công! gia hạn");
                },
                error: function (xhr, status, err) {
                  $("#loading-bg").hide()
                  alert("Từ chối yêu cầu thất bại!");
                  console.log(err);
                }
              })
            })
            // duyệt:
            // - cập nhật ads create với status = true
            // - cập nhật ads với start_date, end_date của ads create
            $("#create-ads button[value='accept']").on("click", async function (e) {
              e.preventDefault();
              $.ajax({
                url: '/api/so/updateYeuCauCapPhep/' + id + '/true',
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () {
                  $("#loading-bg").show()
                },
                success: function (data) {
                  let updateForm = new FormData();
                  updateForm.append("id", yccp.id_ads);
                  updateForm.append("expired_date", yccp.end_date);
                  let updateData = Object.fromEntries(updateForm.entries());
                  $.ajax({
                    url: '/api/so/updateAdsExpiredDate', 
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updateData),
                    success: function (res) {
                      $("#loading-bg").hide()
                      location.reload();
                      alert("Duyệt yêu cầu thành công!");
                    },
                    error: function (xhr, status, err) {
                      $("#loading-bg").hide()
                      alert("Duyệt yêu cầu thất bại.");
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
        },
        error: function (xhr, status, err) {
          $("#loading-bg").hide()
          console.log(err);
        }
      })
    }
  })
})

function buildForm(data) {
  let form = $("#create-ads");
  form.find("#id-ads-location").val(data.id_ads_location);
  form.find("#address").val(data.ads_location + ", P." + data.address_ward + ", Q." + data.address_district);
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