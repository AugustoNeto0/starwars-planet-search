import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetsData from '../services/searchAPI';

export const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchPlanets = async () => {
    const planetsData = await getPlanetsData();
    setData(planetsData);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const initialState = {
    data,
    setData,
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
