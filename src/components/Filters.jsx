import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

export default function Filters() {
  const { setFilterByName } = useContext(StarWarsContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ (e) => handleChange(e) }
    />
  );
}
