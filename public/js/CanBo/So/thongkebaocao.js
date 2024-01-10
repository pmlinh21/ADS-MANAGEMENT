var count = 0;
$(document).ready(function () {
  $('#baocao').addClass('snb-li-active');

  // STATISTIC
  var allBaoCaoDDQC, allBaoCaoBQC, allBaoCaoDD;
  $.ajax({
    url: "/api/so/getAllBaoCaoDDQC",
    type: "GET",
    catch: false,
    dataType: "json",
    beforeSend: function () {
      $("#loading-bg").show()
    },
    success: function (data) {
      allBaoCaoDDQC = data.content;
      $.ajax({
        url: "/api/so/getAllBaoCaoBQC",
        type: "GET",
        catch: false,
        dataType: "json",
        success: function (data) {
          allBaoCaoBQC = data.content;
          console.log(allBaoCaoBQC);
          $.ajax({
            url: "/api/so/getAllBaoCaoDD",
            type: "GET",
            catch: false,
            dataType: "json",
            success: function (data) {
              allBaoCaoDD = data.content;

              let total = allBaoCaoDDQC.length + allBaoCaoBQC.length + allBaoCaoDD.length;
              $('#report-statistic .statistic-number').text(total);

              let complete = allBaoCaoDDQC.filter(function (item) {
                return item.status == 1;
              }).length + allBaoCaoBQC.filter(function (item) {
                return item.status == 1;
              }).length + allBaoCaoDD.filter(function (item) {
                return item.status == 1;
              }).length;
              $('#complete-statistic .statistic-number').text(complete);

              let incomplete = total - complete;
              $('#incomplete-statistic .statistic-number').text(incomplete);

              let district_report = allBaoCaoDDQC.filter(function (item) {
                return item.office == 1;
              }).length + allBaoCaoBQC.filter(function (item) {
                return item.ward == null;
              }).length + allBaoCaoDD.filter(function (item) {
                return item.office == 1;
              }).length;
              $('#district-report-statistic .statistic-number').text(district_report);

              let ward_report = complete - district_report;
              $('#ward-report-statistic .statistic-number').text(ward_report);

              let allLoaiHinhBaoCao;
              $.ajax({
                url: "/api/so/getLoaiHinhBaoCao",
                type: 'GET',
                catch: false,
                dataType: 'json',
                success: function (data) {
                  count++;
                  allLoaiHinhBaoCao = data.content;

                  let allLoaiHinhBaoCaoName = allLoaiHinhBaoCao.map(function (item) {
                    return item.report_type;
                  });

                  let allLoaiHinhBaoCaoId = allLoaiHinhBaoCao.map(function (item) {
                    return item.id_report_type;
                  });

                  let allLoaiHinhBaoCaoQuantity = [];
                  for (let i = 0; i < allLoaiHinhBaoCaoId.length; i++) {
                    allLoaiHinhBaoCaoQuantity.push(allBaoCaoDDQC.filter(function (item) {
                      return item.id_report_type == allLoaiHinhBaoCaoId[i];
                    }).length + allBaoCaoBQC.filter(function (item) {
                      return item.id_report_type == allLoaiHinhBaoCaoId[i];
                    }).length + allBaoCaoDD.filter(function (item) {
                      return item.id_report_type == allLoaiHinhBaoCaoId[i];
                    }).length);
                  }

                  buildPieChart(allLoaiHinhBaoCaoName, allLoaiHinhBaoCaoQuantity, pieColors);
                }, 
                error: function (err) {
                  count++;
                  console.log(err);
                }
              })

              let allQuan;
              $.ajax({
                url: "/api/so/getAllQuan",
                type: "GET",
                catch: false,
                dataType: "json",
                success: function (data) {
                  count++;
                  allQuan = data.content;

                  let allQuanName = allQuan.map(function (item) {
                    return 'Quận ' + item.district;
                  });

                  let allQuanId = allQuan.map(function (item) {
                    return item.id_district;
                  });

                  let allQuanDone = [];
                  for (let i = 0; i < allQuanId.length; i++) {
                    allQuanDone.push(allBaoCaoDDQC.filter(function (item) {
                      return (item.id_district == allQuanId[i]) && (item.status == 1);
                    }).length + allBaoCaoBQC.filter(function (item) {
                      return (item.id_district == allQuanId[i]) && (item.status == 1);
                    }).length + allBaoCaoDD.filter(function (item) {
                      return (item.id_district == allQuanId[i]) && (item.status == 1);
                    }).length);
                  }

                  let allQuanNotDone = [];
                  for (let i = 0; i < allQuanId.length; i++) {
                    allQuanNotDone.push(allBaoCaoDDQC.filter(function (item) {
                      return (item.id_district == allQuanId[i]) && (item.status == 0);
                    }).length + allBaoCaoBQC.filter(function (item) {
                      return (item.id_district == allQuanId[i]) && (item.status == 0);
                    }).length + allBaoCaoDD.filter(function (item) {
                      return (item.id_district == allQuanId[i]) && (item.status == 0);
                    }).length);
                  }

                  buildBarChart(allQuanName, allQuanDone, allQuanNotDone);
                },
                error: function (err) {
                  count++;
                  console.log(err);
                }
              });

              buildReportAdsTable(allBaoCaoBQC);
              buildReportAdsLocationTable(allBaoCaoDDQC);
              buildReportLocationTable(allBaoCaoDD);
            }
          })
        }
      })
    }
  })

  setInterval(function () {
    if (count >= 2) {
      $("#loading-bg").hide()
    }
  }, 200)
})


