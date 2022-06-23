import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetsData from '../services/searchAPI';
// import response from '../testData';

export const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByColumn, setFilterByColumn] = useState('population');
  const [filterByComparison, setFilterByComparison] = useState('maior que');
  const [filterByValue, setFilterByValue] = useState(0);
  const [handleClick, setHandleClick] = useState(false);

  const fetchPlanets = async () => {
    const planetsData = await getPlanetsData();
    // const planetsData = response.results;
    setData(planetsData);
  };

  useEffect(() => {
    fetchPlanets();
    // console.log(filterByComparison, filterByColumn, filterByValue);
    if (handleClick) {
      const filteredByName = data.filter((planet) => {
        if (filterByComparison === 'maior que') {
          return planet.name
            .toLowerCase()
            .includes(filterByName) && planet[filterByColumn] > parseFloat(filterByValue);
        } if (filterByComparison === 'menor que') {
          return planet.name
            .toLowerCase()
            .includes(filterByName) && planet[filterByColumn] < parseFloat(filterByValue);
        }
        if (filterByComparison === 'igual a') {
          return planet.name
            .toLowerCase()
            .includes(filterByName)
            && parseFloat(planet[filterByColumn]) === parseFloat(filterByValue);
        } return null;
      });
      setFilteredPlanets(filteredByName);
    } else {
      const filteredByName = data.filter((planet) => planet.name
        .toLowerCase().includes(filterByName));
      setFilteredPlanets(filteredByName);
    }
  }, [filterByName,
    handleClick, filterByColumn, filterByComparison, filterByValue, data]);

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
    handleClick,
    setHandleClick,
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
