function validateSQLDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function renderAds({list_ads, ads_type, loc_type, address, ward, district}){
  list_ads = JSON.parse(list_ads)
  var template = `
  <i class="fa-solid fa-circle-info" style="color: #05ACF4; margin-bottom:1rem"></i> 
  Thông tin bảng quảng cáo

  <% for (var i = 0; i < list_ads.length; i++) { %>
      <div id="data-<%= list_ads[i].id_ads %>">
          <p style="font-size: 1rem; margin-bottom: 0.3rem"><strong><%= list_ads[i].board_type %></strong></p>
          <p style="font-size: 0.7rem; color: gray; margin-bottom: 0.3rem"><%= address %>, phường <%= ward %>, <%= district %></p>
          <p>Kích thước:  <strong><%= list_ads[i].width %>m x <%= list_ads[i].height %>m</strong></p>
          <p>Số lượng:  <strong><%= list_ads[i].quantity %> trụ / bảng</strong></p>
          <p>Hình thức:  <strong><%= ads_type %></strong></p>
          <p>Phân loại:  <strong><%= loc_type %></strong></p>

          <div class="detail-button data-<%= list_ads[i].id_ads %>" data-target="#detail-popup" data-toggle="modal">
            <i class="fa-solid fa-circle-info"></i>
          </div>

          <div class = "button-group data-<%= list_ads[i].id_ads %>">
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

function showSidebar(adsloc){
  console.log(adsloc)
  $('#sidebar').show()
  renderAds(adsloc)

  $(".locInfo .data").attr("id",`data-${adsloc.id_ads_location}`)
  $(".locInfo .address").text(`${adsloc.address}, phường ${adsloc.ward}, ${adsloc.district}`)

  $("#sidebar").on("click", '.detail-button', function(){
    let str_id_ads = $(this).attr("class").split(" ")[1];
    let id_ads= parseInt(str_id_ads.split("-")[1])
    console.log(id_ads)

    list_ads = JSON.parse(adsloc.list_ads)
    ads = list_ads.filter(item => item.id_ads == id_ads)[0]
  
    let imagePath = (!ads.photo 
    ? `../../../public/image/image-placeholder.jpg` 
    : `../../../public/image/${ads.photo}`)
    $("#detail-popup .image img").attr("src",imagePath)
    $("#detail-popup .expired-date").text("Ngày hết hạn: " + validateSQLDate(ads.expired_date))
    console.log(imagePath)
  })

  $("#sidebar").on("click", '.close-button', function(){
    $('#sidebar').hide()
  })


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

$(document).ready(function () {
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

    var info = NguoiDanAdsLoc.content.map(function (item) {
        let { id_ads_location, address, ward, district, loc_type, ads_type,
            photo, is_zoning, longitude, latitude, list_ads, list_report } = item
        let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
        
        return [id_ads_location, address, ward, district, loc_type, ads_type, zoning_text,
            photo, longitude, latitude, is_zoning, list_ads, list_report ]
    })

    console.log(info)

    createMarker(info, map);

    $(".flex-container input").on('click', function(e){
        createMarker(info, map)
    })
      

    // document.getElementById('geocodeForm').addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     const address = document.getElementById('address').value;

    //     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(address)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
    //         .then(response => response.json())
    //         .then(data => {
    //             let center = data.features[0].center
    //             map.flyTo({
    //                 center: center,
    //                 zoom: 20
    //             })
    //             // Create a new marker.
    //             marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
    //             document.querySelector(".adInfo #data").style.display = 'none';
    //             // document.querySelectorAll("#sidebar")[0].style.width = "22%";
                
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             const resultDiv = document.getElementById('result');
    //             resultDiv.innerHTML = '<p>Error during geocoding.</p>';
    //         });
    // });


});


// document.getElementById('details-popup').addEventListener('click', function () {
//     document.getElementById('details-popup-data').style.display = 'block';
// });

// document.getElementById('closePopup-details').addEventListener('click', function () {
//     document.getElementById('details-popup-data').style.display = 'none';
// });

// document.getElementById('report-popup').addEventListener('click', function () {
//     document.getElementById('report-popup-data').style.display = 'block';
// });

// document.getElementById('closePopup-report').addEventListener('click', function () {
//     document.getElementById('report-popup-data').style.display = 'none';
// });

// document.getElementById('popup-others-report').addEventListener('click', function () {
//     document.getElementById('popup-data-others-report').style.display = 'block';
// });

// document.getElementById('closePopup-other-report').addEventListener('click', function () {
//     document.getElementById('popup-data-others-report').style.display = 'none';
// });

// // locInfo js
// document.getElementById('report-popup-loc').addEventListener('click', function () {
//     document.getElementById('report-popup-data-loc').style.display = 'block';
// });

// document.getElementById('closePopup-report-loc').addEventListener('click', function () {
//     document.getElementById('report-popup-data-loc').style.display = 'none';
// });

// document.getElementById('popup-others-report-loc').addEventListener('click', function () {
//     document.getElementById('popup-data-others-report-loc').style.display = 'block';
// });

// document.getElementById('closePopup-other-report-loc').addEventListener('click', function () {
//     document.getElementById('popup-data-others-report-loc').style.display = 'none';
// });


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

// const script = document.getElementById('search-js');
// script.onload = function () {
//   mapboxsearch.autofill({
//     accessToken: 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w'
//   });
// };