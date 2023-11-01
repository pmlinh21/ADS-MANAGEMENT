$.extend(true, DataTable.defaults, {
  ordering: false,
  select: true
});

$(document).ready(function () {
    $("#example").DataTable({});
  });