const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String, required: true, unique: true }, 
});

const Categorie = mongoose.model("Categorie", CategorieSchema); 

module.exports = Categorie;
