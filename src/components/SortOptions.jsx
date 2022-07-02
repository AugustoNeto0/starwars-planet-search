import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

export default function SortOptions() {
  const { dropDownOptions,
    filteredPlanets, setFilteredPlanets } = useContext(StarWarsContext);
  const [sort, setSort] = useState({
    column: 'population',
    order: 'ASC',
  });

  const sortPlanets = (planets) => {
    const planetsKnownData = planets
      .filter((planet) => planet[sort.column] !== 'unknown');
    const planetsUnknownData = planets
      .filter((planet) => planet[sort.column] === 'unknown');

    switch (sort.order) {
    case 'ASC':
      planets = planetsKnownData
        .sort((planetA, planetB) => planetA[sort.column] - planetB[sort.column]);
      planetsUnknownData.forEach((planet) => planets.push(planet));
      setSort((prevState) => ({
        ...prevState,
        order: 'DESC',
      }));
      return planets;
    case 'DESC':
      planets = planetsKnownData
        .sort((planetA, planetB) => planetB[sort.column] - planetA[sort.column]);
      planetsUnknownData.forEach((planet) => planets.push(planet));
      setSort((prevState) => ({
        ...prevState,
        order: 'ASC',
      }));
      return planets;
    default:
      return planets;
    }
  };

  const handleSelection = ({ target }) => {
    setSort((prevState) => ({
      ...prevState,
      column: target.value,
    }));
  };

  const handleRadioChange = ({ target }) => {
    setSort((prevState) => ({
      ...prevState,
      order: target.value,
    }));
  };

  const handleClick = () => {
    setFilteredPlanets(sortPlanets(filteredPlanets));
  };

  return (
    <div className="sort-section">
      <form>
        <select
          id="column-sort"
          data-testid="column-sort"
          onChange={ (e) => handleSelection(e) }
        >
          {
            dropDownOptions.map((option, index) => (
              <option defaultValue="population" key={ index }>{option}</option>))
          }
        </select>
        <input
          name="sort-radio-btn"
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ (e) => handleRadioChange(e) }
        />
        Ascendente
        <input
          name="sort-radio-btn"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ (e) => handleRadioChange(e) }
        />
        Descendente
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClick() }
        >
          Ordenar
        </button>
      </form>
    </div>
  );
}
