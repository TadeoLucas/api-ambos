const router = require('express').Router();
const mercadopago = require("mercadopago");


// ------------ CREDENCIALES REALES --------------//
require('dotenv').config();
const {PROD_ACCESS_TOKEN} = process.env;

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

// ---------rutas-------- //

router.post("/payment", async (req, res) => {
  const {title, price, quantity, description} = req.body;

  let preference = {
    items: [
      {
        description: description,
        title: title,
        unit_price: price,
        quantity: quantity || 1,
      },
    ],
    
  };

  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.status(201).json(response)
    
    return ;
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  })
  .catch(function (error, req, res, next) {
    next(error);
  });

});

router.post('/response', (req, res) => {
  const data = req.query;
  console.log('response of mercado pago', data);
  // data.data.id es el id q necesito para buscar la compra realizada
})

module.exports = router;


// despues de items []
// puedo configurar notification_url: "http://localhost:3001/api/mercadopago/response"
// para q mercado pago me envie una notificacion de q la compra fue realizada con el detalle
// pero la url debera ser  https y no solo http