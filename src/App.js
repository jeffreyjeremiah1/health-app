import './App.css';
// import { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import BMI from './pages/bmi';
import Services from './pages/services';
import Signin from './pages/signin';


function App() {

  return (
    <div className="App">
    
      <header className="App-header">  
      
      <Router>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bmi" element={<BMI></BMI>}/>
            <Route path="/services" element={<Services></Services>}/>
            <Route path="/signin" element={<Signin></Signin>}/>
          </Routes>
      </Router>
    
      </header>
    </div>
  );
}

export default App;
