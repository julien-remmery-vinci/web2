const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
  updateOrCreateOneFilm
} = require('../models/films');

const router = express.Router();

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query ? Number(req.query['minimum-duration']) : undefined;
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);

  const filmsReachingMinimumDuration = readAllFilms(minimumFilmDuration);
  
  return res.json(filmsReachingMinimumDuration);
});

// Read a film from its id in the menu
router.get('/:ide', (req, res) => {
  const foundFilm = readOneFilm(req?.params?.ide);

  if (!foundFilm) return res.sendStatus(404);

  return res.json(foundFilm);
});

// Create a film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const newFilm = createOneFilm(title, duration, budget, link);

  if(!newFilm) return res.sendStatus(409);

  return res.json(newFilm);
});

// Delete a film
router.delete('/:id', (req, res) => {
  const filmFound = deleteOneFilm(req?.params?.id)

  if(!filmFound) res.sendStatus(404);

  return res.json(filmFound);
});

// Update one or more properties of a film identified by its id
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const updatedFilm = updateOneFilm(req?.params?.id, req.body);

  if(!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const updatedFilm = updateOrCreateOneFilm(req?.params?.id, req.body);

  if(!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

module.exports = router;
