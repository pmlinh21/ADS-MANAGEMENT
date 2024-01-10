$(document).ready(function () {
  $("#canbo").addClass("snb-li-active");
  $.ajax({
    url: '/api/so/getAllQuan',
    type: 'GET',
    catch: false,
    dataType: 'json',
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      console.log(data);
      buildSelectDistrict(data.content);

      $.ajax({
        url: '/api/so/getAllCanboEmail',
        type: 'GET',
        catch: false,
        dataType: 'json',
        success: function (data) {
          $("#loading-bg").hide()
          allEmail = data.content.map(item => item.email);

          $("#add-ward-officer button").on("click", function (e) {
            // e.preventDefault();
            const formData = new FormData($("#add-ward-officer")[0]);
            const addData = Object.fromEntries(formData.entries());

            if (addData["fullname"] == "" || addData["birthdate"] == "" || addData["phone"] == "" || addData["email"] == "" || addData["id_district"] == "" || addData["id_ward"] == "") { 
              return;
            }
            
            e.preventDefault();
            if (allEmail.includes(formData.get("email").trim())) {
              alert("Không thể thêm vì email cán bộ đã tồn tại");
            } else {
              $.ajax({
                url: '/api/so/addCanboPhuong',
                type: 'POST',
                catch: false,
                dataType: 'json',
                data: addData,
                beforeSend: function () {
                  $("#loading-bg").show()
                },
                success: function (res) {
                  // $("#loading-bg").hide()
                  location.reload();
                  // window.location.href = "/quanlicanbo";
                  alert("Thêm thành công");
                },
                error: function (xhr, status, err) {
                  $("#loading-bg").hide()
                  alert("Thêm cán bộ thất bại");
                  console.log(err);
                }
              });
            }
          });
        },
        error: function (xhr, status, err) {
          $("#loading-bg").hide()
          console.log(err);
        }
      });
    },
    error: function (xhr, status, err) {
      $("#loading-bg").hide()
      console.log(err);
    }
  });
});

function buildSelectDistrict(data) {
  let select = $("#add-ward-officer #id-district");
  select.append("<option value=''>Chọn quận</option>")
  data.forEach(function (item) {
    select.append("<option value='" + item.id_district + "'>" + item.district + "</option>");
  });
  
  let selectPhuong = $("#add-ward-officer #id-ward");
  selectPhuong.empty();
  selectPhuong.append("<option value=''>Chọn phường</option>")

  select.on("change", function () {
    if ($(this).val() == "") {
      selectPhuong.empty();
      selectPhuong.append("<option value=''>Chọn phường</option>")
    } else {
      let id_district = $(this).val();
      $.ajax({
        url: '/api/so/getAllPhuongByIdQuan/' + id_district,
        type: 'GET',
        catch: false,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          buildSelectWard(data.content);
        },
        error: function (xhr, status, err) {
          console.log(err);
        }
      });
    }
    
  });
}

function buildSelectWard(data) {
  let select = $("#add-ward-officer #id-ward");
  select.empty();
  select.append("<option value=''>Chọn phường</option>")
  data.forEach(function (item) {
    select.append("<option value='" + item.id_ward + "'>" + item.ward + "</option>");
  });
}