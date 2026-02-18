import "./CurrentInfo.scss";

function CurrentInfo({ city, currentTime, currentDate }) {
	return (
		<article className="info-card">
			<p className="info-card__city">{city}</p>

			<time className="info-card__time" dateTime={currentTime}>
				{currentTime}
			</time>

			<p className="info-card__date">{currentDate}</p>
		</article>
	);
}

export default CurrentInfo;
