import { useContext } from "react";
import { themeContext } from "../Context/ThemeContext";


export const useTheme = () => useContext(themeContext);