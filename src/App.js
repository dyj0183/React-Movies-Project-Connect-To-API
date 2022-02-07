import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);

	const fetchStarWarsMoviesHandler = () => {
		// send a default GET request to get all the Star Wars Movies, fetch returns a promise
		fetch("https://swapi.dev/api/films")
			.then((response) => {
				// transform json data to js object, this also returns a promise, so we need to return it and use another "then()"
				return response.json();
			})
			.then((data) => {
				// transform the data to match the key name we use in Movie component
				const transformedMovies = data.results.map((result) => {
					return {
						id: result.episode_id,
						title: result.title,
						releaseDate: result.release_date,
						openingText: result.opening_crawl,
					};
				});

				setMovies(transformedMovies);
			});
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchStarWarsMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				<MoviesList movies={movies} />
			</section>
		</React.Fragment>
	);
}

export default App;
