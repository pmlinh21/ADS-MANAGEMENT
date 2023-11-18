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
  // console.log(windowHeight, headerHeight, mapHeight)
  $('#map').height(mapHeight);
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
    const storedCBPhuong = localStorage.getItem('cbphuong');
    cbphuong = storedCBPhuong ? JSON.parse(storedCBPhuong) : [];
    email = localStorage.getItem('email');
    cb = cbphuong.find(item => item[0] === email);
    const id_ward = cb[5];
    let ads_location = [
      [1, 10.773695, 106.689636, '59 Nguyễn Thị Minh Khai', 2, 1, 2, 'image1.png', 1, 1],
      [2, 10.77143, 106.693526, '70 Phạm Hồng Thái', 2, 1, 2, 'image2.png', 3, 0],
      [3, 10.770072, 106.693823, '84 Lê Lai', 9, 1, 3, 'image3.png', 3, 0],
      [4, 10.777637, 106.693007, '128 Nguyễn Thị Minh Khai', 32, 3, 5, '', 1, 1],
      [5, 10.778513, 106.693939, '118 Nguyễn Thị Minh Khai', 32, 3, 6, '', 2, 1],
      [6, 10.774799, 106.690473, '138 Nguyễn Thị Minh Khai', 32, 3, 5, '', 1, 0],
      [7, 10.775846, 106.689544, '9 Võ Văn Tần', 32, 3, 2, '', 1, 0],
      [8, 10.772591, 106.69093, '2 Bùi Thị Xuân', 2, 1, 5, 'image1.png', 3, 0],
      [9, 10.774308, 106.688328, '141 Cách Mạng Tháng 8', 25, 3, 4, '', 2, 1],
      [10, 10.775101, 106.686973, '70 Cách Mạng Tháng 8', 25, 3, 3, '', 2, 1],
      [11, 10.776877, 106.688484, '36 Bà Huyện Thanh Quan', 32, 3, 5, '', 3, 1],
      [12, 10.776843, 106.690665, '55-25 Trương Định', 32, 3, 2, '', 1, 1],
      [13, 10.772553, 106.691073, '1 Bùi Thị Xuân', 2, 1, 2, 'image2.png', 3, 0],
      [14, 10.774375, 106.690221, '59 Nguyễn Thị Minh Khai', 2, 1, 3, 'image3.png', 1, 1],
      [15, 10.772146, 106.69246, '161-141 Nguyễn Du', 2, 1, 2, 'image1.png', 1, 1],
      [16, 10.776332, 106.691408, '2-10 Trương Định', 32, 3, 6, '', 2, 1],
      [17, 10.77632696, 106.6891595, '16 Nguyễn Thị Diệu', 32, 3, 1, '', 1, 1],
      [18, 10.7729249, 106.695438, '66 Trương Định', 2, 1, 3, 'image2.png', 2, 1],
      [19, 10.780619, 106.695861, '188 Pasteur', 32, 3, 3, '', 1, 0],
      [20, 10.77915627, 106.6961993, '14 Alexandre de Rhodes', 1, 1, 6, 'image3.png', 1, 0],
      [21, 10.775649, 106.697036, '108 Nguyễn Du', 2, 1, 6, 'image1.png', 3, 1],
      [22, 10.779572, 106.69514, '55-53 Nguyễn Thị Minh Khai', 1, 1, 3, 'image2.png', 1, 1],
      [23, 10.776907, 106.69798, '132 Nam Kỳ Khởi Nghĩa', 2, 1, 1, 'image3.png', 2, 1],
      [24, 10.771666, 106.693518, '550 Lý Tự Trọng', 2, 1, 4, 'image1.png', 3, 1],
      [25, 10.776379, 106.691306, '2-10 Trương Định', 32, 3, 5, '', 3, 0]
    ];
    const filtered_ads_loc = ads_location.filter(row => row[4] === id_ward);
    
}
else if (role === 1) {
    info = QuanAdsLocation.content.map(function(data){
      let {id_ads_location, address, ward, loc_type, ads_type, 
        photo, is_zoning, longitude, latitude, hasAds, hasReport} = data
      let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
      id_ads_location = parseInt(id_ads_location)
      return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
        photo, longitude, latitude, is_zoning,  hasAds, hasReport]
    })
    // console.log(info)
    createMarker(info, map);
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
      createMarker(filter_info, map);
      // console.log(markers)

      $('#manage').css('pointer-events', 'auto');
      $('#account').css('pointer-events', 'auto');
      $('#logout').css('pointer-events', 'auto');
      $('#map').css('pointer-events', 'auto');

      return
    })
  })

  $(".flex-container input").on('click', function(e){
    createMarker(filter_info, map)
  })
  
}
else{
  $("#select-ward").hide();
}

});

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

