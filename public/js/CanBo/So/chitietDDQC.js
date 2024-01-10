$(document).ready(function () {
  $("#chinhsua").addClass("snb-li-active");
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

  let id = $("#update-ads-location #id").val();
  $.ajax({
    url: '/api/so/getYeuCauChinhSuaDDQCById/' + id,
    type: 'GET',
    catch: false,
    dataType: 'json',
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      $("#loading-bg").hide()
      let ddqcChinhSua = data.content[0];
      buildForm(ddqcChinhSua);

      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [ddqcChinhSua.longitude, ddqcChinhSua.latitude],
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
      }).setLngLat([ddqcChinhSua.longitude, ddqcChinhSua.latitude]).addTo(map);
      map.flyTo({
        center: [ddqcChinhSua.longitude, ddqcChinhSua.latitude],
        zoom: 15,
        essential: true
      });
      
      $("#coordinates").on("click", async function(e) {
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

      $("#update-ads-location button[value='deny']").on("click", async function (e) {
        e.preventDefault();
        $.ajax({
          url: '/api/so/updateYeuCauChinhSuaDDQC/' + id + '/true',
          type: 'PUT',
          dataType: 'json',
          contentType: 'application/json',
          beforeSend: function () {
            $("#loading-bg").show()
          },
          success: function (data) {
            $("#loading-bg").hide();
            location.reload();
            alert("Từ chối yêu cầu thành công!");
          },
          error: function (xhr, status, err) {
            $("#loading-bg").hide();
            alert("Từ chối yêu cầu thất bại!");
            console.log(err);
          }
        })
      })

      $("#update-ads-location button[value='accept']").on("click", async function (e) {
        e.preventDefault();

        $.ajax({
          url: '/api/so/getDiemDatQuangCaoById/' + id,
          type: 'GET',
          catch: false,
          dataType: 'json',
          beforeSend: function () {
            $("#loading-bg").show()
          },
          success: function (data) {
            let old_photo = data.content[0].photo;

            let formData = new FormData();
            formData.append("id_ads_location", ddqcChinhSua.id_ads_location);
            formData.append("address", ddqcChinhSua.address);
            formData.append("ward", ddqcChinhSua.id_ward);
            formData.append("district", ddqcChinhSua.id_district);
            formData.append("latitude", ddqcChinhSua.latitude);
            formData.append("longitude", ddqcChinhSua.longitude);
            formData.append("id_loc_type", ddqcChinhSua.id_loc_type);
            formData.append("id_ads_type", ddqcChinhSua.id_ads_type);
            formData.append("is_zoning", ddqcChinhSua.is_zoning);
            formData.append("old_photo", old_photo);
            formData.append("photo", ddqcChinhSua.photo);

            updateData = Object.fromEntries(formData.entries());
            $.ajax({
              url: '/api/so/updateDiemDatQuangCao',
              type: 'PUT',
              contentType: 'application/json',
              data: JSON.stringify(updateData),
              success: function (res) {
                $.ajax({
                  url: '/api/so/updateYeuCauChinhSuaDDQC/' + id + '/true',
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
            alert("Xử lí thất bại");
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
});

function buildForm(data) {
  let form = $("#update-ads-location");
  form.find("#id").val(data.id_req);
  form.find("#id-ads-location").val(data.id_ads_location);
  form.find("#coordinates").val(data.latitude + ", " + data.longitude);
  form.find("#address").val(data.address);
  form.find("#ward").val(data.address_ward);
  form.find("#district").val(data.address_district);
  form.find("#location-type").val(data.loc_type);
  form.find("#ads-type").val(data.ads_type);
  if (data.is_zoning == true) {
    form.find("#zoning-status").val("Đã quy hoạch");
  }
  else if (data.is_zoning == false) {
    form.find("#zoning-status").val("Chưa quy hoạch");
  }

  if (data.photo != null && data.photo != "") {
    form.find("#image-preview").attr("src", data.photo);
  }
  else {
    form.find("#image-preview").attr("src", "../../../public/image/image-placeholder.jpg");
  }

  if (data.office == 1) {
    form.find("#office").val("Quận " + data.district);
  } 
  else if (data.office == 2) {
    form.find("#office").val("Phường " + data.ward + ", Quận " + data.district);
  }
  form.find("#officer").val(data.officer);
  form.find("#req-time").val(data.req_time.split("T")[0]);
  form.find("#reason").val(data.reason);
  if (data.status == true) {
    form.find("#status").val("Đã xử lí");
    $("button[name='process']").hide();
    $(".processed").show();
  }
}
