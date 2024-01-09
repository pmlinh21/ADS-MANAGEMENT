const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OTP.init(sequelize, DataTypes);
}

class OTP extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    expired_time: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    OTP: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'otp'
    }
  }, {
    sequelize,
    tableName: 'otp',
    modelName: 'OTP',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
          { name: "expired_time" },
        ]
      },
    ]  });
  }
}
