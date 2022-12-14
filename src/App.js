import './App.css';
import { useState, createContext, useMemo } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import BMI from './pages/bmi';
import Profile from './pages/profile';
import EditProfile from './pages/editableUserProfile';
import Services from './pages/services';
import Login from './pages/login';



function App() {

  const [user, setUser] = useState({auth: null, user: {}});

  const value = useMemo(() => ({ user, setUser}), [user, setUser]);

  return (
    <div className="App">
    
      <header className="App-header">  
      
      <Router>
      <appContext.Provider value={value}>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bmi" element={<BMI></BMI>}/>
            <Route path="/services" element={<Services></Services>}/>
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/profile" element={<Profile></Profile>}/>
            <Route path="/edit-profile" element={<EditProfile></EditProfile>}/>
            <Route path="/logout" element={<Home/>}/>
          </Routes>
        </appContext.Provider>
      </Router>
      </header>
    </div>
  );
}

export default App;
export const appContext = createContext(null);