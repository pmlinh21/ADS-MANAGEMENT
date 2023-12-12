$(document).ready(function(){
    $("#phuong").addClass("snb-li-active");

    let allPhuong;
    $.get("/api/so/getAllPhuongData", function(data){
        allPhuong = data.content.map(item => [item.id_ward, item.ward, item.district, item.SLDDQC, item.SLBQC, item.SLCB]);
        buildWardTable(allPhuong);
    }).fail(function(err){
        console.log(err);
    });

    let selectEdit = $("#edit-popup .input-field:nth-of-type(3) select");
    let selectAdd = $("#add-popup .input-field:last-of-type select");
    let districts;
    $.get("/api/so/getAllQuan", function(data){
        districts = data.content.map(item => [item.id_district, item.district]);
        selectEdit.append("<option value=''>Chọn quận</option>")
        selectAdd.append("<option value=''>Chọn quận</option>")
        for (let i = 0; i < districts.length; i++) {
            let option = $("<option></option>");
            option.val(districts[i][0]);
            option.text(districts[i][1]);
            selectEdit.append(option);
            selectAdd.append(option.clone());
        }
    });
});

function buildWardTable(wards) {
    let table = $("#ward-table table tbody");
    for (let i = 0; i < wards.length; i++) {
        let tr = $("<tr></tr>");

        let td1 = $("<td></td>").text(wards[i][0]);
        td1.addClass("id");
        let td2 = $("<td></td>").text(wards[i][1]);
        td2.addClass("name");
        let td3 = $("<td></td>").text(wards[i][2]);
        td3.addClass("in-district");
        let td4 = $("<td></td>").text(wards[i][3]);
        td4.addClass("number-of-ads-locations");
        let td5 = $("<td></td>").text(wards[i][4]);
        td5.addClass("number-of-ads");
        let td6 = $("<td></td>").text(wards[i][5]);
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
    // <tr><td colspan="6" class="add-item" onclick=addPopup()><i class="fas fa-plus"></i></td>
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
    $("#edit-popup").css("display", "block");
    $("#edit-popup .input-field:nth-of-type(1) input").val($(this).find(".id").text());
    $("#edit-popup .input-field:nth-of-type(2) input").val($(this).find(".name").text());
    $("#edit-popup .input-field:nth-of-type(3) select").val($(this).find(".in-district").text().slice(5));

    let div = $("<div></div>");
    div.addClass("popup-background");
    div.click(() => {
        div.remove();
        $("#edit-popup").css("display", "none");
    });
    $("body").append(div);
}

function addPopup() {
    $("#add-popup").css("display", "block");
    $("#add-popup .input-field:last-of-type select").val("");

    let div = $("<div></div>");
    div.addClass("popup-background");
    div.click(() => {
        div.remove();
        $("#add-popup").css("display", "none");
    });
    $("body").append(div);
}

// Not done
async function handleButtonClick(e) {
    if (e.value == "update") {
        const formData = new FormData($("#edit-popup")[0]);
        const editData = Object.fromEntries(formData.entries());
        alert(JSON.stringify(editData));
        let res = await fetch('/api/so/updatePhuong', {
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
            let res = await fetch('/api/so/deletePhuong', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteData),
            });
            if (res.status == 500) {
                alert("Không thể xóa vì phường đang được sử dụng");
            } else {
                location.reload();
            }
        }
    } else if (e.value == "add") {
        const formData = new FormData($("#add-popup")[0]);
        const addData = Object.fromEntries(formData.entries());
        let res = await fetch('/api/so/addPhuong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addData),
        });
        location.reload();
    }
}