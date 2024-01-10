var flag = false
let ads_report
let NguoiDanAdsLoc
localStorage.setItem("email", JSON.stringify("iot.nhom.5@gmail.com"))

function renderAddressResult(res) {
    var template = ` 
        <% for (var i = 0; i < res.length; i++) { %>
            <div class = "result-<%=i%>">
              <hr>  
              <p><%=res[i].title%></p>
            </div>
        <% } %>`
    var rendered = ejs.render(template, { res: res });
    $(".resultapi-address").html(rendered);
}

// DATETIME (SQL) -> dd/mm/yyyy
function validateSQLDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

// new Date -> dd/mm/yyyy hh:mm:ss
function validateDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


function address2wardid(wardString, districtString) {
    if (districtString == "Quận 1") {
        if (wardString == "Phường Bến Nghé") return 1;
        else if (wardString == "Phường Bến Thành") return 2;
        else if (wardString == "Phường Cầu Kho") return 3;
        else if (wardString == "Phường Cầu Ông Lãnh") return 4;
        else if (wardString == "Phường Cô Giang") return 5;
        else if (wardString == "Phường Đa Kao") return 6;
        else if (wardString == "Phường Nguyễn Cư Trinh") return 7;
        else if (wardString == "Phường Nguyễn Thái Bình") return 8;
        else if (wardString == "Phường Phạm Ngũ Lão") return 9;
        else if (wardString == "Phường Tân Định") return 10;
    } else if (districtString == "Quận 2") {
        if (wardString == "Phường An Khánh") return 11;
        else if (wardString == "Phường An Lợi Đông") return 12;
        else if (wardString == "Phường An Phú") return 13;
        else if (wardString == "Phường Bình An") return 14;
        else if (wardString == "Phường Bình Khánh") return 15;
        else if (wardString == "Phường Cát Lái") return 16;
        else if (wardString == "Phường Thạnh Mỹ Lợi") return 17;
        else if (wardString == "Phường Thảo Điền") return 18;
        else if (wardString == "Phường Thủ Thiêm") return 19;
        else if (wardString == "Phường Bình Trưng Đông") return 20;
    } else if (districtString == "Quận 3") {
        if (wardString == "1") return 21;
        else if (wardString == "Phường 2") return 22;
        else if (wardString == "Phường 3") return 23;
        else if (wardString == "Phường 4") return 24;
        else if (wardString == "Phường 5") return 25;
        else if (wardString == "Phường 9") return 26;
        else if (wardString == "Phường 10") return 27;
        else if (wardString == "Phường 11") return 28;
        else if (wardString == "Phường 12") return 29;
        else if (wardString == "Phường 13") return 30;
        else if (wardString == "Phường 14") return 31;
        else if (wardString == "Phường Võ Thị Sáu") return 32;
    } else if (districtString == "Quận 4") {
        if (wardString == "Phường 1") return 33;
        else if (wardString == "Phường 2") return 34;
        else if (wardString == "Phường 3") return 35;
        else if (wardString == "Phường 4") return 36;
        else if (wardString == "Phường 6") return 37;
        else if (wardString == "Phường 8") return 38;
        else if (wardString == "Phường 9") return 39;
        else if (wardString == "Phường 10") return 40;
        else if (wardString == "Phường 13") return 41;
        else if (wardString == "Phường 14") return 42;
        else if (wardString == "Phường 15") return 43;
        else if (wardString == "Phường 16") return 44;
        else if (wardString == "Phường 18") return 45;
    }
}

function idReportType2String(id_report_type) {
    if (id_report_type == 1)
        return "Tố cáo sai phạm"
    else if (id_report_type == 2)
        return "Đăng kí nội dung"
    else if (id_report_type == 3)
        return "Đóng góp ý kiến"
    else if (id_report_type == 4)
        return "Giải đáp thắc mắc"
}

async function imageValidate(e) {
    if (e.target.files[0]) {
        if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
            return true
        }
        else if (!e.target.files[0].type.startsWith('image/')) {
            alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
            return false
        }
        else if (!(e.target.files[0].size / 1024 <= 4)) {
            alert('Hình ảnh minh họa không được vượt quá 4MB')
            return false
        }
    }
}

