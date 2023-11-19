$(document).ready(function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.6974, 10.7743],
        zoom: 15
    });

    var data = QuanAdsLocation;
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

        marker.on('mousedown', function () {
            document.querySelectorAll("#sidebar")[0].style.width = "22%";
        })

        new mapboxgl.Marker(marker[0]).setLngLat(coord).addTo(map);
    });


    document.getElementById('geocodeForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const address = document.getElementById('address').value;

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${(address)}.json?proximity=ip&access_token=pk.eyJ1Ijoia3JlZW1hIiwiYSI6ImNsbzVldjkzcTAwMHEya3F2OHdnYzR1bWUifQ.SHR5A6nDXXsiz1fiss09uw`)
            .then(response => response.json())
            .then(data => {
                let center = data.features[0].center
                map.flyTo({
                    center: center,
                    zoom: 20
                })
                // Create a new marker.
                marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
                document.querySelector(".adInfo #data").style.display = 'none';
                document.querySelectorAll("#sidebar")[0].style.width = "22%";
                
            })
            .catch(error => {
                console.error('Error:', error);
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '<p>Error during geocoding.</p>';
            });
    });


});

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    marker.remove();
}

document.getElementById('details-popup').addEventListener('click', function () {
    document.getElementById('details-popup-data').style.display = 'block';
});

document.getElementById('closePopup-details').addEventListener('click', function () {
    document.getElementById('details-popup-data').style.display = 'none';
});

document.getElementById('report-popup').addEventListener('click', function () {
    document.getElementById('report-popup-data').style.display = 'block';
});

document.getElementById('closePopup-report').addEventListener('click', function () {
    document.getElementById('report-popup-data').style.display = 'none';
});

document.getElementById('popup-others-report').addEventListener('click', function () {
    document.getElementById('popup-data-others-report').style.display = 'block';
});

document.getElementById('closePopup-other-report').addEventListener('click', function () {
    document.getElementById('popup-data-others-report').style.display = 'none';
});

// locInfo js
document.getElementById('report-popup-loc').addEventListener('click', function () {
    document.getElementById('report-popup-data-loc').style.display = 'block';
});

document.getElementById('closePopup-report-loc').addEventListener('click', function () {
    document.getElementById('report-popup-data-loc').style.display = 'none';
});

document.getElementById('popup-others-report-loc').addEventListener('click', function () {
    document.getElementById('popup-data-others-report-loc').style.display = 'block';
});

document.getElementById('closePopup-other-report-loc').addEventListener('click', function () {
    document.getElementById('popup-data-others-report-loc').style.display = 'none';
});


// myReport
function myReportShow() {
    console.log("falskdj");
    document.getElementById('myReport').style.display = 'block';
}

document.getElementById('closePopup-myReport').addEventListener('click', function () {
    document.getElementById('myReport').style.display = 'none';
});


// Close the pop-up if the user clicks outside of it
window.addEventListener('click', function (event) {
    var popup = document.getElementById('popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

const script = document.getElementById('search-js');
script.onload = function () {
  mapboxsearch.autofill({
    accessToken: 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w'
  });
};