const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  Category.findAll({
    include:[Product]
  }).then(categories=>{
    res.json(categories)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({msg:"Oops! An error occurred!",err})
  })
});


  // find all categories
  // be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{
    include:[Product]
  }).then(category=>{
    if(!category){
       return res.status(404).json({msg:"Oops! There is no category with that ID",err})
      }
    res.json(category)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"Oops! An error occurred!"})
    })
  });



router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json({msg:"Oops! An error occurred!",err})
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name:req.body.category_name
  },{
    where:{
      id:req.params.id
    }
  }).then(editCategory=>{
    if(!editCategory[0]){
      return res.status(404).json({msg:"Oops! There is no category with that ID"})
    }
    res.json(editCategory)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"Oops! An error occurred!",err})
  })
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
 const category=await Category.destroy(
  {
    where:{
      id:req.params.id
    }
  }
 )
 res.status(200).json(category)
});

module.exports = router;
