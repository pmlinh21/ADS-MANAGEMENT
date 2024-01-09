const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return District.init(sequelize, DataTypes);
}

class District extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_district: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    district: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'district',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_district" },
        ]
      },
    ]
  });
  }
}