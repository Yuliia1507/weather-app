import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./ThemeToggle.scss";

function ThemeToggle() {

	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<button
			className={`toggle ${theme === "light" ? "active" : ""}`}
			onClick={toggleTheme}
		>
			<span className="toggle-circle"></span>
		</button>
	);
}

export default ThemeToggle;
