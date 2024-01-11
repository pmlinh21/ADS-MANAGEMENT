var count = 0;
$(document).ready(function () {
  $("#chung").addClass("snb-li-active");
  $("#loading-bg").show()

  // STATISTICS
  var soLuongQuan, soLuongPhuong, soLuongCanBo, soLuongDDQC, soLuongBQC;
  $.ajax({
    url: "/api/so/getSoLuongQuan",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      soLuongQuan = data.content[0].soLuongQuan;
      $("#district-statistic .statistic-number").text(soLuongQuan);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getSoLuongPhuong",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      soLuongPhuong = data.content[0].soLuongPhuong;
      $("#ward-statistic .statistic-number").text(soLuongPhuong);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getSoLuongCanBo",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      soLuongCanBo = data.content[0].soLuongCanBo;
      $("#officer-statistic .statistic-number").text(soLuongCanBo);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getSoLuongDDQC",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      soLuongDDQC = data.content[0].soLuongDDQC;
      $("#location-statistic .statistic-number").text(soLuongDDQC);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getSoLuongBQC",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      soLuongBQC = data.content[0].soLuongBQC
      $("#ad-statistic .statistic-number").text(soLuongBQC);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  // UPLOAD DATA FROM DB TO TABLES
  var loaiViTri, hinhThucQuangCao, loaiHinhBaoCao, loaiBangQuangCao;

  $.ajax({
    url: "/api/so/getLoaiViTri",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      loaiViTri = data.content.map(type => [type.id_loc_type, type.loc_type])
      buildLocationTypeTable(loaiViTri);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getHinhThucQuangCao",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      hinhThucQuangCao = data.content.map(type => [type.id_ads_type, type.ads_type])
      buildAdsTypeTable(hinhThucQuangCao);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getLoaiHinhBaoCao",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      loaiHinhBaoCao = data.content.map(type => [type.id_report_type, type.report_type])
      buildReportTypeTable(loaiHinhBaoCao);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  $.ajax({
    url: "/api/so/getLoaiBangQuangCao",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      count++;
      loaiBangQuangCao = data.content.map(type => [type.id_board_type, type.board_type])
      buildBoardTypeTable(loaiBangQuangCao);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  })

  // $.get(`/api/so/getLoaiViTri`, function (data) {
  //   count++;
  //   loaiViTri = data.content.map(type => [type.id_loc_type, type.loc_type])
  //   buildLocationTypeTable(loaiViTri);
  // }).fail(function (error) {
  //   count++;
  //   console.log(error);
  // });

  // $.get(`/api/so/getHinhThucQuangCao`, function (data) {
  //   count++;
  //   hinhThucQuangCao = data.content.map(type => [type.id_ads_type, type.ads_type])
  //   buildAdsTypeTable(hinhThucQuangCao);
  // }).fail(function (error) {
  //   count++;
  //   console.log(error);
  // });

  // $.get(`/api/so/getLoaiHinhBaoCao`, function (data) {
  //   count++;
  //   loaiHinhBaoCao = data.content.map(type => [type.id_report_type, type.report_type])
  //   buildReportTypeTable(loaiHinhBaoCao);
  // }).fail(function (error) {
  //   count++;
  //   console.log(error);
  // });

  // $.get(`/api/so/getLoaiBangQuangCao`, function (data) {
  //   count++;
  //   loaiBangQuangCao = data.content.map(type => [type.id_board_type, type.board_type])
  //   buildBoardTypeTable(loaiBangQuangCao);
  // }).fail(function (error) {
  //   count++;
  //   console.log(error);
  // });

  // CHECK IF ALL REQUESTS ARE DONE
  let check = setInterval(() => {
    if (count >= 9) {
      $("#loading-bg").hide()
      clearInterval(check);
    }
  }, 500);
})

function buildLocationTypeTable(locationTypes) {
  let table = $("#location-type tbody");
  table.empty();
  for (let i = 0; i < locationTypes.length; i++) {
    let tr = $("<tr></tr>");
    let td1 = $("<td></td>");
    let td2 = $("<td></td>");

    td1.html(locationTypes[i][0]);
    td1.addClass("id");
    td2.html(locationTypes[i][1]);
    td2.addClass("name");
    td2.addClass("left");
    tr.click(editPopup);
    tr.append(td1);
    tr.append(td2);

    table.append(tr);
  }
  let tr = $("<tr></tr>");
  let td = $("<td></td>");
  td.attr("colspan", "2");
  td.addClass("add-item");
  td.click(addPopup);
  td.html('<i class="fas fa-plus"></i>');
  tr.append(td);
  table.append(tr);
}

function buildAdsTypeTable(adsTypes) {
  let table = $("#ads-type tbody");
  table.empty();
  for (let i = 0; i < adsTypes.length; i++) {
    let tr = $("<tr></tr>");
    let td1 = $("<td></td>");
    let td2 = $("<td></td>");

    td1.html(adsTypes[i][0]);
    td1.addClass("id");
    td2.html(adsTypes[i][1]);
    td2.addClass("name");
    td2.addClass("left");
    tr.click(editPopup);
    tr.append(td1);
    tr.append(td2);

    table.append(tr);
  }
  let tr = $("<tr></tr>");
  let td = $("<td></td>");
  td.attr("colspan", "2");
  td.addClass("add-item");
  td.click(addPopup);
  td.html('<i class="fas fa-plus"></i>');
  tr.append(td);
  table.append(tr);
}

function buildReportTypeTable(reportTypes) {
  let table = $("#report-type tbody");
  table.empty();
  for (let i = 0; i < reportTypes.length; i++) {
    let tr = $("<tr></tr>");
    let td1 = $("<td></td>");
    let td2 = $("<td></td>");

    td1.html(reportTypes[i][0]);
    td1.addClass("id");
    td2.html(reportTypes[i][1]);
    td2.addClass("name");
    td2.addClass("left");
    tr.click(editPopup);
    tr.append(td1);
    tr.append(td2);

    table.append(tr);
  }
  let tr = $("<tr></tr>");
  let td = $("<td></td>");
  td.attr("colspan", "2");
  td.addClass("add-item");
  td.click(addPopup);
  td.html('<i class="fas fa-plus"></i>');
  tr.append(td);
  table.append(tr);
}

function buildBoardTypeTable(boardTypes) {
  let table = $("#board-type tbody");
  table.empty();
  for (let i = 0; i < boardTypes.length; i++) {
    let tr = $("<tr></tr>");
    let td1 = $("<td></td>");
    let td2 = $("<td></td>");

    td1.html(boardTypes[i][0]);
    td1.addClass("id");
    td2.html(boardTypes[i][1]);
    td2.addClass("name");
    td2.addClass("left");
    tr.click(editPopup);
    tr.append(td1);
    tr.append(td2);

    table.append(tr);
  }
  let tr = $("<tr></tr>");
  let td = $("<td></td>");
  td.attr("colspan", "2");
  td.addClass("add-item");
  td.click(addPopup);
  td.html('<i class="fas fa-plus"></i>');
  tr.append(td);
  table.append(tr);
}

function editPopup() {
  let idTable = $(this).parent().parent().parent().attr("id");
  let title = $(this).parent().parent().find("caption").text().slice(14);

  $("#edit-popup").css("display", "block");
  $("#edit-popup legend").html("<i class='far fa-edit'></i> Chỉnh sửa " + title);

  $("#edit-popup .input-field:first-of-type label").text("ID " + title);
  $("#edit-popup .input-field:first-of-type input").val($(this).find(".id").text());

  $("#edit-popup .input-field:last-of-type label").text("Tên " + title);
  $("#edit-popup .input-field:last-of-type input").val($(this).find(".name").text());
  $("button[value='update']").addClass(idTable);
  $("button[value='delete']").addClass(idTable);

  let div = $("<div></div>");
  div.addClass("popup-background");
  div.click(() => {
    div.remove();
    $("#edit-popup").css("display", "none");
  });
  $("body").append(div);
}

function addPopup() {
  let idTable = $(this).parent().parent().parent().parent().attr("id");
  let title = $(this).parent().parent().parent().find("caption").text().slice(14);

  $("#add-popup").css("display", "block");
  $("#add-popup legend").html("<i class='fas fa-plus-square'></i> Thêm " + title);
  $("#add-popup .input-field label").text("Tên " + title);
  $("button[value='add']").addClass(idTable);

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
    let target;
    if (e.classList.contains("location-type")) {
      target = "LoaiViTri";
    } else if (e.classList.contains("ads-type")) {
      target = "HinhThucQuangCao";
    } else if (e.classList.contains("report-type")) {
      target = "LoaiHinhBaoCao";
    } else {
      target = "LoaiBangQuangCao";
    }
    let res = await fetch('/api/so/update' + target, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData),
    });
    location.reload();
  } else if (e.value == "delete") {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      const formData = new FormData($("#edit-popup")[0]);
      const deleteData = Object.fromEntries(formData.entries());
      let target;
      let formTitle = $("#edit-popup legend").text().slice(11);
      if (e.classList.contains("location-type")) {
        target = "LoaiViTri";
      } else if (e.classList.contains("ads-type")) {
        target = "HinhThucQuangCao";
      } else if (e.classList.contains("report-type")) {
        target = "LoaiHinhBaoCao";
      } else {
        target = "LoaiBangQuangCao";
      }
      let res = await fetch('/api/so/delete' + target, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData),
      });
      if (res.status == 500) {
        alert("Không thể xóa vì có quảng cáo đang sử dụng " + formTitle.toLowerCase() + " này");
      } else {
        location.reload();
      }
    }
  } else if (e.value == "add") {
    const formData = new FormData($("#add-popup")[0]);
    const addData = Object.fromEntries(formData.entries());
    let target;
    if (e.classList.contains("location-type")) {
      target = "LoaiViTri";
    } else if (e.classList.contains("ads-type")) {
      target = "HinhThucQuangCao";
    } else if (e.classList.contains("report-type")) {
      target = "LoaiHinhBaoCao";
    } else {
      target = "LoaiBangQuangCao";
    }
    let res = await fetch('/api/so/add' + target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addData),
    });
    location.reload();
  }
}