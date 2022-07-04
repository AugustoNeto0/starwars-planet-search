import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';
import './Table.css';

export default function Table() {
  const { filteredPlanets } = useContext(StarWarsContext);

  return (
    <table>
      <thead className="table-head">
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Suface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {filteredPlanets.map((planet, index) => (
          <tr key={ index }>
            <td className="planet-name" data-testid="planet-name">{planet.name}</td>
            <td className="planet-data">{planet.rotation_period}</td>
            <td className="planet-data">{planet.orbital_period}</td>
            <td className="planet-data">{planet.diameter}</td>
            <td className="planet-data">{planet.climate}</td>
            <td className="planet-data">{planet.gravity}</td>
            <td className="planet-data">{planet.terrain}</td>
            <td className="planet-data">{planet.surface_water}</td>
            <td className="planet-data">{planet.population}</td>
            <td className="planet-data">{planet.films}</td>
            <td className="planet-data">{planet.created}</td>
            <td className="planet-data">{planet.edited}</td>
            <td className="planet-data">
              <a
                href={ planet.url }
                target="_blank"
                rel="noreferrer"
              >
                {planet.url}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
