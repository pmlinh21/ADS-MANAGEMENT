$(document).ready(function () {
    const loginBtn = $('#login-button');
    
    loginBtn.on('click', function (e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        if (!email) {
            alert('Email không được để trống');
            return;
        }
        else if (email.indexOf('@') == -1 || (email.indexOf('@') == email.length - 1)) {
            alert('Email không hợp lệ');
            return;
        }
        else if (!password) {
            alert('Mật khẩu không được để trống');
            return;
        }
        else{
            let ads_create = [
                [1, 'nnlien21@clc.fitus.edu.vn', 1,	10,	5, 8.12, 1.23, 1, 'Vẻ đẹp tự nhiên trong từng món trang sức. Khám phá sự quý phái tại chúng tôi.', 'image1.png', 'Công ty TNHH Vàng Bạc Đá Quý', 'contact@vangbacdaquy.com', '0912345678', '123 Điện Biên Phủ, Phường 7, Quận 3', '2023-08-05', '2023-12-01', 0],
                [2, 'nthphuc21@clc.fitus.edu.vn', 2, 5,	3, 3.76, 3.78, 1, 'Hương vị tươi mới từ nông trại đến bát. Sự tươi mới trong mỗi khẩu phần.', 'image2.png',	'FreshHarvest Foods', 'info@freshharvestfoods.com',	'0712345678', '56 Cao Thắng, Phường 4, Quận 3', '2023-08-10',	'2023-12-05', 1],
                [3, 'pmlinh21@clc.fitus.edu.vn', 1,	20,	8, 11.23, 5.42,	3, 'Xây dựng ước mơ của bạn. Chất lượng đến từng chi tiết.', 'image3.png', 'Công ty Xây dựng Tiến Đạt', 'info@tiendatconstruction.vn', '0123456789', '789 Lê Văn Sỹ, Phường 2, Quận Tân Bình', '2023-08-15',	'2023-12-11', 1],
                [4, 'ncluan21@clc.fitus.edu.vn', 2,	25,	2, 7.49, 2.95, 1, 'Chúng tôi tạo ra giải pháp công nghệ tương lai tại BlueSky Tech Solutions. Từ phần mềm đến phần cứng, chúng tôi đưa bạn đến gần hơn với tương lai kỹ thuật số. Hãy mở cánh cửa của sự đổi mới với chúng tôi!', '', 'BlueSky Tech Solutions', 'info@blueskytechsolutions.com', '0976543210', '15 Đinh Công Tráng, Phường Tân Định, Quận 1', '2023-09-01', '2023-12-15', 0],
                [5, 'nnlien21@clc.fitus.edu.vn', 2,	22,	7, 9.88, 4.67, 4, 'Hương vị tinh tế từ bếp đến bát. Đẳng cấp trong từng giọt mồ hôi.', '', 'Công ty Thực phẩm Hương Thảo', 'info@huongthaofoods.com', '0776543210', '222 Hùng Vương, Phường 9, Quận 5',	'2023-09-07', '2023-12-20', 1],
                [6, 'nnlien21@clc.fitus.edu.vn', 1,	21,	1, 5.34, 6.11, 1, 'Sáng tạo không gian xanh. Thiên nhiên sống động trong lòng thành phố.', 'image2.png', 'EverGreen Landscapes', 'info@evergreenlandscapes.com', '0145678901', '432 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1', '2023-09-14', '2023-12-24', 0],
                [7, 'nthphuc21@clc.fitus.edu.vn', 1, 10, 6,	13.01, 9.86, 1,	'Ở đằng sau mỗi ứng dụng tuyệt vời là một đội ngũ sáng tạo. Công ty Công nghệ Phần mềm Sáng Tạo chú trọng vào việc phát triển các ứng dụng và phần mềm độc đáo, giúp bạn kết nối và làm việc hiệu quả hơn.', '', 'Công ty Công nghệ Phần mềm Sáng Tạ', 'info@sangtaosoftware.vn', '0932104765', '76 Lê Lai, Phường Bến Thành, Quận 1',	'2023-09-22', '2023-12-30', 0],
                [8, 'pmlinh21@clc.fitus.edu.vn', 2,	7, 9, 10.65, 8.33, 2, 'Gửi hàng đến mọi nơi. An toàn, đồng hành đáng tin cậy.', 'image1.png', 'OceanWave Logistics', 'info@oceanwavelogistics.com', '0732104765', '321 Võ Văn Tần, Phường 5, Quận 3', '2023-10-02', '2024-01-03', 1],
                [9, 'pmlinh21@clc.fitus.edu.vn', 1,	15,	10,	2.97, 10.75, 1,	'Sức khỏe không giới hạn. Chăm sóc sức khỏe tại đỉnh.', 'image1.png', 'Công ty Y tế Hoàn Hảo', 'info@hoanhaohealthcare.com',	'0112233445', '99 Trần Quang Diệu, Phường 14, Quận 3', '2023-10-09',	'2024-01-08', 1],
                [10, 'ncluan21@clc.fitus.edu.vn', 2,	9, 4, 12.45, 7.19, 1, 'Nắng là nguồn năng lượng vô tận, và chúng tôi biến nó thành điện. Với công nghệ tiên tiến và lòng đam mê bền vững, chúng tôi giúp bạn tiết kiệm năng lượng và giữ cho hành tinh của chúng ta xanh sạch hơn.', '', 'GoldenSun Solar Energy', 'info@goldensunsolarenergy.com', '0943216547', '666 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận', '2023-10-15', '2024-01-14', 0],
                [11, 'nnlien21@clc.fitus.edu.vn', 1,	14,	2, 6.78, 11.24,	1,	'Hỗ Trợ Cộng Đồng, Xây Dựng Tương Lai! Chúng tôi đầu tư vào các dự án xã hội để tạo ra những thay đổi tích cực trong cuộc sống hàng ngày của bạn.', 'image1.png', 'Công ty Du lịch Phong Cảnh Đẹp', 'info@phongcachdeptravel.com',	'0743216547', '444 Lê Quang Định, Phường 11, Quận Bình Thạnh', '2023-10-22', '2024-01-18', 0],
                [12, 'nthphuc21@clc.fitus.edu.vn', 1, 21, 7,	14.20, 12.68, 2, 'Quản lý tài chính, xây dựng tương lai. Đối tác tài chính đáng tin cậy.', 'image4.png', 'SilverLine Financial Services', 'info@silverlinefinancials.com', '0134567890', '777 Phan Xích Long, Phường 3, Quận Phú Nhuận', '2023-11-01',	'2024-01-23', 1],
                [13, 'ncluan21@clc.fitus.edu.vn', 2,	20,	1, 1.54, 13.91,	3, 'Nội thất độc đáo, phản ánh cá nhân. Không gian sống đẳng cấp.', '', 'Công ty Trang trí Nội thất Mỹ Ngọc',	'info@myngocinteriors.com',	'0965432101', '101 Hoàng Sa, Phường Đa Kao, Quận 1', '2023-11-08', '2024-01-27', 1],
                [14, 'nnlien21@clc.fitus.edu.vn', 1,	19,	6, 4.89, 14.54,	1, 'Đóng gói thân thiện với môi trường. Bảo vệ hành tinh, bắt đầu từ chiếc hộp.', 'image5.png', 'EcoFriendly Packaging Co.',	'info@ecofriendlypackagingco.com', '0765432101', '888 Cách Mạng Tháng Tám, Phường 15, Quận 10', '2023-11-15', '2024-02-02', 0],
                [15, 'nthphuc21@clc.fitus.edu.vn', 1, 18, 8,	15.00, 6.78, 1,	'Học ngoại ngữ, mở cánh cửa thế giới. Giáo viên chất lượng, học viên tự tin.', '', 'Công ty Đào tạo Ngoại ngữ Quốc tế', 'info@quocnuguageschool.com', '0156789012', '222 Lê Thị Riêng, Phường Bến Thành, Quận 1',	'2023-11-21', '2024-02-06', 1],
                [16, 'nnlien21@clc.fitus.edu.vn', 1,	17, 10,	9.33, 9.11,	2, 'Kiến trúc đẳng cấp, không gian độc đáo. Biến ý tưởng thành hiện thực.', 'image1.png', 'RedStone Architecture & Design', 'info@redstonead.com', '0998765432', '555 Nguyễn Đình Chính, Phường 8, Quận Phú Nhuận', '2023-12-03', '2024-02-11', 1],
                [17, 'pmlinh21@clc.fitus.edu.vn', 2,	12,	9, 3.21, 10.43,	1, 'Đồ chơi sáng tạo, tương tác thông minh. Nụ cười và học hỏi trong mỗi chiếc đồ chơi.', '', 'Công ty Sản xuất Đồ chơi Sáng Tạo', 'info@creativetoymanufacturing.com', '0798765432', '111 Điện Biên Phủ, Phường Đa Kao, Quận 1', '2023-12-11', '2024-02-15', 0],
                [18, 'ncluan21@clc.fitus.edu.vn', 1,	11,	5, 6.75, 3.57, 1, 'Giải pháp IT tiên tiến. Kết nối kỹ thuật số, tương lai không giới hạn.', 'image6.png', 'TechVista IT Solutions', 'info@techvistaitsolutions.com', '0187654321', '999 Phan Đình Phùng, Phường 2, Quận Phú Nhuận', '2023-12-18', '2024-02-20', 0],
                [19, 'pmlinh21@clc.fitus.edu.vn', 2,	3, 3, 11.98, 2.89, 1, 'Thể thao đỉnh cao, niềm vui không ngừng. Thiết bị chất lượng, niềm đam mê không giới hạn.', '', 'Công ty Thể thao Đỉnh Cao', 'info@dinhhaothethao.vn', '0911112222',	'666 Cách Mạng Tháng Tám, Phường 6, Quận Tân Bình', '2023-12-24', '2024-02-24', 1],
                [20, 'nnlien21@clc.fitus.edu.vn', 1,	16,	4, 2.36, 8.01, 1, 'Hoa tươi độc đáo, tinh tế. Biến mọi dịp trở nên đặc biệt với vẻ đẹp của chúng tôi.', '', 'PurplePetal Floral Design', 'info@purplepetalfloraldesign.com',	'0711112222', '333 Phan Xích Long, Phường 7, Quận Phú Nhuận', '2023-12-30', '2024-03-01', 1]
            ];
            localStorage.setItem('ads_create', JSON.stringify(ads_create));
            if (email == "quan@gmail.com")
                localStorage.setItem('role', '1');
            if (email == "phuong@gmail.com")
                localStorage.setItem('role', '2');
            if (email == "so@gmail.com")
                localStorage.setItem('role', '3');
            window.location.href = "/";
        }
        
    });
});