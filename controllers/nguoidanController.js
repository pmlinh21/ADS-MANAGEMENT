const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

const getAdsLoc = async (req, res) => {
    try {
        const [adsloc, metadata1] = await sequelize.query
            (`SELECT al.id_ads_location, al.address, w.*, d.*, lt.loc_type, at.ads_type, al.is_zoning, 
            al.photo, al.longitude, al.latitude
            FROM Ads_location al
            INNER JOIN Ward w ON al.id_ward = w.id_ward
            INNER JOIN District d ON w.id_district = d.id_district
            INNER JOIN Location_type lt ON lt.id_loc_type = al.id_loc_type 
            INNER JOIN Ads_type at ON at.id_ads_type = al.id_ads_type`);

        const [ads, metadata2] = await sequelize.query
            (`SELECT a.*, bt.board_type
            FROM Ads a
            INNER JOIN Board_type bt ON bt.id_board_type = a.id_board_type
            WHERE EXISTS(
                SELECT 1
                FROM Ads_create ac
                WHERE ac.id_ads = a.id_ads AND ac.status = true 
            )`);

        for (let i = 0; i < ads.length; i++) {
            const [ads_report, metadata3] = await sequelize.query
                (`SELECT ar.*, rt.report_type
                FROM Ads_report ar
                INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
                WHERE ar.id_ads = ${ads[i].id_ads}`);
            if (ads_report.length == 0)
                ads[i] = { ...ads[i], list_report: null }
            else
                ads[i] = { ...ads[i], list_report: ads_report }
        }

        for (let i = 0; i < adsloc.length; i++) {

            const [adsloc_report, metadata4] = await sequelize.query
                (`SELECT ar.*, rt.report_type
            FROM Ads_loc_report ar
            INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
            WHERE ar.id_ads_location = ${adsloc[i].id_ads_location}`);

            let list_ads = []
            for (let j = 0; j < ads.length; j++) {
                if (ads[j].id_ads_location == adsloc[i].id_ads_location) {
                    list_ads.push(ads[j])
                }
            }

            if (adsloc_report.length == 0 && list_ads.length > 0)
                adsloc[i] = { ...adsloc[i], list_report: null, list_ads: list_ads }
            else if (adsloc_report.length > 0 && list_ads.length == 0)
                adsloc[i] = { ...adsloc[i], list_report: adsloc_report, list_ads: null }
            else if (adsloc_report.length == 0 && list_ads.length == 0)
                adsloc[i] = { ...adsloc[i], list_report: null, list_ads: null }
            else
                adsloc[i] = { ...adsloc[i], list_report: adsloc_report, list_ads: list_ads }

        }
        sucessCode(res, adsloc, "Get thành công")
    } catch (err) {
        errorCode(res, "Lỗi BE")
    }
}

// const getReport = async (req, res) => {
//     try {
//         let { email } = req.params;

//         // console.log(email)

//         const [adsloc, metadata1] = await sequelize.query
//             (`SELECT alr.*, rt.report_type, al.address, w.*, d.*, 'Điểm đặt' as category
//             FROM Ads_loc_report alr
//             INNER JOIN Report_type rt ON rt.id_report_type = alr.id_report_type
//             INNER JOIN Ads_location al ON al.id_ads_location = alr.id_ads_location
//             INNER JOIN Ward w ON w.id_ward = al.id_ward
//             INNER JOIN District d ON d.id_district = al.id_district
//             WHERE alr.email = '${email}'`);

//         // console.log(adsloc)

//         const [ads, metadata2] = await sequelize.query
//             (`SELECT ar.*, rt.report_type, al.address, w.*, d.*, 'Quảng cáo' as category
//             FROM Ads_report ar
//             INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
//             INNER JOIN Ads a ON a.id_ads = ar.id_ads
//             INNER JOIN Ads_location al ON al.id_ads_location = a.id_ads_location
//             INNER JOIN Ward w ON w.id_ward = al.id_ward
//             INNER JOIN District d ON d.id_district = al.id_district
//             WHERE ar.email = '${email}'`);

//         const [loc, metadata3] = await sequelize.query
//             (`SELECT lr.*, rt.report_type, w.*, d.*, 'Địa điểm bất kì' as category
//             FROM Location_report lr
//             INNER JOIN Report_type rt ON rt.id_report_type = lr.id_report_type
//             INNER JOIN Ward w ON w.id_ward = lr.id_ward
//             INNER JOIN District d ON d.id_district = w.id_district
//             WHERE lr.email = '${email}'`);

//         sucessCode(res, { adsloc, ads, loc }, "Get thành công")

//     } catch (err) {
//         errorCode(res, "Lỗi BE")
//     }
// }

const getLocReport = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query
            (`SELECT lr.*, rt.report_type, w.ward, d.district
            FROM Location_report lr
            INNER JOIN Report_type rt ON lr.id_report_type = rt.id_report_type
            INNER JOIN Ward w ON lr.id_ward = w.id_ward
            INNER JOIN District d ON w.id_district = d.id_district
            `);
        sucessCode(res, data, "Get thành công")
    } catch (err) {
        errorCode(res, "Lỗi BE")
    }
}

const createAdsReport = async (req, res) => {
    // Access the request body
    const requestData = req.body;
    const jsonString = Object.keys(requestData)[0];
    const data = JSON.parse(jsonString);

    console.log(data.content + "data")
    try {
        const ads_report = await model.Ads_report.create({
            officer: data.officer,
            office: data.office,
            id_ads: data.id_ads,
            id_report_type: data.id_report_type,
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            content: data.content,
            status: data.status,
            photo1: data.photo1,
            photo2: data.photo2,
            resolve: "",
            report_time: data.report_time,
        })
        res.status(200).json({
            code: sucessCode,
            message: "success",
            data: ads_report,
        });
    } catch (err) {
        console.log(err)
    }
}

const createAdsLocReport = async (req, res) => {
    // Access the request body
    const requestData = req.body;
    const jsonString = Object.keys(requestData)[0];
    const data = JSON.parse(jsonString);

    console.log(JSON.stringify(data) + "data")
    try {
        const adsloc_report = await model.Ads_loc_report.create({
            officer: data.officer,
            office: data.office,
            id_ads_location: data.id_ads_location,
            id_report_type: data.id_report_type,
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            content: data.content,
            status: data.status,
            photo1: data.photo1,
            photo2: data.photo2,
            resolve: "",
            report_time: data.report_time,
        })
        res.status(200).json({
            code: sucessCode,
            message: "success",
            data: adsloc_report,
        });
    } catch (err) {
        console.log(err)
    }
}

const createLocReport = async (req, res) => {
    // Access the request body
    const requestData = req.body;
    const jsonString = Object.keys(requestData)[0];
    const data = JSON.parse(jsonString);

    console.log(typeof data.longitude + "data")

    console.log(data.content + "data")
    try {
        const loc_report = await model.Location_report.create({
            longitude: data.longitude.toFixed(4),
            latitude: data.latitude.toFixed(4),
            officer: data.officer,
            office: data.office,
            id_ward: data.id_ward,
            id_report_type: data.id_report_type,
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            content: data.content,
            status: data.status,
            photo1: data.photo1,
            photo2: data.photo2,
            resolve: "",
            report_time: data.report_time,
            address: data.address,
        })
        res.status(200).json({
            code: sucessCode,
            message: "success",
            data: loc_report,
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAdsLoc, getLocReport, createAdsReport, createAdsLocReport, createLocReport }