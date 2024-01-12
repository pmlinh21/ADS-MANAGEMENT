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
          let allHinhThucQuangCao = data.content;
          buildSelectHinhThucQuangCao(allHinhThucQuangCao);

          let id = $("#edit-ads-location #id-ads-location").val();
          $.ajax({
            url: '/api/so/getDiemDatQuangCaoById/' + id,
            type: 'GET',
            catch: false,
            dataType: 'json',
            success: function (data) {
              let ddqc = data.content[0];
              buildForm(ddqc);

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
                center: [ddqc.longitude, ddqc.latitude],
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
              let marker = new mapboxgl.Marker({
                color: '#0B7B31'
              }).setLngLat([ddqc.longitude, ddqc.latitude]).addTo(map);
              $('#select-location-map .chosen-address').text(`${ddqc.address} [${ddqc.longitude}, ${ddqc.latitude}]`);


              $('#search').append(geocoder.onAdd(map));
              $(".search-bar i").on('click', async () => {
                await geocoding()
              });
              $('#search').on('keydown', async function(event) {
                if (event.keyCode === 13) { 
                  await geocoding();
                }
              });

              var longitude = ddqc.longitude;
              var latitude = ddqc.latitude;
              var ward = ddqc.ward;
              var district = ddqc.district;
              var address = ddqc.address;
              var id_ward = ddqc.id_ward;
              var id_district = ddqc.id_district;
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
                        zoom: 15
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
                  zoom: 15
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
              $('#edit-ads-location #coordinates').on('click', async () => {
                $('#select-location-map').css('display', 'block');
                map.resize();
                marker.remove()
                let curLng = $('#edit-ads-location #coordinates').val().split(',')[1].trim();
                let curLat = $('#edit-ads-location #coordinates').val().split(',')[0].trim();
                marker = new mapboxgl.Marker({
                  color: '#0B7B31'
                }).setLngLat([curLng, curLat]).addTo(map);
                map.flyTo({
                  center: [curLng, curLat],
                  zoom: 15
                })

                let div = $('<div></div>');
                div.addClass('popup-background');
                div.on('click', function () {
                  div.remove();
                  $('#select-location-map').css('display', 'none');
                })
                $('body').append(div);

                $('#select-location-map button').on('click', function () {
                  $('#edit-ads-location #coordinates').val(`${latitude}, ${longitude}`);
                  $('#edit-ads-location #address').val(address);
                  $('#edit-ads-location #ward').val(ward);
                  $('#edit-ads-location #district').val(district);
                
                  $('#select-location-map').css('display', 'none');
                  $('.popup-background').remove();
                })
              })

              $("#edit-ads-location button[value='update']").on("click", async function (e) {
                if ($("#edit-ads-location #address").val() == "" || $("#edit-ads-location #ward").val() == "" || $("#edit-ads-location #district").val() == "" || $("#edit-ads-location #coordinates").val() == "" || $("#edit-ads-location #ads-location-type").val() == "" || $("#edit-ads-location #ads-type").val() == "" || $("#edit-ads-location #is-zoning").val() == "") {
                  return;
                }
                e.preventDefault();
                $("#loading-bg").show()

                if (ddqc.district != district || ddqc.ward != ward) {
                  $.ajax({
                    url: '/api/so/getQuanByName/' + district,
                    type: 'GET',
                    catch: false,
                    dataType: 'json',
                    success: function (data) {
                      if (data.content.length == 0) {
                        let newDistrictForm = new FormData();
                        newDistrictData.append("district", district);
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
                                      console.log(id_ward + " " + id_district);
                                      prepareForm(imageData, ddqc, latitude, longitude, id_ward, id_district, id);
                                    }
                                  })
                                } else {
                                  id_ward = data.content[0].id_ward;
                                  console.log(id_ward + " " + id_district);
                                  prepareForm(imageData, ddqc, latitude, longitude, id_ward, id_district, id);
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
                                  id_ward = data.content.id_ward;
                                  console.log(id_ward + " " + id_district);
                                  prepareForm(imageData, ddqc, latitude, longitude, id_ward, id_district, id);
                                }
                              })
                            } else {
                              id_ward = data.content[0].id_ward;
                              prepareForm(imageData, ddqc, latitude, longitude, id_ward, id_district, id);
                            }
                          }
                        })
                      }
                    }
                  })
                } else {
                  prepareForm(imageData, ddqc, latitude, longitude, id_ward, id_district, id);
                }
              });

              $("#edit-ads-location button[value='delete']").on("click", function (e) {
                if (confirm("Xóa điểm đặt quảng cáo sẽ xóa tất cả các bảng quảng cáo liên quan. Bạn có chắc chắn muốn xóa không?")) {
                  $.ajax({
                    url: '/api/so/deleteAdsByIdAdsLocation/' + id,
                    type: 'DELETE',
                    catch: false,
                    dataType: 'json',
                    beforeSend: function () {
                      $("#loading-bg").show()
                    },
                    success: function (res) {
                      const deleteForm = new FormData();
                      deleteForm.append("id", id);
                      deleteForm.append("photo", ddqc.photo);
                      const deleteData = Object.fromEntries(deleteForm.entries());
                      $.ajax({
                        url: '/api/so/deleteDiemDatQuangCao',
                        type: 'DELETE',
                        catch: false,
                        dataType: 'json',
                        data: deleteData,
                        success: function (res) {
                          window.location.href = "/diemdatquangcao";
                          alert("Xóa thành công!");
                        },
                        error: function (xhr, status, err) {
                          $("#loading-bg").hide()
                          alert("Xóa thất bại.2");
                          console.log(err);
                        }
                      })
                    },
                    error: function (err) {
                      $("#loading-bg").hide()
                      alert("Xóa thất bại.1");
                      console.log(err);
                    },
                  })
                  // $.ajax({
                  //   url: '/api/so/deleteDiemDatQuangCao',
                  //   type: 'DELETE',
                  //   catch: false,
                  //   dataType: 'json',
                  //   data: deleteData,
                  //   success: function (res) {
                  //     window.location.href = "/diemdatquangcao";
                  //     alert("Xóa thành công!");
                  //   },
                  //   error: function (xhr, status, err) {
                  //     alert("Xóa thất bại.");
                  //     console.log(err);
                  //   }
                  // })
                }
              })
            }
          })
        },
        error: function (err) {
          console.log(err);
        },
      })

    },
    error: function (err) {
      console.log(err);
    },
  });
});

