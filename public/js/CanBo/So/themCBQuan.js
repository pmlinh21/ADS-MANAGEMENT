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
    var allEmail;
    $.get("/api/so/getAllCanboEmail", function(data){
        allEmail = data.content.map(item => item.email);
    });
});

async function handleButtonClick(e) {
    if (e.value == "add") {
        const formData = new FormData($("#add-district-officer")[0]);
        const addData = Object.fromEntries(formData.entries());

        if (allEmail.includes(formData.get("email"))) {
            alert("Không thể thêm vì email cán bộ đã tồn tại");
            return;
        }

        $.ajax({
            url: '/api/so/addCanboQuan',
            type: 'PUT',
            data: addData,
            contentType: 'application/json',
            
            success: function(res) {
                window.location.href = "/quanlicanbo";
                console.log("Thêm thành công");
            },
            error: function(xhr, status, err) {
                alert("Thêm cán bộ thất bại");
                console.log(err);
            }
        });

        // let res = await fetch('/api/so/addCanboQuan', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(addData),
        // }).then(function(res){
        //     if (!res.ok) {
        //         alert("Không thể thêm vì quận đã có cán bộ");
        //     } else {
        //         window.location.href = "/quanlicanbo";
        //     }
        // });
        // if (formData.get("email") == "" || formData.get("fullname") == "" || formData.get("birthdate") == "" || formData.get("phone") == "" || formData.get("id_district") == "") {
        //     return;
        // } else {
            // let res = await fetch('/api/so/getAllCanboEmail', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            // }).then(function(res){
            //     alert("4")
            //     alert(res.content[0].email);
            //     if (formData.get("email") == res.content[0].email) {
            //         alert("Không thể thêm vì email cán bộ đã tồn tại");
            //         return;
            //     } else {
            //         const addData = Object.fromEntries(formData.entries());
            //         let res = fetch('/api/so/addCanboQuan', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(addData),
            //         }).then(function(res){
            //             alert("Thêm thành công");
            //             window.location.href = "/quanlicanbo";
            //         });
            //     }
            // })
    }
}