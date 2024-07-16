const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("../Controlles/Article");
const checkAuth = require("../middleware/auth");

router.get("/",getArticles );
router.post("/", checkAuth, createArticle);
router.delete("/:id", checkAuth, deleteArticle);
router.put("/:id", checkAuth, updateArticle);

module.exports = router; 
