$(document).ready(function () {
  $("#bang").addClass("snb-li-active");

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

  $.ajax({
    url: "/api/so/getLoaiBangQuangCao",
    method: "GET",
    catch: false,
    dataType: "json",
    success: function (data) {
      let allLoaiBang = data.content;
      buildSelectLoaiBang(allLoaiBang);

      let id = $("#edit-ads #id-ads").val();
      $.ajax({
        url: '/api/so/getBangQuangCaoById/' + id,
        type: 'GET',
        catch: false,
        dataType: 'json',
        success: function (data) {
          let bqc = data.content[0];
          buildForm(bqc);

          let imageData = null;
          $("#image").on("change", function (e) {
            let reader = new FileReader();
            reader.onload = function () {
              document.querySelector("#image-preview").attributes.src.value = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
              imageData = e.target.files[0]
            }
            else if (!e.target.files[0].type.startsWith('image/')) {
              alert('File must be an image file (.jpg, .png, .jpeg)')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)) {
              alert('File must not exceed 4MB')
            }
          })

          $("#edit-ads button[value='update']").on("click", async function (e) {
            if ($("#edit-ads #id-ads-location").val() == "" || $("#edit-ads #board-type").val() == "" || $("#edit-ads #height").val() == "" || $("#edit-ads #width").val() == "" || $("#edit-ads #quantity").val() == "" || $("#edit-ads #expired-date").val() == "") {
              return;
            }

            e.preventDefault();
            $("#loading-bg").show()
            let formData = new FormData();
            formData.append("id_ads", parseInt(id));
            formData.append("id_ads_location", parseInt($("#edit-ads #id-ads-location").val()));
            formData.append("id_board_type", parseInt($("#edit-ads #board-type").val()));
            formData.append("height", parseFloat($("#edit-ads #height").val()));
            formData.append("width", parseFloat($("#edit-ads #width").val()));
            formData.append("quantity", parseInt($("#edit-ads #quantity").val()));
            formData.append("expired_date", $("#edit-ads #expired-date").val());
            formData.append("old_photo", bqc.photo);

            let signResponse, signData, cloudinaryData, url;
            if (imageData != null) {
              signResponse = await fetch('/api/basic/uploadImage');
              signData = await signResponse.json();
        
              url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";

              cloudinaryData = new FormData();
              cloudinaryData.append("file", imageData);
              cloudinaryData.append("api_key", signData.apikey);
              cloudinaryData.append("timestamp", signData.timestamp);
              cloudinaryData.append("signature", signData.signature);
              cloudinaryData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
              cloudinaryData.append("folder", "image");
            
              fetch(url, {
                method: "POST",
                body: cloudinaryData
              })
              .then((response) => { 
                return response.text();
              })
              .then((data) => {
                const photo = JSON.parse(data).secure_url
                formData.append("photo", photo);
              })
              .finally(() => {
                submitUpdate(formData);
              })
            } else {
              formData.append("photo", bqc.photo);
              submitUpdate(formData);
            }
          })

          $("#edit-ads button[value='delete']").on("click", function (e) {
            if (confirm("Bạn có chắc chắn muốn xóa không?")) {
              const deleteData = { id: parseInt(id) }
              $.ajax({
                url: '/api/so/deleteBangQuangCao',
                type: 'DELETE',
                catch: false,
                dataType: 'json',
                data: deleteData, 
                success: function (res) {
                  window.location.href = "/bangquangcao";
                  alert("Xóa thành công");
                },
                error: function (xhr, status, err) {
                  alert("Xóa thất bại");
                  console.log(err);
                }
              })
            }
          })
        }
      })

    },
    error: function (err) {
      console.log(err);
    },
  })

  var adslocations;
  $.ajax({
    url: "/api/so/getAllAdsLocations",
    method: "GET",
    catch: false,
    dataType: "json",
    success: function (data) {
      // adslocations = data.content;

      adslocations = [];
      for (let i = 0; i < data.content.length; i++) {
        let { id_ads_location, address, ward, district, latitude, longitude, is_zoning } = data.content[i];
        if (is_zoning == 1)
          adslocations.push({ id_ads_location, address, ward, district, latitude, longitude });
      }

      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [adslocations[0].longitude, adslocations[0].latitude],
        zoom: 17,
        language: 'vi'
      }) 
      // map.on('render', function () {
      //   map.resize();
      // })

      var language = new MapboxLanguage({
        defaultLanguage: 'vi'
      });
      map.addControl(language);

      let canvas = $('.mapboxgl-canvas')
      canvas.width('100%');
      canvas.height('100%');

      adslocations.forEach(function (item, index) {
        var marker = new mapboxgl.Marker({
          color: '#0B7B31'
        })
          .setLngLat([item.longitude, item.latitude])
          .addTo(map)
          .getElement();

          marker.id = `marker-${index}`;
      })

      $('#edit-ads #id-ads-location').on('click', function () {
        // map.resize();
        
        let currentId = parseInt($('#edit-ads #id-ads-location').val());
        let currentIndex = null;

        $('#select-location-map').css('display', 'block');
        map.resize();

        adslocations.forEach(function (item, index) {
          if (item.id_ads_location == currentId) {
            currentIndex = index;
            $('#select-location-map .chosen-address').text('(' + adslocations[currentIndex].id_ads_location + ') - ' + adslocations[currentIndex].address + ', Phường ' + adslocations[currentIndex].ward + ', Quận ' + adslocations[currentIndex].district + ' [' + adslocations[currentIndex].latitude + ', ' + adslocations[currentIndex].longitude + ']');
            return;
          }
        })

        // $('#select-location-map .chosen-address').text(adslocations[currentIndex].address + ', Phường ' + adslocations[currentIndex].ward + ', Quận ' + adslocations[currentIndex].district + ' [' + adslocations[currentIndex].latitude + ', ' + adslocations[currentIndex].longitude + ']');

        let div = $('<div></div>');
        div.addClass('popup-background');
        div.on('click', function () {
          div.remove();
          $('#select-location-map').css('display', 'none');
        })
        $('body').append(div);

        // marker click event
        $(document).on('click', '.mapboxgl-marker', function () {
          let markerId = $(this).attr('id');
          currentIndex = parseInt(markerId.split('-')[1]);
          $('#select-location-map .chosen-address').text('(' + adslocations[currentIndex].id_ads_location + ') - ' + adslocations[currentIndex].address + ', Phường ' + adslocations[currentIndex].ward + ', Quận ' + adslocations[currentIndex].district + ' [' + adslocations[currentIndex].latitude + ', ' + adslocations[currentIndex].longitude + ']');
        })

        // button click event
        $('#select-location-map button').on('click', function () {
          $('#edit-ads #id-ads-location').val(adslocations[currentIndex].id_ads_location);
          $('#select-location-map').css('display', 'none');
          $('.popup-background').remove();
        })
      })
    }, 
    error: function (err) {
      console.log(err);
    }
  })
});

