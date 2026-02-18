import ThemeToggle from "./ThemeToggle"
import SearchBar from "./SearchBar"
import CurrentLocationButton from "./CurrentLocationButton"
import "./Header.scss"

function Header({ onSearch, onCurrentLocation, searchRef }) {

	return (

		<header className="header">
			<ThemeToggle />

			<SearchBar
				onSearch={onSearch}
				ref={searchRef}   

			/>

			<CurrentLocationButton
				onClick={onCurrentLocation}
			/>

		</header>

	);

}


export default Header
