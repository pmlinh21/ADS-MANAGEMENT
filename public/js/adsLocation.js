function renderWard(){
    var checkboxes = [
        'Bến Nghé',
        'Bến Thành',
        'Cầu Kho',
        'Cầu Ông Lãnh',
        'Nguyễn Thái Bình',
        'Nguyễn Cư Trinh',
        'Đa Kao',
        'Cô Giang',
        'Tân Định',
        'Phạm Ngũ Lão'
      ];

      var template = `
      <div class="container-fluid">
          <div class="row">
              <% for (var i = 0; i < checkboxes.length; i++) { %>
                  <div class="col-md-4 col-lg-3 col-xl-2">
                     
                          <input class="form-check-input" type="checkbox" id="ward<%= i + 1 %>" />
                          <label class="form-check-label" for="checkbox<%= i + 1 %>"><%= checkboxes[i] %></label>
                     
                  </div>
              <% } %>
          </div>
      </div>
  `;
    var rendered = ejs.render(template, { checkboxes: checkboxes });
    $(".ward-table").html(rendered);
}

$(document).ready(function () {
    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');

    // 2 = Quan, 1 = Phuong
    const role = 2; 
  
    if (role === 1) {
        $(".ward-table").hide();
    }
    else{
        renderWard();
    }

    // $(".form-check-input").on('click', function(e){
    //   console.log(e.target.id);
    // })

    manageButton.hover(
      function () {
        $(this).addClass('li-hover');
        $('#manage .nav-link').addClass('nav-link-hover');
        manageMenu.show();
      },
      function () {
        $(this).removeClass('li-hover');
        $('#manage .nav-link').removeClass('nav-link-hover');
        manageMenu.hide();
      }
    );
  });