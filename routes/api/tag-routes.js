const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ Oohh: "Oopsie Daisy!" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name"],
        },
      ],
    });
    res.status(200).json({ Error: "Sorry, yo. Not found." }, err);
  } catch (err) {
    res.status(400).json({ Oohh: "Oopsie Daisy!" });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json({ Oohh: "Oopsie Daisy!" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json({ Oohh: "Oopsie Daisy!" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(400).json({ Oohh: "Oopsie Daisy!" });
  }
});

module.exports = router;