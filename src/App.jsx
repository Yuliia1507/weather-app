import { useState, useRef, useEffect } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorModal from "./ErrorModal";
import "./App.scss";

function App() {

	// State for selected city (string or coordinates object)
	const [city, setCity] = useState("Cherkasy");

	// State for storing error message
	const [error, setError] = useState(null);

	// State for current time
	const [currentTime, setCurrentTime] = useState("");

	// State for current date
	const [currentDate, setCurrentDate] = useState("");

	// State for current weather data
	const [weatherData, setWeatherData] = useState(null);

	// State for 5-day forecast
	const [forecastData, setForecastData] = useState([]);

	// State for hourly forecast
	const [hourlyData, setHourlyData] = useState([]);


	// Ref for search input to control focus
	const searchRef = useRef(null);

	// OpenWeatherMap API key
	const API_KEY = import.meta.env.VITE_API_KEY;

	const BASE_URL = "https://api.openweathermap.org/data/2.5";

	// Updates city when user searches
	const handleSearch = (newCity) => setCity(newCity);


	// Gets user's current location and updates city with coordinates
	const handleCurrentLocation = () => {

		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(

				(position) => {

					const { latitude, longitude } = position.coords;

					setCity({
						lat: latitude,
						lon: longitude
					});

				},

				(error) => {

					console.warn(
						"Geolocation denied or unavailable:",
						error.message
					);

					

					setError(
						"Cannot access your location."
					);

				}

			);

		}

		else {

			console.warn(
				"Geolocation not supported"
			);

			setError(
				"Geolocation not supported."
			);

		}

	};



	// Fetch weather and forecast data when city changes
	useEffect(() => {

		async function fetchWeather() {

			try {

				// Reset error before new request
				setError(null);


				// Create weather API URL based on city type
				const urlWeather =
					typeof city === "string"
						? `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
						: `${BASE_URL}/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`;


				const resWeather = await fetch(urlWeather);


				// Throw error if request failed
				if (!resWeather.ok) throw new Error("City not found or API error");


				const dataWeather = await resWeather.json();


				// Save current weather data
				setWeatherData(dataWeather);



				// Create forecast API URL
				const urlForecast =
					typeof city === "string"
						? `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
						: `${BASE_URL}/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`;


				const resForecast = await fetch(urlForecast);


				// Throw error if forecast failed
				if (!resForecast.ok) throw new Error("Forecast not found");


				const dataForecast = await resForecast.json();



				// --- 5-day forecast (one item per day at 12:00) ---
				const daily = dataForecast.list
					.filter(item => item.dt_txt.includes("12:00:00"))
					.slice(0, 5)
					.map(item => ({

						date: new Date(item.dt_txt).toLocaleDateString("en-US", {
							weekday: "long",
							day: "numeric",
							month: "short",
						}),

						temperature: Math.round(item.main.temp),

						main: item.weather[0].main,

					}));

				setForecastData(daily);



				// --- Hourly forecast (next 5 time points) ---
				const now = new Date();

				const hourlyItems = dataForecast.list
					.filter(item => new Date(item.dt_txt) > now)
					.slice(0, 5)
					.map(item => ({

						time: new Date(item.dt_txt).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
						}),

						temperature: Math.round(item.main.temp),

						main: item.weather[0].main,

						windSpeed: Math.round(item.wind.speed),

						windDeg: item.wind.deg,

					}));

				setHourlyData(hourlyItems);


			} catch (err) {

				// Save error message
				setError(err.message);

				// Keep previous weather data
				console.warn("Weather fetch error:", err.message);

			}
		}

		fetchWeather();

	}, [city, API_KEY]);


	// Update current time and date every second
	useEffect(() => {

		const interval = setInterval(() => {

			const now = new Date();

			setCurrentTime(
				now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
			);

			setCurrentDate(
				now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "short" })
			);

		}, 1000);


		// Cleanup interval
		return () => clearInterval(interval);

	}, []);



	// Focus search input when there is no error
	useEffect(() => {

		if (!error) searchRef.current?.focus();

	}, [error]);



	return (
		<div className="app" >

			{/* Header component receives search handlers and ref */}
			<Header
				onSearch={handleSearch}
				onCurrentLocation={handleCurrentLocation}
				searchRef={searchRef}
			/>


			{/* Dashboard displays weather and forecast data */}
			<Dashboard
				currentTime={currentTime}
				currentDate={currentDate}
				weatherData={weatherData}
				forecastItems={forecastData}
				hourlyItems={hourlyData}
			/>


			{/* Error modal displays error and returns focus */}
			<ErrorModal
				message={error}
				onClose={() => setError(null)}
				returnFocusRef={searchRef}
			/>

		</div>
	);
}

export default App;
