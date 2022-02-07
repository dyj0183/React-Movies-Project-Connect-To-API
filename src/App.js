import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

  // I want to load all the movies when the web page first loads
  // we set the dependencies to empty [], so it will only run once
  useEffect(() => {
    fetchStarWarsMoviesHandler();
  }, []);

	const fetchStarWarsMoviesHandler = () => {
		setIsLoading(true);
		setError(null);
		// send a default GET request to get all the Star Wars Movies, fetch returns a promise
		fetch("https://swapi.dev/api/films")
			.then((response) => {
				// handle the error
				if (!response.ok) {
					throw new Error(
						"Something went wrong. Please contact test@gmail.com"
					);
				}

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
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error.message);
			});
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchStarWarsMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
				{!isLoading && error && <p>{error}</p>}
				{isLoading && <p>Loading...</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
