$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_create = urlParams.get('id_create');
  
  const storedAdsCreate = localStorage.getItem('ads_create');
  let ads_create = storedAdsCreate ? JSON.parse(storedAdsCreate) : [];
  console.log("ads_create:", ads_create );

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

  let board_type = [[1, "Trụ bảng hiflex"], [2, "Trụ màn hình điện tử LED"], [3, "Trụ hộp đèn"], 
  [4, "Bảng hiflex ốp tường"], [5, "Màn hình điện tử ốp tường"], [6, "Trụ treo băng rôn dọc"],
  [7, "Trụ treo băng rôn ngang"], [8, "Trụ/Cụm pano"], [9, "Cổng chào"], [10, "Trung tâm thương mại"]];

  let info = ads_create.find(item => item[0] == id_create);
  
  if (info.length > 0) {
    $('#id').val(info[0]);
    $('#board_type').val(board_type[info[4] - 1][1]);
    $('#size').val(info[5] + 'm x ' + info[6] + "m");
    $('#quantity').val(info[7]);
    $('#content').val(info[8]);
    $('#adsloc').val(ads_location[info[3]-1][3]);
    $('#company').val(info[10]);
    $('#email').val(info[11]);
    $('#phone').val(info[12]);
    $('#address').val(info[13]);
    $('#start_date').val(info[14]);
    $('#end_date').val(info[15]);
    $('#status').val(info[16] === 1 ? "Đã xét duyệt" : "Chưa xét duyệt");
    $('#officer').val(info[1]);
    $('#office').val(info[2] === 1 ? "Quận" : (info[2] === 2 ? "Phường" : ""));
    if (info[9] !== "")
      $('.image-details').attr('src', `../../../../public/image/${info[9]}`);
    else
      $('.image-details').attr('src', `../../../../public/image/image-placeholder.jpg`);
    if (info[16] === 1)
    $('.style3-button').hide()
  }

  $('.style3-button').on('click', function() {
    if (confirm('Bạn có chắc chắn muốn xóa cấp phép này không?')) {
      // Lọc ra những phần tử có id_create khác với id_create từ URL
      ads_create = ads_create.filter(item => item[0] != id_create);
      localStorage.setItem('ads_create', JSON.stringify(ads_create));
      window.location.href = '/createAdsPhuong';
    }
  });

  const manageButton = $('#manage');
  const manageMenu = $('#manage .manage-menu');
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
})