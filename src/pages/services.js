import {React, useState} from 'react';
import { FaRedo } from 'react-icons/fa'


const Services = () => {

    const [inputs, setInputs] = useState({});
    const [total, setTotal] = useState(0);
    const [percentage, setPercentage] = useState(0);
  
    function handleChange(event) {
      const { name, value } = event.target;
      setInputs(values => ({...values, [name]: value}))
    }

    function refresh(){
      setInputs('');
      setTotal('0');
    }
  
    const handleSubmit = async (event) => {
      console.log(inputs.sex);
      if (inputs.sex === 'male') {
        const tbw = Math.round(2.447 - 0.09156 * inputs.age + 0.1074 * inputs.height + 0.3362 * inputs.weight, 4);
        const percentage = Math.round((tbw / inputs.weight) * 100);
        setTotal(tbw);
        setPercentage(percentage);
        
      } else {
        const tbw = Math.round(-2.097 + 0.1069 * inputs.height + 0.2466 * inputs.weight, );
        const percentage = Math.round((tbw / inputs.weight) * 100);
        setTotal(tbw);
        setPercentage(percentage);
      };

      event.preventDefault();
    };
  

  return (
    <>
    <div className='extra'>

      <section className='section'>
          {/* <h3>Body Water</h3> */}

          <form className='form' onSubmit={handleSubmit}>

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

    {/* ////////////////////////// */}

            <div className='inputs'>
                    <label>
                        Age:
                        <input
                        name='age'
                        value={inputs.age || ""}
                        onChange={handleChange}
                        placeholder="0"
                        type="number"/>
                    </label>
            </div>

            <div className="form-floating inputs" onChange={handleChange}>
              <select name='sex' value={inputs.sex || ""}  id="floatingSelectGrid" onChange={handleChange}>
                <option defaultValue='select' onChange={handleChange}>select sex</option>
                <option value="male" onChange={handleChange} >male</option>
                <option value="female" onChange={handleChange} >female</option>
              </select>
            </div>

            <h4>Total Body: {total}kg</h4>
            <h4>Percentage: {percentage}%</h4>

            <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
              <button className='btn' onClick={handleSubmit}>calculate</button>
              <button className='btn' onClick={refresh}><FaRedo /></button>
            </div>
            
          </form>
      </section>

      <div className='text_container'>
        <h3>
        Thanks to this BMI calculator for men you can answer the question 
                  "What's my BMI?" while also checking what is a healthy BMI for men,
                  and where you place in the BMI chart for men. Furthermore, with this
                  BMI calculator for male you can obtain more precise data on what's
                  a normal BMI. We also provide tools and guidance on how to improve
                  your position in the BMI ranges for males
        </h3>
      </div>

      {/* <div className='section'>
            <h3>Body Water</h3>
            <div className='text_container'>
              <h4>
                Thanks to this BMI calculator for men you can answer the question 
                "What's my BMI?" while also checking what is a healthy BMI for men,
                and where you place in the BMI chart for men. Furthermore, with this
                BMI calculator for male you can obtain more precise data on what's
                a normal BMI. We also provide tools and guidance on how to improve
                your position in the BMI ranges for males
              </h4>
            </div>
      </div> */}

    </div>
    </>
  )
};


export default Services;