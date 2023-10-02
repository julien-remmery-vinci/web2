var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id: 1,
        title: "Interstellar",
        duration: 169,
        budget: 165,
        link: "https://www.imdb.com/title/tt0816692/?ref_=ext_shr_lnk"
    },
    {
        id: 2,
        title: "Inception",
        duration: 148,
        budget: 160,
        link: "https://www.imdb.com/title/tt1375666/?ref_=ext_shr_lnk"
    },
    {
        id: 3,
        title: "the Batman",
        duration: 176,
        budget: 185,
        link: "https://www.imdb.com/title/tt1877830/?ref_=ext_shr_lnk"
    }
];

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
    const minimumFilmDuration = req?.query
      ? Number(req.query['minimum-duration'])
      : undefined;
    if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
      return res.sendStatus(400);
  
    if (!minimumFilmDuration) return res.json(FILMS);
  
    const filmsReachingMinimumDuration = FILMS.filter(
      (film) => film.duration >= minimumFilmDuration
    );
    return res.json(filmsReachingMinimumDuration);
  });

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
    const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);
  
    if (indexOfFilmFound < 0) return res.sendStatus(404);
  
    return res.json(FILMS[indexOfFilmFound]);
  });

// Create a film
router.post('/', (req, res) => {
    const title =
      req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link =
      req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
      typeof req?.body?.duration !== 'number' || req.body.duration < 0
        ? undefined
        : req.body.duration;
    const budget =
      typeof req?.body?.budget !== 'number' || req.body.budget < 0
        ? undefined
        : req.body.budget;
  
    if (!title || !link || !duration || !budget) return res.sendStatus(400);
  
    const existingFilm = FILMS.find(
      (film) => film.title.toLowerCase() === title.toLowerCase()
    );
    if (existingFilm) return res.sendStatus(409);
  
    const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newFilm = { id: nextId, title, link, duration, budget };
  
    FILMS.push(newFilm);
  
    return res.json(newFilm);
  });
  
  router.delete('/:id', (req, res) => {
    const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);
  
    if (indexOfFilmFound < 0) return res.sendStatus(404);
  
    const itemsRemovedFromMenu = FILMS.splice(indexOfFilmFound, 1);
    const itemRemoved = itemsRemovedFromMenu[0];

    res.json(itemRemoved);
  });

  router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);
  
    const budget = req?.body?.budget;
  
    if ((!budget) || budget < 0) return res.sendStatus(400);
  
    const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  
    if (foundIndex < 0) return res.sendStatus(404);
  
    const updatedFilm = {...FILMS[foundIndex], ...req.body};
  
    FILMS[foundIndex] = updatedFilm;
  
    res.json(updatedFilm);
  });

  router.put('/:id', (req, res) => {
    console.log(`PUT /films/${req.params.id}`);

    const title =
      req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link =
      req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
      typeof req?.body?.duration !== 'number' || req.body.duration < 0
        ? undefined
        : req.body.duration;
    const budget =
      typeof req?.body?.budget !== 'number' || req.body.budget < 0
        ? undefined
        : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

    if (FILMS.length < req.params.id){
      const existingFilm = FILMS.find(
        (film) => film.title.toLowerCase() === title.toLowerCase()
      );
      if (existingFilm) return res.sendStatus(409);
    
      const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
      const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
      const nextId = lastId + 1;
    
      const newFilm = { id: nextId, title, link, duration, budget };
    
      FILMS.push(newFilm);
    
      return res.json(newFilm);
    }else{
      const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  
      if (foundIndex < 0) return res.sendStatus(404);
    
      const updatedFilm = {...FILMS[foundIndex], ...req.body};
    
      FILMS[foundIndex] = updatedFilm;
    
      res.json(updatedFilm);
    }
  });

module.exports = router;
