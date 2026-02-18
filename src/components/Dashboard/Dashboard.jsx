import CurrentInfo from "./CurrentInfo";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import "./Dashboard.scss";


function Dashboard({ currentTime, currentDate, weatherData, forecastItems, hourlyItems }) {

	// Conditional rendering: don't render dashboard if main weather data is missing
	if (!weatherData) return null;


	return (

		<div className="dashboard">


			{/* Top section: current city info and current weather */}
			<div className="dashboard__top">

				{/* Current city name, time and date */}
				<CurrentInfo
					city={weatherData.name}
					currentTime={currentTime}
					currentDate={currentDate}
				/>

				{/* Current weather (temperature, condition, etc.) */}
				<CurrentWeather weatherData={weatherData} />

			</div>



			{/* Bottom section: daily and hourly forecasts */}
			<div className="dashboard__bottom">

				{/* 5-day forecast */}
				{forecastItems && forecastItems.length > 0 && (
					<DailyForecast forecastItems={forecastItems} />
				)}

				{/* Hourly forecast: render only if there is data */}
				{hourlyItems && hourlyItems.length > 0 && (
					<HourlyForecast hourlyItems={hourlyItems} />
				)}

			</div>

		</div>
	);
}

export default Dashboard;
