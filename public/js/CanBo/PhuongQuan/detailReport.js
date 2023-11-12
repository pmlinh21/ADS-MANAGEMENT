$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id_report = urlParams.get('id_report');
    const table = urlParams.get('table');

    if (table == "ads")
        $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo quảng cáo")
    else if (table == "adsloc")
        $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo điểm đặt")
    else if (table == "loc")
        $(".title-page p").text("Quản lý báo cáo vi phạm / Chi tiết báo cáo địa điểm")




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