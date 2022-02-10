import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [firebaseMovies, setFirebaseMovies] = useState([]);

	// I want to load all the movies when the web page first loads
	// we set the dependencies to empty [], so it will only run once
	useEffect(() => {
		fetchStarWarsMoviesHandler();
		fetchFirebaseMoviesHandler();
	}, []);

	// this is the function to get all the star wars movies from the API
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

	// this function gets all the movies from my own firebase
	const fetchFirebaseMoviesHandler = () => {
		setIsLoading(true);
		setError(null);
		// send a default GET request to get all the movies in my firebase, fetch returns a promise
		fetch(
			"https://react-movies-project-112ae-default-rtdb.firebaseio.com/movies.json"
		)
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
				const transformedFirebaseMovies = [];
				for (const id in data) {
					// transform the data to match the key name we use in Movie component
					transformedFirebaseMovies.push({
						id: id,
						title: data[id].title,
						releaseDate: data[id].releaseDate,
						openingText: data[id].openingText,
					});
				}

				setFirebaseMovies(transformedFirebaseMovies);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error.message);
			});
	};

	// send the data to firebase
	const addMovieHandler = async (firebaseMovie) => {
		const response = await fetch(
			"https://react-movies-project-112ae-default-rtdb.firebaseio.com/movies.json",
			{
				method: "POST",
				body: JSON.stringify(firebaseMovie),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();
		console.log(data);
	};

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchStarWarsMoviesHandler}>
					Fetch Star Wars Movies
				</button>
			</section>
			<section>
				<p>Star Wars Movies API</p>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
				{!isLoading && error && <p>{error}</p>}
				{isLoading && <p>Loading...</p>}
			</section>
			<section>
				<button onClick={fetchFirebaseMoviesHandler}>
					Fetch Firebase Movies
				</button>
			</section>
			<section>
				<p>My Firebase Movies</p>
				<p>{firebaseMovies.title}</p>
				{!isLoading && firebaseMovies.length > 0 && (
					<MoviesList movies={firebaseMovies} />
				)}
				{!isLoading && firebaseMovies.length === 0 && !error && (
					<p>No movies found.</p>
				)}
				{!isLoading && error && <p>{error}</p>}
				{isLoading && <p>Loading...</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
