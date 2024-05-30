var flag = false;

function red(item) {

  if (item[12])
    if (item[12].some(report => !report.status))
      return true

  if (item[11]) {
    for (let i = 0; i < item[11].length; i++)
      if (item[11][i]?.list_report?.some(report => !report.status))
        return true
  }

  return false
}

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

function renderMapWard(wards) {
  console.log(wards)
  var template = ` 
      <% for (var i = 0; i < wards.length; i++) { %>
          <div class = "form-check">
              <input class = "form-check-input" type="checkbox" id="<%=wards[i].ward%>" checked/>
              <label chass = "form-check-label" for="<%=wards[i].ward%>"><%= wards[i].wardName %></label>
          </div>
      <% } %>
      <div>
          <button type = "button" class = "style2-button">Chọn tất cả</button>
          <button type = "submit" class = "style1-button" >Xác nhận</button>
      </div>`
  var rendered = ejs.render(template, { wards: wards });
  $("#ward-container").html(rendered);
}

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
          ],
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
          'circle-stroke-color': 'red',
          'circle-stroke-width': ['get', 'strokeMarker']
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
      console.log(e.features[0].properties)
      flag = true;
      showSidebar(e.features[0].properties);
      
  })
}

function createMarker(info, map) {
  const quangcao = $('#quangcao').prop("checked")
  const baocao = $('#baocao').prop("checked")
  const chuaquyhoach = $('#quyhoach').prop("checked")
  console.log(quangcao, baocao, chuaquyhoach)

  const features = info.map(item => {
    let colorMarker

    let strokeMarker =  (red(item) && baocao) ? 3 : 0;

    if (!item[10] && chuaquyhoach) // chưa quy hoạch
      colorMarker = 'purple';
    else if (item[11] && quangcao)
      colorMarker = 'blue';
    else
      colorMarker = '#0B7B31';
    let imagePath
    if (item[7] != null && item[7] != "")
      imagePath = item[7]
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
        strokeMarker,
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

  const existingSource = map.getSource('adsloc');
  if (existingSource) {
    map.removeLayer('unclustered-point');
    map.removeLayer('cluster-count');
    map.removeLayer('clusters');
    map.removeSource('adsloc');
  }

  createLayer(map, features)
}

function validateSQLDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

// hiển thị danh sách các bảng quảng cáo
function renderAds({ list_ads, ads_type, loc_type, address, ward, district }) {
  if (list_ads){
    list_ads = JSON.parse(list_ads)
  } else{
    list_ads = []
  }

  var template = `
  <i class="fa-solid fa-circle-info" style="color: #05ACF4; margin-bottom:1rem"></i> 
  Thông tin bảng quảng cáo

  <% for (var i = 0; i < list_ads?.length; i++) { %>
      <div id="data-<%= list_ads[i].id_ads %>">
          <p style="width: 90%;font-size: 1rem; margin-bottom: 0.3rem"><strong><%= list_ads[i].board_type %></strong></p>
          <p style="font-size: 0.7rem; color: gray; margin-bottom: 0.3rem"><%= address %>, phường <%= ward %>, quận <%= district %></p>
          <p>Kích thước:  <strong><%= list_ads[i].width %>m x <%= list_ads[i].height %>m</strong></p>
          <p>Số lượng:  <strong><%= list_ads[i].quantity %> trụ / bảng</strong></p>
          <p>Hình thức:  <strong><%= ads_type %></strong></p>
          <p>Phân loại:  <strong><%= loc_type %></strong></p>

          <div class="detail-button data-<%= list_ads[i].id_ads %>" data-target="#detail-popup">
            <i class="fa-solid fa-circle-info"></i>
          </div>

          <div class = "button-group ads-<%= list_ads[i].id_ads %>">
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

function renderReport(list_report, container) {
  list_report = list_report?.sort((a, b) => {
    return new Date(b.report_time).getTime() - new Date(a.report_time).getTime();
  });
  
  const note = list_report?.map(item => {
    return {
      statusClass: item.status ? "resolved" : "unresolved",
      statusText: item.status ? "Đã xử lí" : "Chưa xử lí",
      imagePath1: item.photo1 ? item.photo1 : '',
      imagePath2: item.photo2 ? item.photo2 : ''
    }
  })
  console.log(list_report)

  if (!list_report || list_report.length == 0) {
    var template = `
    <p class = "text-center"> (Chưa có báo cáo) </p>
    `;
  } else {
    var template = `
    <% for (var i = 0; i < list_report?.length; i++) { %>
      <div class="other-report row" >
        <div class="col-md-12 detail">
          <strong>Thời gian báo cáo:</strong> 
          <% const reportDate = new Date(list_report[i].report_time); %>
          <% reportDate.setHours(reportDate.getHours()); %>
          <%= reportDate.getDate().toString().padStart(2, '0') %>-<%= (reportDate.getMonth() + 1).toString().padStart(2, '0') %>-<%= reportDate.getFullYear() %> <%= reportDate.getHours().toString().padStart(2, '0') %>:<%= reportDate.getMinutes().toString().padStart(2, '0') %>:<%= reportDate.getSeconds().toString().padStart(2, '0') %>
        </div>
        <div class="col-md-12 detail">
          <% if (list_report[i].status) { %>
              <strong>Cách thức xử lí:</strong> 
              <%= list_report[i].resolve %>
          <% } %>
        </div>
        <div class="col-md-12 detail">
          <strong>Nội dung báo cáo:</strong> 
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
              <%= list_report[i].report_type %>
            </div>
        </div>
      </div>
    <% } %>
    `;
  }

  var rendered = ejs.render(template, { list_report, note });
  $(container).html(rendered);
}

function renderGiayPhepGiaHan(giahan) {
  const note = giahan.map(item => {
    if (item.status === true)
      return "Đã duyệt"
    else if (item.status === false)
      return "Đã từ chối"
    else
      return "Chưa xét duyệt"
  })

  var template = `
    <% for (var i = 0; i < giahan?.length; i++) { %>
      <form class="row form-ads-create-details mb-3">
          <div class="col-md-4">
              <label class="form-label">Ngày bắt đầu hợp đồng</label>
              <input type="date" class="form-control input-details" value = "<%= formatSQLDate_ymd(giahan[i].start_date)%>" readonly>
          </div>
          <div class="col-md-4">
              <label class="form-label">Ngày kết thúc hợp đồng</label>
              <input type="date" class="form-control input-details" value = "<%= formatSQLDate_ymd(giahan[i].end_date)%>" readonly>
          </div>
          <div class="col-md-4">
            <label for="height" class="form-label">Trạng thái cấp phép</label>
            <input type="text" class="form-control input-details" value = "<%= note[i]%>" readonly>
          </div>
      </form>
    <% } %>
    `;

  var rendered = ejs.render(template, { giahan, note });
  $("#detail-popup .giay-phep-gia-han .content").html(rendered);
}

// hiển thị sidebar và bắt sự kiện trên sidebar
function showSidebar(adsloc) {
  $(".flex-container.toggle").hide();
  $('#sidebar').show()
  renderAds(adsloc)
  
  $(".locInfo .address").text(`${adsloc.address}, phường ${adsloc.ward}, quận ${adsloc.district}`)

  $("#sidebar .detail-button").on("click", function () {
    $("#loading-bg").show()
    let str_id_ads = $(this).attr("class").split(" ")[1];
    let id_ads = parseInt(str_id_ads.split("-")[1])
    // console.log(id_ads)

    const list_ads = JSON.parse(adsloc.list_ads)
    ads = list_ads?.filter(item => item.id_ads == id_ads)[0]

    if (ads.photo) {
      $("#detail-popup .hinh-anh-bqc img").attr("src", ads.photo)
      $("#detail-popup .hinh-anh-bqc img").show()
      $("#detail-popup .hinh-anh-bqc p").hide()
    } else {
      $("#detail-popup .hinh-anh-bqc img").hide()
      $("#detail-popup .hinh-anh-bqc p").show()
    }

    $.ajax({
      url: `/api/basic/getAdsCreateByAds/${ads.id_ads}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data)
        console.log(ads.id_ads)

        if (data.content.length > 0) {
          $("#detail-popup").modal('show');
          const [info, ...giahan] = data.content

          $('#id').val(info.id_create);
          $('#board_type').val(info.board_type);
          $('#size').val(info.width + 'm x ' + info.height + "m");
          $('#quantity').val(info.quantity);
          $('#content').val(info.content);
          $('#adsloc').val(`${info.address_adsloc}, phường ${info.ward}, ${info.district}`);
          $('#company').val(info.company);
          $('#email').val(info.email);
          $('#phone').val(info.phone);
          $('#address').val(info.address);
          $('#start_date').val(formatSQLDate_ymd(info.start_date));
          $('#end_date').val(formatSQLDate_ymd(info.end_date));
          $('#status').val(info.status === true ? "Đã duyệt" : (
            info.status === false ? "Đã từ chối" : "Chưa xét duyệt"));
          $('#officer').val(info.officer);
          $('#office').val(info.office === 1 ? "Quận" : (info.office === 2 ? "Phường" : ""));

          if (info.photo) {
            $("#detail-popup .image p").hide()
            $("#detail-popup .image img").show()
            $("#detail-popup .image img").attr("src", info.photo)
          } else {
            $("#detail-popup .image img").hide()
            $("#detail-popup .image p").show()
          }

          if (giahan?.length > 0)
            renderGiayPhepGiaHan(giahan);

        }
        else {
          $("#detail-popup").hide()
          alert("Chưa có thông tin giấy cấp phép")
        }

        $("#loading-bg").hide()
      },
      error: function () {
        $("#loading-bg").hide()
      }
    })
  })

  $("#sidebar .adInfo .other-report-button").on("click", function () {
    let str_id_ads = $(this).closest(".button-group").attr("class").split(" ")[1];
    let id_ads = parseInt(str_id_ads.split("-")[1])
    console.log("id_ads: ", id_ads)

    let list_ads = JSON.parse(adsloc.list_ads)
    let ads = list_ads.filter(item => item.id_ads === id_ads)[0]
    console.log(ads.list_report)

    renderReport(ads.list_report, "#other-report-popup .modal-body")
  })

  $("#sidebar .locInfo .other-report-button").off("click").on("click", function () {
    console.log(adsloc)

    if (adsloc.id_ads_location) {
      let list_report

      if (adsloc.list_report)
        list_report = JSON.parse(adsloc.list_report);
      else  
        list_report = []
      console.log(list_report)
      renderReport(list_report, "#other-report-popup .modal-body")
      return

    } else {
      list_report = []
      var url = "";
      if (id_district)
        url = "api/quan/getLocReport/" + id_district
      else if (id_ward)
        url = "api/quan/getLocReportWard/" + id_ward
      else
        url = "api/so/getAllBaoCaoDD"

      $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
          console.log(data.content)

          console.log("thông tin của điểm được click: ")
          console.log(adsloc.longitude.toFixed(4))
          console.log(adsloc.latitude.toFixed(4))
          console.log(adsloc.address)
          console.log(adsloc.ward)
          const loc_report = data.content.filter(function (item) {
            return (
              (item.longitude.toFixed(4) == adsloc.longitude.toFixed(4) && item.latitude.toFixed(4) == adsloc.latitude.toFixed(4) ||
                (item.address == adsloc.address && item.ward == adsloc.ward))
            );
          });

          renderReport(loc_report, "#other-report-popup .modal-body");
        },
        error: function (error) {
          console.log(error);
        }
      });

    }
  })

  $("#sidebar").on("click", '.close-button', function () {
    $('#sidebar').hide()
    $(".flex-container.toggle").show()
    $(".mapboxgl-marker").remove()
  })

}