async function uploadImage(file) {
    if (!file) return null
    const signResponse = await fetch('https://adsmap-officer.onrender.com/api/basic/uploadImage')
    const signData = await signResponse.json()
    const cloudinaryData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    cloudinaryData.append("file", file);
    cloudinaryData.append("api_key", signData.apikey);
    cloudinaryData.append("timestamp", signData.timestamp);
    cloudinaryData.append("signature", signData.signature);
    cloudinaryData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
    cloudinaryData.append("folder", "image");
    try {
        const res = await fetch(url, {
            method: "POST",
            body: cloudinaryData
        });
        const data = await res.json();
        return data.eager[0].secure_url
    } catch (err) {
        console.log(err)
    }
}

function red(item) {
    var check = false
    if (item[11]) {
        for (let i = 0; i < item[11].length; i++)
            if (item[11][i].list_report)
                item[11][i].list_report.forEach(report => {
                    if (!report.status)
                        check = true
                })
    }
    if (item[12])
        for (let i = 0; i < item[12].length; i++)
            if (!item[12][i].status)
                return true

    return check
}

// hiển thị danh sách report
function renderReport(list_report, container, user_email) {
    const note = list_report?.map(item => {
        return {
            is_user: (item[1] == user_email) ? "mine" : "other",
            statusClass: item.status ? "resolved" : "unresolved",
            statusText: item.status ? "Đã xử lí" : "Chưa xử lí",
            report_type: idReportType2String(item.id_report_type),
            imagePath1: item.photo1,
            imagePath2: item.photo2,
        }
    })
    // console.log(note)
    // list_report.forEach((item, index) => console.log(item, note[index]))
    if (!list_report || list_report.length == 0) {
        var template = `
        <p class = "text-center"> (Chưa có báo cáo) </p>
        `;
    } else {
        var template = `
  <% for (var i = 0; i < list_report?.length; i++) { %>
    <div class="<%=note[i].is_user%>-report row" >
      <div class="col-md-12">
        <%- list_report[i].content %>
      </div>
      <div class="col-md-12 view-image">
      <% if (note[i].imagePath1) { %>
        <img class="col-md-6 image1" src="<%= note[i].imagePath1 %>">
      <% } %>
      <% if (note[i].imagePath2) { %>
        <img class="col-md-6 image2" src="<%= note[i].imagePath2 %>">
      <% } %>
      </div>
      <div class="col-md-12 ">
          <div class = <%= note[i].statusClass %> >
            <%= note[i].statusText %>
          </div>
          <div class = "report-type">
            <%= note[i].report_type %>
          </div>
      </div>
    </div>
  <% } %>
  `;
    }
    var rendered = ejs.render(template, { list_report, email, note });
    $(container).html(rendered);
}

// hiển thị danh sách các bảng quảng cáo
function renderAds({ list_ads, ads_type, loc_type, address, ward, district }) {
    list_ads = JSON.parse(list_ads)
    var template = `
  <i class="fa-solid fa-circle-info" style="color: #05ACF4; margin-bottom:1rem"></i> 
  Thông tin bảng quảng cáo

  <% for (var i = 0; i < list_ads?.length; i++) { %>
      <div id="data-<%= list_ads[i].id_ads %>">
          <p style="width: 90%;font-size: 1rem; margin-bottom: 0.3rem"><strong><%= list_ads[i].board_type %></strong></p>
          <p style="font-size: 0.7rem; color: gray; margin-bottom: 0.3rem"><%= address %>, phường <%= ward %>, <%= district %></p>
          <p> Kích thước:  <strong><%= list_ads[i].width %>m x <%= list_ads[i].height %>m</strong></p>
          <p> Số lượng:  <strong><%= list_ads[i].quantity %> trụ / bảng</strong></p>
          <p> Hình thức:  <strong><%= ads_type %></strong></p>
          <p> Phân loại:  <strong><%= loc_type %></strong></p>

          <div class="detail-button data-<%= list_ads[i].id_ads %>" data-target="#detail-popup" data-toggle="modal">
            <i class="fa-solid fa-circle-info"></i>
          </div>

          <div class = "button-group ads-<%= list_ads[i].id_ads %>">
                <button data-target="#report-popup" data-toggle="modal" class="btn style3-button report-button">
                  <i class="fa-solid fa-flag"></i> Báo cáo
                </button>
                <button data-target="#other-report-popup" data-toggle="modal" class="btn style1-button other-report-button">
                  <i class="fa-solid fa-eye"></i> Xem báo cáo
                </button>
          </div>
      </div>
  <% } %>
  `;
    var rendered = ejs.render(template, { list_ads, ads_type, address, loc_type, ward, district });
    $(".adInfo").html(rendered);
}

