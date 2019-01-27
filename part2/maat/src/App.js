import React, { useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/countries'
import Filter from './components/filter'
import Show from './components/show'

const App =() =>{
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState('')
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/')
      .then(response => {
        console.log('promise fulfilled')
        setCountries([].slice.call(response.data))
      })
  },[])
  const modifySearch = (event) => {
    setSearch(event.target.value)
  }
  const data=[].slice.call(countries);
  const countriesToShow = data.filter(country =>country.name.toLowerCase().includes(search.toLowerCase()))
    return (
      <div>
        <Filter search ={search} modifySearch={modifySearch}/>
       <Countries results={countriesToShow}/>
      
      </div>
    );
}

export default App;
