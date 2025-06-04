## Project Setup

This project is a React + TypeScript application bootstrapped with Vite and styled using Tailwind CSS. It includes client-side routing with TanStack Router and charting with Victory.

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

