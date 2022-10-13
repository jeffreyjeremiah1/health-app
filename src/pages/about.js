import React, {useState } from 'react';
import Donut from '../components/chart';
import { FaSearch } from 'react-icons/fa';
import menu from '../food';
import { FaRedo } from 'react-icons/fa'

const About = () => {
  let [inputs, setInputs] = useState('');
  let [food, setFood] = useState("");
  let firstList =  Object.values(food === "" || food[0].contents);
    
  function handleChange(event) {
    setInputs(event.target.value)
  }

  let checkMeal =  menu.filter((val) => {
    return val.name.toLowerCase().includes(inputs.toLowerCase())
  });

  function refresh(){
    setInputs('')
    setFood()
    checkMeal = '' 
  }

  const handleSubmit = async (event) => {
    setFood(checkMeal)
    event.preventDefault();
  };

  return (
    <div className='extra'>
        <section className='section'>
            <h3>Calorie Calculator</h3>
            <div>
                <form onSubmit={handleSubmit} >
                    <div className='inputs'>
                        <FaSearch/>
                        <input
                        name='meal'
                        placeholder="Search..."
                        onChange={handleChange}
                        type="search"
                        />
                    </div>
                    
                    {/* ////////////////////////// */}

                    {/* <div className='inputs'>
                        <label>
                            Age:
                            <input
                            name='age'
                            // value={inputs.age || ""}
                            placeholder="0"
                            onChange={handleChange}
                            type="number"/>
                        </label>
                    </div> */}
{/* 
                    <div className='user' >
                            <h4>Total Calories: {food === "" || food[0].contents.calories}</h4>
                            <h4>Total Fats: {food === "" || food[0].contents.fats}</h4> 
                            <h4>Total Protein: {food === "" || food[0].contents.calories}</h4> 
                    </div> */}

                
                    <div className='user' >
                        <h4>Total Calories: {food && food[0].contents.calories}</h4>
                        <h4>Total Fats: {food && food[0].contents.fats}</h4> 
                        <h4>Total Protein: {food && food[0].contents.calories}</h4> 
                    </div>
            
                    

                    <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                        <button className='btn' onClick={handleSubmit}>calculate</button>
                        <button className='btn' onClick={refresh}><FaRedo /></button>
                    </div>
                    
                </form>
            </div>
        </section>

        <div className='float-child'>
            <Donut series={firstList}/>
        </div>
    </div>
    )
};

export default About