function changeMapSize() {
  let windowHeight = $(window).height();
  let headerHeight = $('#header').height();
  let mapHeight = windowHeight - headerHeight;
  $('#map').css('top', headerHeight);
  $('#sidebar').css('top', headerHeight);
  // console.log(windowHeight, headerHeight, mapHeight)
  $('#map').height(mapHeight);
  $('#sidebar').height(mapHeight);
}

// hard code
$(document).ready(function () {
  var wards, info, filter_info

  $(window).on('resize', function () {
    changeMapSize();
  });

  
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [106.6974, 10.7743],
    zoom: 15,
    language: 'vi'
});

  var language = new MapboxLanguage({
    defaultLanguage: 'vi'
  });

  map.addControl(language);
  map.addControl(new mapboxgl.NavigationControl());

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
      "strokeMarker": null,
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
      "list_ads": "[]",
      "list_report": "[]"
    }
    // $('#sidebar').hide()

    fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc&lang=vi`)
      .then(response => response.json())
      .then(data => {
        const feature = data.items[0].address
        locObject.ward = feature?.district.substring(7)
        locObject.district = feature?.city.substring(5)
        locObject.address = (feature?.houseNumber && feature?.street)
          ? feature?.houseNumber + " " + feature?.street
          : feature?.label.substring(0, feature?.label.indexOf(", Phường"))
        locObject.longitude = longitude
        locObject.latitude = latitude

        if (!flag) {
          console.log(flag)
          showSidebar(locObject)
        } else {
          console.log(flag)
        }

        flag = false

      })
      .catch(error => {
        console.error('Error:', error);
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

  function geocoding(marker, item) {
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
      "strokeMarker": null,
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

  map.on('style.load', () => {
  if (role === "2") {
    $("#select-ward").hide();

    $.ajax({
      url: `/api/quan/getMapAdsLoc/${id_ward}`,
      type: "GET",
      beforeSend: function () {
        $("#loading-bg").show()
      },
      success: function (data) {
        console.log("~");
        info = data.content.map(function (item) {
          let { id_ads_location, address, ward, district, loc_type, ads_type,
            photo, is_zoning, longitude, latitude, list_ads, list_report } = item;
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch";
          return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
            photo, longitude, latitude, is_zoning, list_ads, list_report];
        })

        console.log(info)
        filter_info = [...info]

        changeMapSize()
        createMarker(info, map);
        $("#loading-bg").hide()
      },
    })

    $(".flex-container input").on('click', function (e) {
      createMarker(filter_info, map)
    })
  }
  else if (role === "1") {

    $.ajax({
      url: `/api/quan/getMapInfo/${id_district}`,
      type: "GET",
      beforeSend: function () {
        $("#loading-bg").show()
      },
      success: function (data) {
        console.log("~");
        info = data.content.map(function (item) {
          let { id_ads_location, address, ward, district, loc_type, ads_type,
            photo, is_zoning, longitude, latitude, list_ads, list_report, id_district } = item;
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch";
          return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
            photo, longitude, latitude, is_zoning, list_ads, list_report, id_district];
        })

        console.log(info)
        filter_info = [...info]

        
          createMarker(info, map);
        $("#loading-bg").hide()
      },
    })

    $.get(`/api/quan/getWard/${id_district}`, function (data) {
      wards = data.content
      display_wards = data.content.map(ward => {
        const wardName = (!isNaN(parseInt(ward.ward))) ? `phường ${ward.ward}` : ward.ward
        return {
          wardName: wardName,
          ward: ward.ward
        }
      })
      // console.log(display_wards);
      renderMapWard(display_wards);

      $(document).on('click', function (event) {
        if (!$(event.target).closest('#select-ward').length && $('#ward-container').is(':visible')) {
          $("#select-ward hr").hide()
          $("#ward-container").hide();
        }
      });

      $(".select-ward-bar").on('click', function (e) {
        $("#sidebar").hide()
        $("#select-ward hr").show()
        $("#ward-container").show();
        $('#manage').css('pointer-events', 'none');
        $('#account').css('pointer-events', 'none');
        $('#logout').css('pointer-events', 'none');
        $('.search-address-bar').prop('readonly', true);
        map.interactive = !map.interactive;

        // nhấn chọn tất cả
        $("#ward-container .style2-button").off("click").on("click", function () {
          console.log("a")
          $('#ward-container .form-check input').prop('checked', true);
        })

        // nhấn áp dụng
        $("#ward-container .style1-button").off("click").on("click", function (e) {
          e.preventDefault();
          $("hr").hide()
          $("#ward-container").hide();

          var selected_ward = $(":checkbox").map(function () {
            if (this.checked)
              return this.id
          }).get();

          let result = []
          info.forEach(function (item) {
            if (selected_ward.includes(item[2])) {
              result.push(item)
            }
          })
          filter_info = [...result]
          // console.log(filter_info)
          // clearMarker(map);
          createMarker(filter_info, map);
          // console.log(markers)

          $('#manage').css('pointer-events', 'auto');
          $('#account').css('pointer-events', 'auto');
          $('#logout').css('pointer-events', 'auto');
          $('.search-address-bar').prop('readonly', false);
        })
      })
    }).fail(function (error) {
      console.log(error);
    })

    $(".flex-container input").on('click', function (e) {
      createMarker(filter_info, map)
    })
  }
  else {
    $("#select-ward").hide();

    $("#loading-bg").show()
    $.ajax({
      url: `/api/so/getMapInfo`,
      type: "GET",
      success: function (data) {

        const allAdsLoc = data.content


        info = data.content.map(function (item) {
          let { id_ads_location, address, ward, district, loc_type, ads_type,
            photo, is_zoning, longitude, latitude, list_ads, list_report, id_district } = item;
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch";
          return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
            photo, longitude, latitude, is_zoning, list_ads, list_report, id_district];
        })

        console.log(info)
        filter_info = [...info]

        changeMapSize()
        createMarker(info, map);
        $("#loading-bg").hide()
      },
    })

    $(".flex-container input").on('click', function (e) {
      createMarker(filter_info, map)
    })
  }
  })
  $('.search-address-bar').on('keydown', function (event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
      let address = $('.search-address-bar').val()
      console.log(address)

      $(".search-address hr").show()
      $(".resultapi-address").show()
      $('.gray-bg').show()
      $('#manage').css('pointer-events', 'none');
      $('#account').css('pointer-events', 'none');
      $('#logout').css('pointer-events', 'none');
      $('#map').css('pointer-events', 'none');
      $('#select-ward').css('pointer-events', 'none');
      $('.flex-container').css('pointer-events', 'none');

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

  $(document).mouseup(function (e) {
    const container = $('.search-address-bar'); // Replace with the ID or selector of your div

    // If the clicked element is not a descendant of the div
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $(".search-address hr").hide()
      $(".resultapi-address").hide()
      $('.gray-bg').hide()
      $('#manage').css('pointer-events', 'auto');
      $('#account').css('pointer-events', 'auto');
      $('#logout').css('pointer-events', 'auto');
      $('#map').css('pointer-events', 'auto');
      $('#select-ward').css('pointer-events', 'auto');
      $('.flex-container').css('pointer-events', 'auto');
    }
  });
})