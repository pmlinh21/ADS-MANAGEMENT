$(document).ready(function () {
  $("#capphep").addClass("snb-li-active");
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

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

      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [yccp.longitude, yccp.latitude],
        zoom: 15,
        language: 'vi'
      }) 
    
      var language = new MapboxLanguage({
        defaultLanguage: 'vi'
      });
      map.addControl(language);

      let canvas = $('.mapboxgl-canvas')
        canvas.width('100%');
        canvas.height('100%');
      let marker = new mapboxgl.Marker({
        color: '#0B7B31'
      }).setLngLat([yccp.longitude, yccp.latitude]).addTo(map);
      map.flyTo({
        center: [yccp.longitude, yccp.latitude],
        zoom: 15,
        essential: true
      });
      
      $("#id-ads-location").on("click", async function(e) {
        $('#select-location-map').css('display', 'block');
        map.resize();
        let div = $('<div></div>');
        div.addClass('popup-background');
        div.on('click', function () {
          div.remove();
          $('#select-location-map').css('display', 'none');
        })
        $('body').append(div);
      })

      $("#address").on("click", async function(e) {
        $('#select-location-map').css('display', 'block');
        map.resize();
        let div = $('<div></div>');
        div.addClass('popup-background');
        div.on('click', function () {
          div.remove();
          $('#select-location-map').css('display', 'none');
        })
        $('body').append(div);
      })


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
                url: '/api/so/updateYeuCauCapPhep/' + id + '/false/null',
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () {
                  $("#loading-bg").show()
                },
                success: function (data) {
                  $.ajax({
                    url: '/api/so/deleteAdsUpdateByIdAds/' + yccp.id_ads,
                    type: 'DELETE',
                    catch: false,
                    dataType: 'json',
                    success: function (res) {
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
                          alert("Từ chối yêu cầu thành công!");
                        },
                        error: function (xhr, status, err) {
                          $("#loading-bg").hide()
                          alert("Từ chối yêu cầu thất bại.");
                          console.log(err);
                        }
                      })
                    },
                    error: function (xhr, status, err) {
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
                          alert("Từ chối yêu cầu thành công!");
                        },
                        error: function (xhr, status, err) {
                          $("#loading-bg").hide()
                          alert("Từ chối yêu cầu thất bại.");
                          console.log(err);
                        }
                      })
                      // alert("Từ chối yêu cầu thất bại! 8");
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
                url: '/api/so/updateYeuCauCapPhep/' + id + '/true/' + yccp.id_ads,
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
                url: '/api/so/updateYeuCauCapPhep/' + id + '/false/' + yccp.id_ads,
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
            // duyệt:
            // - cập nhật ads create với status = true
            // - cập nhật ads với start_date, end_date của ads create
            $("#create-ads button[value='accept']").on("click", async function (e) {
              e.preventDefault();
              $.ajax({
                url: '/api/so/updateYeuCauCapPhep/' + id + '/true/' + yccp.id_ads,
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