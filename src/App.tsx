import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage';
import DashboardPatientPage from './components/DashboardPatientPage';


function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="App">
      {!isLogin && <LoginPage updateLogin={setIsLogin}/>}
      {isLogin && <DashboardPatientPage/>}
    </div>
  )
}

export default App
