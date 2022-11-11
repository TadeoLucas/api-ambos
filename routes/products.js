const router = require('express').Router();
const { Products } = require('../models/index');


router.get('/', async (_req, res, next) => {
  try{
    const products = await Products.findAll({order: [['id', 'ASC']], limit: 20});
  
    return res.status(202).json(products)
  }catch (error){
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const products = await Products.findByPk(req.params.picture);
    return res.send(products)
  }catch (error){
    next(error);
  }
}); 

router.post('/', async (req, res, next) => {
  try {
  const { name, price, size, description, picture, path, picture2, path2 } = req.body;
 
  await Products.create({ name, price, size, description, picture, path, picture2, path2 });
    return res.sendStatus(201);

  } catch (error) {
    next(error);
  }
});


router.put('/modify', async (req, res, next) => {
  try{
    const { name, price, size, description, picture } = req.body;
    const productToUpdate = await Products.findByPk(picture);
    await productToUpdate.update({ name, size, price, description });
    return res.status(201).send(productToUpdate);

  }catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
  let product_remove = await Products.destroy({ where: { id: req.params.id } });
    return res.status(204).json(product_remove);
  }catch (error) {
    next(error);
  }
});


module.exports = router;