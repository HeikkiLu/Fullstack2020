import axios from 'axios'

const api_key = process.env.REACT_APP_SECRET_KEY
const url_start = 'https://api.openweathermap.org/data/2.5/weather?q='
const url_end = '&units=metric&appid='
const getCountries = () => {
    return axios.get(`https://restcountries.eu/rest/v2/all`)
}

const getWeather = capital => {
    let query = url_start + capital + url_end + api_key
    console.log(query)
    return axios.get(query)
}

export default { getCountries, getWeather }