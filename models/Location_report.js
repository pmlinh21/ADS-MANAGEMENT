const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Location_report.init(sequelize, DataTypes);
}

class Location_report extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_report: {
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
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_report_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Report_type',
        key: 'id_report_type'
      }
    },
    fullname: {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    resolve: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Location_report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_report" },
        ]
      },
      {
        name: "id_report_type",
        using: "BTREE",
        fields: [
          { name: "id_report_type" },
        ]
      },
    ]
  });
  }
}
