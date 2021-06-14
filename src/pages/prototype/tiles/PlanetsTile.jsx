import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TetrisChart from '../../../components/charts/TetrisChart';
import Tile from '../../../components/Tile';
import { sortDescendingOrder, xhrRequest } from '../../../utilities/helpers';

export default function PlanetsTile() {
  return <PlanetsTile_DisplayLayer {...useDataLayer()} />;
}

export function PlanetsTile_DisplayLayer({ planetsData, isLoading }) {
  function renderPlanetChartTooltip({ name, value }) {
    return (
      <div className="flex-container justify-between align-baseline secret-platform-prototype-chart-tooltip">
        <div className="secret-platform-prototype-chart-tooltip-name">{name}</div>
        <div className="flex-container align-baseline secret-platform-prototype-chart-tooltip-value">
          {value.toLocaleString('en-US')}
          <div className="secret-platform-prototype-chart-tooltip-value-unit">km</div>
        </div>
      </div>
    );
  }

  return (
    <Tile title="Star Wars Planet Diameters (km)" isLoading={isLoading}>
      <TetrisChart data={planetsData} onSectionHover={renderPlanetChartTooltip} />
    </Tile>
  );
}

PlanetsTile_DisplayLayer.propTypes = {
  planetsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })
  ),
  isLoading: PropTypes.bool
};

// a great spot to fetch third party API data, the useDataLayer hook is... see README.md
function useDataLayer() {
  const [planetsData, setPlanetsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allPlanetResults = [];
    xhrRequest.get('http://swapi.dev/api/planets/').then((data) => {
      const numPages = Math.ceil(data.body.count / data.body.results.length);
      const promiseApiCalls = [];
      for (let i = 1; i <= numPages; i += 1) {
        promiseApiCalls.push(xhrRequest.get(`http://swapi.dev/api/planets/?page=${i}`));
      }
      Promise.all(promiseApiCalls).then((responses) => {
        responses.forEach((response) => allPlanetResults.push(...response.body.results));
        const sortedPlanets = sortDescendingOrder(allPlanetResults, 'diameter');
        setPlanetsData(sortedPlanets);
        setIsLoading(false);
      });
    });
  }, []);
  return {
    planetsData,
    isLoading
  };
}
