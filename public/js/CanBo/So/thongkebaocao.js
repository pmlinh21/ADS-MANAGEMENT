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

let adsReports = [
  [1, "21127350@student.hcmus.edu.vn", 1, 1, 1, "Nguyễn Văn Anh", "nvanh@gmail.com", "0912345678", "Biển quảng cáo hiển thị thông điệp chính trị không liên quan đến khu vực này. Mong muốn chính quyền địa phương kiểm tra và đảm bảo rằng quảng cáo trên đường không vi phạm các quy định liên quan.", "2023-08-05", 1, "Kiểm tra thông tin quảng cáo và yêu cầu loại bỏ thông điệp không liên quan. Đảm bảo quảng cáo tuân thủ luật lệ và không gây phiền hà cho cộng đồng."],
  [2, "nthphuc21@clc.fitus.edu.vn", 2, 2, 1, "Lê Thị Bình", "ltb@gmail.com", "0923456789", "Biển quảng cáo chính trị chứa thông điệp không chính xác về chính sách công cộng. Mong muốn chính trị gia hoặc tổ chức liên quan xem xét và điều chỉnh nội dung quảng cáo để tránh thông tin không đúng.", "2023-08-12", 1, "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng."],
  [3, "pmlinh21@clc.fitus.edu.vn", 2, 5, 2, "Trần Minh Châu", "tmc@gmail.com", "0976543210", "Quảng cáo sản phẩm không có thông tin liên hệ hoặc địa chỉ cửa hàng. Mong muốn doanh nghiệp cung cấp thông tin liên lạc để người dùng có thể tìm thấy cửa hàng dễ dàng hơn.", "2023-08-17", 1, "Liên hệ doanh nghiệp để yêu cầu cung cấp thông tin liên hệ và địa chỉ cửa hàng. Đảm bảo rằng quảng cáo chứa thông tin đầy đủ để người dùng dễ dàng liên hệ và đến cửa hàng."],
  [4, "ncluan21@clc.fitus.edu.vn", 2, 21, 3, "Phạm Thị Dung", "ptdung@gmail.com", "0932123456", "Quảng cáo về chiến dịch xã hội hóa thiếu minh bạch về việc quyên góp và cách thức sử dụng các quỹ được huy động. Mong muốn có thêm thông tin về cách mà quỹ sẽ được sử dụng để hỗ trợ cộng đồng.", "2023-08-23", 0, ""],
  [5, "nnlien21@clc.fitus.edu.vn", 2, 9, 4, "Hoàng Đức Em", "hdem@gmail.com", "0798765432", "Quảng cáo có chứa thông tin không rõ ràng về ưu đãi hoặc giảm giá. Mong muốn nhận được giải đáp thắc mắc về các điều kiện và điều khoản của ưu đãi được quảng cáo để tránh nhầm lẫn khi mua hàng.", "2023-08-28", 1, "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo thông tin chi tiết và rõ ràng về sản phẩm hoặc dịch vụ để tránh hiểu lầm."],
  [6, "21127672@student.hcmus.edu.vn", 1, 10, 2, "Võ Thị Hà", "vtha@gmail.com", "0712345678", "Quảng cáo về chiến dịch xã hội hóa cần thêm thông tin về các hoạt động và dự án cụ thể được hỗ trợ. Mong muốn có thông tin chi tiết để hiểu rõ về tác động của việc quyên góp.", "2023-09-02", 1, "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng."],
  [7, "21127341@student.hcmus.edu.vn", 1, 22, 3, "Đinh Minh Hiếu", "dmhieu@gmail.com", "0776543210", "Quảng cáo không truyền đạt được ưu điểm đặc biệt của sản phẩm hoặc dịch vụ. Mong muốn doanh nghiệp xem xét việc tăng cường thông tin để người tiêu dùng hiểu rõ về giá trị của sản phẩm.", "2023-09-08", 0, ""],
  [8, "21127672@student.hcmus.edu.vn", 1, 14, 4, "Nguyễn Thị Khánh", "ntkt@gmail.com", "0123456789", "Quảng cáo có chứa thông tin không rõ ràng về các sản phẩm hoặc dịch vụ. Mong muốn nhận được giải đáp thắc mắc về tính năng và đặc điểm chi tiết của sản phẩm để quyết định mua hàng được hiệu quả hơn.", "2023-09-15", 1, "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo rằng mọi thông tin về sản phẩm hoặc dịch vụ được truyền đạt rõ ràng và chi tiết để tránh nhầm lẫn."],
  [9, "pmlinh21@clc.fitus.edu.vn", 2, 19, 1, "Lý Văn Long", "lylong@gmail.com", "0987654321", "Nhận thức về biển quảng cáo chính trị trên đường. Nội dung không chính xác, thiên hướng chống đối một đảng. Đề nghị kiểm tra thông tin và đảm bảo công bằng trong quảng cáo.", "2023-09-21", 1, "Kiểm tra và xác minh thông tin quảng cáo. Nếu phát hiện không chính xác, yêu cầu rút quảng cáo và yêu cầu thông tin chính xác từ người đăng."],
  [10, "21127341@student.hcmus.edu.vn", 1, 17, 2, "Trần Thị Mai", "ttmai@gmail.com", "0943210765", "Ghi nhận quảng cáo chính trị với thông tin đầy đủ. Mong muốn biết rõ về nội dung, nguồn gốc và mục tiêu của quảng cáo để hiểu rõ hơn về các chủ đề chính trị đang được thảo luận.", "2023-09-26", 0, ""],
  [11, "nnlien21@clc.fitus.edu.vn", 2, 3, 3, "Bùi Văn Nam", "bvn@gmail.com", "0798234567", "Nhìn thấy quảng cáo sản phẩm mới. Đề xuất thêm thông tin về giá cả và cách sử dụng sản phẩm. Cảm thấy quan tâm và muốn biết thêm để đưa ra quyết định mua hàng.", "2023-10-02", 0, ""],
  [12, "21127341@student.hcmus.edu.vn", 1, 17, 4, "Phan Thị Oanh", "ptoanh@gmail.com", "0732123456", "Quảng cáo một dịch vụ giải quyết vấn đề y tế. Đề xuất cung cấp thông tin chi tiết về cách dịch vụ hoạt động và chi phí liên quan. Đây là một vấn đề quan trọng, nên cần thông tin đầy đủ để đưa ra quyết định.", "2023-10-09", 0, ""],
  [13, "ncluan21@clc.fitus.edu.vn", 2, 15, 3, "Trịnh Văn Phúc", "tvphuc@gmail.com", "0976543021", "Tôi đề xuất thêm thông tin về mục tiêu và lợi ích của chương trình xã hội hóa này để người dân hiểu rõ hơn về mục đích của hoạt động này.", "2023-10-15", 0, ""],
  [14, "nnlien21@clc.fitus.edu.vn", 2, 11, 1, "Đỗ Thị Quỳnh", "dtquynh@gmail.com", "0921765432", "Phát hiện quảng cáo xã hội hóa với thông tin không chính xác về việc hỗ trợ cộng đồng. Đề xuất kiểm tra và xác nhận các dự án xã hội để đảm bảo sự minh bạch và trung thực.", "2023-10-21", 0, ""],
  [15, "21127350@student.hcmus.edu.vn", 1, 7, 2, "Nguyễn Minh Quân", "nmquan@gmail.com", "0712987654", "Nhìn thấy quảng cáo về chương trình xã hội hóa giúp trẻ em. Đề xuất cung cấp thông tin chi tiết về dự án, cách đóng góp và cách giúp đỡ để người dân có thể tham gia tích cực.", "2023-08-14", 0, ""],
  [16, "21127350@student.hcmus.edu.vn", 1, 21, 3, "Lê Văn Sơn", "lson@gmail.com", "0123567890", "Thấy quảng cáo liên quan đến chính sách giáo dục. Gợi ý thêm thông tin về cách áp dụng chính sách và cách hỗ trợ học sinh và giáo viên để tăng cường chất lượng giáo dục.", "2023-09-03", 1, "Ghi chép ý kiến liên quan đến chính sách giáo dục. Chuyển ý kiến đến cấp quản lý để xem xét và áp dụng các đề xuất tích cực vào chính sách hiện tại."],
  [17, "21127637@student.hcmus.edu.vn", 1, 23, 4, "Hồ Thị Thảo", "htthao@gmail.com", "0887654321", "Quảng cáo sản phẩm công nghệ mới. Đề xuất thêm thông tin về tính năng và ưu điểm của sản phẩm để người tiêu dùng có cái nhìn tổng thể trước khi quyết định mua hàng.", "2023-09-10", 0, ""],
  [18, "nnlien21@clc.fitus.edu.vn", 2, 13, 2, "Trương Đình Thắng", "tdthang@gmail.com", "0978654321", "Nhận thức về quảng cáo chính trị trên đường. Đề xuất cung cấp thông tin chi tiết hơn về chủ đề và mục tiêu của chiến dịch để tạo ra sự hiểu biết sâu rộng hơn từ cộng đồng.", "2023-09-17", 1, "Chấp nhận ý kiến và chuyển đến đội ngũ nội dung để xem xét và cải thiện nội dung quảng cáo chính trị."],
  [19, "21127637@student.hcmus.edu.vn", 1, 5, 1, "Phạm Thị Thu", "ptthu@gmail.com", "0789012345", "Nhìn thấy biển quảng cáo với thông điệp tích cực về chính sách xã hội hóa. Đề xuất tăng cường thông tin về cách đóng góp và mức độ ảnh hưởng của mỗi đóng góp đối với cộng đồng.", "2023-09-23", 0, ""],
  [20, "nnlien21@clc.fitus.edu.vn", 2, 18, 4, "Vũ Văn Tiến", "vvtien@gmail.com", "0666123456", "Ghi nhận quảng cáo về sản phẩm công nghệ mới. Đề xuất cung cấp thông tin chi tiết hơn về cách sản phẩm hoạt động và những tiện ích mà nó mang lại để người tiêu dùng có thể đưa ra quyết định mua hàng chính xác.", "2023-09-30", 0, ""],
  [21, "21127350@student.hcmus.edu.vn", 1, 4, 1, "Trần Thị Xuân", "ttxuan@gmail.com", "0712654321", "Biển quảng cáo thương mại này có vẻ chứa thông tin không chính xác về sản phẩm. Đề nghị kiểm tra và chỉnh sửa thông tin để tránh gây hiểu lầm cho người tiêu dùng.", "2023-09-01", 0, ""],
  [22, "21127637@student.hcmus.edu.vn", 1, 14, 2, "Phan Thanh Yến", "ptyen@gmail.com", "0923456701", "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tuân thủ các quy định về quảng cáo thương mại.", "2023-09-07", 0, ""],
  [23, "ncluan21@clc.fitus.edu.vn", 2, 17, 4, "Lưu Thị Ánh", "lanh@gmail.com", "0123123456", "Tôi có một số thắc mắc về sản phẩm được quảng cáo. Đề xuất cung cấp thông tin liên hệ hoặc website để tôi có thể tìm hiểu thêm về sản phẩm này.", "2023-09-14", 1, "Cung cấp thông tin liên hệ chính thức để giải quyết thắc mắc."],
  [24, "21127672@student.hcmus.edu.vn", 1, 1, 1, "Đinh Văn Đức", "dvduc@gmail.com", "0798765432", "Biển quảng cáo xã hội hóa này chứa thông tin không chính xác về tổ chức hoặc sự kiện. Đề nghị kiểm tra và sửa chữa để tránh gây hiểu lầm cho cộng đồng.", "2023-09-22", 0, "Thực hiện kiểm tra thông tin và yêu cầu chỉnh sửa ngay."],
  [25, "nnlien21@clc.fitus.edu.vn", 2, 17, 2, "Nguyễn Thị Hoài", "nthoai@gmail.com", "0712765432", "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tránh vi phạm các quy định về quảng cáo xã hội hóa.", "2023-10-02", 1, "Liên hệ với tổ chức, yêu cầu đăng ký nội dung ngay lập tức."]
];
// id_report	officer	office	id_ads	id_report_type	fullname	email	phone	content	report_time	status	resolve

