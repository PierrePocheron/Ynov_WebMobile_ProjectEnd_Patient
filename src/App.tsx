import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage';
import DashboardPatientPage from './components/DashboardPatientPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import RegisterPage from './components/RegisterPage';
import TakeAppointmentPage from './components/TakeAppointmentPage';
import MyAppointmentPage from './components/MyAppointmentPage';


function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/dashboard" element={<DashboardPatientPage />} />
          <Route path="/take-appointment" element={<TakeAppointmentPage />} />
          <Route path="/my-appointment" element={<MyAppointmentPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
