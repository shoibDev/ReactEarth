import { createLazyFileRoute } from '@tanstack/react-router'
import { useEarthquake } from "../contexts/EarthquakeContext.tsx"
import ChartPanel from "../components/ChartPanel.tsx"
import DataTable from "../components/DataTable.tsx"


export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  const { loading } = useEarthquake();

  if (loading) return <div className="p-8 text-center">Loading earthquake data...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r overflow-auto">
        <ChartPanel />
      </div>
      <div className="w-full md:w-1/2 p-4 overflow-auto">
        <DataTable />
      </div>
    </div>
  );
}