reportTypes = [[1, "Tố giác sai phạm"], [2, "Đăng ký nội dung"], [3, "Đóng góp ý kiến"], [4, "Giải đáp thắc mắc"]];
let wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];

let wardOfficers = [
  ["21127672@student.hcmus.edu.vn", 2],
  ["21127637@student.hcmus.edu.vn", 9],
  ["21127341@student.hcmus.edu.vn", 25],
  ["21127350@student.hcmus.edu.vn", 32],
  ["cbphuong1@gmail.com", 1],
  ["cbphuong2@gmail.com", 3],
  ["cbphuong3@gmail.com", 4],
  ["cbphuong4@gmail.com", 5]
]

let districtOfficers = [
  ["nnlien21@clc.fitus.edu.vn", 1],
  ["nthphuc21@clc.fitus.edu.vn", 1],
  ["pmlinh21@clc.fitus.edu.vn", 3],
  ["ncluan21@clc.fitus.edu.vn", 3]
];

for (let i = adsReports.length; i > 0; i--) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");

  td1.innerHTML = adsReports[i-1][0];
  td1.className = "id";
  td2.innerHTML = adsReports[i-1][3];
  td2.className = "id-ads";
  for (let j = 0; j < reportTypes.length; j++) {
      if (adsReports[i - 1][4] == reportTypes[j][0]) {
          td3.innerHTML = reportTypes[j][1];
          td3.className = "report-type";
          break;
      }
  }
  td4.innerHTML = adsReports[i-1][9];
  td4.className = "report-time";
  if (adsReports[i-1][2] == 1) {
    for (let k = 0; k < wardOfficers.length; k++) {
      if (adsReports[i-1][1] == wardOfficers[k][0]) {
        for (let l = 0; l < wards.length; l++) {
          if (wardOfficers[k][1] == wards[l][0]) {
            td5.innerHTML = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
            td5.className = "office";
            break;
          }
        }
        break;
      }
    }
  } else if (adsReports[i-1][2] == 2) {
    for (let k = 0; k < districtOfficers.length; k++) {
      if (adsReports[i-1][1] == districtOfficers[k][0]) {
        for (let l = 0; l < wards.length; l++) {
          if (districtOfficers[k][1] == wards[l][0]) {
            td5.innerHTML = "Quận " + wards[l][2];
            td5.className = "office";
            break;
          }
        }
        break;
      }
    }
  }
  if (adsReports[i-1][10] == 1) {
    td6.innerHTML = "Đã xử lý";
    td6.className = "status";
  } else if (adsReports[i-1][10] == 0) {
    td6.innerHTML = "Chưa xử lý";
    td6.className = "status";
    td5.innerHTML = "-";
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);

  tr.addEventListener("click", function() {
      window.location = "/thongkebaocao/bqc?id=" + adsReports[i-1][0];
  });
  document.querySelector("#report-ads-table table tbody").prepend(tr);
}

