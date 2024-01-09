var count = 0;
$(document).ready(function () {
  $("#chinhsua").addClass("snb-li-active");
  $("#loading-bg").show()

  let allYeuCauChinhSuaDDQC;
  $.ajax({
    url: "/api/so/getAllYeuCauChinhSuaDDQC",
    method: "GET",
    catch: false,
    dataType: "json",
    success: function (data) {
      count++;
      allYeuCauChinhSuaDDQC = data.content;
      buildUpdateAdsLocationTable(allYeuCauChinhSuaDDQC);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  });

  let allYeuCauChinhSuaBQC;
  $.ajax({
    url: "/api/so/getAllYeuCauChinhSuaBQC",
    method: "GET",
    catch: false,
    dataType: "json",
    success: function (data) {
      count++;
      allYeuCauChinhSuaBQC = data.content;
      buildUpdateAdsTable(allYeuCauChinhSuaBQC);
    },
    error: function (err) {
      count++;
      console.log(err);
    }
  });

  let interval = setInterval(function () {
    if (count >= 2) {
      $("#loading-bg").hide();
      clearInterval(interval);
    }
  }, 200);
})

function buildUpdateAdsLocationTable(data) {
  let table = $("#update-ads-location-table table tbody");
  table.empty();

  data.forEach(function (item) {
    let tr = $("<tr></tr>");

    tr.append('<td class="id">' + item.id_req + '</td>');
    tr.append('<td class="id-ads-location">' + item.id_ads_location + '</td>');
    tr.append('<td class="address">' + item.address + ', P.' + item.address_ward + ', Q.' + item.address_district + '</td>');
    tr.append('<td class="req-time">' + new Date(item.req_time).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');

    if (item.ward == null && item.district == null) {
      tr.append('<td class="office">-</td>');
    } else if (item.ward == null && item.district != null) {
      tr.append('<td class="office">Quận ' + item.district + '</td>');
    } else {
      tr.append('<td class="office">Phường ' + item.ward + ', Quận ' + item.district + '</td>');
    }
    if (item.status == false) {
      tr.append('<td class="status" style="color: indianred;">Chưa xử lí</td>');
    } else {
      tr.append('<td class="status">Đã xử lí</td>');
    }

    tr.click(function () {
      window.location = "/yeucauchinhsua/ddqc?id=" + item.id_req;
    });

    table.append(tr);
  });
}

function buildUpdateAdsTable(data) {
  let table = $("#update-ads-table table tbody");
  table.empty();

  data.forEach(function (item) {
    let tr = $("<tr></tr>");

    tr.append('<td class="id">' + item.id_req + '</td>');
    tr.append('<td class="id-ads">' + item.id_ads + '</td>');
    tr.append('<td class="address">' + item.address + ', P.' + item.address_ward + ', Q.' + item.address_district + '</td>');
    tr.append('<td class="req-time">' + new Date(item.req_time).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');

    if (item.ward == null && item.district == null) {
      tr.append('<td class="office">-</td>');
    } else if (item.ward == null && item.district != null) {
      tr.append('<td class="office">Quận ' + item.district + '</td>');
    } else {
      tr.append('<td class="office">Phường ' + item.ward + ', Quận ' + item.district + '</td>');
    }
    if (item.status == false) {
      tr.append('<td class="status" style="color: indianred;">Chưa xử lí</td>');
    } else {
      tr.append('<td class="status">Đã xử lí</td>');
    }

    tr.click(function () {
      window.location = "/yeucauchinhsua/bqc?id=" + item.id_req;
    });

    table.append(tr);
  });
}