import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiseasePrediction from './pages/DiseasePrediction';
import MedicineReminder from './pages/MedicineReminder';
import Dashboard from './pages/Dashboard';
import SmartDietPlanner from './pages/SmartDietPlanner';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease-prediction" element={<DiseasePrediction />} />
            <Route path="/medicine-reminder" element={<MedicineReminder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diet-planner" element={<SmartDietPlanner />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;