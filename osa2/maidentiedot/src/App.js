import axios from 'axios';
import { useState, useEffect } from 'react';

const Countries = props => {
  return (
    <div> {props.country.name}</div>
  )
}

const Country = props => {
  return(
    <div>
      <h1>{props.country.name}</h1>
      <div>
        Capital:
      </div>
      <div>
        Population: 
      </div>
      <h2>Languages</h2>
        <div>
          <ul>
            {props.country.languages.map((language, i) => {
              return (
                <li key={i}>{language.name}</li>
              )  
              }
            )}
          </ul>
        </div>
        <div>
          <img src={props.country.flag} alt={`Flag of ${props.country.flag}`} width={200} height={100} />
        </div>
    </div>
  )
}

const ListCountries = props => {
  let newCountries = []

  if (props.searchTerm !== '') {
    props.countries.forEach(country => {
      if (country.name.toLowerCase().includes(props.searchTerm.toLowerCase())) {
        newCountries.push(country)
      }
    })
    if (newCountries.length > 10) {
      return (
        <div>Too many matches.</div>
      )
    }
    if (newCountries.length === 1) {
      return(
        <Country country={newCountries[0]} />
      )
    }
    return (
      newCountries.map((country, i) => {
        return (
          <Countries key={i} country={country} />
        )
      })
    )
  }
  return(
    <div></div>
  )
}

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  const searchCountry = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data)
      }
      )
  }

  useEffect(searchCountry, [])

  const handleSearch = event => {
    event.preventDefault()
    setCountry(event.target.value)
  }

  return (
    <div className="App">
      <form>
        <div>
          Find countries: <input onChange={handleSearch} />
        </div>
      </form>
      <ListCountries searchTerm={country} countries={countries} />
    </div>
  );
}

export default App;
