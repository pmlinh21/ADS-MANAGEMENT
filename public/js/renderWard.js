function renderWard(checkboxes){
      var template = `
      <div class="container ">
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