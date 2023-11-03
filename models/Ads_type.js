const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ads_type.init(sequelize, DataTypes);
}

class Ads_type extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_ads_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ads_type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ads_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ads_type" },
        ]
      },
    ]
  });
  }
}
