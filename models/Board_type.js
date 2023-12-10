const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Board_type.init(sequelize, DataTypes);
}

class Board_type extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_board_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    board_type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'board_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_board_type" },
        ]
      },
    ]
  });
  }
}
