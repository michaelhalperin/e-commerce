const usersR = require("./users");
const gamesR = require("./products");
const indexR = require("./index");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/products", gamesR);
};
