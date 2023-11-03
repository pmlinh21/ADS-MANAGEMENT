const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CanboQuan.init(sequelize, DataTypes);
}

class CanboQuan extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_district: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'District',
        key: 'id_district'
      }
    }
  }, {
    sequelize,
    tableName: 'CanboQuan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
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