// hiển thị sidebar và bắt sự kiện trên sidebar
function showSidebar(adsloc) {
    $(".flex-container.toggle").hide()
    $('#sidebar').show()
    renderAds(adsloc)
    flag = true;

    $(".locInfo .address").text(`${adsloc.address}, phường ${adsloc.ward}, quận ${adsloc.district}`)

    // Chi tiết bảng quảng cáo
    $("#sidebar .detail-button").on("click", function () {
        let str_id_ads = $(this).attr("class").split(" ")[1];
        let id_ads = parseInt(str_id_ads.split("-")[1])

        const list_ads = JSON.parse(adsloc.list_ads)
        ads = list_ads?.filter(item => item.id_ads == id_ads)[0]

        let imagePath = (!ads.photo ? `./image/image-placeholder.jpg` : `${ads.photo}`)
        $("#detail-popup .image img").attr("src", imagePath)
        $("#detail-popup .expired-date").text("Ngày hết hạn hợp đồng: " + validateSQLDate(ads.expired_date))
    })

    $("#sidebar .adInfo .report-button").on("click", function () {
        let str_id_ads = $(this).closest(".button-group").attr("class").split(" ")[1];
        let id_ads = parseInt(str_id_ads.split("-")[1])
        let imageData1 = null, imageData2 = null

        $('#image1').on('change', async function (e) {
            imageValidate(e)
            imageData1 = e.target.files[0];
        });

        $('#image2').on('change', async function (e) {
            imageValidate(e)
            imageData2 = e.target.files[0];
        });

        $('#report-popup .style3-button').on("click", function () {
            $('#report-popup form').get(0).reset()
            $("#report-popup").modal("hide")
        })

        $('#report-popup .style1-button').off('click').on("click", async function (e) {
            e.preventDefault()
            if ($("#name").val() == "")
                alert("Trường 'Họ tên người báo cáo' bắt buộc")
            else if ($("#email").val() == "")
                alert("Trường 'Email' bắt buộc")
            else if ($("#phone").val() == "")
                alert("Trường 'Số điện thoại' bắt buộc")
            else if (tinymce.get("content").getContent() == "")
                alert("Trường 'Nội dung báo cáo' bắt buộc")
            else {
                let reportObject = {
                    id_report: null, // You may need to generate a unique ID
                    officer: null, // You may need to handle this differently
                    office: null, // You may need to handle this differently
                    id_ads: id_ads, // You may need to handle this differently
                    id_report_type: parseInt($("#reportType").val()),
                    fullname: $("#name").val(),
                    email: $("#email").val(),
                    phone: $("#phone").val(),
                    content: tinymce.get("content").getContent(),
                    photo1: await uploadImage(imageData1),
                    photo2: await uploadImage(imageData2),
                    report_time: validateDate(new Date()),
                    status: false, // You may need to handle this differently
                    resolve: null, // You may need to handle this differently
                    report_type: idReportType2String(parseInt($("#reportType").val())), // You may need to handle this differently
                };

                // check Captcha
                grecaptcha.execute('6LeUpUopAAAAANmK2yer45ZpRkLJ0fnsfASyluXw', { action: 'homepage' }).then(async function (token) {
                    const captcha = token;
                    fetch('https://adsmap-officer.onrender.com/api/nguoidan/verifyCaptcha', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*', // Tells server that this is JSON encoded data
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ captcha: captcha })
                    }).then((res) => res.json()).then((data) => {
                        if (data.success) {
                            const existingReportsJSON = localStorage.getItem("ads_report");
                            const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
                            existingReports.push(reportObject);
                            localStorage.setItem("ads_report", JSON.stringify(existingReports));

                            // Send data to the server using AJAX
                            $.ajax({
                                type: "POST",
                                url: "https://adsmap-officer.onrender.com/api/nguoidan/createAdsReport",
                                data: JSON.stringify(reportObject),
                                success: function (response) {
                                    // Handle success
                                    alert("Report Successful")
                                    // Optional: Show a success message to the user
                                },
                                error: function (error) {
                                    // Handle error
                                    alert(JSON.stringify(error) + "createError");
                                    // Optional: Show an error message to the user
                                },
                            });
                        } else {
                            alert("Captcha không hợp lệ")
                        }
                    })
                })

                $('#report-popup form').get(0).reset()
                $("#report-popup").modal("hide")
            }
        })
    })

    $("#sidebar .locInfo .report-button").on("click", function () {
        console.log(adsloc)
        let imageData3 = null, imageData4 = null

        $('#image1').on('change', async function (e) {
            imageValidate(e)
            imageData3 = e.target.files[0];
        });

        $('#image2').on('change', async function (e) {
            imageValidate(e)
            imageData4 = e.target.files[0];
        });
        $('#report-popup .style3-button').on("click", function () {
            $("#report-popup").modal("hide")
            $('#report-popup form').get(0).reset()
        })

        $('#report-popup .style1-button').off('click').on("click", async function (e) {
            e.preventDefault()
            if ($("#name").val() == "")
                alert("Trường 'Họ tên người báo cáo' bắt buộc")
            else if ($("#email").val() == "")
                alert("Trường 'Email' bắt buộc")
            else if ($("#phone").val() == "")
                alert("Trường 'Số điện thoại' bắt buộc")
            else if ($("#reportContent").val() == "")
                alert("Trường 'Nội dung báo cáo' bắt buộc")
            else {
                if (adsloc.id_ads_location) {
                    console.log("creating adsloc report")
                    reportObject = {
                        id_report: null, // You may need to generate a unique ID
                        officer: null, // You may need to handle this differently
                        office: null, // You may need to handle this differently
                        id_ads_location: adsloc.id_ads_location, // You may need to handle this differently
                        id_report_type: parseInt($("#reportType").val()),
                        fullname: $("#name").val(),
                        email: $("#email").val(),
                        phone: $("#phone").val(),
                        // content: tinymce.$("#reportContent").getContent(),
                        content: tinymce.get("content").getContent(),
                        photo1: await uploadImage(imageData3),
                        photo2: await uploadImage(imageData4),
                        report_time: validateDate(new Date()),
                        status: false, // You may need to handle this differently
                        resolve: null, // You may need to handle this differently
                        report_type: idReportType2String(parseInt($("#reportType").val())), // You may need to handle this differently
                    };

                    grecaptcha.execute('6LeUpUopAAAAANmK2yer45ZpRkLJ0fnsfASyluXw', { action: 'homepage' }).then(async function (token) {
                        const captcha = token;
                        fetch('https://adsmap-officer.onrender.com/api/nguoidan/verifyCaptcha', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*', // Tells server that this is JSON encoded data
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ captcha: captcha })
                        }).then((res) => res.json()).then((data) => {
                            if (data.success) {
                                const existingReportsJSON = localStorage.getItem("ads_loc_report");
                                const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
                                existingReports.push(reportObject);
                                // console.log(JSON.stringify(reportObject))
                                localStorage.setItem("ads_loc_report", JSON.stringify(existingReports));

                                console.log(JSON.stringify(reportObject))
                                // Send data to the server using AJAX
                                $.ajax({
                                    type: "POST",
                                    url: "https://adsmap-officer.onrender.com/api/nguoidan/createAdsLocReport",
                                    data: JSON.stringify(reportObject),
                                    success: function (response) {
                                        // Handle success
                                        alert("Report Successful")
                                        // Optional: Show a success message to the user
                                    },
                                    error: function (error) {
                                        // Handle error
                                        alert(JSON.stringify(error) + "createError");
                                        // Optional: Show an error message to the user
                                    },
                                });
                            } else {
                                alert("Captcha không hợp lệ")
                            }
                        })
                    })

                } else {
                    reportObject = {
                        id_report: null, // You may need to generate a unique ID
                        officer: null, // You may need to handle this differently
                        office: null, // You may need to handle this differently
                        longitude: adsloc.longitude,
                        latitude: adsloc.latitude,
                        address: adsloc.address,
                        ward: adsloc.ward,
                        district: adsloc.district,
                        id_report_type: parseInt($("#reportType").val()),
                        fullname: $("#name").val(),
                        email: $("#email").val(),
                        phone: $("#phone").val(),
                        // content: tinymce.$("#reportContent").getContent(),
                        content: tinymce.get("content").getContent(),
                        photo1: await uploadImage(imageData3),
                        photo2: await uploadImage(imageData4),
                        report_time: validateDate(new Date()),
                        status: false, // You may need to handle this differently
                        resolve: null, // You may need to handle this differently
                        id_ward: address2wardid(adsloc.ward, adsloc.district),
                    };

                    grecaptcha.execute('6LeUpUopAAAAANmK2yer45ZpRkLJ0fnsfASyluXw', { action: 'homepage' }).then(async function (token) {
                        const captcha = token;
                        fetch('https://adsmap-officer.onrender.com/api/nguoidan/verifyCaptcha', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*', // Tells server that this is JSON encoded data
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ captcha: captcha })
                        }).then((res) => res.json()).then((data) => {
                            if (data.success) {
                                const existingReportsJSON = localStorage.getItem("loc_report");
                                const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
                                existingReports.push(reportObject);
                                localStorage.setItem("loc_report", JSON.stringify(existingReports));

                                // Send data to the server using AJAX
                                $.ajax({
                                    type: "POST",
                                    url: "https://adsmap-officer.onrender.com/api/nguoidan/createLocReport",
                                    data: JSON.stringify(reportObject),
                                    success: function (response) {
                                        // Handle success
                                        alert("Tạo báo cáo thành công")
                                        // Optional: Show a success message to the user
                                    },
                                    error: function (error) {
                                        // Handle error
                                        alert(JSON.stringify(error) + "Lỗi tạo báo cáo");
                                        // Optional: Show an error message to the user
                                    },
                                });
                            } else {
                                alert("Captcha không hợp lệ")
                            }
                        })
                    })
                }

                $('#report-popup form').get(0).reset()
                $("#report-popup").modal("hide")
            }
        })
    })

    $("#sidebar .adInfo .other-report-button").on("click", function () {
        let str_id_ads = $(this).closest(".button-group").attr("class").split(" ")[1];
        let id_ads = parseInt(str_id_ads.split("-")[1])

        let tmp = localStorage.getItem('ads_report')
        let list_report = (tmp) ? JSON.parse(tmp) : []
        list_report = list_report.filter(item => item.id_ads == id_ads)

        const user_email = localStorage.getItem('email')
            ? JSON.parse(localStorage.getItem('email'))
            : ""
        renderReport(list_report, "#other-report-popup .modal-body", user_email)
    })

    $("#sidebar .locInfo .other-report-button").off("click").on("click", function () {
        const user_email = localStorage.getItem('email')
            ? JSON.parse(localStorage.getItem('email'))
            : ""
        if (adsloc.id_ads_location) {
            let tmp = localStorage.getItem('adsloc_report')
            let list_report = (tmp) ? JSON.parse(tmp) : []
            list_report = list_report.filter(item => item.id_ads_location == adsloc.id_ads_location)
            renderReport(list_report, "#other-report-popup .modal-body", user_email)
        } else {
            let tmp = localStorage.getItem('loc_report')
            let list_report = (tmp) ? JSON.parse(tmp) : []
            // console.log(list_report)

            list_report = list_report.filter(item =>
                (item.longitude.toFixed(4) == adsloc.longitude.toFixed(4) && item.latitude.toFixed(4) == adsloc.latitude.toFixed(4))
                || ((item.address) == adsloc.address && item.ward == adsloc.ward))

            // console.log("thông tin của điểm được click: ")
            // console.log(adsloc.longitude.toFixed(4))
            // console.log(adsloc.latitude.toFixed(4))
            // console.log(adsloc.address)
            renderReport(list_report, "#other-report-popup .modal-body", user_email)
        }
    })

    $("#sidebar").on("click", '.close-button', function () {
        $('#sidebar').hide()
        $(".flex-container.toggle").show()
    })
}

