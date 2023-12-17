// document.querySelector("#capphep").classList.add("snb-li-active");

$(document).ready(function(){
    $("#capphep").addClass("snb-li-active");

    let allYCCP;
    $.ajax({
        url: "/api/so/getAllYeuCauCapPhep",
        method: "GET",
        catch: false,
        dataType: "json",
        success: function(data) {
            allYCCP = data.content;
            buildCreateAdsTable(allYCCP);
        },
        error: function(err) {
            console.log(err);
        }
    });
})

function buildCreateAdsTable(data) {
    let table = $("#create-ads-table table tbody");
    table.empty();

    data.forEach(function(item) {
        let tr = $("<tr></tr>");

        tr.append('<td class="id">' + item.id_create + '</td>');
        tr.append('<td class="address">' + item.address + ', P.' + item.address_ward + ', Q.' + item.address_district + '</td>');
        tr.append('<td class="company">' + item.company + '</td>');
        tr.append('<td class="start-date">' + new Date(item.start_date).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');
        tr.append('<td class="end-date">' + new Date(item.end_date).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');
        if (item.ward == null && item.district == null) {
            tr.append('<td class="office">-</td>');
        } else if (item.ward == null && item.district != null) {
            tr.append('<td class="office">Quận ' + item.district + '</td>');
        } else {
            tr.append('<td class="office">Phường ' + item.ward + ', Quận ' + item.district + '</td>');
        }
        if (item.status == false) {
            tr.append('<td class="status">Chưa xử lí</td>');
        } else {
            tr.append('<td class="status">Đã duyệt</td>');
        }

        tr.click(function() {
            // window.location = "/yeucaucapphep/chitiet?id=" + item.id_create;
        });

        table.append(tr);
    });
}