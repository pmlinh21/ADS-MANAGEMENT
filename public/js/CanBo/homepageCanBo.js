var flag = false;

function renderWard(wards){
  var template = ` 
      <% for (var i = 0; i < wards.length; i++) { %>
          <div class = "form-check">
              <input class = "form-check-input" type="checkbox" id="<%=wards[i].ward%>" checked/>
              <label chass = "form-check-label" for="<%=wards[i].ward%>"><%= wards[i].ward %></label>
          </div>
      <% } %>
      <div>
          <button type = "button" class = "style2-button">Chọn tất cả</button>
          <button type = "submit" class = "style1-button" >Xác nhận</button>
      </div>`
  var rendered = ejs.render(template, { wards: wards });
  $("#ward-container").html(rendered);
}

function createLayer(map, features){
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
   
  // inspect a cluster on click
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

  map.on('mouseenter', 'unclustered-point', (e) => {

  const coordinates = e.features[0].geometry.coordinates.slice();
  const ads_type = e.features[0].properties.ads_type;
  const loc_type = e.features[0].properties.loc_type;
  const address = e.features[0].properties.address;
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
    <p class = "address">${address}</p>
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
  });

  });
  // nhấn vào điểm đặt
  map.on('mousedown', 'unclustered-point', (e) => {
    const feature = e.features[0];
    if (feature.popup) {
      feature.popup.remove();
      delete feature.popup;
    }

    showSidebar(e.features[0].properties);
  })
}

function createMarker(info, map){
  const quangcao = $('#quangcao').prop("checked")
  const baocao = $('#baocao').prop("checked")
  const chuaquyhoach = $('#quyhoach').prop("checked")
  console.log(info)

  const features = info.map(item => {
    let colorMarker
    if (item[11] > 0 && baocao)
      colorMarker = 'red';
    else if (item[9] == 0 && chuaquyhoach) // chưa quy hoạch
      colorMarker = 'purple'; 
    else if (item[10] > 0 && quangcao)
      colorMarker = 'blue'; 
    else 
      colorMarker = '#0B7B31'; 
    let imagePath
    if (item[6] != "")
      imagePath = "../../../public/image/" + item[6]
    else
      imagePath = "../../../public/image/image-placeholder.jpg"
    // console.log(imagePath)

    return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item[7], item[8]]
    },
    properties: {
      colorMarker,
      id_ads_location: item[0], 
      address: item[1], 
      ward: item[2], 
      loc_type: item[3], 
      ads_type: item[4],
      zoning_text: item[5], 
      imagePath,
      longitude: item[7],
      latitude: item[8], 
      is_zoning: item[9],  
      hasAds: item[10], 
      hasReport: item[11]
    }
  }});
  // console.log(features)

  const existingSource = map.getSource('adsloc');
  if (existingSource){
    map.removeLayer('unclustered-point');
    map.removeLayer('cluster-count');
    map.removeLayer('clusters');
    map.removeSource('adsloc');

    createLayer(map, features)
    
  } else{
    map.on('load', () => {
      createLayer(map, features)
    });
  }
}

