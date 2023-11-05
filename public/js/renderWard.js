function renderWard(checkboxes){
      var template = `
      <div class="container ">
          <div class="row">
              <% for (var i = 0; i < checkboxes.length; i++) { %>
                  <div class="col-md-4 col-lg-3 col-xl-2">
                          <input class="form-check-input" type="checkbox" id="ward-<%= i %>" checked />
                          <label class="form-check-label" for="ward-<%= i %>"><%= checkboxes[i] %></label>
                  </div>
              <% } %>
          </div>
      </div>
  `;
    var rendered = ejs.render(template, { checkboxes: checkboxes });
    $(".ward-table").html(rendered);
}

function validateDate(currentDate){
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it is zero-based
    var day = String(currentDate.getDate()).padStart(2, '0');
    
    return `${year}/${month}/${day}`;

}