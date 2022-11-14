const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const all = await Tag.findAll({
      include:[
        {
          model: Product
        }
      ]
    });
    res.status(200).json(all)
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const one = await Tag.findByPk(req.params.id, {
      include:[
        {
          model: Product
        }
      ]
    });
    res.status(200).json(one)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag)=>{
    res.json(newTag)
  })
  .catch((err)=>res.json(err))
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then((changedTag)=>{
    res.json(changedTag)
  })
  .catch((err)=>res.json(err))
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id
    }
  })
  .then((deleted)=>{
    res.json(deleted)
  })
  .catch((err)=>res.json(err))
});

module.exports = router;
