import React, { useEffect, useState } from 'react';
import CountriesCard from './CountriesCard';
import CountriesShimmer from './CountriesShimmer';


const CountriesList = ({query}) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
    })
  }, [])

  // Applying shimmer Effects
  if(countriesData.length === 0){
    return <CountriesShimmer />
  }

  return (
    <>
      <div className="countries-container">
        {countriesData.filter((country) => country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)).map((country) => {
          return (
            <CountriesCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
            />
          )
        })}
      </div>
    </>
  )
}

export default CountriesList;