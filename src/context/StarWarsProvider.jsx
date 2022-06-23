import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetsData from '../services/searchAPI';

export const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const fetchPlanets = async () => {
    const planetsData = await getPlanetsData();
    setData(planetsData);
  };

  useEffect(() => {
    fetchPlanets();
    const filteredByName = data.filter((planet) => planet.name
      .toLowerCase().includes(filterByName))
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredPlanets(filteredByName);
  }, [filterByName, data]);

  const initialState = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filteredPlanets,
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
