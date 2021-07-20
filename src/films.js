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
function moviesAverageOfDirector(array, directorOrCategory) {
  const isDirector = directorOrCategory.split(' ');

  const reducer = (obj, val) => {
    if (obj[directorOrCategory] == null) {
      obj[directorOrCategory] = [val.score, 1];
    } else {
      let [rating, count] = obj[directorOrCategory];
      if (val.score === '') {
        count = count;
      } else {
        ++count;
      }
      rating += val.score;
      obj[directorOrCategory] = [rating, count];
    }
    return obj;
  };

  const average = array
    .filter((movie) =>
      isDirector.length > 1
        ? movie.director === directorOrCategory
        : movie.genre.includes(directorOrCategory)
    )
    .reduce(reducer, {});

  const [rating, occurence] = average[directorOrCategory];
  average[directorOrCategory] = rating / occurence;

  //console.log('EXERCICE 3 ->', directorAverage[director]);

  return average[directorOrCategory];
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
  const moviesAverageByCategory = moviesAverageOfDirector(array, category);

  //console.log('EXERCICE 6->', moviesAverageByCategory);
  return moviesAverageByCategory;
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
  const hoursToMinutes = array.map((movie) => {
    const toArray = movie.duration.includes(' ')
      ? movie.duration.split(' ')
      : [movie.duration];

    let movieObject;

    const [hour, minutes] = toArray; //no sirve porque hay veces que no se separa en dos porque es solo un valor Ex "2h"
    const hourToMinutes = Math.round(hour.match(/\d/g)) * 60;
    const minutesWithoutLetters =
      Math.round(minutes?.match(/\d/g).join('')) || 0;
    const newDuration = hourToMinutes + minutesWithoutLetters;

    movieObject = { duration: newDuration };

    return { ...movie, ...movieObject };
  });
  //console.log('EXERCICE 7 ->', hoursToMinutes);
  return hoursToMinutes;
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(array, year) {
  const moviesByYear = array
    .filter((movie) => movie.year === year)
    .sort((a, b) => (a.score > b.score ? -1 : 1));

  const [firstMovie] = moviesByYear;

  const movieArray = [firstMovie];
  //console.log('EXERCICE 8 ->', movieArray);
  return movieArray;
}

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
