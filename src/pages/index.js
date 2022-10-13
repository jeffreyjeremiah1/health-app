import React from 'react'
import '../index.css';
// import { FaDeezer, FaChartLine, FaChartPie } from 'react-icons/fa'

const Home = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'left', alignItems: 'left', height: '60vh', width: '77%', marginTop: '10vh'}}>

        <div className='info'>
          <h1 style={{color: 'hsl(185, 76%, 42%)'}}>Monitor your health on this app</h1>
          <h2>Your favorite community</h2>
          <h4>Testing little texts for fit</h4>
          <h4>Testing little texts for fit</h4>
          <button className='btn'>Click here</button>

          <div className='icon_container'>
              {/* <FaDeezer className='icon'/>
              <FaChartLine className='icon'/>
              <FaChartPie className='icon'/> */}
              <img className='icon'src={require('./../img/graph2.png')} alt="" />
              <img className='icon'src={require('./../img/graph3.png')} alt="" />
              <img className='icon'src={require('./../img/graph4.png')} alt="" />
              
              
          </div>
        </div>
        
        <div className='img_container'>
          <div className='doctor_img'>
              {/* <h1 style={{color: 'red'}}>health</h1> */}
          </div>
        </div>

    </div>
  )
}

export default Home