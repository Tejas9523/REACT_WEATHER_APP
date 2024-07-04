import "./App.css";
import { useState } from "react";


const api = {
  key: "d85093f99a005c8686b89077d8d8a18f",
  base: "https://api.openweathermap.org/data/2.5/",
};

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [currentDate, setCurrentDate] = useState(getDate());

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER  */}
        <h1>Weather Report</h1>

        {/* Search Box - Input + Button  */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>

        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div><b>
            {/* Temperature Celsius  */}
            <p className="b">
              <h1>{weather.main.temp} °C</h1>
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/740/740832.png" /><br />
                <nav>Wind speed</nav>
                {weather.wind.speed}m/s<br />
              </p>
              {/* Condition (Sunny ) */}
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/4148/4148460.png" /><br />
                <nav>Humidity</nav>
                {weather.main.humidity}%<br />
              </p>
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/2562/2562265.png" /><br />
                <nav>Pressure</nav>
                {weather.main.pressure} hPa</p>
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png" /><br />
                <nav>Weather</nav>
                {weather.weather[0].description}
              </p>
            </p></b>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;