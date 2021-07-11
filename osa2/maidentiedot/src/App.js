import { useState, useEffect } from 'react';
import ListCountries from './comopnents/Country'
import dataService from './services/dataService'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  const searchCountry = () => { 
    dataService.getCountries()
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

  const handeShowMore = country => {
    setCountry(country)
  }

  return (
    <div className="App">
      <form>
        <div>
          Find countries: <input onChange={handleSearch} />
        </div>
      </form>
      <ListCountries searchTerm={country} countries={countries} handleShowMore={handeShowMore} />
    </div>
  );
}

export default App;
