const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const all=await Category.findAll({
      include:[{ model:Product }]
    });
    res.status(200).json(all);
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
    try{
    const oneCategory=await Category.findByPk(req.params.id,{
      include:[
        {
          model:Product
        }
      ]
    });
    res.status(200).json(oneCategory)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCategory)=>{
    res.json(newCategory)
  })
  .catch((err)=>res.json(err))
});

router.put('/:id', (req, res) => {
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then((update)=>{
    res.json(update)
  })
  .catch((err)=>res.json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then((gone)=>{
    res.json(gone)
  })
  .catch((err)=>res.json(err))
});

module.exports = router;
