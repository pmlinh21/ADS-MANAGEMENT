let wardOfficers = [[1, "Nguyễn Trần Hồng Phúc", "1995-04-01", "21127672@student.hcmus.edu.vn", "0900012345", 2, 1], [2, "Phan Mỹ Linh", "1998-08-06", "21127637@student.hcmus.edu.vn", "0781122345", 9, 1], [3, "Ngô Ngọc Liên", "2002-06-25", "21127341@student.hcmus.edu.vn", "0903342521", 25, 3], [4, "Nguyễn Cao Luận", "1989-05-02", "21127350@student.hcmus.edu.vn", "0987654321", 32, 3], [5, "Trần Đăng Khôi", "1986-10-14", "cbphuong1@gmail.com", "0903112233", 1, 1], [6, "Phạm Ngọc Nga", "1993-08-30", "cbphuong2@gmail.com", "0978543210", 3, 1], [7, "Nguyễn Hải Đăng", "1992-03-05", "cbphuong3@gmail.com", "0912345678", 4, 1], [8, "Nguyễn Minh Huy", "1990-04-23", "cbphuong4@gmail.com", "0945321654", 5, 1]];
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = wardOfficers.length; i > 0; i--) {
    if (wardOfficers[i-1][0] == reqid) {
        document.querySelector("#edit-ward-officer #id-officer").value = wardOfficers[i-1][0];
        document.querySelector("#edit-ward-officer #name-officer").value = wardOfficers[i-1][1];
        document.querySelector("#edit-ward-officer #dob-officer").value = wardOfficers[i-1][2];
        document.querySelector("#edit-ward-officer #email-officer").value = wardOfficers[i-1][3];
        document.querySelector("#edit-ward-officer #phone-officer").value = wardOfficers[i-1][4];
        document.querySelector("#edit-ward-officer #work-for-ward").value = wardOfficers[i-1][5];
    }
}