import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

export default function Filters() {
  const { setFilterByName,
    // setFilterByColumn,
    // setFilterByComparison,
    // setFilterByValue,
    // filterByColumn,
    setFilterByNumericValues } = useContext(StarWarsContext);
  // const [filteredOptions, setFilteredOptions] = useState(['population',
  //   'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  // const [columnOption] = useState('');
  // const [comparisonOption] = useState('');
  // const [value] = useState(0);

  const [filter, setFilter] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
      filtersApplied: 1,
    },
  );
  const [filterCounter, setFilterCounter] = useState(1);

  const dropDownOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const handleChange = ({ target }) => {
    if (target.type === 'text') setFilterByName(target.value);
    else {
      setFilter((prevState) => ({
        ...prevState,
        value: target.value }));
    }
  };

  const handleSelection = ({ target }) => {
    if (target.id === 'column-filter') {
      setFilter((prevState) => ({
        ...prevState,
        column: target.value }));
    } else {
      setFilter((prevState) => ({
        ...prevState,
        comparison: target.value }));
    }
  };

  const handleClick = () => {
    setFilterCounter(filterCounter + 1);
    // setFilteredOptions(dropDownOptions.filter((option) => option !== filterByColumn));
    setFilter((prevState) => ({
      ...prevState,
      filtersApplied: filterCounter }));
    setFilterByNumericValues(filter);
    // setFilterByColumn(columnOption);
    // setFilterByComparison(comparisonOption);
    // setFilterByValue(value);
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
      >
        {dropDownOptions.map((option, index) => (
          <option defaultValue="population" key={ index }>{option}</option>))}
      </select>
      <select
        id="comparison-filter"
        data-testid="comparison-filter"
        onChange={ (e) => handleSelection(e) }
        defaultValue="maior que"
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
        defaultValue="0"
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
