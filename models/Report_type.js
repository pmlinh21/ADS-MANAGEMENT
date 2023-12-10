const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Report_type.init(sequelize, DataTypes);
}

class Report_type extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_report_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    report_type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'report_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_report_type" },
        ]
      },
    ]
  });
  }
}
