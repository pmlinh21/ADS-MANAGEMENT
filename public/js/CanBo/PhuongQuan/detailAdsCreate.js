$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id_create = urlParams.get('id_create');





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