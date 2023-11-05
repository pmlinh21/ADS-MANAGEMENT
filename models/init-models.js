const DataTypes = require("sequelize").DataTypes;
const _Ads = require("./Ads");
const _Ads_create = require("./Ads_create");
const _Ads_loc_report = require("./Ads_loc_report");
const _Ads_loc_update = require("./Ads_loc_update");
const _Ads_location = require("./Ads_location");
const _Ads_report = require("./Ads_report");
const _Ads_type = require("./Ads_type");
const _Ads_update = require("./Ads_update");
const _Board_type = require("./Board_type");
const _CanboPhuong = require("./CanboPhuong");
const _CanboQuan = require("./CanboQuan");
const _CanboSo = require("./CanboSo");
const _District = require("./District");
const _Location_report = require("./Location_report");
const _Location_type = require("./Location_type");
const _OTP = require("./OTP");
const _Report_type = require("./Report_type");
const _Ward = require("./Ward");

function initModels(sequelize) {
  const Ads = _Ads(sequelize, DataTypes);
  const Ads_create = _Ads_create(sequelize, DataTypes);
  const Ads_loc_report = _Ads_loc_report(sequelize, DataTypes);
  const Ads_loc_update = _Ads_loc_update(sequelize, DataTypes);
  const Ads_location = _Ads_location(sequelize, DataTypes);
  const Ads_report = _Ads_report(sequelize, DataTypes);
  const Ads_type = _Ads_type(sequelize, DataTypes);
  const Ads_update = _Ads_update(sequelize, DataTypes);
  const Board_type = _Board_type(sequelize, DataTypes);
  const CanboPhuong = _CanboPhuong(sequelize, DataTypes);
  const CanboQuan = _CanboQuan(sequelize, DataTypes);
  const CanboSo = _CanboSo(sequelize, DataTypes);
  const District = _District(sequelize, DataTypes);
  const Location_report = _Location_report(sequelize, DataTypes);
  const Location_type = _Location_type(sequelize, DataTypes);
  const OTP = _OTP(sequelize, DataTypes);
  const Report_type = _Report_type(sequelize, DataTypes);
  const Ward = _Ward(sequelize, DataTypes);

  Ads_report.belongsTo(Ads, { as: "id_ads_Ad", foreignKey: "id_ads"});
  Ads.hasMany(Ads_report, { as: "Ads_reports", foreignKey: "id_ads"});
  Ads_update.belongsTo(Ads, { as: "id_ads_Ad", foreignKey: "id_ads"});
  Ads.hasMany(Ads_update, { as: "Ads_updates", foreignKey: "id_ads"});
  Ads.belongsTo(Ads_location, { as: "id_ads_location_Ads_location", foreignKey: "id_ads_location"});
  Ads_location.hasMany(Ads, { as: "Ads", foreignKey: "id_ads_location"});
  Ads_create.belongsTo(Ads_location, { as: "id_ads_location_Ads_location", foreignKey: "id_ads_location"});
  Ads_location.hasMany(Ads_create, { as: "Ads_creates", foreignKey: "id_ads_location"});
  Ads_loc_report.belongsTo(Ads_location, { as: "id_ads_location_Ads_location", foreignKey: "id_ads_location"});
  Ads_location.hasMany(Ads_loc_report, { as: "Ads_loc_reports", foreignKey: "id_ads_location"});
  Ads_loc_update.belongsTo(Ads_location, { as: "id_ads_location_Ads_location", foreignKey: "id_ads_location"});
  Ads_location.hasMany(Ads_loc_update, { as: "Ads_loc_updates", foreignKey: "id_ads_location"});
  Ads_update.belongsTo(Ads_location, { as: "id_ads_location_Ads_location", foreignKey: "id_ads_location"});
  Ads_location.hasMany(Ads_update, { as: "Ads_updates", foreignKey: "id_ads_location"});
  Ads_loc_update.belongsTo(Ads_type, { as: "id_ads_type_Ads_type", foreignKey: "id_ads_type"});
  Ads_type.hasMany(Ads_loc_update, { as: "Ads_loc_updates", foreignKey: "id_ads_type"});
  Ads_location.belongsTo(Ads_type, { as: "id_ads_type_Ads_type", foreignKey: "id_ads_type"});
  Ads_type.hasMany(Ads_location, { as: "Ads_locations", foreignKey: "id_ads_type"});
  Ads.belongsTo(Board_type, { as: "id_board_type_Board_type", foreignKey: "id_board_type"});
  Board_type.hasMany(Ads, { as: "Ads", foreignKey: "id_board_type"});
  Ads_create.belongsTo(Board_type, { as: "id_board_type_Board_type", foreignKey: "id_board_type"});
  Board_type.hasMany(Ads_create, { as: "Ads_creates", foreignKey: "id_board_type"});
  Ads_update.belongsTo(Board_type, { as: "id_board_type_Board_type", foreignKey: "id_board_type"});
  Board_type.hasMany(Ads_update, { as: "Ads_updates", foreignKey: "id_board_type"});
  Ads_location.belongsTo(District, { as: "id_district_District", foreignKey: "id_district"});
  District.hasMany(Ads_location, { as: "Ads_locations", foreignKey: "id_district"});
  CanboQuan.belongsTo(District, { as: "id_district_District", foreignKey: "id_district"});
  District.hasMany(CanboQuan, { as: "CanboQuans", foreignKey: "id_district"});
  Ward.belongsTo(District, { as: "id_district_District", foreignKey: "id_district"});
  District.hasMany(Ward, { as: "Wards", foreignKey: "id_district"});
  Ads_loc_update.belongsTo(Location_type, { as: "id_loc_type_Location_type", foreignKey: "id_loc_type"});
  Location_type.hasMany(Ads_loc_update, { as: "Ads_loc_updates", foreignKey: "id_loc_type"});
  Ads_location.belongsTo(Location_type, { as: "id_loc_type_Location_type", foreignKey: "id_loc_type"});
  Location_type.hasMany(Ads_location, { as: "Ads_locations", foreignKey: "id_loc_type"});
  Ads_loc_report.belongsTo(Report_type, { as: "id_report_type_Report_type", foreignKey: "id_report_type"});
  Report_type.hasMany(Ads_loc_report, { as: "Ads_loc_reports", foreignKey: "id_report_type"});
  Ads_report.belongsTo(Report_type, { as: "id_report_type_Report_type", foreignKey: "id_report_type"});
  Report_type.hasMany(Ads_report, { as: "Ads_reports", foreignKey: "id_report_type"});
  Location_report.belongsTo(Report_type, { as: "id_report_type_Report_type", foreignKey: "id_report_type"});
  Report_type.hasMany(Location_report, { as: "Location_reports", foreignKey: "id_report_type"});
  Ads_location.belongsTo(Ward, { as: "id_ward_Ward", foreignKey: "id_ward"});
  Ward.hasMany(Ads_location, { as: "Ads_locations", foreignKey: "id_ward"});
  CanboPhuong.belongsTo(Ward, { as: "id_ward_Ward", foreignKey: "id_ward"});
  Ward.hasMany(CanboPhuong, { as: "CanboPhuongs", foreignKey: "id_ward"});


  Ads_loc_update.belongsTo(District, { as: "id_district_District", foreignKey: "id_district"});
  District.hasMany(Ads_loc_update, { as: "Ads_loc_updates", foreignKey: "id_district"});
  Ads_loc_update.belongsTo(Ward, { as: "id_ward_Ward", foreignKey: "id_ward"});
  Ward.hasMany(Ads_loc_update, { as: "Ads_loc_updates", foreignKey: "id_ward"});
  Ads_loc_report.belongsTo(Ward, { as: "id_ward_Ward", foreignKey: "id_ward"});
  Ward.hasMany(Ads_loc_report, { as: "Ads_loc_reports", foreignKey: "id_ward"});
  return {
    Ads,
    Ads_create,
    Ads_loc_report,
    Ads_loc_update,
    Ads_location,
    Ads_report,
    Ads_type,
    Ads_update,
    Board_type,
    CanboPhuong,
    CanboQuan,
    CanboSo,
    District,
    Location_report,
    Location_type,
    OTP,
    Report_type,
    Ward,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
