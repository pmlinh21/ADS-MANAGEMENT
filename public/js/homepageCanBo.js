function renderWard(){
    var checkboxes = [
        'Checkbox 1',
        'Checkbox 2',
        'Checkbox 3',
        'Checkbox 4',
        'Checkbox 5',
        'Checkbox 6',
        'Checkbox 7',
        'Checkbox 8',
        'Checkbox 9',
        'Checkbox 10'
      ];

    var template = ` 
        <% for (var i = 0; i < checkboxes.length; i++) { %>
            <div class = "form-check">
                <input class = "form-check-input" type="checkbox" id="checkbox<%= i + 1 %>" />
                <label chass = "form-check-label" for="checkbox<%= i + 1 %>"><%= checkboxes[i] %></label>
            </div>
        <% } %>
        <div>
            <button class = "style2-button">Chọn tất cả</button>
            <button type = "submit" class = "style1-button" >Xác nhận</button>
        </div>`
    var rendered = ejs.render(template, { checkboxes: checkboxes });
    $("#ward-container").html(rendered);
}

$(document).ready(function () {
    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');
    const role = 2;
  
    if (role === 1) {
        $("#select-ward").hide();
    }
    else{
        $(".select-ward-bar").on('click', function(){
            $("#ward-container").show();
            renderWard();  
        })
    }

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