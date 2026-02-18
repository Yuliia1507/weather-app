function getWindDirection(deg) {
	const directions = [
		"North",
		"North-East",
		"East",
		"South-East",
		"South",
		"South-West",
		"West",
		"North-West"
	];

	const index = Math.round(deg / 45) % 8;
	return directions[index];
}

export default getWindDirection