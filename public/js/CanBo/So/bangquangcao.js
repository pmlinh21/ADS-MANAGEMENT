// document.querySelector("#bang").classList.add("snb-li-active");

$(document).ready(function () {
  $("#bang").addClass("snb-li-active");

  let allBangQuangCao;
  $.ajax({
    url: "/api/so/getAllBangQuangCao",
    method: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      $("#loading-bg").hide()
      allBangQuangCao = data.content;
      buildAdsTable(allBangQuangCao);
    },
    error: function (err) {
      $("#loading-bg").hide()
      console.log(err);
    }
  });
})

function buildAdsTable(data) {
  let table = $("#ads-table table tbody");
  table.empty();

  data.forEach(function (item) {
    let tr = $("<tr></tr>");

    tr.append('<td class="id">' + item.id_ads + '</td>');
    tr.append('<td class="id-ads-location">' + item.id_ads_location + '</td>');
    tr.append('<td class="address">' + item.address + '</td>');
    tr.append('<td class="ward">' + item.ward + '</td>');
    tr.append('<td class="district">' + item.district + '</td>');
    tr.append('<td class="board-type">' + item.board_type + '</td>');
    tr.append('<td class="expired-date">' + new Date(item.expired_date).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');

    tr.click(function () {
      window.location = "/bangquangcao/chinhsua?id=" + item.id_ads;
    });

    table.append(tr);
  });

}