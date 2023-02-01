const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// creates a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({ tag_name: req.body.tag_name });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !tagData[0]
      ? res.status(400).json({ message: 'No tag with that Id was found' })
      : res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({ where: { id: req.params.id } });
    !tagData
      ? res.status(400).json({ message: 'No tag with that id was found' })
      : res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
