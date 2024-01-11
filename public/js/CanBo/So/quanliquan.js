$(document).ready(function () {
  $("quan").addClass("snb-li-active");

  $.ajax({
    url: "/api/so/getAllQuanData",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      $("#loading-bg").hide()
      let allQuan = data.content.map(item => [item.id_district, item.district, item.SLPhuong, item.SLDDQC, item.SLBQC, item.SLCB]);
      buildDistrictTable(allQuan);
    },
    error: function (err) {
      $("#loading-bg").hide()
      console.log(err);
    }
  })
})

function buildDistrictTable(districts) {
  let table = $("#district-table table tbody");
  for (let i = 0; i < districts.length; i++) {
    let tr = $("<tr></tr>");

    let td1 = $("<td></td>").text(districts[i][0]);
    td1.addClass("id");
    let td2 = $("<td></td>").text("Quận " + districts[i][1]);
    td2.addClass("name");
    let td3 = $("<td></td>").text(districts[i][2]);
    td3.addClass("number-of-wards");
    let td4 = $("<td></td>").text(districts[i][3]);
    td4.addClass("number-of-ads-locations");
    let td5 = $("<td></td>").text(districts[i][4]);
    td5.addClass("number-of-ads");
    let td6 = $("<td></td>").text(districts[i][5]);
    td6.addClass("number-of-officers");

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.click(editPopup);

    table.append(tr);
  }
  // <tr><td colspan="6" class="add-item" onclick=addPopup(this)><i class="fas fa-plus"></i></td>
  let tr = $("<tr></tr>");
  let td = $("<td></td>");
  td.attr("colspan", "6");
  td.addClass("add-item");
  td.click(addPopup);
  td.html("<i class='fas fa-plus'></i>");
  tr.append(td);
  table.append(tr);
}

function editPopup() {
  let title = $(this).parent().parent().find("caption").text().slice(14);

  $("#edit-popup").css("display", "block");
  $("#edit-popup legend").html("<i class='far fa-edit'></i> Chỉnh sửa " + title);

  $("#edit-popup .input-field:first-of-type label").text("ID " + title);
  $("#edit-popup .input-field:first-of-type input").val($(this).find(".id").text());

  $("#edit-popup .input-field:last-of-type label").text("Tên " + title);
  $("#edit-popup .input-field:last-of-type input").val($(this).find(".name").text().slice(5));

  let div = $("<div></div>");
  div.addClass("popup-background");
  div.click(() => {
    div.remove();
    $("#edit-popup").css("display", "none");
  });
  $("body").append(div);
}

function addPopup() {
  let title = $(this).parent().parent().parent().find("caption").text().slice(14);

  $("#add-popup").css("display", "block");
  $("#add-popup legend").html("<i class='fas fa-plus-square'></i> Thêm " + title);
  $("#add-popup .input-field label").text("Tên " + title);

  let div = $("<div></div>");
  div.addClass("popup-background");
  div.click(() => {
    div.remove();
    $("#add-popup").css("display", "none");
  });
  $("body").append(div);
}

async function handleButtonClick(e) {
  if (e.value == "update") {
    const formData = new FormData($("#edit-popup")[0]);
    const editData = Object.fromEntries(formData.entries());
    $.ajax({
      url: '/api/so/updateQuan',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(editData),
      beforeSend: function () {
        $("#loading-bg").show()
      },
      success: function (data) {
        location.reload();
        alert("Cập nhật thành công!");
      },
      error: function (xhr, status, err) {
        $("#loading-bg").hide()
        alert("Cập nhật thất bại!");
        console.log(err);
      }
    })
  } else if (e.value == "delete") {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      const formData = new FormData($("#edit-popup")[0]);
      const deleteData = Object.fromEntries(formData.entries());
      $.ajax({
        url: '/api/so/deleteQuan',
        type: 'DELETE',
        dataType: 'json',
        data: deleteData,
        beforeSend: function () {
          $("#loading-bg").show()
        },
        success: function (data) {
          location.reload();
          alert("Xóa thành công!")
        },
        error: function (xhr, status, err) {
          $("#loading-bg").hide()
          alert("Không thể xóa vì quận đang được sử dụng");
          console.log(err);
        }
      })
    }
  } else if (e.value == "add") {
    const formData = new FormData($("#add-popup")[0]);
    const addData = Object.fromEntries(formData.entries());
    $.ajax({
      url: '/api/so/addQuan',
      type: 'POST', 
      dataType: 'json',
      data: addData,
      beforeSend: function () {
        $("#loading-bg").show()
      },
      success: function (data) {
        location.reload();
        alert("Thêm thành công!");
      },
      error: function (xhr, status, err) {
        $("#loading-bg").hide()
        alert("Thêm thất bại!");
        console.log(err);
      }
    })
  }
}