import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

export default function Filters() {
  const { setFilterByName,
    filters,
    setFilters,
    dropDownOptions,
    setFilterLength,
    setFilterByNumericValues } = useContext(StarWarsContext);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
      filtersApplied: 1,
    },
  );
  const [filterCounter, setFilterCounter] = useState(1);

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

  const removeFilters = () => {
    setFilterByNumericValues((prevState) => ({
      ...prevState,
      filtersApplied: 0 }));
    setOptions([]);
    setFilters([]);
  };

  const handleRemoveSingleFilter = ({ target }) => {
    setFilters(filters.filter(({ column }) => column !== target.id));
    setFilteredOptions(filteredOptions.filter((option) => option !== target.id));
    if (!(filters.length - 1)) {
      setFilterByNumericValues((prevState) => ({
        ...prevState,
        filtersApplied: 0 }));
    }
  };

  const handleClick = () => {
    filteredOptions.push(filter.column);
    setOptions(dropDownOptions.filter((option) => !filteredOptions.includes(option)));
    setFilterCounter(filterCounter + 1);
    setFilter((prevState) => ({
      ...prevState,
      filtersApplied: filterCounter }));
    setFilterByNumericValues(filter);
    filters.push(filter);
    setFilterLength(filters.length);
  };

  return (
    <section className="filters-section">
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
          {
            options.length ? options.map((option, index) => (
              <option defaultValue="population" key={ index }>{option}</option>))
              : dropDownOptions.map((option, index) => (
                <option defaultValue="population" key={ index }>{option}</option>))
          }
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => removeFilters() }
        >
          Remover Filtros
        </button>
      </form>
      <div>
        {
          filters.length ? filters.map((filterParam, index) => (
            <p className="filter-applied" key={ index } data-testid="filter">
              {filterParam.column}
              -
              {filterParam.comparison}
              -
              {filterParam.value}
              <button
                id={ filterParam.column }
                type="button"
                onClick={ (e) => handleRemoveSingleFilter(e) }
              >
                remover filtro
              </button>

            </p>))
            : null
        }
      </div>
    </section>
  );
}
