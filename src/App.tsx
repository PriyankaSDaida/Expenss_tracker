import { ExpenseProvider } from './context/ExpenseContext';
import { ThemeProvider } from './context/ThemeContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { DoodleBackground } from './components/ui/DoodleBackground';
import { SchoolDecorations } from './components/ui/SchoolDecorations';

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="min-h-screen relative transition-colors duration-300">
          <DoodleBackground />
          <SchoolDecorations />
          <div className="relative z-10">
            <Dashboard />
          </div>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
