$(document).ready(function(){
    $("#canbo").addClass("snb-li-active");

    let select = $("#add-district-officer #id-district");
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
    });  
});

// chua xong
async function handleButtonClick(e) {
    if (e.value == "add") {
        const formData = new FormData($("#add-district-officer")[0]);
        if (formData.get("email") == "" || formData.get("fullname") == "" || formData.get("birthdate") == "" || formData.get("phone") == "" || formData.get("id_district") == "") {
            return;
        } else {
            let res = await fetch('/api/so/getAllCanboEmail', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(function(res){
                alert(res.content[0].email);
                if (formData.get("email") == res.content[0].email) {
                    alert("Không thể thêm vì email cán bộ đã tồn tại");
                    return;
                } else {
                    const addData = Object.fromEntries(formData.entries());
                    let res = fetch('/api/so/addCanboQuan', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(addData),
                    }).then(function(res){
                        alert("Thêm thành công");
                        window.location.href = "/quanlicanbo";
                    });
                }
            })
        }
    }
}