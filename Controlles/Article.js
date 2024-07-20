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

const getOneArticle = async (req, res) => {
  try {
      const article = await Article.findById(req.params.id).populate('categorie')
      if (article) {
          res.status(200).json(article)
      } else {
          res.status(404).json({ error: "Article not found" })
      }
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}

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
    res.json({ message: "Item Successfully created", article: newArticle });
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
    res.json({ 
      message: "Article successfully deleted",
      article: {
        _id: id
      }
    });
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
      { new: true, populate: "categorie" }
    );
    if (!updatedAricle) {
      return res
        .status(401)
        .json({ message: "You are not allowed to take this action" });
    }
    res.json({
      message: "Article updated successfully",
      article: updatedAricle
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while updating Article", err });
  }
};

module.exports = { getArticles, getOneArticle, createArticle, deleteArticle, updateArticle };