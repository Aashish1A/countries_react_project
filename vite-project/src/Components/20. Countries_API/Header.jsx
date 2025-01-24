import { useTheme } from "../../Hooks/UseTheme";

const Header = () => {
  const [isDark, setIsDark] = useTheme();;
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title"><a href="/">Where in the world?</a></h2>
        <p className="theme-changer" onClick={() => {
          setIsDark(!isDark);
          localStorage.setItem("isDarkMode", !isDark)
        }}><i className={`fa-solid fa-${isDark ? "moon" : "sun"}`}></i>&nbsp;&nbsp;{isDark ? "Dark" : "Light"} Mode</p>
      </div>
    </header>
  )
}

export default Header