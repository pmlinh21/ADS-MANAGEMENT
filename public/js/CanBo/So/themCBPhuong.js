$(document).ready(function(){
    $("#canbo").addClass("snb-li-active");

    let selectDistrict = $("#add-ward-officer #id-district");
    selectDistrict.append("<option value=''>Chọn quận</option>")
    let districts;
    $.get("/api/so/getAllQuan", function(data){
        districts = data.content.map(item => [item.id_district, item.district]);
        
        for (let i = 0; i < districts.length; i++) {
            let option = $("<option></option>");
            option.val(districts[i][0]);
            option.text("Quận " + districts[i][1]);
            selectDistrict.append(option);
        }
    });
    buildSelectWard("");
    selectDistrict.change(function() {
        let id_district = $(this).val();
        buildSelectWard(id_district);
    });
});

function buildSelectWard(id_district) {
    if (id_district == "") {
        let selectWard = $("#add-ward-officer #id-ward");
        // remove all options of selectWard
        selectWard.find("option").remove();
        selectWard.append("<option value=''>Chọn phường</option>");
        return;
    }

    let wards;
    $.get("/api/so/getAllPhuongByIdQuan/" + id_district , function(data){
        wards = data.content.map(item => [item.id_ward, item.ward]);
        let selectWard = $("#add-ward-officer #id-ward");
        // remove all options of selectWard
        selectWard.find("option").remove();
        selectWard.append("<option value=''>Chọn phường</option>");
        
        for (let i = 0; i < wards.length; i++) {
            let option = $("<option></option>");
            option.val(wards[i][0]);
            option.text("Phường " + wards[i][1]);
            selectWard.append(option);
        }   
    }).fail(function(err){
        console.log(err);
    });
}

async function handleButtonClick(e) {
    if (e.value == "add") {
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