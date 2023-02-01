const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// This will get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// This will retrieve a category by id param
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {}
});

// This will allow us to create and post a new category to our database
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// This will allow you to update a category name in our database based on a given id
router.put('/:id', (req, res) => {
  try {
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(400).json({ message: 'No category with that id was found' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// This will allow you to delete a category from database by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = Category.destroy({ where: { id: req.params.id } });
    if (!categoryData) {
      res.status(400).json({ message: 'No category with that ID' });
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
