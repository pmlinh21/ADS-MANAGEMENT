const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ads.init(sequelize, DataTypes);
}

class Ads extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_ads: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    id_ads_create: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ads_create',
        key: 'id_create'
      }
    }
  }, {
    sequelize,
    tableName: 'ads',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
