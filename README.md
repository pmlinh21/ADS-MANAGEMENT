# PTUDW-21KTPM4-Nhom06
Đây là hướng dẫn chi tiết để biên dịch và cài đặt đồ án từ mã nguồn. Đảm bảo bạn đã tải và giải nén file src.zip để có mã nguồn của đồ án và file db.zip để có script tạo database.

## Cài đặt database

Đảm bảo bạn đã cài đặt PostgreSQL trên máy tính của bạn.

- Mở `pgAdmin`. Trong Menubar, nhấn vào **Object** -> **Register** -> **Server** để tạo Server cho localhost
- Ở tab "General": Điền "Name" là tên của Server muốn tạo (tùy ý)
- Ở tab **Connection**:
   + Điền **Hostname / address** là "localhost"
   + Điền **Username** và **Password** là thông tin tài khoản postgres của máy
- Nhấn **Save** để tạo Server
- Nhấn chọn database **postgres** trong server vừa mới tạo. Trong Menubar, nhấn vào **Tool** -> **Query Tool** và dán nội dung file `db.sql` trong thư mục `db` vào khung **Query**.
- Nhấn chọn database **postgres** trong server vừa mới tạo. Trong Menubar, nhấn vào **Object** -> **Properties**.
   + Nếu thông tin ở phần **Owner** là "postgres", nhấn **Execute** (F5) để thực thi truy vấn.
   + Ngược lại, nhấn **Replace** (Ctrl + Shift + F) để thay thế cụm "postgres" thành thông tin ở phần **Owner**. Nhấn **Execute** (F5) để thực thi truy vấn.

## Cài đặt source code

Đảm bảo bạn đã cài đặt Node.js và npm trên máy tính của bạn. 
Lưu ý: cài đặt phân hệ cán bộ trước khi cài đặt phân hệ người dân.

**Phân hệ cán bộ**

- Mở terminal và di chuyển đến folder `canbo`.

- Chạy lệnh sau để tải các package cần thiết:
```bash
  npm install
```
- Chạy lệnh sau để khởi động server:
```bash
  npm start
```
- Mở trình duyệt và truy cập http://localhost:8080.

Sau bước này, bạn sẽ có thể truy cập trang web của cán bộ trên máy tính của bạn.


**Phân hệ người dân**

- Mở folder `nguoidan` trong Visual Studio Code hoặc trình soạn thảo mã nguồn phổ biến khác.

- Mở file `index.html`.

- Nhấp chuột phải vào file và chọn "Open with Live Server".

Sau bước này, trang web của người dân sẽ mở trên trình duyệt mặc định của bạn.


