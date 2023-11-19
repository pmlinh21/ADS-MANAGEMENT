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
  list_report = JSON.parse(list_report);

  const note = list_report?.map(item => {
    const is_user = (item.email === user_email) ? "mine" : "other"
    const statusClass = (item.status) ? "resolved" : "unresolved";
    const statusText = (item.status) ? "Đã xử lí" : "Chưa xử lí"

    return {
      is_user: is_user,
      statusClass: statusClass,
      statusText: statusText
    }
  })
  // list_report.forEach((item, index) => console.log(item, note[index]))
  var template = `
  <% for (var i = 0; i < list_report?.length; i++) { %>
    <div class="<%=note[i].is_user%>-report row" >
    <div class="col-md-3">
      <i class="fa-solid fa-file-lines"></i>
    </div>
    <div class="col-md-9">
      <%= list_report[i].content %>
    </div>
    <div class="col-md-12">
      <div class = <%= note[i].statusClass %> >
        <%= note[i].statusText %>
      </div>
      <div class = "report-type">
        <%= list_report[i].report_type %>
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
  // console.log(adsloc)
  $('#sidebar').hide()
  $('#sidebar').show()
  renderAds(adsloc)
  // console.log('check')
  // console.log(adsloc);
  // console.log('chh')

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(adsloc.longitude)},${(adsloc.latitude)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
    .then(response => response.json())
    .then(data => {
      adsloc.ward = data.features[0].context[0].text;
      adsloc.district = data.features[0].context[2].text;
      adsloc.address = data.features[0].properties.address;
    })
    .catch(error => {
      console.error('Error:', error);
    });

  $(".locInfo .data").attr("id", `data-${adsloc.id_ads_location}`)
  $(".locInfo .address").text(`${adsloc.address}, Phường ${adsloc.ward}, ${adsloc.district}`)


  $("#sidebar").on("click", '.detail-button', function () {
    let str_id_ads = $(this).attr("class").split(" ")[1];
    let id_ads = parseInt(str_id_ads.split("-")[1])
    console.log(id_ads)

    const list_ads = JSON.parse(adsloc.list_ads)
    ads = list_ads.filter(item => item.id_ads == id_ads)[0]

    let imagePath = (!ads.photo
      ? `../../../public/image/image-placeholder.jpg`
      : `../../../public/image/${ads.photo}`)
    $("#detail-popup .image img").attr("src", imagePath)
    $("#detail-popup .expired-date").text("Ngày hết hạn hợp đồng: " + validateSQLDate(ads.expired_date))
    console.log(imagePath)
  })

  $("#sidebar .adInfo").on("click", '.report-button', function () {
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

    $('#report-popup').off('click').on("click", ".style3-button", function () {
      $('#report-popup form').get(0).reset()
      $("#report-popup").modal("hide")
    })

    $('#report-popup').off('click').on("click", ".style1-button", function (e) {
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

        const info = [[
          null,
          null,
          id_ads,
          $("#reportType").val(),
          $("#name").val(),
          $("#email").val(),
          $("#phone").val(),
          $("#reportContent").val(),
          imageData1,
          imageData2,
          validateDate(new Date()),
          0,
          null
        ]]

        const old_report = localStorage.getItem("ads_report")
          ? JSON.parse(localStorage.getItem("ads_report")) : []
        const new_report = [...old_report, ...info]
        localStorage.setItem("ads_report", JSON.stringify(new_report))

        console.log(old_report, info, new_report)

        $('#report-popup form').get(0).reset()
        $("#report-popup").modal("hide")

      }
    })

    $('#report-popup').off('click').on("click", ".style3-button", function () {
      $('#report-popup form').get(0).reset()
      $("#report-popup").modal("hide")
    })
  })

  $("#sidebar .locInfo").on("click", '.report-button', function () {
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

    $('#report-popup').off('click').on("click", ".style1-button", function (e) {
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

        const info = [[
          null,
          null,
          adsloc.id_ads_location,
          $("#reportType").val(),
          $("#name").val(),
          $("#email").val(),
          $("#phone").val(),
          $("#reportContent").val(),
          imageData3,
          imageData4,
          validateDate(new Date()),
          0,
          null
        ]]

        const old_report = localStorage.getItem("adsloc_report")
          ? JSON.parse(localStorage.getItem("adsloc_report")) : []
        const new_report = [...old_report, ...info]
        localStorage.setItem("adsloc_report", JSON.stringify(new_report))

        console.log(old_report, info, new_report)

        $('#report-popup form').get(0).reset()
        $("#report-popup").modal("hide")
      }
    })

    $('#report-popup').off('click').on("click", ".style3-button", function () {
      $('#report-popup form').get(0).reset()
      $("#report-popup").modal("hide")
    })
  })

  $("#sidebar .adInfo .other-report-button").on("click", function () {
    let str_id_ads = $(this).closest(".button-group").attr("class").split(" ")[1];
    let id_ads = parseInt(str_id_ads.split("-")[1])

    const list_ads = JSON.parse(adsloc.list_ads)
    ads = list_ads.filter(item => item.id_ads == id_ads)[0]

    const user_email = localStorage.getItem('email')
      ? JSON.parse(localStorage.getItem('email'))
      : ""
    renderReport(ads.list_report, "#other-report-popup .modal-body", user_email)
  })

  $("#sidebar .locInfo .other-report-button").on("click", function () {
    const user_email = localStorage.getItem('email')
      ? JSON.parse(localStorage.getItem('email'))
      : ""
    renderReport(adsloc.list_report, "#other-report-popup .modal-body", user_email)
  })

  $("#sidebar").on("click", '.close-button', function () {
    $('#sidebar').hide()
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

    console.log(e.features[0])

    const popup = new mapboxgl.Popup({
      closeButton: false,
      offset: 15
    })
      .setLngLat(coordinates)
      .setHTML(
        `<div class="popup-content"> 
      <p class = "ads-type"  style = "font-weight: 900">${ads_type}</p>
      <p class = "loc-type">${loc_type}</p>
      <p class = "address">${address}, phường ${ward}, quận ${district} </p>
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
  // console.log(quangcao, baocao, chuaquyhoach)

  const features = info.map(item => {
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
      imagePath = "../../../public/image/" + item[7]
    else
      imagePath = "../../../public/image/image-placeholder.jpg"
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

$(document).ready(function () {
  // lưu các report vào local storage
  const ads_report = [
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "1",
      "1",
      "Nguyễn Văn Anh",
      "nvanh@gmail.com",
      "0912345678",
      "Biển quảng cáo hiển thị thông điệp chính trị không liên quan đến khu vực này. Mong muốn chính quyền địa phương kiểm tra và đảm bảo rằng quảng cáo trên đường không vi phạm các quy định liên quan.",
      "",
      "",
      "2023-08-05",
      "1",
      "Kiểm tra thông tin quảng cáo và yêu cầu loại bỏ thông điệp không liên quan. Đảm bảo quảng cáo tuân thủ luật lệ và không gây phiền hà cho cộng đồng."
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "2",
      "2",
      "1",
      "Lê Thị Bình",
      "ltb@gmail.com",
      "0923456789",
      "Biển quảng cáo chính trị chứa thông điệp không chính xác về chính sách công cộng. Mong muốn chính trị gia hoặc tổ chức liên quan xem xét và điều chỉnh nội dung quảng cáo để tránh thông tin không đúng.",
      "",
      "",
      "2023-08-12",
      "1",
      "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "2",
      "5",
      "2",
      "Trần Minh Châu",
      "tmc@gmail.com",
      "0976543210",
      "Quảng cáo sản phẩm không có thông tin liên hệ hoặc địa chỉ cửa hàng. Mong muốn doanh nghiệp cung cấp thông tin liên lạc để người dùng có thể tìm thấy cửa hàng dễ dàng hơn.",
      "",
      "",
      "2023-08-17",
      "1",
      "Liên hệ doanh nghiệp để yêu cầu cung cấp thông tin liên hệ và địa chỉ cửa hàng. Đảm bảo rằng quảng cáo chứa thông tin đầy đủ để người dùng dễ dàng liên hệ và đến cửa hàng."
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "2",
      "21",
      "3",
      "Phạm Thị Dung",
      "ptdung@gmail.com",
      "0932123456",
      "Quảng cáo về chiến dịch xã hội hóa thiếu minh bạch về việc quyên góp và cách thức sử dụng các quỹ được huy động. Mong muốn có thêm thông tin về cách mà quỹ sẽ được sử dụng để hỗ trợ cộng đồng.",
      "",
      "",
      "2023-08-23",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "9",
      "4",
      "Hoàng Đức Em",
      "hdem@gmail.com",
      "0798765432",
      "Quảng cáo có chứa thông tin không rõ ràng về ưu đãi hoặc giảm giá. Mong muốn nhận được giải đáp thắc mắc về các điều kiện và điều khoản của ưu đãi được quảng cáo để tránh nhầm lẫn khi mua hàng.",
      "",
      "",
      "2023-08-28",
      "1",
      "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo thông tin chi tiết và rõ ràng về sản phẩm hoặc dịch vụ để tránh hiểu lầm."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "10",
      "2",
      "Võ Thị Hà",
      "vtha@gmail.com",
      "0712345678",
      "Quảng cáo về chiến dịch xã hội hóa cần thêm thông tin về các hoạt động và dự án cụ thể được hỗ trợ. Mong muốn có thông tin chi tiết để hiểu rõ về tác động của việc quyên góp.",
      "",
      "",
      "2023-09-02",
      "1",
      "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng."
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "1",
      "22",
      "3",
      "Đinh Minh Hiếu",
      "dmhieu@gmail.com",
      "0776543210",
      "Quảng cáo không truyền đạt được ưu điểm đặc biệt của sản phẩm hoặc dịch vụ. Mong muốn doanh nghiệp xem xét việc tăng cường thông tin để người tiêu dùng hiểu rõ về giá trị của sản phẩm.",
      "",
      "",
      "2023-09-08",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "14",
      "4",
      "Nguyễn Thị Khánh",
      "ntkt@gmail.com",
      "0123456789",
      "Quảng cáo có chứa thông tin không rõ ràng về các sản phẩm hoặc dịch vụ. Mong muốn nhận được giải đáp thắc mắc về tính năng và đặc điểm chi tiết của sản phẩm để quyết định mua hàng được hiệu quả hơn.",
      "",
      "",
      "2023-09-15",
      "1",
      "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo rằng mọi thông tin về sản phẩm hoặc dịch vụ được truyền đạt rõ ràng và chi tiết để tránh nhầm lẫn"
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "2",
      "19",
      "1",
      "Lý Văn Long",
      "lylong@gmail.com",
      "0987654321",
      "Nhận thức về biển quảng cáo chính trị trên đường. Nội dung không chính xác, thiên hướng chống đối một đảng. Đề nghị kiểm tra thông tin và đảm bảo công bằng trong quảng cáo.",
      "",
      "",
      "2023-09-21",
      "1",
      "Kiểm tra và xác minh thông tin quảng cáo. Nếu phát hiện không chính xác, yêu cầu rút quảng cáo và yêu cầu thông tin chính xác từ người đăng."
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "17",
      "2",
      "Trần Thị Mai",
      "ttmai@gmail.com",
      "0943210765",
      "Ghi nhận quảng cáo chính trị với thông tin đầy đủ. Mong muốn biết rõ về nội dung, nguồn gốc và mục tiêu của quảng cáo để hiểu rõ hơn về các chủ đề chính trị đang được thảo luận.",
      "",
      "",
      "2023-09-26",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "3",
      "3",
      "Bùi Văn Nam",
      "bvn@gmail.com",
      "0798234567",
      "Nhìn thấy quảng cáo sản phẩm mới. Đề xuất thêm thông tin về giá cả và cách sử dụng sản phẩm. Cảm thấy quan tâm và muốn biết thêm để đưa ra quyết định mua hàng.",
      "",
      "",
      "2023-10-02",
      "0",
      ""
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "1",
      "17",
      "4",
      "Phan Thị Oanh",
      "ptoanh@gmail.com",
      "0732123456",
      "Quảng cáo một dịch vụ giải quyết vấn đề y tế. Đề xuất cung cấp thông tin chi tiết về cách dịch vụ hoạt động và chi phí liên quan. Đây là một vấn đề quan trọng, nên cần thông tin đầy đủ để đưa ra quyết định.",
      "",
      "",
      "2023-10-09",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "2",
      "15",
      "3",
      "Trịnh Văn Phúc",
      "tvphuc@gmail.com",
      "0976543021",
      "Tôi đề xuất thêm thông tin về mục tiêu và lợi ích của chương trình xã hội hóa này để người dân hiểu rõ hơn về mục đích của hoạt động này.",
      "",
      "",
      "2023-10-15",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "11",
      "1",
      "Đỗ Thị Quỳnh",
      "dtquynh@gmail.com",
      "0921765432",
      "Phát hiện quảng cáo xã hội hóa với thông tin không chính xác về việc hỗ trợ cộng đồng. Đề xuất kiểm tra và xác nhận các dự án xã hội để đảm bảo sự minh bạch và trung thực.",
      "",
      "",
      "2023-10-21",
      "0",
      ""
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "1",
      "7",
      "2",
      "Nguyễn Minh Quân",
      "nmquan@gmail.com",
      "0712987654",
      "Nhìn thấy quảng cáo về chương trình xã hội hóa giúp trẻ em. Đề xuất cung cấp thông tin chi tiết về dự án, cách đóng góp và cách giúp đỡ để người dân có thể tham gia tích cực.",
      "",
      "",
      "2023-08-14",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "21",
      "3",
      "Lê Văn Sơn",
      "lson@gmail.com",
      "0123567890",
      "Thấy quảng cáo liên quan đến chính sách giáo dục. Gợi ý thêm thông tin về cách áp dụng chính sách và cách hỗ trợ học sinh và giáo viên để tăng cường chất lượng giáo dục.",
      "",
      "",
      "2023-09-03",
      "1",
      "Ghi chép ý kiến liên quan đến chính sách giáo dục. Chuyển ý kiến đến cấp quản lý để xem xét và áp dụng các đề xuất tích cực vào chính sách hiện tại."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "23",
      "4",
      "Hồ Thị Thảo",
      "htthao@gmail.com",
      "0798987654",
      "Quảng cáo về sản phẩm công nghệ mới. Đề xuất cung cấp thông tin về tính năng, hiệu suất và hỗ trợ kỹ thuật để người tiêu dùng có thể đưa ra quyết định mua hàng.",
      "",
      "",
      "2023-09-18",
      "1",
      "Cung cấp thông tin chi tiết về sản phẩm công nghệ mới. Hỗ trợ khách hàng giải quyết thắc mắc về tính năng và giá cả để họ có thể đưa ra quyết định mua hàng."
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "1",
      "1",
      "Mai Văn Tiến",
      "mvtien@gmail.com",
      "0912765432",
      "Tôi nhận thấy một biển quảng cáo chính trị trên đường với nội dung không chính xác. Biển này chứa thông tin sai lệch về ứng cử viên và chính sách, cần được kiểm tra và sửa chữa.",
      "",
      "",
      "2023-10-08",
      "1",
      "Kiểm tra thông tin và yêu cầu chỉnh sửa ngay lập tức."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "20",
      "2",
      "Vũ Thị Uyên",
      "vtuyen@gmail.com",
      "0776543890",
      "Biển quảng cáo chính trị này cần phải đăng ký nội dung để đảm bảo tính chính xác và minh bạch của thông điệp được truyền đạt.",
      "",
      "",
      "2023-08-31",
      "1",
      "Liên hệ với chủ quảng cáo, yêu cầu đăng ký ngay."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "6",
      "3",
      "Nguyễn Minh Vương",
      "nmvuong@gmail.com",
      "0932123456",
      "Tôi muốn đóng góp ý kiến về nội dung của biển quảng cáo chính trị này. Đề xuất cung cấp thông tin chi tiết hơn về chính sách và kế hoạch cụ thể của ứng cử viên để người dân hiểu rõ hơn.",
      "",
      "",
      "2023-10-03",
      "1",
      "Ghi nhận ý kiến, đề xuất yêu cầu thêm thông tin chi tiết."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "4",
      "1",
      "Trần Thị Xuân",
      "ttxuan@gmail.com",
      "0712654321",
      "Biển quảng cáo thương mại này có vẻ chứa thông tin không chính xác về sản phẩm. Đề nghị kiểm tra và chỉnh sửa thông tin để tránh gây hiểu lầm cho người tiêu dùng.",
      "",
      "",
      "2023-09-01",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "14",
      "2",
      "Phan Thanh Yến",
      "ptyen@gmail.com",
      "0923456701",
      "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tuân thủ các quy định về quảng cáo thương mại.",
      "",
      "",
      "2023-09-07",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "2",
      "17",
      "4",
      "Lưu Thị Ánh",
      "lanh@gmail.com",
      "0123123456",
      "Tôi có một số thắc mắc về sản phẩm được quảng cáo. Đề xuất cung cấp thông tin liên hệ hoặc website để tôi có thể tìm hiểu thêm về sản phẩm này.",
      "",
      "",
      "2023-09-14",
      "1",
      "Cung cấp thông tin liên hệ chính thức để giải quyết thắc mắc."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "1",
      "1",
      "Đinh Văn Đức",
      "dvduc@gmail.com",
      "0798765432",
      "Biển quảng cáo xã hội hóa này chứa thông tin không chính xác về tổ chức hoặc sự kiện. Đề nghị kiểm tra và sửa chữa để tránh gây hiểu lầm cho cộng đồng.",
      "",
      "",
      "2023-09-22",
      "0",
      "Thực hiện kiểm tra thông tin và yêu cầu chỉnh sửa ngay."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "17",
      "2",
      "Nguyễn Thị Hoài",
      "nthoai@gmail.com",
      "0712765432",
      "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tránh vi phạm các quy định về quảng cáo xã hội hóa.",
      "",
      "",
      "2023-10-02",
      "1",
      "Liên hệ với tổ chức, yêu cầu đăng ký nội dung ngay lập tức."
    ]
  ]

  const loc_report = [
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "10.7762",
      "106.6985",
      "131 Nam Kỳ Khởi Nghĩa",
      "2",
      "1",
      "Trần Thị Hương Giang",
      "thgiang@gmail.com",
      "0901122334",
      "Tôi phát hiện một quảng cáo không hợp pháp tại địa chỉ này. Xin kiểm tra và loại bỏ nó khỏi trang web của bạn.",
      "",
      "",
      "2023-08-05",
      "0",
      ""
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "1",
      "10.7751",
      "106.7002",
      "103 Lê Thánh Tôn",
      "1",
      "4",
      "Lê Văn Đức",
      "lvduc@gmail.com",
      "0934567890",
      " Tôi muốn đăng ký quảng cáo tại đây. Xin hướng dẫn tôi qua quy trình đăng ký và các bước cần thực hiện để quảng cáo của tôi xuất hiện trên bản đồ.",
      "",
      "",
      "2023-08-12",
      "1",
      "Để đăng ký quảng cáo, vui lòng truy cập trang chính thức của chúng tôi và làm theo hướng dẫn đăng ký. Nếu gặp vấn đề, liên hệ với bộ phận hỗ trợ."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "10.7775",
      "106.699",
      "95 Pasteur",
      "1",
      "1",
      "Nguyễn Thị Mai Anh",
      "ntmanh@gmail.com",
      "0987654321",
      "Bản đồ hiển thị địa chỉ không chính xác. Đề nghị cập nhật để tránh nhầm lẫn từ người dùng.",
      "",
      "",
      "2023-08-17",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "10.7809",
      "106.6863",
      "46 Trương Định",
      "32",
      "3",
      "Bùi Minh Tuấn",
      "bmtuan@gmail.com",
      "0912345678",
      "Khu vực này có lượng người qua lại lớn. Tôi đề xuất thêm điểm quảng cáo để tăng hiển thị thông tin về cộng đồng và doanh nghiệp địa phương.",
      "",
      "",
      "2023-08-23",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "10.7815",
      "106.6869",
      "18A Tú Xương",
      "32",
      "3",
      "Hoàng Thị Lan Anh",
      "htlanh@gmail.com",
      "0978877665",
      "Khu vực này thường xuyên có trẻ em đi lại. Mong muốn các quảng cáo ở đây được thiết kế để phù hợp với độ tuổi của họ, giúp tạo ra một môi trường an toàn và thân thiện hơn.",
      "",
      "",
      "2023-08-28",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "2",
      "10.7787",
      "106.6852",
      "280 Đ. Điện Biên Phủ",
      "32",
      "4",
      "Võ Văn Phúc",
      "vvphuc@gmail.com",
      "0965123456",
      "Ở đây có các bảng quảng cáo nhưng vì sao không có điểm đặt quảng cáo hiển thị trên bản đồ?",
      "",
      "",
      "2023-09-02",
      "1",
      "Kiểm tra và xác nhận rằng điểm quảng cáo tại địa điểm này đã được thêm vào bản đồ. Cảm ơn người dân đã chú ý và báo cáo vấn đề này."
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "2",
      "10.76158915",
      "106.692004",
      "51 Hồ Hảo Hớn",
      "5",
      "1",
      "Đỗ Thị Thanh Thảo",
      "dtthao@gmail.com",
      "0921122334",
      "Địa điểm có gắn quảng cáo trái phép, chưa đăng ký hợp pháp",
      "",
      "",
      "2023-09-08",
      "0"
    ]
  ]

  const adsloc_report = [
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "20",
      "1",
      "Nguyễn Thị Lan Anh",
      "ntlananh@gmail.com",
      "0901234567",
      "Tôi nhận thấy có một quảng cáo không liên quan tại đây. Mong sở kiểm tra và loại bỏ quảng cáo này để giữ cho bản đồ chất lượng hơn.",
      "",
      "",
      "2023-08-05",
      "0",
      ""
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "1",
      "10",
      "2",
      "Trần Văn Tuấn",
      "tvtuan@gmail.com",
      "0912345678",
      "Tôi muốn đăng ký quảng cáo cho cửa hàng của mình tại đây. Xin vui lòng liên hệ để biết thêm thông tin và xác nhận việc đăng ký.",
      "",
      "",
      "2023-08-12",
      "1",
      "Xác nhận thông tin và yêu cầu hình ảnh của quảng cáo. Hỗ trợ chủ quảng cáo cập nhật thông tin và hình ảnh theo yêu cầu."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "25",
      "3",
      "Phạm Thị Hồng",
      "pthong@gmail.com",
      "0923456789",
      "Tôi nghĩ rằng việc thêm một tính năng tìm kiếm địa điểm trên trang web sẽ giúp người dùng tìm thấy thông tin nhanh chóng hơn. Đây là một gợi ý để cải thiện trải nghiệm người dùng.",
      "",
      "",
      "2023-08-17",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "22",
      "4",
      "Lê Minh Tuấn",
      "lmtuan@gmail.com",
      "0934567890",
      "Tôi có một câu hỏi liên quan đến việc đăng ký quảng cáo. Làm thế nào để tôi có thể thay đổi hình ảnh và thông tin trên quảng cáo của mình? Mong nhận được sự hỗ trợ.",
      "",
      "",
      "2023-08-23",
      "1",
      "Hướng dẫn người dùng cách thay đổi thông tin và hình ảnh trên quảng cáo của họ. Cung cấp hỗ trợ kỹ thuật hoặc liên hệ công ty quảng cáo nếu cần."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "24",
      "1",
      "Võ Ngọc Mai",
      "vnmai@gmail.com",
      "0945678901",
      "Tôi phát hiện một quảng cáo không hợp lý tại khu vực công cộng gần công viên. Xin hãy kiểm tra và loại bỏ quảng cáo này để bảo vệ vẻ đẹp của khu vực công cộng này.",
      "",
      "",
      "2023-08-28",
      "1",
      "Xác minh và loại bỏ quảng cáo không phù hợp gần công viên. Thông báo việc xử lý này cho người báo cáo để họ biết rằng vấn đề đã được giải quyết."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "21",
      "1",
      "Hoàng Đức Long",
      "hdl@gmail.com",
      "0956789012",
      "Phát hiện quảng cáo không phù hợp trên bảng quảng cáo công cộng. Mong muốn công việc kiểm tra và xử lý để duy trì trật tự và vẻ đẹp của khu vực.",
      "",
      "",
      "2023-09-02",
      "0",
      ""
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "2",
      "16",
      "3",
      "Bùi Thị Thu Hà",
      "btth@gmail.com",
      "0967890123",
      "Góp ý về việc cải thiện dịch vụ wifi công cộng. Sự cải thiện này sẽ giúp tăng cường tiện ích cho người dân và du khách.",
      "",
      "",
      "2023-09-08",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "2",
      "8",
      "4",
      "Nguyễn Văn Hoàng",
      "nvh@gmail.com",
      "0978901234",
      "Cần thông tin về các sự kiện nghệ thuật và văn hóa diễn ra trong tháng tại khu vực này. Xin hãy cung cấp lịch trình và địa điểm để thuận tiện tham gia.",
      "",
      "",
      "2023-09-15",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "3",
      "2",
      "Đặng Quang Minh",
      "dqminh@gmail.com",
      "0989012345",
      "Cần đăng ký quảng cáo cho sự kiện tại địa điểm công cộng trong tuần tới. Rất mong nhận được hướng dẫn về thủ tục và yêu cầu cần thiết.",
      "",
      "",
      "2023-09-21",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "2",
      "10",
      "2",
      "Lê Thị Ngọc Trâm",
      "ltntram@gmail.com",
      "0990123456",
      "Muốn đăng ký quảng cáo cho sự kiện tại địa điểm công cộng.",
      "",
      "",
      "2023-09-26",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "17",
      "4",
      "Trần Thanh Hải",
      "tthai@gmail.com",
      "0881122334",
      "Biển quảng cáo gần khu vực chợ không rõ ràng về giá cả sản phẩm. Mong muốn có thông tin giải đáp để người tiêu dùng hiểu rõ hơn.",
      "",
      "",
      "2023-10-02",
      "0",
      ""
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "2",
      "6",
      "1",
      "Mai Thị Phương",
      "mtphuong@gmail.com",
      "0872233445",
      "Tôi báo cáo một biển quảng cáo gần công viên với hình ảnh không phù hợp, vi phạm chuẩn mực đạo đức.",
      "",
      "",
      "2023-10-09",
      "1",
      "Liên hệ công ty quảng cáo, đòi hỏi thay đổi hình ảnh không phù hợp ngay lập tức và kiểm tra tuân thủ các nguyên tắc đạo đức."
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "2",
      "11",
      "3",
      "Vũ Thị Thu Hường",
      "vtthuong@gmail.com",
      "0863344556",
      "Tôi đề xuất thêm biển chỉ dẫn đến các trung tâm y tế gần những điểm quảng cáo để cung cấp hướng dẫn hữu ích cho người dân.",
      "",
      "",
      "2023-10-15",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "18",
      "2",
      "Hoàng Văn Thắng",
      "hvthang@gmail.com",
      "0854455667",
      "Biển quảng cáo chứa thông tin không chính xác về một sự kiện sắp tới. Mong được sửa chữa.",
      "",
      "",
      "2023-10-21",
      "1",
      "Thông báo lỗi đến công ty quảng cáo, yêu cầu cập nhật thông tin chính xác về sự kiện và theo dõi việc điều chỉnh."
    ],
    [
      "nthphuc21@clc.fitus.edu.vn",
      "1",
      "1",
      "4",
      "Nguyễn Thị Thanh Nga",
      "nttn@gmail.com",
      "0845566778",
      "Cần biết rõ về quy định liên quan đến việc treo bảng quảng cáo tại các khu dân cư. Xin cung cấp thông tin chi tiết để hiểu rõ hơn.",
      "",
      "",
      "2023-08-14",
      "1",
      "Gửi tài liệu chính thức về quy định liên quan đến việc treo bảng quảng cáo tại khu dân cư, bao gồm các hướng dẫn cụ thể."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "20",
      "1",
      "Lê Văn Đức",
      "lvduc@gmail.com",
      "0836677889",
      "Quảng cáo tại góc đường thiếu ánh sáng ban đêm, tạo ra tình trạng an toàn không tốt. Yêu cầu sửa chữa để tránh tai nạn giao thông.",
      "",
      "",
      "2023-09-03",
      "1",
      "Gửi thông báo cho công ty quảng cáo, yêu cầu tăng cường ánh sáng xung quanh quảng cáo để đảm bảo an toàn giao thông."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "13",
      "2",
      "Phan Thị Quỳnh",
      "ptquynh@gmail.com",
      "0827788990",
      "Đề xuất thay đổi vị trí của quảng cáo gần trường học để tránh gây xao lãng cho học sinh và tăng cường an toàn giao thông.",
      "",
      "",
      "2023-09-18",
      "1",
      "Liên hệ với công ty quảng cáo, thảo luận về việc thay đổi vị trí quảng cáo gần trường học để tăng cường an toàn và tránh gây xao lãng."
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "18",
      "3",
      "Đinh Minh Tâm",
      "dmtam@gmail.com",
      "0818899001",
      "Đề xuất tạo quy định rõ ràng về kích thước quảng cáo tại trung tâm thương mại để giữ gìn vẻ đẹp của thành phố.",
      "",
      "",
      "2023-10-08",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "22",
      "4",
      "Trần Thị Quỳnh Trang",
      "ttqtrang@gmail.com",
      "0809900112",
      "Tôi muốn biết về quy định cụ thể liên quan đến việc đặt bảng quảng cáo tại các cửa hàng nhỏ trong khu vực dân cư. Xin thông tin chi tiết về kích thước, hình dạng, và các bước đăng ký.",
      "",
      "",
      "2023-08-31",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "4",
      "1",
      "Nguyễn Văn Hoa",
      "nvnhoa@gmail.com",
      "0781122334",
      "Phát hiện quảng cáo không phù hợp về sản phẩm thức uống sô-cô-la gần trường học. Mong muốn kiểm tra và chuyển đổi thành quảng cáo thân thiện với trẻ em.",
      "",
      "",
      "2023-10-03",
      "1",
      "Liên hệ công ty quảng cáo, yêu cầu điều chỉnh nội dung quảng cáo về sản phẩm thức uống sô-cô-la gần trường học theo hướng thân thiện với trẻ em."
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "1",
      "25",
      "2",
      "Lê Thị Bích Ngọc",
      "ltbngoc@gmail.com",
      "0772233445",
      "Xin phép đăng ký quảng cáo về sự kiện thiền định. Rất mong được chấp thuận.",
      "",
      "",
      "2023-09-01",
      "1",
      "Phê duyệt đơn đăng ký quảng cáo về sự kiện thiền định, gửi thông báo và hướng dẫn về việc thiết lập quảng cáo."
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "2",
      "16",
      "1",
      "Võ Minh Khánh",
      "vmkhanh@gmail.com",
      "0763344556",
      "Quảng cáo xấu hổ và không lành mạnh gần trường học, gây ảnh hưởng đến học sinh nhỏ tuổi.",
      "",
      "",
      "2023-09-07",
      "0",
      ""
    ],
    [
      "ncluan21@clc.fitus.edu.vn",
      "1",
      "20",
      "1",
      "Đỗ Thị Kim Ngân",
      "dtkngan@gmail.com",
      "0754455667",
      "Quảng cáo vi phạm văn hóa gần công viên, chứa hình ảnh không phù hợp với trẻ em và gia đình.",
      "",
      "",
      "2023-09-14",
      "0",
      ""
    ],
    [
      "pmlinh21@clc.fitus.edu.vn",
      "1",
      "21",
      "2",
      "Phạm Đức Hải",
      "pdhai@gmail.com",
      "0745566778",
      "Xin phép đăng ký quảng cáo về triển lãm nghệ thuật vào cuối tháng này.",
      "",
      "",
      "2023-09-22",
      "0",
      ""
    ],
    [
      "nnlien21@clc.fitus.edu.vn",
      "2",
      "19",
      "3",
      "Hoàng Thị Diệu Linh",
      "htdlinh@gmail.com",
      "0736677889",
      "Đề xuất cải thiện văn hóa giao thông bằng việc thiết lập các bảng chỉ dẫn giao thông rõ ràng và hợp lý trên các tuyến đường chính.",
      "",
      "",
      "2023-10-02",
      "1",
      "Tổ chức cuộc họp với các cơ quan chức năng để đánh giá ý kiến đề xuất. Tiến hành thiết kế và lắp đặt bảng chỉ dẫn giao thông mới trên các tuyến đường chính, nhằm tăng cường an toàn và giảm ùn tắc giao thông. Cảm ơn người dân đã góp ý và thông báo về việc triển khai ý kiến đóng góp."
    ]
  ]

  localStorage.setItem("email", JSON.stringify("lvduc@gmail.com"))
  localStorage.setItem("ads_report", JSON.stringify(ads_report))
  localStorage.setItem("loc_report", JSON.stringify(loc_report))
  localStorage.setItem("adsloc_report", JSON.stringify(adsloc_report))

  // thay đổi kích thước bản đồ khi resize cửa sổ trình duyệt
  $(window).on('resize', function () {
    let windowHeight = $(window).height();
    let headerHeight = $('#header').height();
    let mapHeight = windowHeight - headerHeight;
    $('#map').css('top', headerHeight);
    // console.log(windowHeight, headerHeight, mapHeight)
    $('#map').height(mapHeight);
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

  // cài đặt tiếng việt
  var language = new MapboxLanguage({
    defaultLanguage: 'vi'
  });
  map.addControl(language);

  // lấy dữ liệu lưu vào info
  var info = NguoiDanAdsLoc.content.map(function (item) {
    let { id_ads_location, address, ward, district, loc_type, ads_type,
      photo, is_zoning, longitude, latitude, list_ads, list_report } = item
    let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"

    return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
      photo, longitude, latitude, is_zoning, list_ads, list_report]
  })

  console.log(info)

  // tạo điểm trên map
  createMarker(info, map);

  // bắt sự kiện toggle
  $(".flex-container input").on('click', function (e) {
    createMarker(info, map)
  })

  let marker = new mapboxgl.Marker();
  // bắt sự kiện click trên map
  map.on('click', function (e) {
    let lngLat = e.lngLat;
    longitude = lngLat.lng;
    latitude = lngLat.lat;
    marker.remove()
    marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
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

    $.ajax({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
      method: 'GET',
      data: {
        access_token: mapboxgl.accessToken
      },
      success: function (response) {
        // Lấy địa chỉ từ kết quả Geocoding
        result = response.features[0].place_name;
        console.log(response.features[0])
        // Gán địa chỉ vào phần tử HTML
        $("#address").val(`${result} [${longitude}, ${latitude}]`);
      },
      error: function (error) {
        console.log(error);
      }
    });
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
  });

  map.on('scroll', function () {
    $('#sidebar').hide()
  });
});

