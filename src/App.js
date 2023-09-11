import React, { useState } from "react";
import axios from "axios";



const weatherBackgrounds = {
  Clear: "url_to_clear_sky_image.jpg",
  Clouds: "url_to_cloudy_image.jpg",
  Rain: "url_to_rainy_image.jpg",
};

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1275a8d3a5b5d050db66344ba3cb05ba&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setWeatherCondition(response.data.weather[0].main);
        console.log(response.data);
      });
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${weatherBackgrounds[weatherCondition]})` }}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="Container">
        <div className="top">
          <div className="Location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}</p>
              ) : null}

              <p>Feel Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}

              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;