function buildSelectLoaiViTri(data) {
  let select = $("#edit-ads-location #ads-location-type");
  select.empty();
  select.append('<option value="">Chọn loại vị trí</option>');

  data.forEach(function (item) {
    select.append('<option value="' + item.id_loc_type + '">' + item.loc_type + "</option>");
  });
}

function buildSelectHinhThucQuangCao(data) {
  let select = $("#edit-ads-location #ads-type");
  select.empty();
  select.append('<option value="">Chọn hình thức quảng cáo</option>');

  data.forEach(function (item) {
    select.append('<option value="' + item.id_ads_type + '">' + item.ads_type + "</option>");
  });
}

function buildForm(data) {
  let form = $("#edit-ads-location");
  form.find("#address").val(data.address);
  form.find("#ward").val(data.ward);
  form.find("#district").val(data.district);
  form.find("#coordinates").val(data.latitude + ", " + data.longitude);
  form.find("#ads-location-type").val(data.id_loc_type);
  form.find("#ads-type").val(data.id_ads_type);

  $.ajax({
    url: '/api/so/getAdsByIdAdsLocation/' + data.id_ads_location,
    type: 'GET',
    catch: false,
    dataType: 'json',
    success: function (dat) {
      $("#loading-bg").hide()
      if (dat.content.length != 0) {
        // remove option value = 0 (not zoning)
        $("#is-zoning option[value='0']").remove();
      }
      if (data.is_zoning == false) {
        form.find("#is-zoning").val("0");
      } else if (data.is_zoning == true) {
        form.find("#is-zoning").val("1");
      } else {
        form.find("#is-zoning").val("");
      }
    },
    error: function (err) {
      $("#loading-bg").hide()
      console.log(err);
    }
  })

  if (data.photo != null && data.photo != "") {
    form.find("#image-preview").attr("src", data.photo); 
  } else {
    form.find("#image-preview").attr("src", "../../../public/image/image-placeholder.jpg"); 
  }
}

async function prepareForm(imageData, ddqc, latitude, longitude, id_ward, id_district, id) {
  let formData = new FormData();
  formData.append("id_ads_location", parseInt(id));
  formData.append("address", $("#address").val());
  formData.append("ward", parseInt(id_ward));
  formData.append("district", parseInt(id_district));
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("id_loc_type", parseInt($("#ads-location-type").val()));
  formData.append("id_ads_type", parseInt($("#ads-type").val()));
  formData.append("old_photo", ddqc.photo);

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
      submitUpdate(formData);
    })
  } else {
    formData.append("photo", ddqc.photo);
    submitUpdate(formData);
  }
}

function submitUpdate(formData) {
  let id = $("#edit-ads-location #id-ads-location").val();
  updateData = Object.fromEntries(formData.entries());
  console.log(updateData);

  $.ajax({
    url: '/api/so/updateDiemDatQuangCao',
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(updateData),
    success: function (res) {
      $("#loading-bg").hide()
      window.location.href = "/diemdatquangcao/chinhsua?id=" + id;
      alert("Chỉnh sửa thành công");
    },
    error: function (xhr, status, err) {
      $("#loading-bg").hide()
      alert("Chỉnh sửa thất bại");
      console.log(err);
    }
  })
}
