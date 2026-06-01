const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Livre = sequelize.define("Livre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  auteur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut_publication: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Livre;