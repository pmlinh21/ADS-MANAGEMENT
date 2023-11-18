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
            document.querySelectorAll("#sidebar")[0].style.width = "25rem";
        })

        new mapboxgl.Marker(marker[0]).setLngLat(coord).addTo(map);
    });

//     $('#report_form').bootstrapValidator({
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         fields: {
//             reportType: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Vui lòng chọn hình thức báo cáo'
//                     }
//                 }
//             },
//             name: {
//                 validators: {
//                     stringLength: {
//                         min: 2,
//                     },
//                     notEmpty: {
//                         message: 'Vui lòng nhập tên của bạn'
//                     }
//                 }
//             },
//             email: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Vui lòng nhập email của bạn'
//                     },
//                     emailAddress: {
//                         message: 'Vui lòng nhập một email hợp lệ'
//                     }
//                 }
//             },
//             phone: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Vui lòng nhập SĐT'
//                     }
//                 }
//             },
//             comment: {
//                 validators: {
//                     stringLength: {
//                         min: 10,
//                         max: 200,
//                         message: 'Vui lòng nhập ít nhất 10 ký tự và không quá 20 ký tự'
//                     },
//                     notEmpty: {
//                         message: 'Vui lòng nhập nội dung báo cáo'
//                     }
//                 }
//             }
//         }
//     })
//         .on('success.form.bv', function (e) {
//             $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
//             $('#report_form').data('bootstrapValidator').resetForm();

//             // Prevent form submission
//             e.preventDefault();

//             // Get the form instance
//             var $form = $(e.target);

//             // Get the BootstrapValidator instance
//             var bv = $form.data('bootstrapValidator');

//             // Use Ajax to submit form data
//             $.post($form.attr('action'), $form.serialize(), function (result) {
//                 console.log(result);
//             }, 'json');
//         });

});
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
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


// Close the pop-up if the user clicks outside of it
window.addEventListener('click', function (event) {
    var popup = document.getElementById('popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

// $(document).ready(function () {
//     $('#contact_form').bootstrapValidator({
//         // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         fields: {
//             first_name: {
//                 validators: {
//                     stringLength: {
//                         min: 2,
//                     },
//                     notEmpty: {
//                         message: 'Please supply your first name'
//                     }
//                 }
//             },
//             last_name: {
//                 validators: {
//                     stringLength: {
//                         min: 2,
//                     },
//                     notEmpty: {
//                         message: 'Please supply your last name'
//                     }
//                 }
//             },
//             email: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Please supply your email address'
//                     },
//                     emailAddress: {
//                         message: 'Please supply a valid email address'
//                     }
//                 }
//             },
//             phone: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Please supply your phone number'
//                     },
//                     phone: {
//                         country: 'US',
//                         message: 'Please supply a vaild phone number with area code'
//                     }
//                 }
//             },
//             address: {
//                 validators: {
//                     stringLength: {
//                         min: 8,
//                     },
//                     notEmpty: {
//                         message: 'Please supply your street address'
//                     }
//                 }
//             },
//             city: {
//                 validators: {
//                     stringLength: {
//                         min: 4,
//                     },
//                     notEmpty: {
//                         message: 'Please supply your city'
//                     }
//                 }
//             },
//             reportType: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Vui lòng chọn hình thức báo cáo'
//                     }
//                 }
//             },
//             zip: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Please supply your zip code'
//                     },
//                     zipCode: {
//                         country: 'US',
//                         message: 'Please supply a vaild zip code'
//                     }
//                 }
//             },
//             comment: {
//                 validators: {
//                     stringLength: {
//                         min: 10,
//                         max: 200,
//                         message: 'Please enter at least 10 characters and no more than 200'
//                     },
//                     notEmpty: {
//                         message: 'Please supply a description of your project'
//                     }
//                 }
//             }
//         }
//     })
//         .on('success.form.bv', function (e) {
//             $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
//             $('#contact_form').data('bootstrapValidator').resetForm();

//             // Prevent form submission
//             e.preventDefault();

//             // Get the form instance
//             var $form = $(e.target);

//             // Get the BootstrapValidator instance
//             var bv = $form.data('bootstrapValidator');

//             // Use Ajax to submit form data
//             $.post($form.attr('action'), $form.serialize(), function (result) {
//                 console.log(result);
//             }, 'json');
//         });
// });

