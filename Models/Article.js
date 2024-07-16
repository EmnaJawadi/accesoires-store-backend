const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  designation: { type: String },
  description: { type: String, required: true },
  photo: { type: String },
  price: { type: Number, required: true },
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;