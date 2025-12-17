
import { ExpenseProvider } from './context/ExpenseContext';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-primary/30">
        <Dashboard />
      </div>
    </ExpenseProvider>
  );
}

export default App;
