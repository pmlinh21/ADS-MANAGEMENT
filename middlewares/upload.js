const multer = require('multer');

// const storage = (folderName) => multer.diskStorage({
//     // định nghĩa đường dẫn lưu file
//     destination: (req, file, cb)=>{
//         cb(null, process.cwd() + "/public/image" + folderName ? "/" + folderName : "");
//     },
//     // đổi tên file khi upload (trước khi lưu file)
//     filename: (req, file, cb) => {
//         let fileName = Date.now() + "_" + file.originalname;
//         cb(null, fileName);
//     }
// })

const storage = function(folderName) {
    let path;
    if (folderName == undefined || folderName == null || folderName == "") {
        path = "";
    } else {
        path = "/" + folderName;
    }
    return multer.diskStorage({
        // định nghĩa đường dẫn lưu file
        destination: (req, file, cb)=>{
            cb(null, process.cwd() + "/public/image" + path);
        },
        // đổi tên file khi upload (trước khi lưu file)
        filename: (req, file, cb) => {
            let fileName = Date.now() + "_" + file.originalname;
            cb(null, fileName);
        }
    })
}

const uploadNone = multer()

const upload = (folderName) => multer({
    storage: storage(folderName)
});

module.exports = { upload, uploadNone }
