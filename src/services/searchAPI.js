const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsData = async () => {
  const response = await fetch(URL);
  const { results } = await response.json();
  return results;
};

export default getPlanetsData;
