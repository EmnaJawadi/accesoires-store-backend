
const express = require('express');
const router = express.Router();
const categorieController = require('../Controlles/Categorie');
const checkAuth = require("../middleware/auth");

router.get('/', categorieController.getAllCategories);
router.get('/:id', categorieController.getCategoryById);
router.post('/', checkAuth, categorieController.createCategory);
router.put('/:id', checkAuth, categorieController.updateCategory);
router.delete('/:id', checkAuth, categorieController.deleteCategory);

module.exports = router;
