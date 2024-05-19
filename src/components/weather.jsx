import "./weather.css";
import { useState } from "react";

const weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState('');

  const API_key = "40c861e7de3dd6ca8c9a1b2347be1793";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;

  const handleChange = (event) => {
    setCity(event.target.value);
    // console.log(event.target.value);
  };

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        console.log(output);
        setError("");
      } else {
        setError("Data not found. Please enter a valid city name.");
      }
    } catch (error) {
      
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

        {error && <p className="errorMessage">{error}</p>}

        {weather && weather.weather && (
          <div className="content">
            <div className="weatherImg">
              <div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              </div>
              <div className="desc">{weather.weather[0].description}</div>
            </div>

            <div className="weatherTemp">
              <h2>
                {weather.main.temp} <span>&deg;C</span>
              </h2>
            </div>

            <div className="weatherCity">
              <div className="locationIcon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="country">
                <p>
                  {weather.name}, <span>{weather.sys.country}</span>
                </p>
              </div>
            </div>

            <div className="weatherStats">
              <div className="wind">
                <div className="windIcon">
                  <i className="fa-solid fa-wind"></i>
                </div>
                <h3 className="windSpeed">
                  {weather.wind.speed} <span>km/h</span>
                </h3>
                <h3 className="windHeading">Wind Speed</h3>
              </div>
              <div className="humidity">
                <div className="humidityIcon">
                <i className="fa-solid fa-droplet"></i>
                </div>
                <h3 className="humidityPercent">{weather.main.humidity} <span>%</span></h3>
                <h3 className="humidityHeading">Humidity</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default weather;
