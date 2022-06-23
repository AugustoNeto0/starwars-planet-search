import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

export default function Filters() {
  const { setFilterByName,
    setFilterByColumn,
    setFilterByComparison,
    setFilterByValue,
    filterByColumn,
    filterByComparison,
    filterByValue,
    setHandleClick } = useContext(StarWarsContext);

  const handleChange = ({ target }) => {
    if (target.type === 'text') setFilterByName(target.value);
    else setFilterByValue(target.value);
  };

  const handleSelection = ({ target }) => {
    if (target.id === 'column-filter') setFilterByColumn(target.value);
    else setFilterByComparison(target.value);
  };

  const handleClick = () => {
    setHandleClick(true);
  };

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => handleChange(e) }
      />
      <select
        id="column-filter"
        data-testid="column-filter"
        onChange={ (e) => handleSelection(e) }
        value={ filterByColumn }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        id="comparison-filter"
        data-testid="comparison-filter"
        onChange={ (e) => handleSelection(e) }
        value={ filterByComparison }
      >
        <option>maior que</option>
        <option>igual a</option>
        <option>menor que</option>
      </select>
      <input
        id="value-filter"
        type="number"
        data-testid="value-filter"
        onChange={ (e) => handleChange(e) }
        value={ filterByValue }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
    </form>
  );
}
