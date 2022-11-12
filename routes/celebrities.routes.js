const Celebrities = require('../models/Celebrity.model');
const router = require('express').Router();

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrities.create({
    name,
    occupation,
    catchphrase,
  })
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(err);
      res.render('celebrities/new-celebrity');
    });
});

module.exports = router;
