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

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log('GET /films');

    const minimumDuration = req?.query?.["minimum-duration"] ?? undefined;
    const filterStartWith = req?.query?.["start-with"] ?? undefined;
    const orderByBudget =
      req?.query?.order?.includes('budget')
        ? req.query.order
        : undefined;
    
    if (!minimumDuration && !filterStartWith && !orderByBudget) 
        res.json(FILMS);
    
        let filteredFilms;

    if (minimumDuration){
        console.log(`minimum durarion : ${minimumDuration}`);
        filteredFilms = {};
        for (const film of FILMS) {
            if (film.duration >= minimumDuration) {
                filteredFilms.join(film);            
            }
        }
    }
    if(filterStartWith){
        console.log(`Filter film names starting with : ${filterStartWith}`);
        filteredFilms = {};
        for (const film of FILMS) {
            if (film.title.startsWith(filterStartWith)) {
                filteredFilms.join(film);        
            }
        }
    }
    if (orderByBudget){
        console.log("Order by budget");
        filteredFilms = [...FILMS].sort((a, b) => b.budget - a.budget);
    }
    console.log(filteredFilms);
    if(!filteredFilms || Object.keys(filteredFilms).length === 0) res.sendStatus(400);

    if (orderByBudget === '-budget') filteredFilms = filteredFilms.reverse();
    res.json(filteredFilms ?? FILMS);
  });

router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);

    const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);

    if (indexOfFilmFound < 0) return res.sendStatus(404);

    res.json(FILMS[indexOfFilmFound]);
});

router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined; 
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined; 
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined; 
  
    console.log('POST /films');
  
    if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
  
    const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newFilm = {
      id: nextId,
      title: title,
      duration: duration,
      budget: budget,
      link: link,
    };
  
    FILMS.push(newFilm);
  
    res.json(newFilm);
});
module.exports = router;