// clustering và bắt sự kiện trên các điểm
function createLayer(map, features) {
    // tạo cluster
    map.addSource('adsloc', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: features
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });
    // console.log(info)

    // style layer cluster
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'adsloc',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#51bbd6',
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    // style số hiển thị trên cluster
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'adsloc',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 20
        }
    });

    // style các điểm ban đầu khi chưa gom nhóm
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'adsloc',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': ['get', 'colorMarker'],
            'circle-radius': 10,
        }
    });

    // click vào cluster -> map zoom to ra
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('adsloc').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // hover vào điểm đặt
    map.on('mouseenter', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const ads_type = e.features[0].properties.ads_type;
        const loc_type = e.features[0].properties.loc_type;
        const address = e.features[0].properties.address;
        const ward = e.features[0].properties.ward;
        const district = e.features[0].properties.district;
        const zoning_text = e.features[0].properties.zoning_text;
        const imagePath = e.features[0].properties.imagePath;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // console.log(e.features[0])

        const popup = new mapboxgl.Popup({
            closeButton: false,
            offset: 15
        })
            .setLngLat(coordinates)
            .setHTML(
                `<div class="popup-content"> 
      <p class = "ads-type"  style = "font-weight: 900">${ads_type}</p>
      <p class = "loc-type">${loc_type}</p>
      <p class = "address">${address}, Phường ${ward}, Quận ${district} </p>
      <p class = "zoning-text" style = "font-weight: 900; font-style: italic">${zoning_text}</p>
      <img src = ${imagePath} class = "img-thumbnail" />
      </div>`
            )
        e.features[0].popup = popup;
        popup.addTo(map)

        map.getCanvas().style.cursor = 'pointer'

        map.on('mouseleave', 'unclustered-point', () => {
            // Remove the popup from the map
            popup.remove();
        })
    });

    // nhán vào điểm đặt
    map.on('mousedown', 'unclustered-point', (e) => {
        const feature = e.features[0];
        if (feature.popup) {
            feature.popup.remove();
            delete feature.popup;
        }
        showSidebar(e.features[0].properties);
    })
}

