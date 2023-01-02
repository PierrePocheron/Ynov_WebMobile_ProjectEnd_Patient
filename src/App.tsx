import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import DashboardPatientPage from './components/DashboardPatientPage';
import RegisterPage from './components/RegisterPage';
import TakeAppointmentPage from './components/TakeAppointmentPage';
import MyAppointmentPage from './components/MyAppointmentPage';
import Footer from './components/FooterLayout';


function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/dashboard" element={<DashboardPatientPage />} />
          <Route path="/take-appointment" element={<TakeAppointmentPage />} />
          <Route path="/my-appointment" element={<MyAppointmentPage />} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App