let adslocationReports = [
  [1, "nnlien21@clc.fitus.edu.vn", 2, 20, 1, "Nguyễn Thị Lan Anh", "ntlananh@gmail.com", "0901234567", "Tôi nhận thấy có một quảng cáo không liên quan tại đây. Mong sở kiểm tra và loại bỏ quảng cáo này để giữ cho bản đồ chất lượng hơn.", "2023-08-05", 0, ""],
  [2, "21127672@student.hcmus.edu.vn", 1, 10, 2, "Trần Văn Tuấn", "tvtuan@gmail.com", "0912345678", "Tôi muốn đăng ký quảng cáo cho cửa hàng của mình tại đây. Xin vui lòng liên hệ để biết thêm thông tin và xác nhận việc đăng ký.", "2023-08-12", 1, "Xác nhận thông tin và yêu cầu hình ảnh của quảng cáo. Hỗ trợ chủ quảng cáo cập nhật thông tin và hình ảnh theo yêu cầu."],
  [3, "21127672@student.hcmus.edu.vn", 1, 25, 3, "Phạm Thị Hồng", "pthong@gmail.com", "0923456789", "Tôi nghĩ rằng việc thêm một tính năng tìm kiếm địa điểm trên trang web sẽ giúp người dùng tìm thấy thông tin nhanh chóng hơn. Đây là một gợi ý để cải thiện trải nghiệm người dùng.", "2023-08-17", 0, ""],
  [4, "21127637@student.hcmus.edu.vn", 1, 22, 4, "Lê Minh Tuấn", "lmtuan@gmail.com", "0934567890", "Tôi có một câu hỏi liên quan đến việc đăng ký quảng cáo. Làm thế nào để tôi có thể thay đổi hình ảnh và thông tin trên quảng cáo của mình? Mong nhận được sự hỗ trợ.", "2023-08-23", 1, "Hướng dẫn người dùng cách thay đổi thông tin và hình ảnh trên quảng cáo của họ. Cung cấp hỗ trợ kỹ thuật hoặc liên hệ công ty quảng cáo nếu cần."],
  [5, "nnlien21@clc.fitus.edu.vn", 2, 24, 1, "Võ Ngọc Mai", "vnmai@gmail.com", "0945678901", "Tôi phát hiện một quảng cáo không hợp lý tại khu vực công cộng gần công viên. Xin hãy kiểm tra và loại bỏ quảng cáo này để bảo vệ vẻ đẹp của khu vực công cộng này.", "2023-08-28", 1, "Xác minh và loại bỏ quảng cáo không phù hợp gần công viên. Thông báo việc xử lý này cho người báo cáo để họ biết rằng vấn đề đã được giải quyết."],
  [6, "21127637@student.hcmus.edu.vn", 1, 21, 1, "Hoàng Đức Long", "hdl@gmail.com", "0956789012", "Phát hiện quảng cáo không phù hợp trên bảng quảng cáo công cộng. Mong muốn công việc kiểm tra và xử lý để duy trì trật tự và vẻ đẹp của khu vực.", "2023-09-02", 0, ""],
  [7, "nthphuc21@clc.fitus.edu.vn", 2, 16, 3, "Bùi Thị Thu Hà", "btth@gmail.com", "0967890123", "Góp ý về việc cải thiện dịch vụ wifi công cộng. Sự cải thiện này sẽ giúp tăng cường tiện ích cho người dân và du khách.", "2023-09-08", 0, ""],
  [8, "pmlinh21@clc.fitus.edu.vn", 2, 8, 4, "Nguyễn Văn Hoàng", "nvh@gmail.com", "0978901234", "Cần thông tin về các sự kiện nghệ thuật và văn hóa diễn ra trong tháng tại khu vực này. Xin hãy cung cấp lịch trình và địa điểm để thuận tiện tham gia.", "2023-09-15", 0, ""],
  [9, "21127637@student.hcmus.edu.vn", 1, 3, 2, "Đặng Quang Minh", "dqminh@gmail.com", "0989012345", "Cần đăng ký quảng cáo cho sự kiện tại địa điểm công cộng trong tuần tới. Rất mong nhận được hướng dẫn về thủ tục và yêu cầu cần thiết.", "2023-09-21", 0, ""],
  [10, "ncluan21@clc.fitus.edu.vn", 2, 10, 2, "Lê Thị Ngọc Trâm", "ltntram@gmail.com", "0990123456", "Muốn đăng ký quảng cáo cho sự kiện tại địa điểm công cộng.", "2023-09-26", 0, ""],
  [11, "nnlien21@clc.fitus.edu.vn", 2, 17, 4, "Trần Thanh Hải", "tthai@gmail.com", "0881122334", "Biển quảng cáo gần khu vực chợ không rõ ràng về giá cả sản phẩm. Mong muốn có thông tin giải đáp để người tiêu dùng hiểu rõ hơn.", "2023-10-02", 0, ""],
  [12, "nthphuc21@clc.fitus.edu.vn", 2, 6, 1, "Mai Thị Phương", "mtphuong@gmail.com", "0872233445", "Tôi báo cáo một biển quảng cáo gần công viên với hình ảnh không phù hợp, vi phạm chuẩn mực đạo đức.", "2023-10-09", 1, "Liên hệ công ty quảng cáo, đòi hỏi thay đổi hình ảnh không phù hợp ngay lập tức và kiểm tra tuân thủ các nguyên tắc đạo đức."],
  [13, "ncluan21@clc.fitus.edu.vn", 2, 11, 3, "Vũ Thị Thu Hường", "vtthuong@gmail.com", "0863344556", "Tôi đề xuất thêm biển chỉ dẫn đến các trung tâm y tế gần những điểm quảng cáo để cung cấp hướng dẫn hữu ích cho người dân.", "2023-10-15", 0, ""],
  [14, "21127637@student.hcmus.edu.vn", 1, 18, 2, "Hoàng Văn Thắng", "hvthang@gmail.com", "0854455667", "Biển quảng cáo chứa thông tin không chính xác về một sự kiện sắp tới. Mong được sửa chữa.", "2023-10-21", 1, "Thông báo lỗi đến công ty quảng cáo, yêu cầu cập nhật thông tin chính xác về sự kiện và theo dõi việc điều chỉnh."],
  [15, "21127341@student.hcmus.edu.vn", 1, 1, 4, "Nguyễn Thị Thanh Nga", "nttn@gmail.com", "0845566778", "Cần biết rõ về quy định liên quan đến việc treo bảng quảng cáo tại các khu dân cư. Xin cung cấp thông tin chi tiết để hiểu rõ hơn.", "2023-08-14", 1, "Gửi tài liệu chính thức về quy định liên quan đến việc treo bảng quảng cáo tại khu dân cư, bao gồm các hướng dẫn cụ thể."],
  [16, "nnlien21@clc.fitus.edu.vn", 2, 20, 1, "Lê Văn Đức", "lvduc@gmail.com", "0836677889", "Quảng cáo tại góc đường thiếu ánh sáng ban đêm, tạo ra tình trạng an toàn không tốt. Yêu cầu sửa chữa để tránh tai nạn giao thông.", "2023-09-03", 1, "Gửi thông báo cho công ty quảng cáo, yêu cầu tăng cường ánh sáng xung quanh quảng cáo để đảm bảo an toàn giao thông."],
  [17, "21127341@student.hcmus.edu.vn", 1, 13, 2, "Phan Thị Quỳnh", "ptquynh@gmail.com", "0827788990", "Đề xuất thay đổi vị trí của quảng cáo gần trường học để tránh gây xao lãng cho học sinh và tăng cường an toàn giao thông.", "2023-09-18", 1, "Liên hệ với công ty quảng cáo, thảo luận về việc thay đổi vị trí quảng cáo gần trường học để tăng cường an toàn và tránh gây xao lãng."],
  [18, "21127341@student.hcmus.edu.vn", 1, 18, 3, "Đinh Minh Tâm", "dmtam@gmail.com", "0818899001", "Đề xuất tạo quy định rõ ràng về kích thước quảng cáo tại trung tâm thương mại để giữ gìn vẻ đẹp của thành phố.", "2023-10-08", 0, ""],
  [19, "21127341@student.hcmus.edu.vn", 1, 22, 4, "Trần Thị Quỳnh Trang", "ttqtrang@gmail.com", "0809900112", "Tôi muốn biết về quy định cụ thể liên quan đến việc đặt bảng quảng cáo tại các cửa hàng nhỏ trong khu vực dân cư. Xin thông tin chi tiết về kích thước, hình dạng, và các bước đăng ký.", "2023-08-31", 0, ""],
  [20, "21127350@student.hcmus.edu.vn", 1, 4, 1, "Nguyễn Văn Hoa", "nvnhoa@gmail.com", "0781122334", "Phát hiện quảng cáo không phù hợp về sản phẩm thức uống sô-cô-la gần trường học. Mong muốn kiểm tra và chuyển đổi thành quảng cáo thân thiện với trẻ em.", "2023-10-03", 1, "Liên hệ công ty quảng cáo, yêu cầu điều chỉnh nội dung quảng cáo về sản phẩm thức uống sô-cô-la gần trường học theo hướng thân thiện với trẻ em."],
  [21, "21127350@student.hcmus.edu.vn", 1, 25, 2, "Lê Thị Bích Ngọc", "ltbngoc@gmail.com", "0772233445", "Xin phép đăng ký quảng cáo về sự kiện thiền định. Rất mong được chấp thuận.", "2023-09-01", 1, "Phê duyệt đơn đăng ký quảng cáo về sự kiện thiền định, gửi thông báo và hướng dẫn về việc thiết lập quảng cáo."],
  [22, "pmlinh21@clc.fitus.edu.vn", 2, 16, 1, "Võ Minh Khánh", "vmkhanh@gmail.com", "0763344556", "Quảng cáo xấu hổ và không lành mạnh gần trường học, gây ảnh hưởng đến học sinh nhỏ tuổi.", "2023-09-07", 0, ""],
  [23, "21127350@student.hcmus.edu.vn", 1, 20, 1, "Đỗ Thị Kim Ngân", "dtkngan@gmail.com", "0754455667", "Quảng cáo vi phạm văn hóa gần công viên, chứa hình ảnh không phù hợp với trẻ em và gia đình.", "2023-09-14", 0, ""],
  [24, "21127350@student.hcmus.edu.vn", 1, 21, 2, "Phạm Đức Hải", "pdhai@gmail.com", "0745566778", "Xin phép đăng ký quảng cáo về triển lãm nghệ thuật vào cuối tháng này.", "2023-09-22", 0, ""],
  [25, "nnlien21@clc.fitus.edu.vn", 2, 19, 3, "Hoàng Thị Diệu Linh", "htdlinh@gmail.com", "0736677889", "Đề xuất cải thiện văn hóa giao thông bằng việc thiết lập các bảng chỉ dẫn giao thông rõ ràng và hợp lý trên các tuyến đường chính.", "2023-10-02", 1, "Tổ chức cuộc họp với các cơ quan chức năng để đánh giá ý kiến đề xuất. Tiến hành thiết kế và lắp đặt bảng chỉ dẫn giao thông mới trên các tuyến đường chính, nhằm tăng cường an toàn và giảm ùn tắc giao thông. Cảm ơn người dân đã góp ý và thông báo về việc triển khai ý kiến đóng góp."]
];

