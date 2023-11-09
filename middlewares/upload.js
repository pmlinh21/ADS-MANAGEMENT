const multer = require('multer');

const storage = (folderName) => multer.diskStorage({
    // định nghĩa đường dẫn lưu file
    destination: (req, file, cb)=>{
        cb(null, process.cwd() + "/public/image/" + folderName);
    },
    // đổi tên file khi upload (trước khi lưu file)
    filename: (req, file, cb)=>{
        let fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    }
})

const upload = (folderName) => multer({
    storage: storage(folderName)
});

module.exports = {upload}