//   document.getElementById('geocodeForm').addEventListener('submit', function (event) {
//       event.preventDefault();
//       const address = document.getElementById('address').value;

// fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(address)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
//     .then(response => response.json())
//     .then(data => {
//         let center = data.features[0].center
//         map.flyTo({
//             center: center,
//             zoom: 20
//         })
//         // Create a new marker.
//         marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
//         document.querySelector(".adInfo #data").style.display = 'none';
//         // document.querySelectorAll("#sidebar")[0].style.width = "22%";

//     })
//     .catch(error => {
//         console.error('Error:', error);
//         const resultDiv = document.getElementById('result');
//         resultDiv.innerHTML = '<p>Error during geocoding.</p>';
//     });




// // myReport
// function myReportShow() {
//     console.log("falskdj");
//     document.getElementById('myReport').style.display = 'block';
// }

// document.getElementById('closePopup-myReport').addEventListener('click', function () {
//     document.getElementById('myReport').style.display = 'none';
// });


// // Close the pop-up if the user clicks outside of it
// window.addEventListener('click', function (event) {
//     var popup = document.getElementById('popup');
//     if (event.target == popup) {
//         popup.style.display = 'none';
//     }
// });

const script = document.getElementById('search-js');
script.onload = function () {
  mapboxsearch.autofill({
    accessToken: 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w'
  });
};