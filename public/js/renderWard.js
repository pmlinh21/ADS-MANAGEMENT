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

function validateDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function validateSQLDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }