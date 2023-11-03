$.extend(true, DataTable.defaults, {
  ordering: false,
  lengthChange: false,
  searching: false,
  info: false,
});

$(document).ready(function () {
    $("#example").DataTable({
      columnDefs: [
        {
            targets: -1, // Last column (Action column)
            data: null,
            width: "2rem",
            defaultContent: '<button class="btn delete-btn"><i class="fa-solid fa-pen-to-square"></i></button>'
        }
    ]
    });
  });