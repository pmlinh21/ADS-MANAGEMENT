const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CanboPhuong.init(sequelize, DataTypes);
}

class CanboPhuong extends Sequelize.Model {
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
    id_ward: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ward',
        key: 'id_ward'
      }
    }
  }, {
    sequelize,
    tableName: 'canbophuong',
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
        name: "id_ward",
        using: "BTREE",
        fields: [
          { name: "id_ward" },
        ]
      },
    ]
  });
  }
}
