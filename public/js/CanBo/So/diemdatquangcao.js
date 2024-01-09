$(document).ready(function(){
    $("#diemdat").addClass("snb-li-active");

    let allDiemDatQuangCao
    $.ajax({
        url: "/api/so/getAllDiemDatQuangCao",
        method: "GET",
        catch: false,
        dataType: "json",
        success: function(data) {
            allDiemDatQuangCao = data.content;
            buildAdsLocationsTable(allDiemDatQuangCao);
        },
        error: function(err) {
            console.log(err);
        }
    });
})

function buildAdsLocationsTable(data) {
    let table = $("#ads-location-table table tbody");
    table.empty();

    data.forEach(function(item) {
        let tr = $("<tr></tr>");

        tr.append('<td class="id">' + item.id_ads_location + '</td>');
        tr.append('<td class="address">' + item.address + '</td>');
        tr.append('<td class="ward">' + item.ward + '</td>');
        tr.append('<td class="district">' + item.district + '</td>');
        tr.append('<td class="location-type">' + item.loc_type + '</td>');
        tr.append('<td class="ads-type">' + item.ads_type + '</td>');
        if (item.is_zoning == false) {
            tr.append('<td class="zoning">Chưa quy hoạch</td>');
        } else {
            tr.append('<td class="zoning">Đã quy hoạch</td>');
        }

        tr.click(function() {
            window.location = "/diemdatquangcao/chinhsua?id=" + item.id_ads_location;
        });

        table.append(tr);
    });
    // <tr><td colspan="7" class="add-item"><a href="/diemdatquangcao/them"><i class="fas fa-plus"></i></a></td>

    let tr = $("<tr></tr>");
    tr.append('<td colspan="7" class="add-item"><a href="/diemdatquangcao/them"><i class="fas fa-plus"></i></a></td>');
    table.append(tr);
}