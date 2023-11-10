
function renderWard(wards){

    var template = ` 
        <% for (var i = 0; i < wards.length; i++) { %>
            <div class = "form-check">
                <input class = "form-check-input" type="checkbox" id="checkbox<%= i + 1 %>" />
                <label chass = "form-check-label" for="checkbox<%= i + 1 %>"><%= wards[i] %></label>
            </div>
        <% } %>
        <div>
            <button class = "style2-button">Chọn tất cả</button>
            <button type = "submit" class = "style1-button" >Xác nhận</button>
        </div>`
    var rendered = ejs.render(template, { wards: wards });
    $("#ward-container").html(rendered);
}

$(document).ready(function () {
    // 2 = Quan, 1 = Phuong
    const role = 2; 
    const id_district = 1;

    // load search bar

    if (role === 1) {
        $("#select-ward").hide();
    }
    else{
        $(".select-ward-bar").on('click', function(){
          $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
              wards = data.content.map(ward => ward.ward);
              console.log("!");
              $("#ward-container").show();
              renderWard(wards);
            }).fail(function(error) {
              console.log(error);
            });

          $("#ward-container .style1-button").on("click", function(e){
            e.preventDefault();
          })
        })
    }

    // set height of map

    $(window).on('resize', function(){
      let windowHeight = $(window).height();
      let headerHeight = $('#header').height();
      let mapHeight = windowHeight - headerHeight;
      $('#map').css('top', headerHeight);
      console.log(windowHeight, headerHeight, mapHeight)
      $('#map').height(mapHeight);
    });

    // set map
  
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.6974, 10.7743],
        zoom: 15
    });

    // set geocoder

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    // getAdsLocation lấy từ apiObject.js (hard code)

    var data = getAdsLocation;

    // $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
      // console.log("~");
      info = data.content.map(function(data){
        let {id_ads_location, address, ward, loc_type, ads_type, 
          photo, is_zoning, longitude, latitude, hasAds, hasReport} = data
        let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
        id_ads_location = parseInt(id_ads_location)
        return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
          photo, longitude, latitude, is_zoning,  hasAds, hasReport]
      })
      
      coordinates = info.map((item) => {
        return [item[7], item[8]]
      })

      coordinates.forEach(function (coord, index) {
        let colorMarker = '#0B7B31'
        if (info[index][11] > 0)
          colorMarker = 'red';
        else if (info[index][9] == 0) // chưa quy hoạch
          colorMarker = 'purple'; 
        else 
          colorMarker = 'blue'; 

        let imagePath = "../../../public/image/" + info[index][6]
        // console.log(imagePath)

        var marker = $('<div class="custom-marker"></div>');
        var svg = $(`<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8" fill=${colorMarker} /></svg>`);
        marker.append(svg);
    
        var popup = new mapboxgl.Popup({
          closeButton: false,
          offset: 15
        }).setHTML(`<div class="popup-content"> 
          <p class = "ads-type"  style = "font-weight: 900">${info[index][4]}</p>
          <p class = "loc-type">${info[index][3]}</p>
          <p class = "address">${info[index][1]}</p>
          <p class = "zoning-text" style = "font-weight: 900; font-style: italic">${info[index][5]}</p>
          <img src = ${imagePath} class = "img-thumbnail" />
        </div>`);
    
        marker.on('mouseenter', function() {
          popup.setLngLat(coord).addTo(map);
        });
    
        marker.on('mouseleave', function() {
          popup.remove();
        });
    
        new mapboxgl.Marker(marker[0]).setLngLat(coord).addTo(map);
      });
      
    // }).fail(function(error) {
    //   console.log(error);
    // })

    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');
    manageButton.hover(
      function () {
        $(this).addClass('li-hover');
        $('#manage .nav-link').addClass('nav-link-hover');
        manageMenu.show();
      },
      function () {
        $(this).removeClass('li-hover');
        $('#manage .nav-link').removeClass('nav-link-hover');
        manageMenu.hide();
      }
    );
  });