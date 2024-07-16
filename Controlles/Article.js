const { get } = require("../routes/Article");
const Article = require("../Models/Article");
const { ArticleValidator } = require("../utilities/validators");

const getArticles = async (req, res) => {
  try {
    const Articles = await Article.find().populate("categorie");
    res.json(Articles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while getting items", err });
  }
};

const createArticle = async (req, res) => {
  try {
    const { body } = req;
    const validationResult = ArticleValidator.validate(body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.json(validationResult.error.details);
    }
    const newArticle = new Article(body);
    await newArticle.save();
    res.json({ message: "Item Successfully created", Article: newArticle });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};




const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "item not found" });
    }
  
    const ArticleDeleted = await Article.findOneAndDelete({
      _id: id,
    });
    if (!ArticleDeleted) {
      return res
        .status(401)
        .json({ message: "You are not allowed to take this action" });
    }
    res.json({ message: "Article successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while getting Article", err });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const validationResult = ArticleValidator.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.json(validationResult.error.details);
    }
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "item not found" });
    }
    const updatedAricle = await Article.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedAricle) {
      return res
        .status(401)
        .json({ message: "You are not allowed to take this action" });
    }
    res.json(updatedAricle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while updating Article", err });
  }
};

module.exports = { getArticles, createArticle, deleteArticle, updateArticle };