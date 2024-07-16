const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 5500;
const DB_CONNECTION = process.env.DB_CONNECTION;
const Articleroutes = require("./routes/Article");
const Usersroutes = require("./routes/Users");
const Commanderouetes= require("./routes/Commande");
const categorieroutes=require("./routes/Categorie")
const app = express();
// parse json data (req.body)
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "App is working !" });
});

app.use("/articles", Articleroutes);
app.use("/users", Usersroutes);
app.use("/commandes",Commanderouetes);
app.use("/categories",categorieroutes)

mongoose
  .connect(DB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });