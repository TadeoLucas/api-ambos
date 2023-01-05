const router = require("express").Router();
const { User, Design } = require("../models/index");

router.get("/", async (_req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/unique/:localId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.localId);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/withDesign/:id", async (req, res, next) => {
  try {
    const userWithDesign = await User.findByPk(req.params.id, {
      include: [
        {
          model: Design,
        },
      ],
    });
    return res.status(200).json(userWithDesign);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user_firebase_date = req.body;
    const { localId, displayName, email, photoUrl } = user_firebase_date;

    const user_created = await User.findByPk(localId);

    if (user_created) {
      return res.status(202).json(user_created);
    } else {
      const user = await User.create({ localId, displayName, email, photoUrl });

      return res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { localId, displayName, email, photoUrl, type } = req.body;
    const { id } = req.params;

    const userToUpdate = await User.findByPk(id);
    await userToUpdate.update({ localId, displayName, email, photoUrl, type });
    return res.status(200).send(userToUpdate);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let user_remove = await User.destroy({ where: { localId: req.params.id } });
    return res.status(200).json(user_remove);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
