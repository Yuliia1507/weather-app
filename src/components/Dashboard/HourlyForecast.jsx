import "./HourlyForecast.scss";
import weatherIcons from "../../utils/weatherIcons";
import getWindDirection from "../../utils/windDirection";
import windArrow from "../../assets/icons/wind-arrow.png";


function HourlyForecast({ hourlyItems }) {

	// Prevent rendering if there is no data
	// This avoids errors and empty UI
	if (!hourlyItems || hourlyItems.length === 0) return null;

	return (

		<div className="hourly-forecast">

			<h2 className="hourly-forecast__title">
				Hourly Forecast
			</h2>


			<div className="hourly-forecast__wrapper">


				{/* Iterate through hourly forecast array */}
				{hourlyItems.map((item, index) => {


					// Convert wind degrees into compass direction (N, NE, E, etc.)
					const direction = getWindDirection(item.windDeg);


					return (

						// Render forecast item
						<div
							className="hourly-forecast__item"
							key={index}
						>


							{/* Display forecast time */}
							<p className="hourly-forecast__time">
								{item.time}
							</p>



							{/* Select weather icon dynamically based on weather condition */}
							{/* Fallback to Clear icon if condition is not found */}
							<img
								src={
									weatherIcons[item.main]
									|| weatherIcons.Clear
								}
								alt={item.main}
								className="hourly-forecast__icon"
							/>



							{/* Display temperature */}
							<p className="hourly-forecast__temp">
								{item.temperature}°C
							</p>



							{/* Rotate arrow based on wind degree */}
							{/* +180 is used to correct arrow orientation */}
							<img
								src={windArrow}
								alt="Wind direction"
								className="hourly-forecast__wind-icon"

								title={`Wind: ${direction}`}

								style={{
									transform:
										`rotate(${item.windDeg + 180}deg)`
								}}
							/>



							{/* Display wind speed */}
							<span className="hourly-forecast__wind-speed">
								{item.windSpeed} m/s
							</span>


						</div>

					);

				})}

			</div>

		</div>
	);
}

export default HourlyForecast;
