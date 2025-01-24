import React, { useState } from 'react';
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import { themeContext } from "../../Context/ThemeContext.jsx";

const Countries_API = () => {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("isDarkMode")));
  
  return (
    <themeContext.Provider value={[isDark, setIsDark]}>
      <Header />
      <Outlet />
    </themeContext.Provider>
  )
}

export default Countries_API;