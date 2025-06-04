import { useState } from 'react';
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryLabel,
} from 'victory';
import { useEarthquake } from "../contexts/EarthquakeContext.tsx";

const numericFields = [
  { value: 'mag', label: 'Magnitude' },
  { value: 'depth', label: 'Depth (km)' },
  { value: 'latitude', label: 'Latitude' },
  { value: 'longitude', label: 'Longitude' },
];

const ChartPanel = () => {
  const { data, selected, setSelected } = useEarthquake();
  const [xField, setXField] = useState('mag');
  const [yField, setYField] = useState('depth');

  const getFieldLabel = (fieldValue: string) => {
    const field = numericFields.find((f) => f.value === fieldValue);
    return field?.label || fieldValue;
  };

  return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Earthquake Visualization</h2>

        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">X-Axis</label>
            <select
                value={xField}
                onChange={(e) => setXField(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
            >
              {numericFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Y-Axis</label>
            <select
                value={yField}
                onChange={(e) => setYField(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
            >
              {numericFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border rounded p-2 bg-white">
          <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
              height={350}
              padding={{ top: 40, bottom: 60, left: 60, right: 40 }}
          >
            <VictoryLabel
                text={`${getFieldLabel(xField)} vs ${getFieldLabel(yField)}`}
                x={225}
                y={30}
                textAnchor="middle"
                style={{ fontSize: 16, fontWeight: 'bold' }}
            />

            <VictoryAxis
                label={getFieldLabel(xField)}
                style={{
                  axisLabel: { padding: 35, fontSize: 14 },
                  tickLabels: { fontSize: 11 },
                  grid: { stroke: '#ECEFF1', strokeDasharray: '4,4' },
                }}
            />
            <VictoryAxis
                dependentAxis
                label={getFieldLabel(yField)}
                style={{
                  axisLabel: { padding: 45, fontSize: 14 },
                  tickLabels: { fontSize: 11 },
                  grid: { stroke: '#ECEFF1', strokeDasharray: '4,4' },
                }}
            />

            <VictoryScatter
                data={data}
                x={xField}
                y={yField}
                size={({ datum }) => (selected?.time === datum.time ? 7 : 4)}
                style={{
                  data: {
                    fill: ({ datum }) => (selected?.time === datum.time ? '#EF4444' : '#3B82F6'),
                    stroke: ({ datum }) => (selected?.time === datum.time ? '#B91C1C' : '#2563EB'),
                    strokeWidth: ({ datum }) => (selected?.time === datum.time ? 2 : 1),
                    opacity: 0.8,
                  },
                }}
                labels={({ datum }) => `${datum.place}\nMag: ${datum.mag}\nDepth: ${datum.depth}km`}
                labelComponent={
                  <VictoryTooltip
                      flyoutStyle={{ fill: 'white', stroke: '#BDBDBD', strokeWidth: 1 }}
                      style={{ fontSize: 10 }}
                      cornerRadius={5}
                      pointerLength={5}
                  />
                }
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onClick: (_, props) => {
                        const clickedDatum = props.datum;
                        setSelected(clickedDatum);
                      },
                      onMouseOver: () => [
                        {
                          target: 'data',
                          mutation: (props) => ({
                            size: 6,
                            style: { ...props.style, opacity: 1 },
                          }),
                        },
                      ],
                      onMouseOut: () => [
                        {
                          target: 'data',
                          mutation: (props) => {
                            const isSelected = selected?.time === props.datum.time;
                            return {
                              size: isSelected ? 7 : 4,
                              style: { ...props.style, opacity: 0.8 },
                            };
                          },
                        },
                      ],
                    },
                  },
                ]}
            />
          </VictoryChart>

          {selected && (
              <div className="mt-4 text-sm p-3 border rounded bg-blue-50">
                <p className="mb-1 font-medium text-blue-800">Selected Earthquake</p>
                <p>
                  <span className="font-medium">Location:</span> {selected.place}
                  <br />
                  <span className="font-medium">Time:</span> {new Date(selected.time).toLocaleString()}
                  <br />
                  <span className="font-medium">Magnitude:</span> {selected.mag}
                  <br />
                  <span className="font-medium">Depth:</span> {selected.depth} km
                </p>
              </div>
          )}
        </div>
      </div>
  );
};

export default ChartPanel;