// tạo các features và gán thông tin vào features
function createMarker(info, map) {
    const quangcao = $('#quangcao').prop("checked")
    const baocao = $('#baocao').prop("checked")
    const chuaquyhoach = $('#quyhoach').prop("checked")

    const features = info.map(item => {
        // console.log(item)
        let colorMarker
        if (red(item) && baocao)
            colorMarker = 'red';
        else if (item[10] == 0 && chuaquyhoach) // chưa quy hoạch
            colorMarker = 'purple';
        else if (item[11] && quangcao)
            colorMarker = 'blue';
        else
            colorMarker = '#0B7B31';
        let imagePath
        if (item[7] != "")
            imagePath = item[7]
        else
            imagePath = "../image/image-placeholder.jpg"
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [item[8], item[9]]
            },
            properties: {
                colorMarker,
                id_ads_location: item[0],
                address: item[1],
                ward: item[2],
                district: item[3],
                loc_type: item[4],
                ads_type: item[5],
                zoning_text: item[6],
                imagePath,
                longitude: item[8],
                latitude: item[9],
                is_zoning: item[10],
                list_ads: item[11],
                list_report: item[12]
            }
        }
    });
    // console.log(features)

    // nếu đã tồn tại các điểm trên map thì xóa dữ liệu, tạo layer lại
    // nếu chưa tồn tại -> map mới load -> không cần xóa dữ liệu
    const existingSource = map.getSource('adsloc');
    if (existingSource) {
        map.removeLayer('unclustered-point');
        map.removeLayer('cluster-count');
        map.removeLayer('clusters');
        map.removeSource('adsloc');

        createLayer(map, features)
    }
    createLayer(map, features)
}

