const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ads_create.init(sequelize, DataTypes);
}

class Ads_create extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init(
    {
    id_create: {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_ads: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },{
    sequelize,
    tableName: 'ads_create',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_create" },
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
