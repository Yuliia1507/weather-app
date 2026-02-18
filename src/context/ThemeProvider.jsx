import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "dark"
	);

	const toggleTheme = () => {
		setTheme(prev => prev === "light" ? "dark" : "light");
	};

	useEffect(() => {

		document.body.className = theme;

		localStorage.setItem("theme", theme);

	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
