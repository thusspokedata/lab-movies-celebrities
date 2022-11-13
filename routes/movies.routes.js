const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/create', (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      // console.log('this is celebrities!!!!!!', celebrities);
      res.render('movies/new-movie', celebrities);
    })
    .catch((err) => {
      console.log(err);
      res.render('movies/new-movie');
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
      // console.log(movies);
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      res.render('movies/new-movie');
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
      res.render('movies/new-movie');
    });
});

router.get('/:id', (req, res, next) => {
  const movieId = req.params.id;
  console.log('userObject: ', movieId);
  Movie.findById(movieId)
    .populate('cast')
    .then((movieDetails) => {
      console.log('🧟‍♂️🍟movies details: ', movieDetails);
      res.render('movies/movie-details', movieDetails);
    })
    .catch((err) => {
      console.log(err);
      res.render('movies/new-movie');
    });
});

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const movie = await Movie.findById(id).populate('cast');
//     res.render('movies/movie-details', movie);
//   } catch (error) {
//     console.log(error.message);
//     res.redirect('/movies');
//   }
// });

module.exports = router;
