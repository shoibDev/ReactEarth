## Project Setup

This project is a React + TypeScript application bootstrapped with Vite and styled using Tailwind CSS. It includes client-side routing with TanStack Router and charting with Victory.

Here’s a clean and concise **Installation** section you can add to your README:

---

### Installation

To run this project locally:

1. **Clone the repository**

```bash
git clone https://github.com/shoibDev/ReactEarth
cd ReactEarth/
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

---

### Initialization

The project was initialized using Vite:

```bash
npm create vite@latest
# Selected: React + TypeScript template
```

### Tailwind CSS

Tailwind was installed and configured following the official Vite installation guide:
[https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)

### Routing

TanStack Router was set up using the official quick-start documentation:
[https://tanstack.com/router/latest/docs/framework/react/quick-start](https://tanstack.com/router/latest/docs/framework/react/quick-start)

### Charting Library

Victory was added for data visualization needs:
[https://nearform.com/open-source/victory/](https://nearform.com/open-source/victory/)

---

### State Management with Context

An `EarthquakeContext` was implemented using React Context to manage shared global state. It handles two primary pieces of state:

* The list of earthquake records
* The currently selected earthquake (used for interactivity between chart and table)

The `EarthquakeProvider` fetches the earthquake dataset (`/data/earthquakes.json`) once on mount and stores it in context, making it accessible to all components without prop drilling. The provider wraps the application inside `main.tsx` to ensure the context is available globally.

This design keeps the data-fetching logic centralized and simplifies state sharing across views like `ChartPanel` and `DataTable`.

---

### Visualization

The UI is split into a responsive two-panel layout:

* **Chart Panel**: Built using Victory, the chart visualizes earthquake records using a scatter plot. Users can select different numeric fields for the X and Y axes via dropdowns. Each point represents a row in the dataset, and tooltips provide contextual information on hover. Clicking a point highlights it and syncs selection with the table view.

* **Data Table**: Displays a scrollable table of all earthquake records with sortable columns. Row selection is synced with the chart panel, providing bidirectional interactivity. The table layout was kept minimal using Tailwind for better readability.

Both components remain in sync through the global context, ensuring a cohesive and interactive experience.

---

### Zustand Integration

To demonstrate use of an external state management library, the `selected` earthquake state was moved from React Context to Zustand. 
This decouples selection logic from data storage and showcases scalable global state sharing using a lightweight store. 
All components access and update the selected state through the shared `useEarthquakeStore`.

---

### AI Use

AI assistance was used during development in the following ways:

* **Graphing Logic (Victory):** AI was used to help create the initial Victory chart implementation, including scatter plot configuration, axis labeling, dynamic sizing, and tooltip setup. This provided a faster and more structured approach to integrating Victory's API for interactive charting.

* **Error Checking & Debugging:** AI was used to troubleshoot issues with data fetching, state syncing, and layout edge cases. It provided quick insight on fixing malformed JSON and resolving import bugs.

No code was directly copied or generated without modification.

Additionally, the following learning resources were used to better understand key libraries:

* [TanStack Router Overview (YouTube)](https://www.youtube.com/watch?v=KcKkwF55Pes)
* [Zustand Crash Course (YouTube)](https://www.youtube.com/watch?v=_ngCLZ5Iz-0)

---
> **Note:** AI was also used to help format and clarify this `README.md`.
