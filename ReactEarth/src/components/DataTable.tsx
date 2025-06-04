import { useState } from 'react';
import { useEarthquake } from "../contexts/EarthquakeContext.tsx";
import { useEarthquakeStore } from '../store/useEarthquakeStore';
import clsx from 'clsx';

const DataTable = () => {
  const { data } = useEarthquake();
  const { selected, setSelected } = useEarthquakeStore();
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatMagnitude = (mag: number) => {
    if (mag >= 7) return <span className="text-red-600 font-bold">{mag.toFixed(1)}</span>;
    if (mag >= 5) return <span className="text-orange-500">{mag.toFixed(1)}</span>;
    if (mag >= 3) return <span className="text-yellow-500">{mag.toFixed(1)}</span>;
    return <span>{mag.toFixed(1)}</span>;
  };

  return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Earthquake Data</h2>

        <div className="overflow-auto max-h-[70vh] border rounded">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0">
            <tr>
              {['time', 'place', 'mag', 'depth', 'latitude', 'longitude'].map((key) => (
                  <th
                      key={key}
                      onClick={() => requestSort(key)}
                      className="p-2 text-left cursor-pointer hover:bg-gray-200"
                  >
                    {key === 'mag'
                        ? 'Magnitude'
                        : key === 'depth'
                            ? 'Depth (km)'
                            : key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                    {getSortIndicator(key)}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {sortedData.map((eq, idx) => (
                <tr
                    key={eq.time + idx}
                    onClick={() => setSelected(eq)}
                    className={clsx(
                        'cursor-pointer hover:bg-blue-50',
                        selected?.time === eq.time && 'bg-blue-100'
                    )}
                >
                  <td className="p-2">{new Date(eq.time).toLocaleString()}</td>
                  <td className="p-2">{eq.place}</td>
                  <td className="p-2 text-center">{formatMagnitude(eq.mag)}</td>
                  <td className="p-2 text-right">{eq.depth.toFixed(1)}</td>
                  <td className="p-2 text-right">{eq.latitude.toFixed(4)}</td>
                  <td className="p-2 text-right">{eq.longitude.toFixed(4)}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Showing {sortedData.length} of {data.length} earthquakes
        </p>
      </div>
  );
};

export default DataTable;
