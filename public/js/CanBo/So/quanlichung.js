$(document).ready(function() {
    $("#chung").addClass("snb-li-active");

    var loaiViTri, hinhThucQuangCao, loaiHinhBaoCao, loaiBangQuangCao;
    $.get(`/api/so/getLoaiViTri`, function(data) {
        loaiViTri = data.content.map(type => [type.id_loc_type, type.loc_type])
        buildLocationTypeTable(loaiViTri);
    }).fail(function(error) {
        console.log(error);
    });

    $.get(`/api/so/getHinhThucQuangCao`, function(data) {
        hinhThucQuangCao = data.content.map(type => [type.id_ads_type, type.ads_type])
        buildAdsTypeTable(hinhThucQuangCao);
    }).fail(function(error) {
        console.log(error);
    });

    $.get(`/api/so/getLoaiHinhBaoCao`, function(data) {
        loaiHinhBaoCao = data.content.map(type => [type.id_report_type, type.report_type])
        buildReportTypeTable(loaiHinhBaoCao);
    }).fail(function(error) {
        console.log(error);
    });

    $.get(`/api/so/getLoaiBangQuangCao`, function(data) {
        loaiBangQuangCao = data.content.map(type => [type.id_board_type, type.board_type])
        buildBoardTypeTable(loaiBangQuangCao);
    }).fail(function(error) {
        console.log(error);
    }); 

    
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
    tr.html('<td colspan="2" class="add-item" onclick=addPopup(this)><i class="fas fa-plus"></i></td>')
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
    tr.html('<td colspan="2" class="add-item" onclick=addPopup(this)><i class="fas fa-plus"></i></td>')
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
    tr.html('<td colspan="2" class="add-item" onclick=addPopup(this)><i class="fas fa-plus"></i></td>')
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
    tr.html('<td colspan="2" class="add-item" onclick=addPopup(this)><i class="fas fa-plus"></i></td>')
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
        console.log(res);
        location.reload();
    } else if (e.value == "delete") {
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
            // $.ajax({
            //     url: `/api/so/deleteLoaiViTri`,
            //     type: 'DELETE',
            //     dataType: 'json',
            //     data: JSON.stringify({id: $("#edit-popup .input-field:first-of-type input").val()}),
            //     success: function(response) {
            //       // Request was successful
            //       location.reload();
            //       console.log(response);
            //     },
            //     error: function(xhr, status, error) {
            //       // Request failed
            //       console.log('Error deleting data:', error);
            //     }
            // })
            const formData = new FormData($("#edit-popup")[0]);
            const deleteData = Object.fromEntries(formData.entries());
            let res = await fetch('/api/so/deleteLoaiViTri', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteData),
            });
            // location.reload();
        }
    }
}

function addPopup(e) {
    let title = e.parentElement.parentElement.parentElement.querySelector("caption").textContent.slice(14);
    document.querySelector("#add-popup").style.display = "block";
    document.querySelector("#add-popup legend").innerHTML = "<i class='fas fa-plus-square'></i> Thêm " + title;
    document.querySelector("#add-popup .input-field label").textContent = "Tên " + title;

    let div = document.createElement("div");
    div.className = "popup-background";
    div.addEventListener("click", () => {
        div.remove();
        document.querySelector("#add-popup").style.display = "none";
    });
    document.querySelector("body").appendChild(div);
}