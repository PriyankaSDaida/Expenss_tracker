# Expense Tracker - Premium Neon Midnight Edition

A modern, visually stunning personal finance application built with React, TypeScript, and Vite. This application features a premium "Neon Midnight" dark mode, interactive charts, and a seamless user experience for tracking income and expenses.

## 🌟 Features

-   **Dashboard Overview**: Visualize your financial health with interactive bar and pie charts.
-   **Transaction Management**: Add (Income/Expense), view, and delete transactions with ease.
-   **PDF Export**: Download comprehensive monthly expense reports with a single click.
-   **Global Reset**: Quickly reset your dashboard and clear all data for a fresh start.
-   **Premium Dark Mode**: "Deep Midnight" radial gradient background with glowing neon accents and high-visibility text.
-   **Light Mode**: "Pencil & Paper" aesthetic for a classic feel.
-   **Data Persistence**: All data is saved locally in your browser using `localStorage`.
-   **Responsive Design**: Fully responsive layout optimized for desktop and mobile.

## 🛠 Tech Stack

-   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **PDF Generation**: [jspdf](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Date Handling**: [date-fns](https://date-fns.org/)
-   **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/PriyankaSDaida/Expenss_tracker.git
    cd Expenss_tracker
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 🏗 Architecture

The application is built on a robust, component-driven architecture powered by React 19's Context API. We prioritize simplicity and performance, using a "provider pattern" to share state efficiently without prop drilling.

### Data Flow Strategy

1.  **Global Trust Source**: The `ExpenseProvider` acts as the single source of truth, managing transaction history, calculating live balances, and handling data persistence via `localStorage`.
2.  **Smart Hooks**: Custom hooks like `useExpense()` provide components with direct, type-safe access to global state.
3.  **Persisted State**: The `useLocalStorage` hook ensures data survives browser refreshes by syncing state changes to the browser's storage.
4.  **Utility Logic**: Complex operations, such as generating monthly PDF reports, are offloaded to dedicated utility functions (`pdfGenerator.ts`) to keep the UI lean and responsive.

### System Component Diagram

```mermaid
graph TD
    Client[User Browser]
    
    subgraph "Application Core"
        App[App.tsx]
        Providers[Context Providers]
        Router[Main Layout]
    end
    
    subgraph "State Management"
        ExpenseCtx[Expense Context]
        ThemeCtx[Theme Context]
        LocalStore[LocalStorage Hook]
    end
    
    subgraph "Utilities"
        PDFGen[PDF Generator]
    end
    
    subgraph "UI Dashboard"
        Dashboard[Dashboard View]
        TxForm[Transaction Form]
        summary[Summary Cards]
        Overview[Overview Chart]
        Category[Category Chart]
    end
    
    Client --> App
    App --> Providers
    Providers --> ExpenseCtx
    Providers --> ThemeCtx
    ExpenseCtx --> LocalStore
    
    Providers --> Router
    Router --> Dashboard
    
    Dashboard --> summary
    Dashboard --> Overview
    Dashboard --> Category
    Dashboard --> TxForm
    Dashboard -.->|Triggers| PDFGen
    
    PDFGen -.->|Reads Data| ExpenseCtx
    summary -.->|Reads Data| ExpenseCtx
    Overview -.->|Reads Data| ExpenseCtx
    Category -.->|Reads Data| ExpenseCtx
    TxForm -.->|Updates Data| ExpenseCtx
    
    classDef core fill:#1e293b,stroke:#a5b4fc,color:#fff;
    classDef state fill:#312e81,stroke:#6366f1,color:#fff;
    classDef ui fill:#0f172a,stroke:#38bdf8,color:#fff;
    classDef util fill:#047857,stroke:#34d399,color:#fff;
    
    class App,Providers,Router core;
    class ExpenseCtx,ThemeCtx,LocalStore state;
    class Dashboard,TxForm,summary,Overview,Category ui;
    class PDFGen util;
```

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── dashboard/       # Dashboard specific components (Charts, Cards)
│   ├── transactions/    # Transaction related components (Form, List)
│   └── ui/              # Reusable UI components (Button, Input, Card)
├── context/             # React Context definitions
│   ├── ExpenseContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Custom hooks
│   └── useLocalStorage.ts
├── utils/               # Helper functions
│   └── pdfGenerator.ts
├── types/               # TypeScript interfaces and types
│   └── index.ts
├── App.tsx              # Main application component
└── index.css            # Global styles and Tailwind directives
```

## 🎨 Themes

-   **Dark Mode**: A modern, neon-inspired theme with a radial gradient background `radial-gradient(circle at center, #172554 0%, #020617 100%)`.
-   **Light Mode**: A clean, "pencil on paper" aesthetic with hand-drawn style fonts and decorations.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
