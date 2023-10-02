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
/* GET home page. */
// router.get('/', (req, res, next) => {
//     console.log('GET /films');

//     const minimumDuration = req?.query?.["minimum-duration"] ?? undefined;
//     const filterStartWith = req?.query?.["start-with"] ?? undefined;
//     const orderByBudget =
//       req?.query?.order?.includes('budget')
//         ? req.query.order
//         : undefined;
    
//     if (!minimumDuration && !filterStartWith && !orderByBudget) 
//         res.json(FILMS);
    
//         let filteredFilms;

//     if (minimumDuration){
//         console.log(`minimum durarion : ${minimumDuration}`);
//         filteredFilms = {};
//         for (const film of FILMS) {
//             if (film.duration >= minimumDuration) {
//                 filteredFilms.join(film);            
//             }
//         }
//     }
//     if(filterStartWith){
//         console.log(`Filter film names starting with : ${filterStartWith}`);
//         filteredFilms = {};
//         for (const film of FILMS) {
//             if (film.title.startsWith(filterStartWith)) {
//                 filteredFilms.join(film);        
//             }
//         }
//     }
//     if (orderByBudget){
//         console.log("Order by budget");
//         filteredFilms = [...FILMS].sort((a, b) => b.budget - a.budget);
//     }
//     console.log(filteredFilms);
//     if(!filteredFilms || Object.keys(filteredFilms).length === 0) res.sendStatus(400);

//     if (orderByBudget === '-budget') filteredFilms = filteredFilms.reverse();
//     res.json(filteredFilms ?? FILMS);
//   });

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
    const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);
  
    if (indexOfFilmFound < 0) return res.sendStatus(404);
  
    return res.json(FILMS[indexOfFilmFound]);
  });
// router.get('/:id', (req, res) => {
//     console.log(`GET /films/${req.params.id}`);

//     const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);

//     if (indexOfFilmFound < 0) return res.sendStatus(404);

//     res.json(FILMS[indexOfFilmFound]);
// });

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
  

// router.post('/', (req, res) => {
//     const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
//     const duration = req?.body?.duration > 0 ? req.body.duration : undefined; 
//     const budget = req?.body?.budget > 0 ? req.body.budget : undefined; 
//     const link = req?.body?.link?.length !== 0 ? req.body.link : undefined; 
  
//     console.log('POST /films');
  
//     if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
  
//     const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
//     const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
//     const nextId = lastId + 1;
  
//     const newFilm = {
//       id: nextId,
//       title: title,
//       duration: duration,
//       budget: budget,
//       link: link,
//     };
  
//     FILMS.push(newFilm);
  
//     res.json(newFilm);
// });
module.exports = router;
