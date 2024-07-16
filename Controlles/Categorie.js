const Categorie = require('../Models/Categorie');
const { CategorieValidator } = require("../utilities/validators");


// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by Id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Categorie.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createCategory = async (req, res) => {
  const { title, description } = req.body;
  const validationResult = CategorieValidator.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    return res.json(validationResult.error);
  }
  const newCategory = new Categorie({ title, description });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const validationResult = CategorieValidator.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    return res.json(validationResult.error);
  }
  try {
    const updatedCategory = await Categorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Categorie.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
