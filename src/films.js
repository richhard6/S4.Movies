import { movies as movies } from './data.js';

// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  const directors = array.map((movie) => movie.director);
  //console.log('EXERCICE 1 ->', directors);

  return directors;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  const films = array.filter((movie) => movie.director === director);
  //console.log('EXERCICE 2 ->', films);
  return films;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(array, director) {
  const reducer = (obj, val) => {
    if (obj[val.director] == null) {
      obj[val.director] = [val.score, 1];
    } else {
      let [rating, count] = obj[val.director];

      rating += val.score;

      ++count;
      obj[val.director] = [rating, count];
    }
    return obj;
  };

  const directorAverage = array.map((movie) => movie).reduce(reducer, {});
  const [rating, occurence] = directorAverage[director];
  directorAverage[director] = rating / occurence;

  //console.log('EXERCICE 3 ->', directorAverage[director]);

  return directorAverage[director];
}

// Exercise 4:  Alphabetic order by title
function orderAlphabetically(array) {
  let orderByTitle = array
    .map((movie) => movie.title)
    .sort((a, b) => (a > b ? 1 : -1))
    .slice(0, 20);

  //console.log('EXERCICE 4 ->', orderByTitle);
  return orderByTitle;
}

// Exercise 5: Order by year, ascending
function orderByYear(array) {
  const orderByYear = array
    .map((movie) => movie)
    .sort((a, b) => (a.year > b.year ? 1 : -1))
    .slice(0, 20)
    .map((movie) => {
      const { year, title } = movie;
      const formated = [
        {
          title: title,
          year: year
        }
      ];
      return formated[0];
    });

  //console.log('EXERCICE 5 ->', orderByYear);
  return orderByYear;
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, category) {
  const reducer = (obj, val) => {
    for (const i in val.genre) {
      if (obj[val.genre] == null) {
        obj[val.genre[i]] = [val.score, 1];
      } else {
        let [rating, count] = obj[val.genre[i]];

        if (val.score === '') {
          count = count;
        } else {
          ++count;
        }
        rating += val.score;

        obj[val.genre[i]] = [Math.round(rating), count];
      }
    }

    return obj;
  };

  const categoryAverage = array
    .map((movie) => {
      const { genre, score } = movie;

      const formatted = { genre: genre, score: score };

      return formatted;
    })
    .reduce(reducer, {});

  const [rating, occurence] = categoryAverage[category];

  return rating / occurence;
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
  const hey = array.map((movie) => {
    const toArray = movie.duration.includes(' ')
      ? movie.duration.split(' ')
      : movie.duration;

    /*    const hourToMinutes = Math.round(hour.match(/\d/g)) * 60; */
    /*     const minutesWithoutLetters = Math.round(minutes.match(/\d/g).join(''));
    const newDuration = hourToMinutes + minutesWithoutLetters;
    movie.duration = newDuration;  */
    return toArray;
  });

  const finish = hey.map((time) => {
    const [hour, minutes] = time; //no sirve porque hay veces que no se separa en dos porque es solo un valor Ex "2h"
    const hourToMinutes = Math.round(hour?.match(/\d/g)) * 60;
    const minutesWithoutLetters = Math.round(minutes?.match(/\d/g)?.join(''));
    const newDuration = hourToMinutes + minutesWithoutLetters;
    return newDuration;
  });

  const yeah = array.map((movie) => (movie.duration = finish));

  console.log(yeah);

  return yeah;
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear() {}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear
  };
}
