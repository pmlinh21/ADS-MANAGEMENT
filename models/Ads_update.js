const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ads_update.init(sequelize, DataTypes);
}

class Ads_update extends Sequelize.Model {
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
    id_ads: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ads',
        key: 'id_ads'
      }
    },
    id_ads_location: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ads_location',
        key: 'id_ads_location'
      }
    },
    id_board_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Board_type',
        key: 'id_board_type'
      }
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expired_date: {
      type: DataTypes.DATE,
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
    tableName: 'ads_update',
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
        name: "id_ads",
        using: "BTREE",
        fields: [
          { name: "id_ads" },
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
        name: "id_board_type",
        using: "BTREE",
        fields: [
          { name: "id_board_type" },
        ]
      },
    ]
  });
  }
}
