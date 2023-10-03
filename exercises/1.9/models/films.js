const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

function readAllFilms(minimumDuration){
    const films = parse(jsonDbPath, defaultFilms);

    if (!minimumDuration) return films;

    return films.filter((film) => film.duration >= minimumDuration);
};

function readOneFilm(id){
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if(indexOfFilmFound < 0) return undefined;
    return films[indexOfFilmFound];
};

function createOneFilm(title, duration, budget, link){
    const films = parse(jsonDbPath, defaultFilms);

    const existingFilm = films.find((film) => film.title.toLowerCase() === title.toLowerCase());
    if (existingFilm) return undefined;

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = { id: nextId, title, link, duration, budget };

    films.push(newFilm);

    serialize(jsonDbPath, films);

    return newFilm;
};

function deleteOneFilm(id){
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);

    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if(indexOfFilmFound < 0) return undefined;

    const itemsRemoved = films.splice(indexOfFilmFound, 1);
    const itemRemoved = itemsRemoved[0];

    serialize(jsonDbPath, films);

    return itemRemoved;
};

function updateOneFilm(id, propertiesToUpdate){
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);

    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if(indexOfFilmFound < 0) return undefined;

    const filmPriorToChange = films[indexOfFilmFound];
    const objectContainingPropertiesToBeUpdated = propertiesToUpdate;

    const updatedFilm = {
        ...filmPriorToChange,
        ...objectContainingPropertiesToBeUpdated,
    };

    films[indexOfFilmFound] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
};

function updateOrCreateOneFilm(id, propertiesToUpdate){
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);

    let film;
    if(indexOfFilmFound < 0){
        const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
        const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
        const nextId = lastId + 1;
        film = { 
            id: nextId, 
            title: propertiesToUpdate.title, 
            duration: propertiesToUpdate.duration, 
            budget: propertiesToUpdate.budget, 
            link: propertiesToUpdate.link 
        };

    films.push(film);
    }else{
        const filmPriorToChange = films[indexOfFilmFound];
        const objectContainingPropertiesToBeUpdated = propertiesToUpdate;

        film = {
            ...filmPriorToChange,
            ...objectContainingPropertiesToBeUpdated,
        };

        films[indexOfFilmFound] = film;
    }
    serialize(jsonDbPath, films);
    return film;
};

module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
    updateOrCreateOneFilm
};