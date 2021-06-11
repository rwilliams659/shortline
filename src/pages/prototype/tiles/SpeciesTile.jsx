import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BarChart from '../../../components/charts/BarChart';
import Tile from '../../../components/Tile';
import { xhrRequest, sortSpeciesByHeight } from '../../../utilities/helpers';

export default function SpeciesTile() {
  return <SpeciesTile_DisplayLayer {...useDataLayer()} />;
}

export function SpeciesTile_DisplayLayer({ speciesData, isLoading }) {
  return (
    <Tile title="Star Wars Species Average Heights (cm)" isLoading={isLoading}>
      <BarChart data={speciesData} xKey="name" yKey="value" />
    </Tile>
  );
}

SpeciesTile_DisplayLayer.propTypes = {
  speciesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })
  )
};

// a great spot to fetch third party API data, the useDataLayer hook is... see README.md
function useDataLayer() {
  const [speciesData, setSpeciesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    xhrRequest.get('https://swapi.dev/api/species/')
      .then(data => {
        const sortedSpecies = sortSpeciesByHeight(data.body.results)
        setSpeciesData(sortedSpecies)
        setIsLoading(false)
      })
  }, [])
  return {
    speciesData,
    isLoading
  };
}
