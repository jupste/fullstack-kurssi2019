import React, {useState} from 'react'
const Show =({country}) => {
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
          
          </ul>
        </li>
        <li>Flag: <img src={country.flag} width= "10%"  height= "10%" /></li>
      </ul>
    </div>
  )
}
export default Show