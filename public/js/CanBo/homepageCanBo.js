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
    
    let imagePath
    if (info[index][6] != "")
      imagePath = "../../../public/image/" + info[index][6]
    else
      imagePath = "../../../public/image/image-placeholder.jpg"
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

// hard code
$(document).ready(function () {
  const role = parseInt(localStorage.getItem('role'))
  console.log(role);
  const id_district = 1;
  var wards, info, markers = []

  $(window).on('resize', function(){
    let windowHeight = $(window).height();
    let headerHeight = $('#header').height();
    let mapHeight = windowHeight - headerHeight;
    $('#map').css('top', headerHeight);
    console.log(windowHeight, headerHeight, mapHeight)
    $('#map').height(mapHeight);
  });

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
      createMarker(info, map, markers);

      wards = Ward.content
      console.log("!");
      renderWard(wards);

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

