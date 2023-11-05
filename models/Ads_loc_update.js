const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ads_loc_update.init(sequelize, DataTypes);
}

class Ads_loc_update extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_req: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    officer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    office: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_ads_location: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ads_location',
        key: 'id_ads_location'
      }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    latitude: {
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
    },
    req_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ads_loc_update',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_req" },
        ]
      },
      {
        name: "id_ads_location",
        using: "BTREE",
        fields: [
          { name: "id_ads_location" },
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
