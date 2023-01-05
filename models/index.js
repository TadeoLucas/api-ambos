const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DIALECT } = process.env;

const sequelizeDB = new Sequelize(
  "mysql://root:R2wdkJHo7wzRhDIDsr9n@containers-us-west-119.railway.app:6992/railway"
);

const { STRING, ENUM, UUIDV4, MEDIUMINT } = DataTypes;

const User = sequelizeDB.define("user", {
  localId: { type: STRING, allowNull: false, primaryKey: true },
  displayName: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false, unique: true },
  photoUrl: { type: STRING, allowNull: true },
  type: {
    type: ENUM("dueño", "admin", "bann", "guest"),
    defaultValue: "guest",
  },
});

const Products = sequelizeDB.define("product", {
  id: { type: STRING, defaultValue: UUIDV4 },
  name: { type: STRING, allowNull: false },
  price: { type: MEDIUMINT, allowNull: false },
  size: { type: STRING, allowNull: false },
  description: { type: STRING, allowNull: false },
  picture: { type: STRING, allowNull: false, primaryKey: true },
  path: { type: STRING, allowNull: false },
  picture2: { type: STRING, allowNull: true },
  path2: { type: STRING, allowNull: true },
});

const SalesHistory = sequelizeDB.define("history", {
  id: { type: STRING, primaryKey: true },
  name: { type: STRING, allowNull: false },
  price: { type: MEDIUMINT, allowNull: false },
  size: { type: STRING, allowNull: false },
  description: { type: STRING, allowNull: false },
  picture: { type: STRING, allowNull: false },
  path: { type: STRING, allowNull: false },
  picture2: { type: STRING, allowNull: true },
  path2: { type: STRING, allowNull: true },
  type: { type: ENUM("soldOut", "awaitingPay"), defaultValue: "awaitingPay" },
});

const Design = sequelizeDB.define("design", {
  id: { type: STRING, defaultValue: UUIDV4, primaryKey: true },
  chaqueta: { type: STRING, allowNull: false },
  vivo: { type: STRING, allowNull: true },
  pantalon: { type: STRING, allowNull: true },
  modelTop: { type: STRING, allowNull: false },
  modelBott: { type: STRING, allowNull: false },
  clientId: { type: STRING, allowNull: false },
});

const Price = sequelizeDB.define("price", {
  id: { type: STRING, defaultValue: UUIDV4, primaryKey: true },
  chaquetaAcrocel: { type: MEDIUMINT, allowNull: false },
  amboAcrocel: { type: MEDIUMINT, allowNull: false },
  chaquetaARCIEL: { type: MEDIUMINT, allowNull: false },
  amboARCIEL: { type: MEDIUMINT, allowNull: false },
});

User.hasMany(Design, { foreignKey: "clientId" });
Design.belongsTo(User);

module.exports = {
  User,
  Design,
  Price,
  Products,
  SalesHistory,
  sequelizeDB,
};
