const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Location_type.init(sequelize, DataTypes);
}

class Location_type extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_loc_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    loc_type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'location_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_loc_type" },
        ]
      },
    ]
  });
  }
}
