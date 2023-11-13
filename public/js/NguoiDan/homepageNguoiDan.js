$(document).ready(function () {

    // hoặc thay access token của mn cũng được
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.6974, 10.7743],
        zoom: 15
    });

    var data = getAdsLocation;

    // $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
    // console.log("~");
    info = data.content.map(function (data) {
        let { id_ads_location, address, ward, loc_type, ads_type,
            photo, is_zoning, longitude, latitude, hasAds, hasReport } = data
        let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
        id_ads_location = parseInt(id_ads_location)
        return [id_ads_location, address, ward, loc_type, ads_type, zoning_text,
            photo, longitude, latitude, is_zoning, hasAds, hasReport]
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

        marker.on('mouseenter', function () {
            popup.setLngLat(coord).addTo(map);
        });

        marker.on('mouseleave', function () {
            popup.remove();
        });

        marker.on('mousedown', function(){
            document.querySelectorAll("#sidebar")[0].style.width = "20%";
            document.querySelectorAll("#sidebar")[0].style.color = "red"
        })

        new mapboxgl.Marker(marker[0]).setLngLat(coord).addTo(map);
    });


});
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}