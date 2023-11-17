document.querySelector("#baocao").classList.add("snb-li-active");

var reportTypes = ["Tố giác sai phạm", "Đăng ký nội dung", "Đóng góp ý kiến", "Giải đáp thắc mắc"];
var quantity = [55, 49, 44, 24];
var pieColors = [
  "#b91d47",
  "#D9B26F",
  "#1e7145",
  "#2b5797"
];

new Chart("piechart", {
  type: "pie",
  data: {
    labels: reportTypes,
    datasets: [{
      backgroundColor: pieColors,
      data: quantity
    }]
  },
  options: {
    title: {
      display: false,
      text: "Thống kê tỉ lệ báo cáo theo loại hình báo cáo",
    },
    legend: {
      display: false
    }
  }
});

    
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
// const data = google.visualization.arrayToDataTable([
//   ['Contry', 'Mhl'],
//   ['Italy',54.8],
//   ['France',48.6],
//   ['Spain',44.4],
//   ['USA',23.9],
//   ['Argentina',14.5]
// ]);

// const options = {
//   title:'World Wide Wine Production'
// };

// const chart = new google.visualization.PieChart(document.getElementById('piechart'));
//   chart.draw(data, options);
// }