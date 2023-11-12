const role = 2;

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
