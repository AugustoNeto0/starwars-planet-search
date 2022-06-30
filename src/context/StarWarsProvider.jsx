import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetsData from '../services/searchAPI';

export const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByColumn, setFilterByColumn] = useState('population');
  const [filterByComparison, setFilterByComparison] = useState('maior que');
  const [filterByValue, setFilterByValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState({});

  const fetchPlanets = async () => {
    const planetsData = await getPlanetsData();
    setData(planetsData);
  };

  useEffect(() => {
    if (!filteredPlanets.length) {
      fetchPlanets();
      setFilteredPlanets(data);
    }
  }, []);

  useEffect(() => {
    console.log(filterByNumericValues);
    if (filterByName) {
      const filteredByName = data.filter((planet) => planet.name
        .toLowerCase()
        .includes(filterByName));
      setFilteredPlanets(filteredByName);
      // const filteredByName = filteredPlanets.filter((planet) => {
      //   if (filterByComparison === 'maior que') {
      //     return planet.name
      //       .toLowerCase()
      //       .includes(filterByName)
      //       && parseFloat(planet[filterByColumn]) > parseFloat(filterByValue);
      //   } if (filterByComparison === 'menor que') {
      //     return planet.name
      //       .toLowerCase()
      //       .includes(filterByName)
      //       && parseFloat(planet[filterByColumn]) < parseFloat(filterByValue);
      //   }
      //   if (filterByComparison === 'igual a') {
      //     return planet.name
      //       .toLowerCase()
      //       .includes(filterByName)
      //       && parseFloat(planet[filterByColumn]) === parseFloat(filterByValue);
      //   } return null;
      // });
      // setFilteredPlanets(filteredByName);
    } else setFilteredPlanets(data);
  }, [filterByNumericValues, filterByName, data]);

  const initialState = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filteredPlanets,
    filterByColumn,
    setFilterByColumn,
    filterByComparison,
    setFilterByComparison,
    filterByValue,
    setFilterByValue,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <StarWarsContext.Provider value={ initialState }>
      {children}
    </StarWarsContext.Provider>
  );
};

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
