const mongoose = require("mongoose");

const URL =
  "mongodb+srv://admin:admin@cluster0.tebvcyp.mongodb.net/pos?retryWrites=true&w=majority";

mongoose.connect(URL);

let conObje = mongoose.connection;

conObje.on("connected", () => {
  console.log("Mongo DB connection successfull");
});

conObje.on("error", () => {
  console.log("Connection failed to connect");
});
