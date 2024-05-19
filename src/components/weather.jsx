import "./weather.css";
import { useState } from "react";

const weather = () => {
  const [city, setCity] = useState("");
  const [weather,setWeather] = useState();
  const [error,setError] = useState();

  const API_key = "40c861e7de3dd6ca8c9a1b2347be1793";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

  const handleChange = (event) => {
    setCity(event.target.value);
    // console.log(event.target.value);
  };

  async function fetchData(){
    try{
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok){
        setWeather(output);
        console.log(output);
        setError('');
      }else{
        setError("Error not found.Please enter a valid city name.")
      }
    }
    catch(error){

    }
  }

  
  return (
    <>
      <div className="mainDiv">
        <div className="city">
          <input
            type="text"
            value={city}
            placeholder="Enter any city name"
            onChange={handleChange}
          />
          <button onClick={fetchData}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          
        </div>
      </div>
    </>
  );
};

export default weather;
