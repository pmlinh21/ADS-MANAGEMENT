const express = require('express');
const nguoidanRoute = express.Router();
const { getAdsLoc, getReport,} = require('../controllers/nguoidanController')
const { upload } = require('../middlewares/upload');

nguoidanRoute.get("/getAdsLoc", getAdsLoc);

nguoidanRoute.get("/getReport/:email", getReport);

nguoidanRoute.post('/createAdsReport', (req, res) => {
    // Access the request body
    const reportObject = req.body;

    // Process the received data as needed
    console.log('Received report data:', reportObject);

    // Respond to the client
    res.status(200).json({ message: 'Report data received successfully' });
});

// nguoidanRoute.post("/createAdsReport", async (req, res) => {
//     try {
//         res.send("req.body")
//         upload(req, res, async (err) => {
//             if (err) {
//                 errorCode(res, "Lỗi BE")
//             } else {
//                 const { id_ads, id_report_type, email, note } = req.body;
//                 const image = req.files?.image;
//                 console.log(res.body)

//                 // const [data, metadata] = await sequelize.query
//                 //     (`INSERT INTO Ads_report (id_ads, id_report_type, email, note, image)
//                 //     VALUES (${id_ads}, ${id_report_type}, '${email}', '${note}', '${image[0].filename}')`);

//                 // sucessCode(res, data, "Tạo thành công")
//             }
//         })
//     } catch (err) {
//         errorCode(res, "Lỗi BE")
//     }
// });

// nguoidanRoute.get("/getWardNgDan", getWardNgDan);

module.exports = nguoidanRoute;