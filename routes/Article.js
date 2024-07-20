const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  getArticles,
  getOneArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("../Controlles/Article");
const checkAuth = require("../middleware/auth");

router.get("/",getArticles );
router.get("/:id", getOneArticle);
router.post("/", checkAuth, createArticle);
router.delete("/:id", checkAuth, deleteArticle);
router.put("/:id", checkAuth, updateArticle);

module.exports = router; 
