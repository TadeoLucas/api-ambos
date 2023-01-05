const router = require("express").Router();
const { SalesHistory } = require("../models/index");

router.get("/restart", async (_req, res, next) => {
  try {
    const product = await SalesHistory.findAll({
      where: {
        type: "awaitingPay",
      },
    });
    return res.status(202).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/init", async (req, res, next) => {
  try {
    const {
      id,
      name,
      price,
      size,
      description,
      picture,
      path,
      picture2,
      path2,
    } = req.body;
    await SalesHistory.create({
      id,
      name,
      price,
      size,
      description,
      picture,
      path,
      picture2,
      path2,
    });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await SalesHistory.destroy({ where: { id: req.params.id } });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
