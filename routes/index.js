var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_NMLoQQsb04c88UkrbPQWVo7h");
const app = require("express")();

app.use(require("body-parser").text());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/checkout', function(req, res, next) {

  const token = JSON.parse(req.body.token); // Using Express
  console.log('@@', token);
  console.log('@@', token.email);

   stripe.customers.create({
      email: token.email,
     source: token.id
   })
   .then(customer =>
     stripe.charges.create({
       amount:100,
       description: "Sample Charge",
       currency: "eur",
       customer: customer.id,
     }))
   .then(charge => console.log(charge,'charge'));
});



module.exports = router;