// id_report	officer	office	id_ads_location	id_report_type	fullname	email	phone	content	report_time	status	resolve
for (let i = adslocationReports.length; i > 0; i--) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");

  td1.innerHTML = adslocationReports[i-1][0];
  td1.className = "id";
  td2.innerHTML = adslocationReports[i-1][3];
  td2.className = "id-ads-location";
  for (let j = 0; j < reportTypes.length; j++) {
      if (adslocationReports[i - 1][4] == reportTypes[j][0]) {
          td3.innerHTML = reportTypes[j][1];
          td3.className = "report-type";
          break;
      }
  }
  td4.innerHTML = adslocationReports[i-1][9];
  td4.className = "report-time";
  if (adslocationReports[i-1][2] == 1) {
    for (let k = 0; k < wardOfficers.length; k++) {
      if (adslocationReports[i-1][1] == wardOfficers[k][0]) {
        for (let l = 0; l < wards.length; l++) {
          if (wardOfficers[k][1] == wards[l][0]) {
            td5.innerHTML = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
            td5.className = "office";
            break;
          }
        }
        break;
      }
    }
  } else if (adslocationReports[i-1][2] == 2) {
    for (let k = 0; k < districtOfficers.length; k++) {
      if (adslocationReports[i-1][1] == districtOfficers[k][0]) {
        for (let l = 0; l < wards.length; l++) {
          if (districtOfficers[k][1] == wards[l][0]) {
            td5.innerHTML = "Quận " + wards[l][2];
            td5.className = "office";
            break;
          }
        }
        break;
      }
    }
  }
  if (adslocationReports[i-1][10] == 1) {
    td6.innerHTML = "Đã xử lý";
    td6.className = "status";
  } else if (adslocationReports[i-1][10] == 0) {
    td6.innerHTML = "Chưa xử lý";
    td6.className = "status";
    td5.innerHTML = "-";
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);

  tr.addEventListener("click", function() {
      window.location = "/thongkebaocao/ddqc?id=" + adslocationReports[i-1][0];
  });
  document.querySelector("#report-ads-location-table table tbody").prepend(tr);
}

