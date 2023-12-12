$(document).ready(function(){
    $("#canbo").addClass("snb-li-active");

    let allCanboQuan;
    $.get("/api/so/getAllCanboQuan", function(data){
        allCanboQuan = data.content.map(item => [item.fullname, item.birthdate, item.email, item.phone, item.district]);
        buildDistrictOfficerTable(allCanboQuan);
    }).fail(function(err){
        console.log(err);
    });

    let allCanboPhuong;
    $.get("/api/so/getAllCanboPhuong", function(data){
        allCanboPhuong = data.content.map(item => [item.fullname, item.birthdate, item.email, item.phone, item.ward, item.district]);
        buildWardOfficerTable(allCanboPhuong);
    }).fail(function(err){
        console.log(err);
    });
});

function buildDistrictOfficerTable(officers) {
    let table = $("#district-officer-table table tbody");
    for (let i = 0; i < officers.length; i++) {
        let tr = $("<tr></tr>");
        let td1 = $("<td></td>").text(i + 1);
        td1.addClass("id");
        let td2 = $("<td></td>").text(officers[i][0]);
        td2.addClass("name");
        let td3 = $("<td></td>").text(officers[i][1]);
        td3.addClass("birthday");
        let td4 = $("<td></td>").text(officers[i][2]);
        td4.addClass("email");
        let td5 = $("<td></td>").text(officers[i][3]);
        td5.addClass("phone-number");
        let td6 = $("<td></td>").text(officers[i][4]);
        td6.addClass("belong-to-district");
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);

        tr.click(function() {
            window.location = "/quanlicanbo/chinhsuacbquan?email=" + officers[i][2];
        });

        table.append(tr);
    }
    
    // <tr><td colspan="6" class="add-item"><a href="/quanlicanbo/themcbquan"><i class="fas fa-plus"></i></a></td></tr>
    let tr = $("<tr></tr>");
    let td = $("<td></td>");
    td.attr("colspan", "6");
    td.addClass("add-item");
    td.html("<a href='/quanlicanbo/themcbquan'><i class='fas fa-plus'></i></a>");
    tr.append(td);
    table.append(tr);
}

function buildWardOfficerTable(officers) {
    let table = $("#ward-officer-table table tbody");
    for (let i = 0; i < officers.length; i++) {
        let tr = $("<tr></tr>");
        let td1 = $("<td></td>").text(i + 1);
        td1.addClass("id");
        let td2 = $("<td></td>").text(officers[i][0]);
        td2.addClass("name");
        let td3 = $("<td></td>").text(officers[i][1]);
        td3.addClass("birthday");
        let td4 = $("<td></td>").text(officers[i][2]);
        td4.addClass("email");
        let td5 = $("<td></td>").text(officers[i][3]);
        td5.addClass("phone-number");
        let td6 = $("<td></td>").text(officers[i][4]);
        td6.addClass("belong-to-ward");
        let td7 = $("<td></td>").text(officers[i][5]);
        td7.addClass("belong-to-district");
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);
        tr.append(td7);

        tr.click(function() {
            window.location = "/quanlicanbo/chinhsuacbphuong?email=" + officers[i][2];
        });

        table.append(tr);
    }
    let tr = $("<tr></tr>");
    let td = $("<td></td>");
    td.attr("colspan", "7");
    td.addClass("add-item");
    td.html("<a href='/quanlicanbo/themcbphuong'><i class='fas fa-plus'></i></a>");
    tr.append(td);
    table.append(tr);
}