import LocationIcon from "../icons/LocationIcon";
import "./CurrentLocationButton.scss";

function CurrentLocationButton({ onClick }) {
	return (
		<button className="location-btn" onClick={onClick}>
			<LocationIcon /> Current Location
		</button>
	);
}

export default CurrentLocationButton;
