import React, { useEffect, useState } from "react";
import "./Country_Details.css";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../../Hooks/UseTheme";
import CountriesDetailShimmer from "./CountriesDetailShimmer";
// import { UseWindowSize } from "../../Hooks/UseWindowSize";

const Country_Details = () => {
  const params = useParams();
  const countryName = params.country;
  const [countryData, setCountryData] = useState(null); // Initialize as null for loading state
  const [notFound, setNotFound] = useState(false);

  const [isDark] = useTheme();;

  // const windowSize = UseWindowSize();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // Fetch country data by name
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const [data] = await response.json();

        // Extract basic country data
        const countryInfo = {
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName || {})?.[0]?.common || "N/A",
          population: data.population.toLocaleString(),
          region: data.region,
          subRegion: data.subregion,
          capital: data.capital?.[0] || "N/A",
          topLevelDomain: data.tld?.[0] || "N/A",
          currencies: Object.values(data.currencies || {})
            .map((c) => c.name)
            .join(", "),
          languages: Object.values(data.languages || {}).join(", "),
          borders: data.borders || [], // Default to an empty array if no borders exist
          flag: data.flags.svg,
        };

        // Fetch names of border countries
        if (data.borders?.length > 0) {
          const borderPromises = data.borders.map((borderCode) =>
            fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
              .then((res) => res.json())
              .then(([borderData]) => borderData.name.common)
          );

          const borderCountries = await Promise.all(borderPromises);
          countryInfo.borders = borderCountries;
        }

        setCountryData(countryInfo);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      }
    };

    fetchCountryData();
  }, [countryName]);

  if (notFound) {
    return <div>Country Not Found...</div>;
  }

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (<CountriesDetailShimmer />) : (
          <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name || "Loading..."}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name">{countryData.nativeName}</span>
              </p>
              <p>
                <b>Population: </b>
                <span className="population">{countryData.population}</span>
              </p>
              <p>
                <b>Region: </b>
                <span className="region">{countryData.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region">{countryData.subRegion}</span>
              </p>
              <p>
                <b>Capital: </b>
                <span className="capital">{countryData.capital}</span>
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-level-domain">
                  {countryData.topLevelDomain}
                </span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies">{countryData.currencies}</span>
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages">{countryData.languages}</span>
              </p>
            </div>
            {countryData.borders.length > 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border, index) => (
                  <Link key={index} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </main>
  );
};

export default Country_Details;
