const router = require("express").Router();
const { Price } = require("../models/index");

router.get("/", async (_req, res, next) => {
  try {
    const lastPrice = await Price.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(lastPrice);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { chaquetaAcrocel, amboAcrocel, chaquetaARCIEL, amboARCIEL } =
      req.body;
    const response = await Price.create({
      chaquetaAcrocel,
      amboAcrocel,
      chaquetaARCIEL,
      amboARCIEL,
    });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
