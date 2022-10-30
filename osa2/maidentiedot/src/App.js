import { useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({city, cca2}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${cca2}&appid=${api_key}`)
      .then(response => {
        let lat = response.data[0].lat
        let lon = response.data[0].lon

        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        .then(response => {
          setWeatherData(response.data)
        })
      })
  }, [])

  if (Object.keys(weatherData).length === 0) {
    return (
      <div>
        <p>Loading weather data...</p>
      </div>
    )
  }
  else return (
    <div>
      <h2>Weather in {city}</h2>
      <div>temperature {weatherData.main.temp} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt=''/>
      <div>wind {weatherData.wind.speed} m/s</div>
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {Math.round(country.area)}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={country.flags.svg} alt="" width="150px"/>
      <Weather city={country.capital[0]} cca2={country.cca2} />
    </div>
  )
}

const NameEntry = ({name, setSearch}) => (
  <div>
    {name} <button onClick={() => setSearch(name)}>show</button>
  </div>
)

const CountryNames = ({countries, setSearch}) => (
  <div>
    {countries.map(country =>
      <NameEntry key={country.name.common} name={country.name.common} setSearch={setSearch} />
    )}
  </div>
)

const SearchResult = ({countries, setSearch}) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  else if (countries.length === 0) {
    return <p>No results</p>
  }
  else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else {
    return <CountryNames countries={countries} setSearch={setSearch}/>
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const results = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearchChange} /></div>
      <SearchResult countries={results} setSearch={setSearch} />
    </div>
  );
}

export default App;