let locationReports = [
  [1, "nnlien21@clc.fitus.edu.vn", 2, 10.7762, 106.6985, "131 Nam Kỳ Khởi Nghĩa", 2, 1, "Trần Thị Hương Giang", "thgiang@gmail.com", "0901122334", "Tôi phát hiện một quảng cáo không hợp pháp tại địa chỉ này. Xin kiểm tra và loại bỏ nó khỏi trang web của bạn.", "2023-08-05", 0, ""],
  [2, "21127637@student.hcmus.edu.vn", 1, 10.7751, 106.7002, "103 Lê Thánh Tôn", 1, 4, "Lê Văn Đức", "lvduc@gmail.com", "0934567890", "Tôi muốn đăng ký quảng cáo tại đây. Xin hướng dẫn tôi qua quy trình đăng ký và các bước cần thực hiện để quảng cáo của tôi xuất hiện trên bản đồ.", "2023-08-12", 1, "Để đăng ký quảng cáo, vui lòng truy cập trang chính thức của chúng tôi và làm theo hướng dẫn đăng ký. Nếu gặp vấn đề, liên hệ với bộ phận hỗ trợ."],
  [3, "21127341@student.hcmus.edu.vn", 1, 10.7775, 106.699, "95 Pasteur", 1, 1, "Nguyễn Thị Mai Anh", "ntmanh@gmail.com", "0987654321", "Bản đồ hiển thị địa chỉ không chính xác. Đề nghị cập nhật để tránh nhầm lẫn từ người dùng.", "2023-08-17", 0, ""],
  [4, "21127672@student.hcmus.edu.vn", 1, 10.7809, 106.6863, "46 Trương Định", 32, 3, "Bùi Minh Tuấn", "bmtuan@gmail.com", "0912345678", "Khu vực này có lượng người qua lại lớn. Tôi đề xuất thêm điểm quảng cáo để tăng hiển thị thông tin về cộng đồng và doanh nghiệp địa phương.", "2023-08-23", 0, ""],
  [5, "21127350@student.hcmus.edu.vn", 1, 10.7815, 106.6869, "18A Tú Xương", 32, 3, "Hoàng Thị Lan Anh", "htlanh@gmail.com", "0978877665", "Khu vực này thường xuyên có trẻ em đi lại. Mong muốn các quảng cáo ở đây được thiết kế để phù hợp với độ tuổi của họ, giúp tạo ra một môi trường an toàn và thân thiện hơn.", "2023-08-28", 0, ""],
  [6, "pmlinh21@clc.fitus.edu.vn", 2, 10.7787, 106.6852, "280 Điện Biên Phủ", 32, 4, "Võ Văn Phúc", "vvphuc@gmail.com", "0965123456", "Ở đây có các bảng quảng cáo nhưng vì sao không có điểm đặt quảng cáo hiển thị trên bản đồ?", "2023-09-02", 1, "Kiểm tra và xác nhận rằng điểm quảng cáo tại địa điểm này đã được thêm vào bản đồ. Cảm ơn người dân đã chú ý và báo cáo vấn đề này."],
  [7, "nthphuc21@clc.fitus.edu.vn", 2, 10.76158915, 106.692004, "51 Hồ Hảo Hớn", 5, 1, "Đỗ Thị Thanh Thảo", "dtthao@gmail.com", "0921122334", "Địa điểm có gắn quảng cáo trái phép, chưa đăng ký hợp pháp", "2023-09-08", 0, ""]
];
// id_report 0	officer 1	office 2	longitude 3	latitude 4	address 5	id_ward 6	id_report_type 7	fullname 8	email 9	phone 10	content 11	report_time 12	status 13	resolve 14
for (let i = locationReports.length; i > 0; i--) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");
  let td8 = document.createElement("td");

  td1.innerHTML = locationReports[i-1][0];
  td1.className = "id";
  td2.innerHTML = locationReports[i-1][5];
  td2.className = "address";
  for (let j = 0; j < wards.length; j++) { 
    if (locationReports[i-1][6] == wards[j][0]) {
      td3.innerHTML = wards[j][1];
      td3.className = "ward";
      td4.innerHTML = wards[j][2];
      td4.className = "district";
      break;
    }
  }

  for (let j = 0; j < reportTypes.length; j++) {
      if (locationReports[i - 1][7] == reportTypes[j][0]) {
          td5.innerHTML = reportTypes[j][1];
          td5.className = "report-type";
          break;
      }
  }
  td6.innerHTML = locationReports[i-1][12];
  td6.className = "report-time";

  if (locationReports[i-1][2] == 1) {
    for (let k = 0; k < wardOfficers.length; k++) {
      if (locationReports[i-1][1] == wardOfficers[k][0]) {
        for (let l = 0; l < wards.length; l++) {
          if (wardOfficers[k][1] == wards[l][0]) {
            td7.innerHTML = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
            td7.className = "office";
            break;
          }
        }
        break;
      }
    }
  } else if (locationReports[i-1][2] == 2) {
    for (let k = 0; k < districtOfficers.length; k++) {
      if (locationReports[i-1][1] == districtOfficers[k][0]) {
        for (let l = 0; l < wards.length; l++) {
          if (districtOfficers[k][1] == wards[l][0]) {
            td7.innerHTML = "Quận " + wards[l][2];
            td7.className = "office";
            break;
          }
        }
        break;
      }
    }
  }
  if (locationReports[i-1][13] == 1) {
    td8.innerHTML = "Đã xử lý";
    td8.className = "status";
  } else if (locationReports[i-1][13] == 0) {
    td8.innerHTML = "Chưa xử lý";
    td8.className = "status";
    td7.innerHTML = "-";
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  tr.appendChild(td8);

  tr.addEventListener("click", function() {
      window.location = "/thongkebaocao/ddqc?id=" + locationReports[i-1][0];
  });
  document.querySelector("#report-location-table table tbody").prepend(tr);
}
