const mongoose = require("mongoose");
const DB_connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/SA_Project")
    .then(() => console.log(`Connecting! To Mongoose`))
    .catch((err) => console.log(`NOT Connecting! ${err}`));
};

module.exports = DB_connect;
