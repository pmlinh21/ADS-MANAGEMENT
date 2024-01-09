const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ads_location.init(sequelize, DataTypes);
}

class Ads_location extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_ads_location: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_ward: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ward',
        key: 'id_ward'
      }
    },
    id_district: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'District',
        key: 'id_district'
      }
    },
    id_loc_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Location_type',
        key: 'id_loc_type'
      }
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_ads_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ads_type',
        key: 'id_ads_type'
      }
    },
    is_zoning: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ads_location',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ads_location" },
        ]
      },
      {
        name: "id_ward",
        using: "BTREE",
        fields: [
          { name: "id_ward" },
        ]
      },
      {
        name: "id_district",
        using: "BTREE",
        fields: [
          { name: "id_district" },
        ]
      },
      {
        name: "id_loc_type",
        using: "BTREE",
        fields: [
          { name: "id_loc_type" },
        ]
      },
      {
        name: "id_ads_type",
        using: "BTREE",
        fields: [
          { name: "id_ads_type" },
        ]
      },
    ]
  });
  }
}
