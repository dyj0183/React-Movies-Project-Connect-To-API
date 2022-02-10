import React, { useRef } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
	const titleRef = useRef("");
	const openingTextRef = useRef("");
	const releaseDateRef = useRef("");

	function submitHandler(event) {
		event.preventDefault();

		// could add validation here...

		const movie = {
			title: titleRef.current.value,
			openingText: openingTextRef.current.value,
			releaseDate: releaseDateRef.current.value,
		};

		props.onAddMovie(movie);

		// clean up the fields after users submit the form
		// should use React to control the DOM, instead of doing it like this to change the value, but it is okay to do here
		titleRef.current.value = "";
		openingTextRef.current.value = "";
		releaseDateRef.current.value = "";
	}

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" ref={titleRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="opening-text">Opening Text</label>
				<textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
			</div>
			<div className={classes.control}>
				<label htmlFor="date">Release Date</label>
				<input type="text" id="date" ref={releaseDateRef} />
			</div>
			<button>Add Movie to My Firebase</button>
		</form>
	);
}

export default AddMovie;