let marker = new mapboxgl.Marker();

// get location report from server
$.ajax({
    url: `https://adsmap-officer.onrender.com/api/nguoidan/getLocReport`,
    type: "GET",
}).done(function (data) {
    localStorage.setItem("loc_report", JSON.stringify(data.content))
})
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown + "getLocReport")
    })

$(document).ready(function () {
    // tạo bản đồ
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.6974, 10.7743],
        zoom: 15,
        language: 'vi'
    });

    $(window).on('resize', function () {
        let windowHeight = $(window).height();
        let headerHeight = $('#headerNgDan').height();
        let mapHeight = windowHeight - headerHeight;
        $('#map').css('top', headerHeight);
        $('#sidebar').css('top', headerHeight);
        // console.log(windowHeight, headerHeight, mapHeight)
        $('#map').height(mapHeight);
        $('#sidebar').height(mapHeight);
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        })
    );

    let NguoiDanAdsLoc
    $("#loading-bg").show()
    $.ajax({
        url: `https://adsmap-officer.onrender.com/api/nguoidan/getAdsLoc`,
        type: "GET",
    }).done(function (data) {
        NguoiDanAdsLoc = data;
        localStorage.setItem("NguoiDanAdsLoc", JSON.stringify(NguoiDanAdsLoc))

        // Initialize an empty array to store all ads location reports
        const adsloc_report = [];

        // Iterate through each location in the 'content' array
        NguoiDanAdsLoc.content.forEach(location => {
            // Check if the location has a 'list_report' property
            if (location.list_report && location.list_report.length > 0) {
                // Add each report to the 'adsloc_report' array
                adsloc_report.push(...location.list_report);
            }
        });
        localStorage.setItem("adsloc_report", JSON.stringify(adsloc_report))

        // Function to get all reports inside list_ads
        function getAllReports(data) {
            const allReports = [];

            // Iterate through each element in 'content'
            data.content.forEach(location => {
                // Check if the element has 'list_ads'
                if (location.list_ads) {
                    // Iterate through 'list_ads' and push each report to 'allReports'
                    location.list_ads.forEach(ad => {
                        if (ad.list_report) {
                            allReports.push(...ad.list_report);
                        }
                    });
                }
            });
            return allReports;
        }

        const ads_report = getAllReports(NguoiDanAdsLoc);
        localStorage.setItem("ads_report", JSON.stringify(ads_report))

        // lấy dữ liệu lưu vào info
        var info = NguoiDanAdsLoc.content.map(function (item) {
            let { id_ads_location, address, ward, district, loc_type, ads_type,
                photo, is_zoning, longitude, latitude, list_ads, list_report } = item
            let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"

            return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text, photo, longitude, latitude, is_zoning, list_ads, list_report]
        })

        // tạo điểm trên map
        createMarker(info, map);
        $("#loading-bg").hide()

        // bắt sự kiện toggle
        $(".toggle input").on('click', function (e) {
            createMarker(info, map)
        })

        let marker = new mapboxgl.Marker();
        map.on('click', function (e) {
            let lngLat = e.lngLat;
            longitude = lngLat.lng;
            latitude = lngLat.lat;
            $(".mapboxgl-marker").remove()

            marker = new mapboxgl.Marker({
                color: '#0B7B31'
            }).setLngLat(lngLat).addTo(map);
            map.flyTo({
                center: lngLat,
                zoom: 17
            })

            let locObject = {
                "colorMarker": null,
                "id_ads_location": null,
                "address": null,
                "ward": null,
                "district": null,
                "loc_type": null,
                "ads_type": null,
                "zoning_text": null,
                "imagePath": null,
                "longitude": null,
                "latitude": null,
                "is_zoning": null,
                "list_ads": "null",
                "list_report": "null"
            }
            fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc&lang=vi`)
                .then(response => response.json())
                .then(data => {
                    const feature = data.items[0].address;
                    locObject.ward = feature?.district.substring(7)
                    locObject.district = feature.city.substring(5);
                    locObject.address = (feature?.houseNumber && feature?.street)
                        ? feature?.houseNumber + " " + feature?.street
                        : feature?.label.substring(0, feature?.label.indexOf(", Phường"));
                    locObject.longitude = longitude
                    locObject.latitude = latitude

                    if (!flag) {
                        // console.log(flag)
                        showSidebar(locObject)
                    } else {
                        // console.log(flag)
                    }

                    flag = false

                })
                .catch(error => {
                    console.error('Error:', error);
                    // const resultDiv = document.getElementById('result');
                    // resultDiv.innerHTML = '<p>Error during geocoding.</p>';
                });

            // Lắng nghe sự kiện mousedown trên bản đồ
            map.on('mousedown', function () {
                // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
                map.getCanvas().style.cursor = 'grab';
            });

            // Lắng nghe sự kiện mouseup trên bản đồ
            map.on('mouseup', function () {
                // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
                map.getCanvas().style.cursor = 'pointer';
            })

        });


        $(".my-report").on("click", () => {
            let email = JSON.parse(localStorage.getItem('email'));

            let my_adsloc_report = []
            let adsloc = localStorage.getItem('adsloc_report');
            adsloc = (adsloc) ? JSON.parse(adsloc) : []
            adsloc.forEach(item => {
                if (item.email == email)
                    my_adsloc_report.push(item)
            })

            let my_ads_report = []
            let ads_report = localStorage.getItem('ads_report');
            ads_report = (ads_report) ? JSON.parse(ads_report) : []
            ads_report.forEach(item => {
                if (item.email == email)
                    my_ads_report.push(item)
            })

            let my_loc_report = []
            let loc_report = localStorage.getItem('loc_report');
            loc_report = (loc_report) ? JSON.parse(loc_report) : []
            loc_report.forEach(item => {
                if (item.email == email)
                    my_loc_report.push(item)
            })

            const list_report = [...my_ads_report, ...my_loc_report, ...my_adsloc_report]
            console.log(JSON.stringify(list_report) + "list_report")

            const note = list_report?.map(item => {
                if (item.id_ads_location)
                    address = NguoiDanAdsLoc.content.filter(i => i.id_ads_location == item.id_ads_location)[0].address
                // else if(item.id_ads)
                //     address = NguoiDanAdsLoc.content.filter(i => i.list_ads.filter(j => j.id_ads == item.id_ads).length > 0)[0].address
                else
                    address = item.address

                return {
                    address: address,
                    statusClass: item.status ? "resolved" : "unresolved",
                    statusText: item.status ? "Đã xử lí" : "Chưa xử lí",
                    report_type: idReportType2String(item.id_report_type),
                    imagePath1: item.photo1,
                    imagePath2: item.photo2,
                }
            })

            if (!list_report || list_report.length == 0) {
                var template = `
                <p class = "text-center"> (Chưa có báo cáo) </p>
                `;
            } else {
                var template = `
                    <% for (var i = 0; i < list_report?.length; i++) { %>
                        <div class="other-report row" >
                        <div class="col-md-12 location">
                            <strong>Địa điểm:</strong> 
                            <% if (list_report[i].address) { %>
                                <%= list_report[i].address %>
                            <% } else if (note[i].address){ %>
                                <%= note[i].address %>
                            <% } else { %>
                                Biển quảng cáo
                                <% } %>
                        </div>
                        <div class="col-md-12">
                            <%- list_report[i].content %>
                        </div>

                        <div class="col-md-12 view-image">
                        <% if (note[i].imagePath1) { %>
                            <img class="col-md-6 image1" src="<%= note[i].imagePath1 %>">
                        <% } %>
                        <% if (note[i].imagePath2) { %>
                            <img class="col-md-6 image2" src="<%= note[i].imagePath2 %>">
                        <% } %>
                        </div>
                            <div class="col-md-12 ">
                                <div class = "report-cate">
                                <% if (list_report[i].address) { %>
                                    Địa điểm
                                <% } else if (note[i].address){ %>
                                    Điểm đặt
                                <% } else { %>
                                    Biển quảng cáo
                                    <% } %>
                                </div>
                                <div class = <%= note[i].statusClass %> >
                                    <%= note[i].statusText %>
                                </div>
                                <div class = "report-type">
                                    <%= note[i].report_type %>
                                </div>
                            </div>
                        </div>
                    <% } %>
            `;
            }
            var rendered = ejs.render(template, { list_report, note });
            $('#my-report .modal-body').html(rendered)
        })
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown + "getAdsLoc")
    })

    $('.search-address-bar').on('keydown', function (event) {
        if (event.keyCode === 13) { // Kiểm tra phím Enter
            let address = $('.search-address-bar').val()
            console.log(address)

            $(".search-address hr").show()
            $(".resultapi-address").show()
            $('#map').css('pointer-events', 'none');

            $.ajax({
                url: `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc`,
                type: 'GET',
                data: {
                    access_token: mapboxgl.accessToken,
                    language: "vi"
                },
                success: function (response) {
                    console.log(response.items);
                    renderAddressResult(response.items.slice(0, 3));

                    $('.resultapi-address div').on('click', function (event) {
                        let index = $(this).attr("class").split("-")[1];

                        console.log(index);
                        console.log(response.items[index])
                        geocoding(marker, response.items[index]);
                    })
                },
                error: function () {
                    alert('Error occurred during geocoding');
                }
            });
        }
    });

    function geocoding(marker, item) {
        console.log(item + "item")
        $(".mapboxgl-marker").remove();

        let longitude = item.position.lng;
        let latitude = item.position.lat;

        marker = new mapboxgl.Marker({
            color: '#0B7B31'
        }).setLngLat([longitude, latitude]).addTo(map);
        map.flyTo({
            center: [longitude, latitude],
            zoom: 17
        })

        let locObject = {
            "colorMarker": null,
            "id_ads_location": null,
            "address": null,
            "ward": null,
            "district": null,
            "loc_type": null,
            "ads_type": null,
            "zoning_text": null,
            "imagePath": null,
            "longitude": null,
            "latitude": null,
            "is_zoning": null,
            "list_ads": "null",
            "list_report": "null"
        }

        const feature = item.address
        locObject.ward = feature?.district.substring(7)
        locObject.district = feature?.city.substring(5)
        locObject.address = (feature?.houseNumber && feature?.street)
            ? feature?.houseNumber + " " + feature?.street
            : feature?.label.substring(0, feature?.label.indexOf(", Phường"))
        locObject.longitude = longitude
        locObject.latitude = latitude

        $('.search-address-bar').val(`${item.title}`)

        if (!flag) {
            console.log(flag)
            showSidebar(locObject)
        } else {
            console.log(flag)
        }

        flag = false

        // Lắng nghe sự kiện mousedown trên bản đồ
        map.on('mousedown', function () {
            // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
            map.getCanvas().style.cursor = 'grab';
        });

        // Lắng nghe sự kiện mouseup trên bản đồ
        map.on('mouseup', function () {
            // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
            map.getCanvas().style.cursor = 'pointer';
        })
    }

    $(document).mouseup(function (e) {
        const container = $('.search-address-bar');

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".search-address hr").hide()
            $(".resultapi-address").hide()
            $('#map').css('pointer-events', 'auto');
        }
    });
})


tinymce.init({
    selector: 'textarea',
    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
});