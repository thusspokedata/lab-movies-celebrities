const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/create', (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('movies/new-movie', celebrities);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/create');
    });
});

router.post('/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast,
  })
    .then((movies) => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/create');
    });
});

router.get('/', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then((movies) => {
      res.render('movies/movies', movies);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

router.get('/:id', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate('cast')
    .then((movieDetails) => {
      res.render('movies/movie-details', movieDetails);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

router.post('/:id/delete', async (req, res) => {
  const movieId = req.params.id;
  try {
    await Movie.findByIdAndRemove(movieId);
    res.redirect('/movies');
  } catch (error) {
    console.log(error.message);
    res.redirect('/movies');
  }
});

router.get('/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Celebrity.find().then((celebrities) => {
    Movie.findById(movieId)
      .populate('cast')
      .then((movie) => {
        res.render('movies/edit-movie', {
          movie,
          celebrities,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/movies');
      });
  });
});

router.post('/:id/edit', async (req, res) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.findByIdAndUpdate(movieId, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect('/movies');
  } catch (error) {
    console.log(error.message);
    res.redirect('/movies');
  }
});

module.exports = router;
