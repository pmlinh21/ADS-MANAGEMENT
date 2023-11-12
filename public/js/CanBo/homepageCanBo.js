// đã hard code (quận)

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

function clearMarker(markers){
  for (let i = 0; i < markers.length; i++) {
    markers[i].remove(); // Remove marker from the map
  }
  markers.splice(0, markers.length );

}

function createMarker(info, map, markers){
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
    var svg = $(`<svg class = ${info[index][0]} viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8" fill=${colorMarker} /></svg>`);
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

    let mark = new mapboxgl.Marker(marker[0]).setLngLat(coord).addTo(map);
    markers.push(mark);
  });
}

$(document).ready(function () {
    // 2 = Quan, 1 = Phuong, 3 = Sở
    const role = 2; 

    const id_district = 1;
    var wards, info, markers = []

    // const id_ward;


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

    if (role === 1) {
        $("#select-ward").hide();
    }
    else if (role === 2) {
      // $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
      //   console.log("~");
      
        info = getAdsLocation.content.map(function(data){
          let {id_ads_location, address, ward, loc_type, ads_type, 
            photo, is_zoning, longitude, latitude, hasAds, hasReport} = data
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
          id_ads_location = parseInt(id_ads_location)
          return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
            photo, longitude, latitude, is_zoning,  hasAds, hasReport]
        })
        console.log(info)
        createMarker(info, map, markers);
        
      // }).fail(function(error) {
      //   console.log(error);
      // })

      // $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
        wards = getWard.content
        console.log("!");
        renderWard(wards);
      // }).fail(function(error) {
      //   console.log(error);
      // });

      $(".select-ward-bar").on('click', function(){
        $("hr").show()
        $("#ward-container").show();
        $('#manage').css('pointer-events', 'none');
        $('#account').css('pointer-events', 'none');
        $('#logout').css('pointer-events', 'none');

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

          let filter_info  = []
          info.forEach(function(item){
            if (selected_ward.includes(item[2])){
              filter_info.push(item)
            } 
          })
          clearMarker(markers);
          createMarker(filter_info, map, markers);
          // console.log(markers)

          $('#manage').css('pointer-events', 'auto');
          $('#account').css('pointer-events', 'auto');
          $('#logout').css('pointer-events', 'auto');
          return
        })
      })
    }
    else{
      $("#select-ward").hide();
    }

    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');
    if (role === 3){
      $('#manage .nav-link').attr('href','/quanlichung')
    } else{
      manageButton.hover(
        function () {
          $(this).addClass('li-hover');
          $('#manage .nav-link').addClass('nav-link-hover');
          manageMenu.show();
          $('.black-bg').show()
        },
        function () {
          $(this).removeClass('li-hover');
          $('#manage .nav-link').removeClass('nav-link-hover');
          manageMenu.hide();
          $('.black-bg').hide()
        }
      );
    }

  });