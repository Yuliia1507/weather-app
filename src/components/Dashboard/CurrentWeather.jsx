import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./CurrentWeather.scss";
import weatherIcons from "../../utils/weatherIcons";

// Import all icons for light/dark themes
import sunRiseWhite from "../../assets/icons/sunrise-white.png";
import sunRiseDark from "../../assets/icons/sunrise-dark.png";
import sunSetWhite from "../../assets/icons/sunset-white.png";
import sunSetDark from "../../assets/icons/sunset-dark.png";
import humidityWhite from "../../assets/icons/humidity-white.png";
import humidityDark from "../../assets/icons/humidity-dark.png";
import pressureWhite from "../../assets/icons/pressure-white.png";
import pressureDark from "../../assets/icons/pressure-dark.png";
import windWhite from "../../assets/icons/wind-speed-white.png";
import windDark from "../../assets/icons/wind-speed-dark.png";
import uvWhite from "../../assets/icons/uv-white.png";
import uvDark from "../../assets/icons/uv-dark.png";

function CurrentWeather({ weatherData }) {

	// Get current theme (light or dark) from context
	const { theme } = useContext(ThemeContext);

	// Destructure weather data for easier access
	const { main, wind, sys, weather } = weatherData;

	// --- Choose icons depending on the current theme ---
	const icons = {
		humidity: theme === "light" ? humidityDark : humidityWhite,
		wind: theme === "light" ? windDark : windWhite,
		pressure: theme === "light" ? pressureDark : pressureWhite,
		uv: theme === "light" ? uvDark : uvWhite,
		sunrise: theme === "light" ? sunRiseDark : sunRiseWhite,
		sunset: theme === "light" ? sunSetDark : sunSetWhite,
	};

	// Array of weather parameters (humidity, wind, pressure, UV)
	const items = [
		{ icon: icons.humidity, value: `${main.humidity}%`, label: "Humidity" },
		{ icon: icons.wind, value: `${wind.speed} m/s`, label: "Wind Speed" },
		{ icon: icons.pressure, value: `${main.pressure} hPa`, label: "Pressure" },
		{ icon: icons.uv, value: "—", label: "UV" },
	];

	// Array for sunrise and sunset information
	const sunItems = [
		{
			icon: icons.sunrise,
			title: "Sunrise",
			time: new Date(sys.sunrise * 1000).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false

			}),
		},
		{
			icon: icons.sunset,
			title: "Sunset",
			time: new Date(sys.sunset * 1000).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12:false
			}),
		},
	];

	// Current weather icon (default to Clear if condition is missing)
	const currentIcon = weatherIcons[weather[0].main] || weatherIcons.Clear;

	return (
		<article className="weather">
			<div className="weather__wrapper">

				{/* Left section: temperature and sun info */}
				<div className="weather__left-wrap">

					{/* Current temperature and "feels like" */}
					<div className="weather__temperature temperature">
						<div className="temperature__current">{Math.round(main.temp)}°C</div>
						<div className="temperature__feeling">
							Feels like: <span>{Math.round(main.feels_like)}°C</span>
						</div>
					</div>

					{/* Sunrise and sunset info */}
					<div className="weather__sun sun-info">
						{sunItems.map((item) => (
							<div className="sun-info__item" key={item.title}>
								<img className="sun-info__img" src={item.icon} alt={item.title} />
								<div className="sun-info__details">
									<h2 className="sun-info__title">{item.title}</h2>
									<time className="sun-info__time">{item.time}</time>
								</div>
							</div>
						))}
					</div>

				</div>

				{/* Middle section: current weather condition */}
				<figure className="weather__condition condition-weather">
					<img
						className="condition-weather__icon"
						src={currentIcon}
						alt={weather[0].description}
					/>
					<figcaption>{weather[0].main}</figcaption>
				</figure>

				{/* Right section: additional weather parameters */}
				<div className="weather__items item-weather">
					{items.map((item, index) => (
						<div className="item-weather__info" key={index}>
							<img className="item-weather__icon" src={item.icon} alt={`${item.label} icon`} />
							<span className="item-weather__value">{item.value}</span>
							<p className="item-weather__label">{item.label}</p>
						</div>
					))}
				</div>

			</div>
		</article>
	);
}

export default CurrentWeather;