function buildReportAdsTable(data) {
  let table = $('#report-ads-table table tbody');
  table.empty();

  data.forEach(function (item) {
    let tr = $('<tr></tr>');
    tr.append('<td class="id">' + item.id_report + '</td>');
    tr.append('<td class="id-ads">' + item.id_ads + '</td>');
    tr.append('<td class="report-type">' + item.report_type + '</td>');
    // format dd-mm-yyyy
    tr.append('<td class="report-time">' + new Date(item.report_time).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');

    if (item.district == null && item.ward == null) {
      tr.append('<td class="office">-</td>');
    } else if (item.district != null && item.ward == null) {
      tr.append('<td class="office">Quận ' + item.district + '</td>');
    } else {
      tr.append('<td class="office">Phường ' + item.ward + ', Quận ' + item.district + '</td>');
    }

    if (item.status == true) {
      tr.append('<td class="status">Đã xử lý</td>');
    } else {
      tr.append('<td class="status" style="color: indianred">Chưa xử lý</td>');
    }
    tr.click(function () {
      window.location = "/thongkebaocao/bqc?id=" + item.id_report;
    })
    table.append(tr);
  })
}

function buildReportAdsLocationTable(data) {
  let table = $('#report-ads-location-table table tbody');
  table.empty();

  data.forEach(function (item) {
    let tr = $('<tr></tr>');
    tr.append('<td class="id">' + item.id_report + '</td>');
    tr.append('<td class="id-ads-location">' + item.id_ads_location + '</td>');
    tr.append('<td class="report-type">' + item.report_type + '</td>');
    // format dd-mm-yyyy
    tr.append('<td class="report-time">' + new Date(item.report_time).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');

    if (item.district == null && item.ward == null) {
      tr.append('<td class="office">-</td>');
    } else if (item.district != null && item.ward == null) {
      tr.append('<td class="office">Quận ' + item.district + '</td>');
    } else {
      tr.append('<td class="office">Phường ' + item.ward + ', Quận ' + item.district + '</td>');
    }

    if (item.status == true) {
      tr.append('<td class="status">Đã xử lý</td>');
    } else {
      tr.append('<td class="status" style="color: indianred">Chưa xử lý</td>');
    }
    tr.click(function () {
      window.location = "/thongkebaocao/ddqc?id=" + item.id_report;
    })
    table.append(tr);
  })
}

function buildReportLocationTable(data) {
  let table = $('#report-location-table table tbody');
  table.empty();

  data.forEach(function (item) {
    let tr = $('<tr></tr>');
    tr.append('<td class="id">' + item.id_report + '</td>');
    tr.append('<td class="address">' + item.address + '</td>');
    tr.append('<td class="ward">' + item.address_ward + '</td>');
    tr.append('<td class="district">' + item.address_district + '</td>');
    tr.append('<td class="report-type">' + item.report_type + '</td>');
    // format dd-mm-yyyy
    tr.append('<td class="report-time">' + new Date(item.report_time).toLocaleDateString('en-GB').replace(/\//g, '-') + '</td>');

    if (item.district == null && item.ward == null) {
      tr.append('<td class="office">-</td>');
    } else if (item.district != null && item.ward == null) {
      tr.append('<td class="office">Quận ' + item.district + '</td>');
    } else {
      tr.append('<td class="office">Phường ' + item.ward + ',<br> Quận ' + item.district + '</td>');
    }

    if (item.status == true) {
      tr.append('<td class="status">Đã xử lý</td>');
    } else {
      tr.append('<td class="status" style="color: indianred">Chưa xử lý</td>');
    }
    tr.click(function () {
      window.location = "/thongkebaocao/dd?id=" + item.id_report;
    })
    table.append(tr);
  })
}


var reportTypes = ["Tố giác sai phạm", "Đăng ký nội dung", "Đóng góp ý kiến", "Giải đáp thắc mắc"];
var quantity = [55, 49, 44, 24];
var pieColors = [
  "#b91d47",
  "#D9B26F",
  "#1e7145",
  "#2b5797"
];

function generatePieColors(quantity) {
  // red yellow green blue purple pink indigo gray
  let colors = ["#b91d47", "#D9B26F", "#1e7145", "#2b5797", "#3E2F5B", "#264653", "#B05E49", "#5CA4A9"];
  if (quantity <= colors.length) {
    colors = colors.sort(() => Math.random() - 0.5);
    return colors.slice(0, quantity);
  }

  for (let i = 0; i < quantity; i++) {
    colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }
  return colors;
}

function generateBarColor() {
  let colors = ["#b91d47", "#D9B26F", "#1e7145", "#2b5797", "#3E2F5B", "#264653", "#B05E49", "#5CA4A9"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function buildChartLabels(labels, colors) {
  let chartLabels = $('.label-container');
  chartLabels.empty();

  // <div class="label"><span class="color"></span><span class="text"></span></div>
  for (let i = 0; i < labels.length; i++) {
    let div = $('<div></div>');
    div.addClass('label');
    let span1 = $('<span></span>');
    span1.addClass('color');
    span1.css('background-color', colors[i]);
    let span2 = $('<span></span>');
    span2.addClass('text');
    span2.text(labels[i]);
    div.append(span1);
    div.append(span2);
    chartLabels.append(div);
  }
}

function buildPieChart(labels, quantity) {
  let pieColors = generatePieColors(quantity.length);

  new Chart("piechart", {
    type: "pie",
    data: {
      labels: labels,
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

  buildChartLabels(labels, pieColors);
}

function buildBarChart(labels, done, notDone) {
  // '#2b5797'
  let barColor = generateBarColor();
  let anotherBarColor = generateBarColor();
  while (anotherBarColor == barColor) {
    anotherBarColor = generateBarColor();
  }

  new Chart("barchart", {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Đã xử lý",
        backgroundColor: barColor,
        data: done
      },
      {
        label: "Chưa xử lý",
        backgroundColor: anotherBarColor,
        data: notDone
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: false,
        text: "Thống kê số lượng báo cáo theo từng quận",
      },
      legend: {
        display: true
      }
    },
  });
}