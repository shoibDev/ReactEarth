import { createLazyFileRoute } from '@tanstack/react-router'
import { useEarthquake } from "../contexts/EarthquakeContext.tsx"
import ChartPanel from "../components/ChartPanel.tsx"
import DataTable from "../components/DataTable.tsx"

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { loading } = useEarthquake();

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 border-4 border-blue-500 border-b-transparent rounded-full animate-spin" />
            <p className="text-gray-700 text-sm">Loading earthquake data...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 overflow-auto border-b md:border-b-0 md:border-r border-gray-200">
          <ChartPanel />
        </div>
        <div className="w-full md:w-1/2 overflow-auto">
          <DataTable />
        </div>
      </div>
  );
}
