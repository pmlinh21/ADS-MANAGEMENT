var flag = false
let ads_report
let NguoiDanAdsLoc
localStorage.setItem("email", JSON.stringify("lvduc@gmail.com"))

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

// hiển thị danh sách report
function renderReport(list_report, container, user_email) {
    const note = list_report?.map(item => {
        const is_user = (item[1] == user_email) ? "mine" : "other"
        const statusClass = item.status ? "resolved" : "unresolved";
        const statusText = item.status ? "Đã xử lí" : "Chưa xử lí"
        const id_report_type = item.id_report_type
        var report_type = null;
        if (id_report_type == 1)
            report_type = "Tố cáo sai phạm"
        else if (id_report_type == 2)
            report_type = "Đăng kí nội dung"
        else if (id_report_type == 3)
            report_type = "Đóng góp ý kiến"
        else if (id_report_type == 4)
            report_type = "Giải đáp thắc mắc"
        return {
            is_user: is_user,
            statusClass: statusClass,
            statusText: statusText,
            report_type: report_type,
            imagePath1: item.photo1,
            imagePath2: item.photo2,
        }
    })
    // console.log(note)
    // list_report.forEach((item, index) => console.log(item, note[index]))

    var template = `
  <% for (var i = 0; i < list_report?.length; i++) { %>
    <div class="<%=note[i].is_user%>-report row" >
      <div class="col-md-12">
        <%= list_report[i].content %>
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
          <p>Kích thước:  <strong><%= list_ads[i].width %>m x <%= list_ads[i].height %>m</strong></p>
          <p>Số lượng:  <strong><%= list_ads[i].quantity %> trụ / bảng</strong></p>
          <p>Hình thức:  <strong><%= ads_type %></strong></p>
          <p>Phân loại:  <strong><%= loc_type %></strong></p>

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
    console.log(JSON.stringify(adsloc) + "adsloc")
    $(".flex-container.toggle").hide()
    $('#sidebar').show()
    renderAds(adsloc)
    flag = true;

    if (adsloc.id_ads_location)
        $(".locInfo .address").text(`${adsloc.address}, phường ${adsloc.ward}, ${adsloc.district}`)
    else
        $(".locInfo .address").text(`${adsloc.address}, ${adsloc.ward}, ${adsloc.district}`)

    // Chi tiết bảng quảng cáo
    $("#sidebar .detail-button").on("click", function () {
        let str_id_ads = $(this).attr("class").split(" ")[1];
        let id_ads = parseInt(str_id_ads.split("-")[1])
        // console.log(id_ads)

        const list_ads = JSON.parse(adsloc.list_ads)
        ads = list_ads?.filter(item => item.id_ads == id_ads)[0]

        let imagePath = (!ads.photo ? `./image/image-placeholder.jpg` : `${ads.photo}`)
        $("#detail-popup .image img").attr("src", imagePath)
        $("#detail-popup .expired-date").text("Ngày hết hạn hợp đồng: " + validateSQLDate(ads.expired_date))
        // console.log(imagePath)
    })

    $("#sidebar .adInfo .report-button").on("click", function () {
        let str_id_ads = $(this).closest(".button-group").attr("class").split(" ")[1];
        let id_ads = parseInt(str_id_ads.split("-")[1])
        var imageData1 = imageData2 = null

        $('#image1').on('change', function (e) {
            if (e.target.files[0])
                if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
                    imageData1 = e.target.files[0]
                }
                else if (!e.target.files[0].type.startsWith('image/')) {
                    alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
                }
                else if (!(e.target.files[0].size / 1024 <= 4)) {
                    alert('Hình ảnh minh họa không được vượt quá 4MB')
                }
        });

        $('#image2').on('change', function (e) {
            if (e.target.files[0])
                if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
                    imageData2 = e.target.files[0]
                }
                else if (!e.target.files[0].type.startsWith('image/')) {
                    alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
                }
                else if (!(e.target.files[0].size / 1024 <= 4)) {
                    alert('Hình ảnh minh họa không được vượt quá 4MB')
                }
        });

        $('#report-popup .style3-button').on("click", function () {
            $('#report-popup form').get(0).reset()
            $("#report-popup").modal("hide")
        })

        $('#report-popup .style1-button').off('click').on("click", function (e) {
            console.log("report button clicked")
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
                imageData1 = imageData2 = null
                const reportObject = {
                    id_report: null, // You may need to generate a unique ID
                    officer: null, // You may need to handle this differently
                    office: null, // You may need to handle this differently
                    id_ads: id_ads, // You may need to handle this differently
                    id_report_type: parseInt($("#reportType").val()),
                    fullname: $("#name").val(),
                    email: $("#email").val(),
                    phone: $("#phone").val(),
                    // content: tinymce.$("#reportContent").getContent(),
                    content: tinymce.get("content").getContent(),
                    photo1: imageData1,
                    photo2: imageData2,
                    report_time: validateDate(new Date()),
                    status: false, // You may need to handle this differently
                    resolve: null, // You may need to handle this differently
                    report_type: null, // You may need to handle this differently
                };
                const existingReportsJSON = localStorage.getItem("ads_report");
                const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
                existingReports.push(reportObject);
                localStorage.setItem("ads_report", JSON.stringify(existingReports));

                console.log(JSON.stringify(reportObject) + "reportObject")

                // Send data to the server using AJAX
                // $.ajax({
                //     type: "POST",
                //     url: "https://localhost:8080/api/nguoidan/createAdsReport",
                //     data: JSON.stringify(reportObject),
                //     success: function (response) {
                //         // Handle success
                //         console.log(response + "createSuccess");
                //         // Optional: Show a success message to the user
                //     },
                //     error: function (error) {
                //         // Handle error
                //         console.error(JSON.stringify(error) + "createError");
                //         // Optional: Show an error message to the user
                //     },
                // });

                fetch('https://localhost:8080/api/nguoidan/createAdsReport', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reportObject),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });


                $('#report-popup form').get(0).reset()
                $("#report-popup").modal("hide")
            }
        })
    })

    $("#sidebar .locInfo .report-button").on("click", function () {
        var imageData3 = null, imageData4 = null

        $('#image1').on('change', function (e) {
            if (e.target.files[0])
                if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
                    imageData3 = e.target.files[0]
                }
                else if (!e.target.files[0].type.startsWith('image/')) {
                    alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
                }
                else if (!(e.target.files[0].size / 1024 <= 4)) {
                    alert('Hình ảnh minh họa không được vượt quá 4MB')
                }
        });

        $('#image2').on('change', function (e) {
            if (e.target.files[0])
                if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
                    imageData4 = e.target.files[0]
                }
                else if (!e.target.files[0].type.startsWith('image/')) {
                    alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
                }
                else if (!(e.target.files[0].size / 1024 <= 4)) {
                    alert('Hình ảnh minh họa không được vượt quá 4MB')
                }
        });

        $('#report-popup .style3-button').on("click", function () {
            $("#report-popup").modal("hide")
            $('#report-popup form').get(0).reset()
        })

        $('#report-popup .style1-button').off('click').on("click", function (e) {
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
                imageData3 = null
                imageData4 = null

                console.log(JSON.stringify(adsloc) + "adsloc")

                if (adsloc.id_ads_location) {
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
                        photo1: imageData3,
                        photo2: imageData4,
                        report_time: validateDate(new Date()),
                        status: false, // You may need to handle this differently
                        resolve: null, // You may need to handle this differently
                        report_type: null, // You may need to handle this differently
                    };
                    const existingReportsJSON = localStorage.getItem("ads_loc_report");
                    const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
                    existingReports.push(reportObject);
                    localStorage.setItem("ads_loc_report", JSON.stringify(existingReports));
                } else {
                    reportObject = {
                        id_report: null, // You may need to generate a unique ID
                        officer: null, // You may need to handle this differently
                        office: null, // You may need to handle this differently
                        longitude: adsloc.longitude,
                        latitude: adsloc.latitude,
                        address: adsloc.address + adsloc.ward + adsloc.district,
                        id_report_type: parseInt($("#reportType").val()),
                        fullname: $("#name").val(),
                        email: $("#email").val(),
                        phone: $("#phone").val(),
                        // content: tinymce.$("#reportContent").getContent(),
                        content: tinymce.get("content").getContent(),
                        photo1: imageData3,
                        photo2: imageData4,
                        report_time: validateDate(new Date()),
                        status: false, // You may need to handle this differently
                        resolve: null, // You may need to handle this differently
                        report_type: null, // You may need to handle this differently
                    };
                    const existingReportsJSON = localStorage.getItem("loc_report");
                    const existingReports = existingReportsJSON ? JSON.parse(existingReportsJSON) : [];
                    existingReports.push(reportObject);
                    localStorage.setItem("loc_report", JSON.stringify(existingReports));
                }
                // const info = (adsloc.id_ads_location)
                //     // adsloc report
                //     ?
                //     [[null, null, adsloc.id_ads_location, $("#reportType").val(), $("#name").val(),
                //         $("#email").val(), $("#phone").val(), $("#reportContent").val(), imageData3, imageData4,
                //         validateDate(new Date()), 0, null]]
                //     // loc report
                //     :
                //     [[null, null, adsloc.latitude, adsloc.longitude, adsloc.address, null, $("#reportType").val(),
                //         $("#name").val(), $("#email").val(), $("#phone").val(), $("#reportContent").val(), imageData3, imageData4,
                //         validateDate(new Date()), 0, null]]

                console.log(reportObject + "info")

                // const table = (adsloc.id_ads_location) ? "adsloc_report" : "loc_report"
                // const old_report = localStorage.getItem(table)
                //     ? JSON.parse(localStorage.getItem(table)) : []
                // const new_report = [...old_report, ...info]
                // localStorage.setItem(table, JSON.stringify(new_report))

                // console.log(old_report, info, new_report)

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

    $("#sidebar .locInfo .other-report-button").on("click", function () {
        console.log("loc report")
        const user_email = localStorage.getItem('email')
            ? JSON.parse(localStorage.getItem('email'))
            : ""
        console.log(email + "emailmail")

        if (adsloc.id_ads_location) {
            let tmp = localStorage.getItem('adsloc_report')
            let list_report = (tmp) ? JSON.parse(tmp) : []
            list_report = list_report.filter(item => item.id_ads_location == adsloc.id_ads_location)
            renderReport(list_report, "#other-report-popup .modal-body", user_email)
        } else {
            let tmp = localStorage.getItem('loc_report')
            let list_report = (tmp) ? JSON.parse(tmp) : []
            list_report = list_report.filter(item =>
                (item[3] == adsloc.longitude && item[4] == adsloc.latitude) || (item[5]) == adsloc.address)
            // console.log(list_report)
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
        console.log(JSON.stringify(item) + "item")
        let colorMarker
        if (item[12] && baocao)
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
        // console.log(imagePath)

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

    } else {
        map.on('load', () => {
            createLayer(map, features)
        });
    }
}

let marker = new mapboxgl.Marker();

// get location report from server
$.ajax({
    url: `http://localhost:8080/api/nguoidan/getLocReport`,
    // url: `https://adsmap-officer.onrender.com/api/nguoidan/getLocReport`,
    type: "GET",
}).done(function (data) {
    localStorage.setItem("loc_report", JSON.stringify(data.content))
})
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown + "getLocReport")
    })


