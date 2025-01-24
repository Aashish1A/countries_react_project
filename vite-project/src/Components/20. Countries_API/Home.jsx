import React, { useState } from "react";
import "../../App.css";
import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import CountriesList from "./CountriesList.jsx";
import { useTheme } from "../../Hooks/UseTheme.jsx";

// import { UseWindowSize } from "../../Hooks/UseWindowSize.jsx";

const Home = () => {

  const [query, setQuery] = useState("");

  const [isDark] = useTheme();

  // const windowSize = UseWindowSize();

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <Filter setQuery={setQuery} />
      </div>

      {/* <h2 style={{ textAlign: "end" }}>
        {windowSize.width} X {windowSize.height}
      </h2> */}
      
      <CountriesList query={query} />
    </main>
  );
};

export default Home;
