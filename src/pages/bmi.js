import {React, useState} from 'react';
import { FaRedo } from 'react-icons/fa'

const BMI = () => {

    const [inputs, setInputs] = useState({});
    const [total, setTotal] = useState(0);
  
    function weight_condition(BMI) {
      if (BMI < 18.5) {
        let difference = 18.5 - BMI
        difference = Math.round(difference, 2);
        return <h3>You are underweight, you need to gain at least <span style={{color: 'red'}}>{difference} kg</span> to reach a healthy BMI.</h3>
      }else if(BMI < 24.9) {
        return <h3>You have a healthy weight</h3>
      }else if (BMI < 35) {
        let difference = BMI - 18.5
        difference = Math.round(difference, 2)
        return <h3>You are obese, you need to loose at least <span style={{color: 'red'}}>{difference} kg</span> to reach a healthy BMI.</h3>
      } else {
        let difference = BMI - 18.5
        difference = Math.round(difference, 2)
        return <h3>You are severely obese, you need to loose at least <span style={{color: 'red'}}>{difference} kg</span> to reach a healthy BMI</h3> 
      }
    }

    function handleChange(event) {
      const { name, value } = event.target;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = async (event) => {
      const bmi = ((inputs.weight / inputs.height) / inputs.height) * 10000;
      event.preventDefault();
      setTotal(bmi);
    };
  
    function refresh(){
      setInputs('');
      setTotal('0');
    }

  return (
  
    <div className='extra'>
    
      <section className='section'>
          <h3>BMI Calculator</h3>
      
          <form className='form' onSubmit={handleSubmit}>
            <div>

            <div className='inputs'>
            <label>
                height(cm):
                <input
                name='height'
                value={inputs.height || ""}
                onChange={handleChange}
                placeholder="0"
                type="text"
                />
              </label>
            </div>
              
          <div className='inputs'>
              <label>
                  weight(kg):
                  <input
                  name='weight'
                  value={inputs.weight || ""}
                  onChange={handleChange}
                  placeholder="0"
                  type="text"/>
              </label>
          </div>
              
            </div>
            
            <h4>result: {total}</h4>

            <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
              <button className='btn' onClick={handleSubmit}>calculate</button>
              <button className='btn' onClick={refresh}><FaRedo /></button>
            </div>
            
          </form>
      </section>

      <div className='text_container'>
        <h3>{weight_condition(total)}</h3>
      </div>

    </div>
  )
};

export default BMI;