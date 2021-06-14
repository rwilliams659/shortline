import React from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import { pink, teal } from '../../styles/global/mixins.scss';
import { getMaxValue } from '../../utilities/helpers';

export default function BarChart({
  barWidth = 20,
  chartHeight = 150,
  chartWidth = 350,
  data = [],
  strokeWidth = 1,
  xKey,
  yKey
}) {
  return (
    <VictoryChart
      width={chartWidth}
      height={chartHeight}
      padding={{ top: 8, left: 50, bottom: 50, right: 50 }}
      domain={{ x: [0, data.length], y: [0, getMaxValue(data)] }}
      domainPadding={{ x: barWidth / 2 }}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        crossAxis
        orientation="bottom"
        tickValues={data.map(({ name }) => name)}
        style={{ tickLabels: { angle: -45, fontSize: 8, textAnchor: 'end', padding: 0 } }}
        padding={{ top: 20, bottom: 60 }}
      />
      <VictoryAxis
        crossAxis
        dependentAxis
        orientation="left"
        style={{ tickLabels: { fontSize: 8, padding: 0 } }}
      />
      <VictoryBar
        x={xKey}
        y={yKey}
        animate={{ duration: 500 }}
        data={data}
        style={{ data: { fill: pink, stroke: teal, strokeWidth, width: barWidth } }}
      />
    </VictoryChart>
  );
}

BarChart.propTypes = {
  barWidth: PropTypes.number,
  chartHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })
  ),
  strokeWidth: PropTypes.number,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired
};
