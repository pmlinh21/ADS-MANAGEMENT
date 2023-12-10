const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ward.init(sequelize, DataTypes);
}

class Ward extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_ward: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ward: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_district: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'district',
        key: 'id_district'
      }
    }
  }, {
    sequelize,
    tableName: 'ward',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
    ]
  });
  }
}
