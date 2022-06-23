import React, { useContext, useState } from 'react';
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
  const [filteredOptions, setFilteredOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const dropDownOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

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
    setFilteredOptions(dropDownOptions.filter((option) => option !== filterByColumn));
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
        {filteredOptions.map((option, index) => (
          <option key={ index }>{option}</option>
        ))}
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
