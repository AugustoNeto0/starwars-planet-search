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
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
    filtersApplied: 0,
  });

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

  const filteredByNumericValues = filteredPlanets.filter((planet) => {
    const comparisonFilter = () => {
      switch (filterByNumericValues.comparison) {
      case 'maior que':
        return parseFloat(planet[filterByNumericValues.column])
          > parseFloat(filterByNumericValues.value) && planet.name
          .toLowerCase()
          .includes(filterByName);
      case 'igual a':
        return parseFloat(planet[filterByNumericValues.column])
          === parseFloat(filterByNumericValues.value) && planet.name
          .toLowerCase()
          .includes(filterByName);
      case 'menor que':
        return parseFloat(planet[filterByNumericValues.column])
          < parseFloat(filterByNumericValues.value) && planet.name
          .toLowerCase()
          .includes(filterByName);
      default:
      }
    };
    return comparisonFilter();
  });

  useEffect(() => {
    console.log(filteredByNumericValues);
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
    } else if (!filterByNumericValues.filtersApplied) setFilteredPlanets(data);
    else setFilteredPlanets(filteredByNumericValues);
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
