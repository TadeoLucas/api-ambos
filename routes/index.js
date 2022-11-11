const { Router } = require('express');

const routerDesign = require("./design");
const routerPrice = require("./price");
const routerProducts = require("./products");
const routerSalesHistory = require("./saleshistory");
const routerUser = require("./user");
const routerMercadoPago = require("./mercadoPago");

const router = Router();

router.use("/design", routerDesign);
router.use("/price", routerPrice);
router.use("/products", routerProducts);
router.use("/saleshistory", routerSalesHistory);
router.use("/user", routerUser);
router.use("/mercadopago", routerMercadoPago);

module.exports = router;