function createMarker_2(info, map) {
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
  // list_report = JSON.parse(list_report);
  console.log("list_report: ", list_report)
  const note = list_report?.map(item => {
    const statusClass = parseInt((item[12])) ? "resolved" : "unresolved";
    const statusText = parseInt((item[12])) ? "Đã xử lí" : "Chưa xử lí"
    const id_report_type = parseInt((item[4]))
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
      statusClass: statusClass,
      statusText: statusText,
      report_type: report_type,
      imagePath1: item[9] ? `../../../public/image/${item[9]}` : '',
      imagePath2: item[10] ? `../../../public/image/${item[10]}` : ''
    }
  })
  console.log(note)
  // list_report.forEach((item, index) => console.log(item, note[index]))
  var template = `
  <% for (var i = 0; i < list_report?.length; i++) { %>
    <div class="other-report row" >
      <div class="col-md-12">
        <%= list_report[i][8] %>
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
  $(container).html(rendered);
}

// hiển thị sidebar và bắt sự kiện trên sidebar
function showSidebar(adsloc) {
  $(".flex-container.toggle").hide();
  $('#sidebar').show()
  renderAds(adsloc)
  flag = true;

  if (adsloc.id_ads_location)
    $(".locInfo .address").text(`${adsloc.address}, phường ${adsloc.ward}, ${adsloc.district}`)
  else
    $(".locInfo .address").text(`${adsloc.address}, ${adsloc.ward}, ${adsloc.district}`)


  $("#sidebar .detail-button").on("click", function () {
    let str_id_ads = $(this).attr("class").split(" ")[1];
    let id_ads = parseInt(str_id_ads.split("-")[1])
    console.log(id_ads)

    const list_ads = JSON.parse(adsloc.list_ads)
    ads = list_ads?.filter(item => item.id_ads == id_ads)[0]

    let imagePath = (!ads.photo
      ? `../../../public/image/image-placeholder.jpg`
      : `../../../public/image/${ads.photo}`)
    $("#detail-popup .image img").attr("src", imagePath)
    $("#detail-popup .expired-date").text("Ngày hết hạn hợp đồng: " + validateSQLDate(ads.expired_date))
    console.log(imagePath)
  })

  $("#sidebar .adInfo .other-report-button").on("click", function () {
    let str_id_ads = $(this).closest(".button-group").attr("class").split(" ")[1];
    let id_ads = parseInt(str_id_ads.split("-")[1])
    console.log("id_ads: ", id_ads)
    let tmp = localStorage.getItem('ads_report')
    let list_report = (tmp) ? JSON.parse(tmp) : [];
    console.log("list_report: ", list_report);
    list_report = list_report.filter(item => item[3] == id_ads)

    renderReport(list_report, "#other-report-popup .modal-body")
    renderReport(list_report, "#other-report-popup .modal-body")
  })

  $("#sidebar .locInfo .other-report-button").on("click", function () {

    if (adsloc.id_ads_location) {
      let tmp = localStorage.getItem('ads_loc_report')
      let list_report = (tmp) ? JSON.parse(tmp) : [];
      console.log("list_report: ", list_report);
      list_report = list_report.filter(item => item[3] == adsloc.id_ads_location)
      console.log(list_report)
      renderReport(list_report, "#other-report-popup .modal-body")
      renderReport(list_report, "#other-report-popup .modal-body")
    } else{
      let tmp = localStorage.getItem('loc_report')
      let list_report = (tmp) ? JSON.parse(tmp) : [];
      console.log("list_report: ", list_report);
      list_report = list_report.filter(item => 
        (item[3] == adsloc.longitude && item[4] == adsloc.latitude) || (item[5]) == adsloc.address)
        console.log(list_report)
      renderReport(list_report, "#other-report-popup .modal-body")
      renderReport(list_report, "#other-report-popup .modal-body")
    }
    
    
  })

  $("#sidebar").on("click", '.close-button', function () {
    $('#sidebar').hide()
    $(".flex-container.toggle").show()
  })

}

// hard code
$(document).ready(function () {
const role = parseInt(localStorage.getItem('role'))
console.log(role);
if (isNaN(role))
  window.location.href = "/login"
const id_district = 1;
var wards, info, filter_info

$(window).on('resize', function(){
  let windowHeight = $(window).height();
  let headerHeight = $('#header').height();
  let mapHeight = windowHeight - headerHeight;
  $('#map').css('top', headerHeight);
  $('#sidebar').css('top', headerHeight);
  // console.log(windowHeight, headerHeight, mapHeight)
  $('#map').height(mapHeight);
  $('#sidebar').height(mapHeight);
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

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  language: 'vi', // Set the language to Vietnamese for geocoding
  countries: 'vn' // Limit results to Vietnam
});
// map.addControl(geocoder);

if (role === 2) {
  $("#select-ward").hide();
  email = localStorage.getItem('email');
  const storedCBPhuong = localStorage.getItem('cbphuong');
  cbphuong = storedCBPhuong ? JSON.parse(storedCBPhuong) : [];
  cb = cbphuong.find(item => item[0] === email);
  const id_ward = cb[5];

  let phuong = [
    [1, 'Bến Nghé', '1'], [2, 'Bến Thành', '1'], [3, 'Cầu Kho', '1'], [4, 'Cầu Ông Lãnh', '1'], [5, 'Cô Giang', '1'], 
    [6, 'Đa Kao', '1'], [7, 'Nguyễn Cư Trinh', '1'], [8, 'Nguyễn Thái Bình', '1'], [9, 'Phạm Ngũ Lão', '1'], [10, 'Tân Định', '1'], 
    [11, 'An Khánh', '2'], [12, 'An Lợi Đông', '2'], [13, 'An Phú', '2'], [14, 'Bình An', '2'], [15, 'Bình Khánh', '2'], 
    [16, 'Cát Lái', '2'], [17, 'Thạnh Mỹ Lợi', '2'], [18, 'Thảo Điền', '2'], [19, 'Thủ Thiêm', '2'], [20, 'Bình Trưng Đông', '2'], 
    [21, '1', '3'], [22, '2', '3'], [23, '3', '3'], [24, '4', '3'], [25, '5', '3'], [26, '9', '3'], [27, '10', '3'],
    [28, '11', '3'], [29, '12', '3'], [30, '13', '3'], [31, '14', '3'], [32, 'Võ Thị Sáu', '3'],
    [33, '1', '4'], [34, '2', '4'], [35, '3', '4'], [36, '4', '4'], [37, '6', '4'], [38, '8', '4'], [39, '9', '4'], [40, '10', '4'],
    [41, '13', '4'], [42, '14', '4'], [43, '15', '4'], [44, '16', '4'], [45, '18', '4']
  ];

  var info = NguoiDanAdsLoc.content.map(function (item) {
    let { id_ads_location, address, ward, district, loc_type, ads_type,
      photo, is_zoning, longitude, latitude, list_ads, list_report } = item;
    let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch";
  
    return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
        photo, longitude, latitude, is_zoning, list_ads, list_report];
  })

  let filteredInfo = info.filter(function(item) {
    if (item[2] === phuong[id_ward-1][1]) {
      return true;
    }
    return false;
  });
  info = filteredInfo;
  console.log(info);

  createMarker_2(info, map);
  filter_info = [...info];

  $(".flex-container input").on('click', function(e){
    createMarker_2(filter_info, map)
  })

  // let marker = new mapboxgl.Marker();
  // map.on('click', function (e) {
  //   let lngLat = e.lngLat;
  //   longitude = lngLat.lng;
  //   latitude = lngLat.lat;
  //   marker.remove()
  //   marker = new mapboxgl.Marker({
  //     color: '#0B7B31'
  //   }).setLngLat(lngLat).addTo(map);
  //   map.flyTo({
  //     center: lngLat,
  //     zoom: 17
  //   })

  //   let locObject = {
  //     "colorMarker": null,
  //     "id_ads_location": null,
  //     "address": null,
  //     "ward": null,
  //     "district": null,
  //     "loc_type": null,
  //     "ads_type": null,
  //     "zoning_text": null,
  //     "imagePath": null,
  //     "longitude": null,
  //     "latitude": null,
  //     "is_zoning": null,
  //     "list_ads": "null",
  //     "list_report": "null"
  //   }
    
  //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(longitude)},${(latitude)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       locObject.ward = data.features[0].context[0].text;
  //       locObject.district = data.features[0].context[2].text;
  //       locObject.address = data.features[0].properties.address;
  //       locObject.longitude = longitude
  //       locObject.latitude = latitude

  //         if (!flag){
  //           console.log(flag) 
  //           showSidebar(locObject) 
  //         } else{
  //           console.log(flag) 
  //         }
          
  //         flag = false
          
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });

  //   // Lắng nghe sự kiện mousedown trên bản đồ
  //   map.on('mousedown', function () {
  //     // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
  //     map.getCanvas().style.cursor = 'grab';
  //   });

  //   // Lắng nghe sự kiện mouseup trên bản đồ
  //   map.on('mouseup', function () {
  //     // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
  //     map.getCanvas().style.cursor = 'pointer';
  //   })

  // });
    
}
else if (role === 1) {

    info = NguoiDanAdsLoc.content.map(function (item) {
      let { id_ads_location, address, ward, district, loc_type, ads_type,
        photo, is_zoning, longitude, latitude, list_ads, list_report, id_district } = item;
      let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch";
    
      return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
          photo, longitude, latitude, is_zoning, list_ads, list_report, id_district];
    })
  
    info = info.filter(item => item[13] == 1)
    console.log(info);

    createMarker_2(info, map);
    filter_info = [...info]

    wards = Ward.content
    console.log("!");
    renderWard(wards);

  $(".select-ward-bar").on('click', function(){
    $("hr").show()
    $("#ward-container").show();
    $('#manage').css('pointer-events', 'none');
    $('#account').css('pointer-events', 'none');
    $('#logout').css('pointer-events', 'none');
    $('#map').css('pointer-events', 'none');

    // nhấn chọn tất cả
    $("#ward-container .style2-button").off("click").on("click", function(){
      console.log("a")
      $('#ward-container .form-check input').prop('checked', true);
    })

    // nhấn áp dụng
    $("#ward-container .style1-button").off("click").on("click", function(e){
      e.preventDefault();
      $("hr").hide()
      $("#ward-container").hide();

      var selected_ward = $(":checkbox").map(function() {
        if (this.checked)
          return this.id
      }).get();

      let result  = []
      info.forEach(function(item){
        if (selected_ward.includes(item[2])){
          result.push(item)
        } 
      })
      filter_info = [...result]
      // console.log(filter_info)
      // clearMarker(map);
      createMarker_2(filter_info, map);
      // console.log(markers)

      $('#manage').css('pointer-events', 'auto');
      $('#account').css('pointer-events', 'auto');
      $('#logout').css('pointer-events', 'auto');
      $('#map').css('pointer-events', 'auto');

      return
    })
  })

  $(".flex-container input").on('click', function(e){
    createMarker_2(filter_info, map)
  })
  
}
else{
  $("#select-ward").hide();
  info = AdsLocation.content.map(function(data){
      let {id_ads_location, address, ward, loc_type, ads_type, 
        photo, is_zoning, longitude, latitude, hasAds, hasReport} = data
      let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
      id_ads_location = parseInt(id_ads_location)
      return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
        photo, longitude, latitude, is_zoning,  hasAds, hasReport]
  })
    // console.log(info)
  createMarker(info, map);
}

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
    // $('#sidebar').hide()

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(longitude)},${(latitude)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        locObject.ward = data.features[0].context[0].text;
        locObject.district = data.features[0].context[2].text;
        locObject.address = data.features[0].properties.address;
        locObject.longitude = longitude
        locObject.latitude = latitude

          if (!flag){
            console.log(flag) 
            showSidebar(locObject) 
          } else{
            console.log(flag) 
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

})
// api
// $(document).ready(function () {
//     // 2 = Quan, 1 = Phuong, 3 = Sở
//     const role = 2; 

//     const id_district = 1;
//     var wards, info, markers = []

//     // const id_ward;


//     $(window).on('resize', function(){
//       let windowHeight = $(window).height();
//       let headerHeight = $('#header').height();
//       let mapHeight = windowHeight - headerHeight;
//       $('#map').css('top', headerHeight);
//       console.log(windowHeight, headerHeight, mapHeight)
//       $('#map').height(mapHeight);
//     });

//     // set map

//     mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
//     var map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [106.6974, 10.7743],
//         zoom: 15
//     });

//     // set geocoder

//     var geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl,
//     });

//     if (role === 1) {
//         $("#select-ward").hide();
//     }
//     else if (role === 2) {
//       $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
//         console.log("~");
    
//         info = data.content.map(function(data){
//           let {id_ads_location, address, ward, loc_type, ads_type, 
//             photo, is_zoning, longitude, latitude, hasAds, hasReport} = data
//           let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
//           id_ads_location = parseInt(id_ads_location)
//           return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
//             photo, longitude, latitude, is_zoning,  hasAds, hasReport]
//         })
//         console.log(info)
//         createMarker(info, map, markers);
      
//       }).fail(function(error) {
//         console.log(error);
//       })

//       $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
//         wards = data.content
//         console.log("!");
//         renderWard(wards);
//       }).fail(function(error) {
//         console.log(error);
//       });

//       $(".select-ward-bar").on('click', function(){
//         $("hr").show()
//         $("#ward-container").show();
//         $('#manage').css('pointer-events', 'none');
//         $('#account').css('pointer-events', 'none');
//         $('#logout').css('pointer-events', 'none');

//         // nhấn chọn tất cả
//         $("#ward-container .style2-button").off("click").on("click", function(){
//           console.log("a")
//           $('#ward-container .form-check input').prop('checked', true);
//         })

//         // nhấn áp dụng
//         $("#ward-container .style1-button").off("click").on("click", function(e){
//           e.preventDefault();
//           $("hr").hide()
//           $("#ward-container").hide();

//           var selected_ward = $(":checkbox").map(function() {
//             if (this.checked)
//               return this.id
//           }).get();

//           let filter_info  = []
//           info.forEach(function(item){
//             if (selected_ward.includes(item[2])){
//               filter_info.push(item)
//             } 
//           })
//           clearMarker(markers);
//           createMarker(filter_info, map, markers);
//           // console.log(markers)

//           $('#manage').css('pointer-events', 'auto');
//           $('#account').css('pointer-events', 'auto');
//           $('#logout').css('pointer-events', 'auto');
//           return
//         })
//       })
//     }
//     else{
//       $("#select-ward").hide();
//     }

//     const manageButton = $('#manage');
//     const manageMenu = $('#manage .manage-menu');
//     if (role === 3){
//       $('#manage .nav-link').attr('href','/quanlichung')
//     } else{
//       manageButton.hover(
//         function () {
//           $(this).addClass('li-hover');
//           $('#manage .nav-link').addClass('nav-link-hover');
//           manageMenu.show();
//           $('.black-bg').show()
//         },
//         function () {
//           $(this).removeClass('li-hover');
//           $('#manage .nav-link').removeClass('nav-link-hover');
//           manageMenu.hide();
//           $('.black-bg').hide()
//         }
//       );
//     }

// });
