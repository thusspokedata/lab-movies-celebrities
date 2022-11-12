const Celebrity = require('../models/Celebrity.model');
const router = require('express').Router();

router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchphrase,
  })
    .then((celebrities) => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      next(err);
      res.render('celebrities/new-celebrity');
    });
});

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render('celebrities/celebrities', celebrities);
    })
    .catch((err) => {
      console.log(err);
      res.render('celebrities/new-celebrity');
    });
});

module.exports = router;
