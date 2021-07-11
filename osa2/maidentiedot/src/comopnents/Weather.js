
import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        dataService
            .getWeather(capital)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    console.log(weather)
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p><b>Temperature: </b>{weather.length != 0 ? weather.main.temp : "No temperature available."}°C</p>
            {weather.length != 0 ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /> : <div></div>}
            <p><b>Wind: </b>{weather.length != 0 ? weather.wind.speed : "No wind speed available."}ms</p>
        </div>
    )
}

export default Weather