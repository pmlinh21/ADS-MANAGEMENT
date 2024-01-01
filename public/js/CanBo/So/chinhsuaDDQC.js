$(document).ready(function () {
  $("#diemdat").addClass("snb-li-active");

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

  $.ajax({
    url: "/api/so/getLoaiViTri",
    method: "GET",
    catch: false,
    dataType: "json",
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

              $("#edit-ads-location button[value='update']").on("click", async function (e) {
                if ($("#edit-ads-location #address").val() == "" || $("#edit-ads-location #ward").val() == "" || $("#edit-ads-location #district").val() == "" || $("#edit-ads-location #coordinates").val() == "" || $("#edit-ads-location #ads-location-type").val() == "" || $("#edit-ads-location #ads-type").val() == "") {
                  return;
                }
                
                let id_ward = ddqc.id_ward;
                let id_district = ddqc.id_district;

                e.preventDefault();
                $("#loading-bg").show()
                let formData = new FormData();
                formData.append("id_ads_location", parseInt(id));
                formData.append("address", $("#address").val());
                formData.append("ward", parseInt(id_ward));
                formData.append("district", parseInt(id_district));
                let coordinates = $("#coordinates").val().split(", ");
                formData.append("latitude", parseFloat(coordinates[0]));
                formData.append("longitude", parseFloat(coordinates[1]));
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
              });

              $("#edit-ads-location button[value='delete']").on("click", function (e) {
                if (confirm("Bạn có chắc chắn muốn xóa không?")) {
                  const deleteData = { id: parseInt(id) }
                  $.ajax({
                    url: '/api/so/deleteDiemDatQuangCao',
                    type: 'DELETE',
                    catch: false,
                    dataType: 'json',
                    data: deleteData,
                    success: function (res) {
                      window.location.href = "/diemdatquangcao";
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
  if (data.is_zoning == false) {
    form.find("#is-zoning").val("0");
  } else if (data.is_zoning == true) {
    form.find("#is-zoning").val("1");
  } else {
    form.find("#is-zoning").val("");
  }
  if (data.photo != null && data.photo != "") {
    form.find("#image-preview").attr("src", data.photo); 
  } else {
    form.find("#image-preview").attr("src", "../../../public/image/image-placeholder.jpg"); 
  }
}

function submitUpdate(formData) {
  let id = $("#edit-ads-location #id-ads-location").val();
  updateData = Object.fromEntries(formData.entries());

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

// open map popup
// function mapPopup(e) {
//     let coordinates = e.value;
//     let lat = coordinates.split(", ")[0];
//     let lng = coordinates.split(", ")[1];

//     document.querySelector("#select-location-map").style.display = "block";
//     for (let i = 0; i < adslocations.length; i++) {
//         if (adslocations[i][1] == lat && adslocations[i][2] == lng) {
//             let w, d;
//             for (let j = 0; j < wards.length; j++) {
//                 if (wards[j][0] == adslocations[i][4]) {
//                     w = wards[j][1];
//                     d = wards[j][2];
//                     break;
//                 }
//             }
//             document.querySelector("#select-location-map .chosen-address").textContent = "[" + lat + ", " + lng + "] " + adslocations[i][3] + ", Phường " + w + ", Quận " + d;
//             break;
//         }
//     }
//     // if (document.querySelector("#select-location-map .chosen-address").textContent == "") {
//     //     document.querySelector("#select-location-map .chosen-address").style.display = "none";
//     // }

//     let div = document.createElement("div");
//     div.className = "popup-background";
//     div.addEventListener("click", () => {
//         div.remove();
//         document.querySelector("#select-location-map").style.display = "none";
//     });
//     document.querySelector("body").appendChild(div);
// }