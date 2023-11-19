$(document).ready(function () {
    // const role = 1; 
    // const email = "nnlien21@clc.fitus.edu.vn"
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
      
      if ($('.popupmap').css ('display') != 'none') {
        $('.mapboxgl-canvas').attr('width', '100%');
        $('.mapboxgl-canvas').attr('height', '100%');
      }

      $('.popupmap').on('resize', function(){
        let container = $('popupmap').height();
        let headerHeight = $('.popupmap-header').height();
        let mapHeight = container - headerHeight;
        $('#map').css('top', headerHeight);
        // console.log(windowHeight, headerHeight, mapHeight)
        $('#map').height(mapHeight);
      });

      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        language: 'vi',
        countries: 'vn',
        mapboxgl: mapboxgl
      });
  
      let canvas = $('.mapboxgl-canvas')
      canvas.width('100%');
  
      $('#search').append(geocoder.onAdd(map));
  
      $(".popupmap-header i").on('click', geocoding);
      $('#search').on('keydown', function(event) {
        if (event.keyCode === 13) { // Kiểm tra phím Enter
          geocoding();
        }
      });
  
      function geocoding(){
        var address = $('#search').val()
  
        $.ajax({
          url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json',
          type: 'GET',
          data: {
            access_token: mapboxgl.accessToken,
            language: "vi"
          },
          success: function(response) {
            // Xử lý kết quả geocoding
            var features = response.features;
            if (features.length > 0) {
              var firstFeature = features[0];
              var coordinates = firstFeature.center;
              console.log(firstFeature)
              result = firstFeature.place_name;
              // ward = firstFeature.context[0];
              // district = firstFeature.context[1];
              longitude = coordinates[0];
              latitude= coordinates[1]
              // console.log(firstFeature)
  
              // Cập nhật tọa độ và zoom của map
              map.flyTo({
                center: coordinates,
                zoom: 17
              });
  
              new mapboxgl.Marker( {color: '#0B7B31' })
              .setLngLat(coordinates) // Specify the marker longitude and latitude
              .addTo(map);
  
              $("#chosen-address").text(result + " [" + coordinates[0] + ", " + coordinates[1] + "]" )
              
            } else {
              alert('No results found');
            }
          },
          error: function() {
            alert('Error occurred during geocoding');
          }
        });
      }
  
      map.on('click', function(e) {
        let lngLat = e.lngLat;
        longitude = lngLat.lng;
        latitude = lngLat.lat;
      
        $.ajax({
          url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
          method: 'GET',
          data: {
            access_token: mapboxgl.accessToken
          },
          success: function(response) {
            // Lấy địa chỉ từ kết quả Geocoding
            result = response.features[0].place_name;
            console.log(response.features[0])
            // Gán địa chỉ vào phần tử HTML
            $("#chosen-address").text(result + " [" + latitude + ", " + longitude + "]" )
          },
          error: function(error) {
            console.log(error);
          }
        });
      });
  
      // Lắng nghe sự kiện mousedown trên bản đồ
      map.on('mousedown', function() {
        // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
        map.getCanvas().style.cursor = 'grab';
      });
  
      // Lắng nghe sự kiện mouseup trên bản đồ
      map.on('mouseup', function() {
        // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
        map.getCanvas().style.cursor = 'pointer';
      });

})
