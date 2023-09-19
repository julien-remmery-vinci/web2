var express = require('express');
var router = express.Router();

const films = [
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
router.get('/', function(req, res, next) {
  return res.json(films);
});

module.exports = router;
