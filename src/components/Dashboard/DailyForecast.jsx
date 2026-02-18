import "./DailyForecast.scss";
import weatherIcons from "../../utils/weatherIcons";


function DailyForecast({ forecastItems }) {

	// Render daily forecast container
	return (
		<div className="daily-forecast">

			{/* Section title */}
			<h2 className="daily-forecast__title">5 Days Forecast:</h2>

			<div className="daily-forecast__wrapper">

				{/* Map through forecast items array */}
				{forecastItems.map((item, index) => {

					// Render each day's forecast
					return (
						<div className="daily-forecast__item" key={index}>

							{/* Weather icon based on main condition, fallback to Clear */}
							<img
								src={weatherIcons[item.main] || weatherIcons.Clear}
								alt={item.main}
								className="daily-forecast__icon"
							/>

							{/* Temperature for the day */}
							<p className="daily-forecast__temp">{item.temperature}°C</p>

							{/* Date (weekday, day, month) */}
							<p className="daily-forecast__date">{item.date}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default DailyForecast;
