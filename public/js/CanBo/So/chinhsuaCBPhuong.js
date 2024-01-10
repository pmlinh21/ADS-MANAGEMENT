var count = 0;
$(document).ready(function () {
  $("#canbo").addClass("snb-li-active");
  $("#loading-bg").show()

  let selectDistrict = $("#edit-ward-officer #id-district");
  let districts;
  $.get("/api/so/getAllQuan", function (data) {
    count++;
    districts = data.content.map(item => [item.id_district, item.district]);
    selectDistrict.append("<option value=''>Chọn quận</option>")

    for (let i = 0; i < districts.length; i++) {
      let option = $("<option></option>");
      option.val(districts[i][0]);
      option.text("Quận " + districts[i][1]);
      selectDistrict.append(option);
    }

    let canboPhuong;
    let email = $("#edit-ward-officer input[name='email']").val();
    $.get("/api/so/getCanboPhuongByEmail/" + email, function (data) {
      count++;
      canboPhuong = data.content[0];
      buildSelectWard(canboPhuong.id_district);
      let wards;
      $.get("/api/so/getAllPhuongByIdQuan/" + canboPhuong.id_district, function (data) {
        count++;
        wards = data.content.map(item => [item.id_ward, item.ward]);
        let selectWard = $("#edit-ward-officer #id-ward");
        // remove all options of selectWard
        selectWard.find("option").remove();
        selectWard.append("<option value=''>Chọn phường</option>");

        for (let i = 0; i < wards.length; i++) {
          let option = $("<option></option>");
          option.val(wards[i][0]);
          option.text("Phường " + wards[i][1]);
          selectWard.append(option);
        }

        buildForm(canboPhuong);
      }).fail(function (err) {
        $("#loading-bg").hide()
        console.log(err);
      });
    }).fail(function (err) {
      $("#loading-bg").hide()
      console.log(err);
    });
  });

  let check = setInterval(() => {
    if (count >= 4) {
      $("#loading-bg").hide()
      clearInterval(check);
    }
  }, 200);

  selectDistrict.change(function () {
    let id_district = $(this).val();
    buildSelectWard(id_district);
  });
});


function buildForm(canboPhuong) {
  let form = $("#edit-ward-officer");
  form.find("input[name='fullname']").val(canboPhuong.fullname);
  form.find("input[name='birthdate']").val(canboPhuong.birthdate);
  form.find("input[name='phone']").val(canboPhuong.phone);
  form.find("select[name='id_district']").val(canboPhuong.id_district);
  form.find("select[name='id_ward']").val(canboPhuong.id_ward);
}

function buildSelectWard(id_district) {
  let wards;
  $.get("/api/so/getAllPhuongByIdQuan/" + id_district, function (data) {
    count++;
    wards = data.content.map(item => [item.id_ward, item.ward]);
    let selectWard = $("#edit-ward-officer #id-ward");
    // remove all options of selectWard
    selectWard.find("option").remove();
    selectWard.append("<option value=''>Chọn phường</option>");

    for (let i = 0; i < wards.length; i++) {
      let option = $("<option></option>");
      option.val(wards[i][0]);
      option.text("Phường " + wards[i][1]);
      selectWard.append(option);
    }
  }).fail(function (err) {
    $("#loading-bg").hide()
    console.log(err);
  });
}

async function handleButtonClick(e) {
  if (e.value == "update") {
    $("#loading-bg").show()
    const formData = new FormData($("#edit-ward-officer")[0]);
    const editData = Object.fromEntries(formData.entries());
    let res = await fetch('/api/so/updateCanboPhuong', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData),
    }).then(function (res) {
      location.reload();
      alert("Cập nhật thành công")
    });
    // window.location.href = "/quanlicanbo";
  } else if (e.value == "delete") {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      $("#loading-bg").show()
      const formData = new FormData($("#edit-ward-officer")[0]);
      const deleteData = Object.fromEntries(formData.entries());
      let res = await fetch('/api/so/deleteCanboPhuong', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData),
      }).then(function (res) {
        if (res.status == 500) {
          $("#loading-bg").hide()
          alert("Không thể xóa vì phường đang được sử dụng");
        } else {
          window.location.href = "/quanlicanbo";
        }
      });
    }
  } else if (e.value == "add") {
    // const formData = new FormData($("#add-popup")[0]);
    // const addData = Object.fromEntries(formData.entries());
    // let res = await fetch('/api/so/addCanboQuan', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(addData),
    // });
    // location.reload();
  }
}