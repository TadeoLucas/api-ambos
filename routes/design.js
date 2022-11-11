const router = require('express').Router();
const { Design } = require('../models/index');


router.get('/:clientId', async (req, res, next) => {
  try{
    const clientId = req.params.clientId;
    const designs = await Design.findAll({
      where: {clientId: clientId}, 
      order: [['id', 'ASC']], 
      limit: 20
    }); 
    return res.status(200).json(designs)
  }catch (error){
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try{
  const { chaqueta, vivo, pantalon, modelTop, modelBott, clientId } = req.body;
  await Design.create({chaqueta, vivo, pantalon, modelTop, modelBott, clientId  });
    return res.status(201).json('ok')

  }catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
  const design_remove = await Design.destroy({ where: { id: req.params.id } });
    return res.status(200).json(design_remove);
  }catch (error) {
    next(error);
  }
});


module.exports = router;