function buildSelectLoaiBang(data) {
  let select = $("#edit-ads #board-type");
  select.empty();
  select.append('<option value="">Chọn loại vị trí</option>');

  data.forEach(function (item) {
    select.append('<option value="' + item.id_board_type + '">' + item.board_type + "</option>");
  });
}

function buildForm(data) {
  let form = $("#edit-ads");
  form.find("#id-ads").val(data.id_ads);
  form.find("#id-ads-location").val(data.id_ads_location);
  form.find("#board-type").val(data.id_board_type);
  form.find("#height").val(data.height);
  form.find("#width").val(data.width);
  form.find("#quantity").val(data.quantity);
  form.find("#expired-date").val(data.expired_date.split("T")[0]);
  
  if (data.photo != null && data.photo != "") {
    // form.find("#image-preview").attr("src", "../../../public/image/" + data.photo);
    // form.find("#image").val(data.photo);
    form.find("#image-preview").attr("src", data.photo);
  } else {
    form.find("#image-preview").attr("src", "../../../public/image/image-placeholder.jpg");
  }
}

function submitUpdate(formData) {
  let id = $("#edit-ads #id-ads").val();
  updateData = Object.fromEntries(formData.entries());

  $.ajax({
    url: '/api/so/updateBangQuangCao',
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(updateData),
    success: function (res) {
      $("#loading-bg").hide()
      window.location.href = "/bangquangcao/chinhsua?id=" + id;
      alert("Chỉnh sửa thành công");
    },
    error: function (xhr, status, err) {
      $("#loading-bg").hide()
      alert("Chỉnh sửa thất bại");
      console.log(err);
    }
  })
}