import { useState, forwardRef } from "react";
import SearchIcon from "../icons/SearchIcon";
import "./SearchBar.scss";


// forwardRef allows parent component to access input DOM element
const SearchBar = forwardRef(function SearchBar({ onSearch }, ref) {


	// State for storing input value (city name)
	const [city, setCity] = useState("");



	// Handles form submission
	const handleSubmit = (e) => {

		// Prevents page reload
		e.preventDefault();


		// Removes whitespace from beginning and end
		const trimmed = city.trim();


		// Prevents empty search
		if (!trimmed) return;


		// Sends city to parent component
		onSearch(trimmed);


		// Clears input after search
		setCity("");

	};



	return (

		// Form wrapper for search input
		<form className="search-wrapper" onSubmit={handleSubmit}>


			{/* Search icon component */}
			<SearchIcon />


			<input

				id="search-input"

				// Ref allows parent to control focus
				ref={ref}

				type="text"

				placeholder="Search for your preferred city..."

				// Controlled input value
				value={city}

				// Updates state when user types
				onChange={(e) => setCity(e.target.value)}

			/>

		</form>

	);

});

export default SearchBar;
