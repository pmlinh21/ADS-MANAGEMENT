$(document).ready(function () {
  $("#diemdat").addClass("snb-li-active");

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

  $.ajax({
    url: "/api/so/getLoaiViTri",
    method: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      let allLoaiViTri = data.content;
      buildSelectLoaiViTri(allLoaiViTri);

      $.ajax({
        url: "/api/so/getHinhThucQuangCao",
        method: "GET",
        catch: false,
        dataType: "json",
        success: function (data) {
          $("#loading-bg").hide()
          let allHinhThucQuangCao = data.content;
          buildSelectHinhThucQuangCao(allHinhThucQuangCao);

          let imageData = null;
          $("#image").on("change", function(e) {
            let reader = new FileReader();
            reader.onload = function() {
              document.querySelector("#image-preview").attributes.src.value = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
              imageData = e.target.files[0]
            }
            else if (!e.target.files[0].type.startsWith('image/')){
              alert('File must be an image file (.jpg, .png, .jpeg)')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)){
              alert('File must not exceed 4MB')
            }
          })

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [106.689636, 10.773695],
            zoom: 15,
            language: 'vi'
          }) 
        
          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);

          var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          });
          geocoder.setLanguage('vi');
        
          let canvas = $('.mapboxgl-canvas')
          canvas.width('100%');
          canvas.height('100%');
          let marker = new mapboxgl.Marker();

          $('#search').append(geocoder.onAdd(map));
          $(".search-bar i").on('click', async () => {
            await geocoding()
          });
          $('#search').on('keydown', async function(event) {
            if (event.keyCode === 13) { 
              await geocoding();
            }
          });

          var longitude, latitude, ward, district, address, id_ward, id_district;
          function geocoding(){
            const searchText = $('#search').val()
          
            if (searchText != '')
            return new Promise(function(resolve, reject) {
              $.ajax({
                url: `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(searchText)}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc`,
                type: 'GET',
                data: {
                  access_token: mapboxgl.accessToken,
                  language: "vi"
                },
                success: function(response) {
                  if (response.items.length == 0) {
                    alert('No result found')
                    reject()
                  }
                  const features = response.items[0];
                  longitude = features.position.lng;
                  latitude = features.position.lat;
          
                  map.flyTo({
                    center: [longitude, latitude],
                    zoom: 17
                  });
          
                  marker.remove()
                  marker = new mapboxgl.Marker( {color: '#0B7B31' })
                  .setLngLat([longitude, latitude]) 
                  .addTo(map);
          
                  ward = features?.address?.district?.substring(7)
                  district = features?.address?.city?.substring(5)
                  
                  if (features?.address?.street) {
                    if (features?.address?.houseNumber) {
                      address = features?.address?.houseNumber + " ";
                    }
                    address += `${features?.address?.street}`;
                  } else if (features?.address?.label) {
                    address = features?.address?.label.substring(0, features?.address?.label.indexOf(", Phường") )
                  }

                  // address = (features?.address?.houseNumber && features?.address?.street)
                  // ? features?.address?.houseNumber + " " +  features?.address?.street
                  // : features?.address?.label.substring(0, features?.address?.label.indexOf(", Phường") )                 
                
                  let chosenAddress;
                  if (address) {
                    chosenAddress = address;
                  } 
                  if (ward) {
                    chosenAddress += `, Phường ${ward}`;
                  }
                  if (district) {
                    chosenAddress += `, Quận ${district}`;
                  }
                  $('#select-location-map .chosen-address').text(`${chosenAddress} [${longitude}, ${latitude}]`);
                  
                  resolve()
                },
                error: function() {
                  alert('Error occurred during geocoding');
                  reject()
                }
              });
            })
          }

          map.on('click', function(e) {
            let lngLat = e.lngLat;
            longitude = lngLat.lng;
            latitude = lngLat.lat;
            marker.remove()
            marker = new mapboxgl.Marker({
              color: '#0B7B31'
            }).setLngLat(lngLat).addTo(map);
            map.flyTo({
              center: lngLat,
              zoom: 17
            })

            $.ajax({
              url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc&lang=vi`,
              method: 'GET',
              success: function(response) {
                const feature = response.items[0].address
                ward = feature?.district.substring(7)
                district = feature?.city.substring(5)
                address = (feature?.houseNumber && feature?.street)
                ? feature?.houseNumber + " " +  feature?.street
                : feature?.label.substring(0, feature?.label.indexOf(", Phường") )
                
                let chosenAddress;
                if (address) {
                  chosenAddress = address;
                }
                if (ward) {
                  chosenAddress += `, Phường ${ward}`;
                }
                if (district) {
                  chosenAddress += `, Quận ${district}`;
                }
                $('#select-location-map .chosen-address').text(`${chosenAddress} [${longitude}, ${latitude}]`);
              },
              error: function(error) {
                console.log(error);
              }
            });
          });

          // Lắng nghe sự kiện mousedown trên bản đồ
          map.on('mousedown', function() {
            // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
            map.getCanvas().style.cursor = 'grab';
          });
      
          // Lắng nghe sự kiện mouseup trên bản đồ
          map.on('mouseup', function() {
            // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
            map.getCanvas().style.cursor = 'pointer';
          });

          // click to choose location
          $('#add-ads-location #coordinates').on('click', async () => {
            $('#select-location-map').css('display', 'block');
            map.resize();
            let div = $('<div></div>');
            div.addClass('popup-background');
            div.on('click', function () {
              div.remove();
              $('#select-location-map').css('display', 'none');
            })
            $('body').append(div);

            $('#select-location-map button').on('click', function () {
              $('#add-ads-location #coordinates').val(`${latitude}, ${longitude}`);
              $('#add-ads-location #address').val(address);
              $('#add-ads-location #ward').val(ward);
              $('#add-ads-location #district').val(district);
            
              $('#select-location-map').css('display', 'none');
              $('.popup-background').remove();
            })
          })

          $("#add-ads-location button[value='add']").on("click", async function (e) {
            if ($('#coordinates').val() == '') {
              alert('Vui lòng chọn vị trí trên bản đồ');
              return;
            } else if (imageData == null) {
              alert('Vui lòng chọn ảnh');
              return;
            }
            if ($("#add-ads-location #address").val() == "" || $("#add-ads-location #ward").val() == "" || $("#add-ads-location #district").val() == "" || $("#add-ads-location #coordinates").val() == "" || $("#add-ads-location #ads-location-type").val() == "" || $("#add-ads-location #ads-type").val() == "" || $("#add-ads-location #is-zoning").val() == "" || imageData == null) {
              return;
            }
            e.preventDefault();
            $("#loading-bg").show()

            $.ajax({
              url: '/api/so/getQuanByName/' + district,
              type: 'GET',
              catch: false,
              dataType: 'json',
              success: function (data) {
                if (data.content.length == 0) {
                  let newDistrictForm = new FormData();
                  newDistrictForm.append("name", district);
                  let newDistrictData = Object.fromEntries(newDistrictForm.entries());
                  $.ajax({
                    url: '/api/so/addQuan',
                    type: 'POST',
                    catch: false,
                    dataType: 'json',
                    data: newDistrictData,
                    success: function (data) {
                      id_district = data.content.id_district;
                      $.ajax({
                        url: '/api/so/getPhuongByNameAndIdQuan/' + ward + '/' + id_district,
                        type: 'GET',
                        catch: false,
                        dataType: 'json',
                        success: function (data) {
                          let newWardForm = new FormData();
                          newWardForm.append("name", ward);
                          newWardForm.append("id_district", id_district);
                          let newWardData = Object.fromEntries(newWardForm.entries());
      
                          if (data.content.length == 0) {
                            $.ajax({
                              url: '/api/so/addPhuong',
                              type: 'POST',
                              catch: false,
                              dataType: 'json',
                              data: newWardData,
                              beforeSend: function () {
                                $("#loading-bg").show()
                              },
                              success: function (data) {
                                id_ward = data.content.id_ward;
                                prepareForm(id_ward, id_district, latitude, longitude, imageData);
                              }
                            })
                          } else {
                            id_ward = data.content[0].id_ward;
                            prepareForm(id_ward, id_district, latitude, longitude, imageData);
                          }
                        }
                      })
                    }
                  })
                } else {
                  id_district = data.content[0].id_district;
                  $.ajax({
                    url: '/api/so/getPhuongByNameAndIdQuan/' + ward + '/' + id_district,
                    type: 'GET',
                    catch: false,
                    dataType: 'json',
                    success: function (data) {
                      let newWardForm = new FormData();
                      newWardForm.append("name", ward);
                      newWardForm.append("id_district", id_district);
                      let newWardData = Object.fromEntries(newWardForm.entries());
  
                      if (data.content.length == 0) {
                        $.ajax({
                          url: '/api/so/addPhuong',
                          type: 'POST',
                          catch: false,
                          dataType: 'json',
                          data: newWardData,
                          beforeSend: function () {
                            $("#loading-bg").show()
                          },
                          success: function (data) {
                            id_ward = data.content[0].id_ward;
                            prepareForm(id_ward, id_district, latitude, longitude, imageData);
                          }
                        })
                      } else {
                        id_ward = data.content[0].id_ward;
                        prepareForm(id_ward, id_district, latitude, longitude, imageData);
                      }
                    }
                  })
                }
              }
            })
          })

        },
        error: function (xhr, status, err) {
          $("#loading-bg").hide()
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

function buildSelectLoaiViTri(data) {
  let select = $("#add-ads-location #ads-location-type");
  select.empty();
  select.append('<option value="">Chọn loại vị trí</option>');

  data.forEach(function (item) {
    select.append('<option value="' + item.id_loc_type + '">' + item.loc_type + "</option>");
  });
}

function buildSelectHinhThucQuangCao(data) {
  let select = $("#add-ads-location #ads-type");
  select.empty();
  select.append('<option value="">Chọn hình thức quảng cáo</option>');

  data.forEach(function (item) {
    select.append('<option value="' + item.id_ads_type + '">' + item.ads_type + "</option>");
  });
}

async function prepareForm(id_ward, id_district, latitude, longitude, imageData) {
  let formData = new FormData();
  formData.append("address", $("#address").val());
  formData.append("ward", parseInt(id_ward));
  formData.append("district", parseInt(id_district));
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("id_loc_type", parseInt($("#ads-location-type").val()));
  formData.append("id_ads_type", parseInt($("#ads-type").val()));
  if ($("#is-zoning").val() == "0") {
    formData.append("is_zoning", false);
  } else if ($("#is-zoning").val() == "1") {
    formData.append("is_zoning", true);
  } else {
    formData.append("is_zoning", null);
  }
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
      submitAdd(formData);
    })
  } else {
    formData.append("photo", "");
    submitAdd(formData);
  }
}

function submitAdd(formData) {
  let data = Object.fromEntries(formData.entries());
  $.ajax({
    url: '/api/so/addDiemDatQuangCao',
    type: 'POST',
    catch: false,
    dataType: 'json',
    data: data,
    success: function (data) {
      $("#loading-bg").hide()
      alert("Thêm thành công");
      location.reload();
    },
    error: function (xhr, status, err) {
      $("#loading-bg").hide()
      alert("Thêm thất bại");
      console.log(err);
    }
  })
}
