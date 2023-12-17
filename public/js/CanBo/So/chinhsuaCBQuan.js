$(document).ready(function(){
    $("#canbo").addClass("snb-li-active");

    let select = $("#edit-district-officer #id-district");
    let districts;
    $.get("/api/so/getAllQuan", function(data){
        districts = data.content.map(item => [item.id_district, item.district]);
        select.append("<option value=''>Chọn quận</option>")
        
        for (let i = 0; i < districts.length; i++) {
            let option = $("<option></option>");
            option.val(districts[i][0]);
            option.text("Quận " + districts[i][1]);
            select.append(option);
        }

        let canboQuan;
        let email = $("#edit-district-officer input[name='email']").val();
        $.get("/api/so/getCanboQuanByEmail/" + email, function(data){
            canboQuan = data.content[0];
            buildForm(canboQuan);
        }).fail(function(err){
            console.log(err);
        });
    });  
});

function buildForm(canboQuan) {
    let form = $("#edit-district-officer");
    form.find("input[name='fullname']").val(canboQuan.fullname);
    form.find("input[name='birthdate']").val(canboQuan.birthdate);
    form.find("input[name='phone']").val(canboQuan.phone);
    form.find("select[name='id_district']").val(canboQuan.id_district);
}

async function handleButtonClick(e) {
    if (e.value == "update") {
        const formData = new FormData($("#edit-district-officer")[0]);
        const editData = Object.fromEntries(formData.entries());
        let res = await fetch('/api/so/updateCanboQuan', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData),
        }).then(function(res){
            window.location.href = "/quanlicanbo";
        });
    } else if (e.value == "delete") {
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
            const formData = new FormData($("#edit-district-officer")[0]);
            const deleteData = Object.fromEntries(formData.entries());
            let res = await fetch('/api/so/deleteCanboQuan', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteData),
            }).then(function(res){
                if (res.status == 500) {
                    alert("Không thể xóa vì quận đang được sử dụng");
                } else {
                    window.location.href = "/quanlicanbo";
                }
            });
        }
    }
}