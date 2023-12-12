$(document).ready(function () {
const manageButton = $('#manage');
const manageMenu = $('#manage .manage-menu');

if (role === "3"){
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

if (role == "2"){
    // $('.manage-menu li:nth-child(1) a').attr('href', "/adsLocationPhuong")  
    // $('.manage-menu li:nth-child(2) a').attr('href', "/adsPhuong")  
    // $('.manage-menu li:nth-child(3) a').attr('href',  "/reportPhuong") 
    // $('.manage-menu li:nth-child(4) a').attr('href', "/createAdsPhuong")  
    $('.manage-menu li:nth-child(1) a').attr('href', "/adsLocation")  
    $('.manage-menu li:nth-child(2) a').attr('href', "/ads")  
    $('.manage-menu li:nth-child(3) a').attr('href',  "/report") 
    $('.manage-menu li:nth-child(4) a').attr('href', "/createAds") 
} else if (role == "1"){
    $('.manage-menu li:nth-child(1) a').attr('href', "/adsLocation")  
    $('.manage-menu li:nth-child(2) a').attr('href', "/ads")  
    $('.manage-menu li:nth-child(3) a').attr('href',  "/report") 
    $('.manage-menu li:nth-child(4) a').attr('href', "/createAds")  
}

$("#logout").on('click', function(){
  window.location.href  = "/logout"
})

})