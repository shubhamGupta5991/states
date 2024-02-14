import React, { useEffect, useState } from 'react'
import axios from 'axios'

const States = () => {
    const [countries,setCountries] = useState([])
    const [states,setStates] = useState([])
    const [cities,setCities] = useState([])
    const [chosenCountry,setChosenCountry] = useState('')
    const [chosenState,setChosenState] = useState('')
    const [chosenCity,setChosenCity] = useState('')

    const endPoint =   `https://crio-location-selector.onrender.com`;

    useEffect(()=>{
      async  function apiCallCountry(){
         try {
            const response = await axios.get(`${endPoint}/countries`)
            //   console.log(response.data)
              setCountries(response.data)
            
         } catch (error) {
            console.log(error);
         }
                
        }
        apiCallCountry();

    },[])
    useEffect(()=>{
      async  function apiCallState(){
       try {
        if(chosenCountry){
            
            const response = await axios.get(`${endPoint}/country=${chosenCountry}/states`)
            console.log(response.data)
            setStates(response.data)
            setCities([])
            setChosenCity('')
            setChosenState('')
        }
        
       } catch (error) {
        console.log(error);
        
       }
                
        }
        apiCallState();

    },[chosenCountry])

    useEffect(()=>{
      async  function apiCallCity(){
       try {
        if(chosenCountry && chosenState){
            
            const response = await axios.get(`${endPoint}/country=${chosenCountry}/state=${chosenState}/cities`)
            console.log(response.data)
            setCities(response.data)
            setChosenCity('')
            
           
        }
        
       } catch (error) {
        console.log(error);
       }
                
        }
        apiCallCity();

    },[chosenCountry,chosenState])

    // console.log(chosenCountry,chosenState);

  return (
    <div>
        <h1>Select Location</h1>
        <select name="countries" id="" value={chosenCountry} onChange={(e)=> setChosenCountry(e.target.value)}>
            <option value="" disabled>
                Select Country
            </option>
            {countries.map((country)=>(
                <option key={country} value={country}>{country}</option>
            ))}
        </select>
        <select name="states" id="" value={chosenState} onChange={(e)=>setChosenState(e.target.value) }>
            <option value="" disabled>
                Select State
            </option>
            {states.map((state)=>(
                <option key={state} value={state}>
                    {state}
                </option>
            ))}

        </select>
        <select name="cities" id="" value={chosenCity} onChange={(e)=>setChosenCity(e.target.value)}>
            <option value="" disabled>
                Select City
            </option>
            {cities.map((city)=>(
                <option value={city} key={city}>
                    {city}
                </option>
            ))}
        </select>
        <p>{chosenCity && (<div><h1>You Selected {chosenCity},<span style={{fontSize:'25px',fontWeight:'300'}}>{chosenState},{chosenCountry}</span></h1></div>)}</p>
    </div>
  )
}

export default States