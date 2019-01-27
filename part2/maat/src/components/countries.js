import React, {useState} from 'react'

const Country =({country}) => {
  if(country.length==0){
    return(
      <div></div>
    )
  }
  return (
    <div>
    <h3>{country.name}</h3>
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Population: {country.population}</li>
        <li>Languages: 
          <ul>
          {country.languages.map(lang => <li>{lang.name}</li>)}
          </ul>
        </li>
        <li>Map: <img src={country.flag} width= "10%"  height= "10%" /></li>
      </ul>
    </div>
  )
}

const Countries = ({results}) => {
  const[show, setShow] =useState('');
  const data=[].slice.call(results);
  if(data.length>10){
    return (
      <div>Too many entries
      <Country country={show}/>
      </div>
    )
  }
  if(data.length>0){
    return (
      <div>
      <ul>{data.map(country => <div>{country.name}<button onClick={()=>setShow(country)}>show</button></div>)}</ul>
      <Country country={show}/>
      </div>
    )
  }

  return(
    <div>No matches found
    <Country country={show}/>
    </div>
  )
}

export default Countries