$(document).ready(function () {
    let NguoiDanAdsLoc
    $.ajax({
        url: `http://localhost:8080/api/nguoidan/getAdsLoc`,
        // url: `https://adsmap-officer.onrender.com/api/nguoidan/getAdsLoc`,
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

        // thay đổi kích thước bản đồ khi resize cửa sổ trình duyệt
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

        // tạo bản đồ
        mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [106.6974, 10.7743],
            zoom: 15,
            language: 'vi'
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

        // lấy dữ liệu lưu vào info
        var info = NguoiDanAdsLoc.content.map(function (item) {
            let { id_ads_location, address, ward, district, loc_type, ads_type,
                photo, is_zoning, longitude, latitude, list_ads, list_report } = item
            let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"

            return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text, photo, longitude, latitude, is_zoning, list_ads, list_report]
        })

        // tạo điểm trên map
        createMarker(info, map);

        // bắt sự kiện toggle
        $(".flex-container input").on('click', function (e) {
            createMarker(info, map)
        })

        let marker = new mapboxgl.Marker();
        map.on('click', function (e) {
            let lngLat = e.lngLat;
            longitude = lngLat.lng;
            latitude = lngLat.lat;
            marker.remove()
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

            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(longitude)},${(latitude)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    locObject.ward = data.features[0].context[0].text;
                    locObject.district = data.features[0].context[2].text;
                    locObject.address = data.features[0].properties.address;
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

        // map.on('scroll', function () {
        //   $('#sidebar').hide()
        // });

        document.getElementById('geocodeForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const address = document.getElementById('address').value;

            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(address)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
                .then(response => response.json())
                .then(data => {
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

                    let center = data.features[0].center;
                    map.flyTo({
                        center: center,
                        zoom: 17
                    })
                    // Create a new marker.
                    marker.remove()
                    marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
                    locObject.ward = data.features[0].context[0].text;
                    locObject.district = data.features[0].context[2].text;
                    locObject.address = data.features[0].properties.address;
                    if ($('#sidebar').is(':visible')) { } else {
                        showSidebar(locObject)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<p>Error during geocoding.</p>';
                });
        })

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

                const statusClass = item.status ? "resolved" : "unresolved";
                const statusText = item.status ? "Đã xử lí" : "Chưa xử lí"
                var report_type = null;
                if (item.id_report_type == 1)
                    report_type = "Tố cáo sai phạm"
                else if (item.id_report_type == 2)
                    report_type = "Đăng kí nội dung"
                else if (item.id_report_type == 3)
                    report_type = "Đóng góp ý kiến"
                else if (item.id_report_type == 4)
                    report_type = "Giải đáp thắc mắc"
                return {
                    address: address,
                    statusClass: statusClass,
                    statusText: statusText,
                    report_type: report_type,
                    imagePath1: item.photo1,
                    imagePath2: item.photo2,
                }
            })
            var template = `
            <% for (var i = 0; i < list_report?.length; i++) { %>
                <div class="other-report row" >
                <div class="col-md-12 location">
                    <strong>Địa điểm:</strong> 
                    <% if (list_report[i].address) { %>
                        <%= list_report[i].address %>
                    <% } else { %>
                        <%= note[i].address %>
                    <% } %>
 
                </div>
                <div class="col-md-12">
                    "<%= list_report[i].content %> "
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
            var rendered = ejs.render(template, { list_report, note });
            $('#my-report .modal-body').html(rendered)
        })
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown + "getAdsLoc")
    })
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