const Countries = ({country, handleShowMore}) => {
    return (
        <div> 
            {country.name} <button onClick={handleShowMore}> Show </button>
        </div>
    )
}

const Country = props => {
    return (
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

const ListCountries = ({searchTerm, countries, handleShowMore}) => {
    let newCountries = []
    
    if (searchTerm !== '') {
        countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                newCountries.push(country)
            }
        })
        if (newCountries.length > 10) {
            return (
                <div>Too many matches.</div>
            )
        }
        if (newCountries.length === 1) {
            return (
                <Country country={newCountries[0]} />
            )
        }
        return (
            newCountries.map((country, i) => {
                return (
                    <Countries key={i} country={country} handleShowMore={() => handleShowMore(country.name)} />
                )
            })
        )
    }
    return (
        <div></div>
    )
}

export default ListCountries