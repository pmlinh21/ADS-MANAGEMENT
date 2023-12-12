const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

// GET: get canboPhuong list
const getCanBoPhuong = async(req, res) => {
    let cbphuong = await model.CanboPhuong.findAll();
    res.send(cbphuong);
}

// GET: get ads_loc for homepage
const getMapAdsLoc = async(req, res) => {
    let { id_ward } = req.params;
    try{
        const [adsloc, metadata1] = await sequelize.query
            (`SELECT al.id_ads_location, al.address, w.*, d.*, lt.loc_type, at.ads_type, al.is_zoning, 
            al.photo, al.longitude, al.latitude
            FROM Ads_location al
            INNER JOIN Ward w ON al.id_ward = w.id_ward
            INNER JOIN District d ON w.id_district = d.id_district
            INNER JOIN Location_type lt ON lt.id_loc_type = al.id_loc_type 
            INNER JOIN Ads_type at ON at.id_ads_type = al.id_ads_type
            WHERE al.id_ward = ${id_ward}`);

        const [ads, metadata2] = await sequelize.query
            (`SELECT a.*, bt.board_type
            FROM Ads a
            INNER JOIN Board_type bt ON bt.id_board_type = a.id_board_type
            INNER JOIN Ads_location al ON al.id_ads_location = a.id_ads_location
            WHERE al.id_ward = ${id_ward}`);

        for (let i = 0; i < ads.length; i++) {
            const [ads_report, metadata3] = await sequelize.query
                (`SELECT ar.*, rt.report_type
                FROM Ads_report ar
                INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
                WHERE ar.id_ads = ${ads[i].id_ads}`);  
            if (ads_report.length == 0)
                ads[i] = {...ads[i], list_report: null}
            else
                ads[i] = {...ads[i], list_report: ads_report}          
        }

        for (let i = 0; i < adsloc.length; i++) {

            const [adsloc_report, metadata4] = await sequelize.query
            (`SELECT ar.*, rt.report_type
            FROM Ads_loc_report ar
            INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
            WHERE ar.id_ads_location = ${adsloc[i].id_ads_location}`);
                
            let list_ads = []
            for (let j = 0; j < ads.length; j++) {
                if (ads[j].id_ads_location == adsloc[i].id_ads_location){
                    list_ads.push(ads[j])
                }
            }

            if (adsloc_report.length == 0 && list_ads.length > 0)
                adsloc[i] = {...adsloc[i], list_report: null, list_ads: list_ads}
            else if (adsloc_report.length > 0 && list_ads.length == 0)
                adsloc[i] = {...adsloc[i], list_report: adsloc_report, list_ads: null}
            else if (adsloc_report.length == 0 && list_ads.length == 0)
                adsloc[i] = {...adsloc[i], list_report: null, list_ads: null}
            else 
                adsloc[i] = {...adsloc[i], list_report: adsloc_report, list_ads: list_ads}

        }    

        sucessCode(res, adsloc, "Get thành công")

    }catch(err){
        errorCode(res, "Lỗi BE")
    }
} 


module.exports = { getCanBoPhuong, getMapAdsLoc }