const urlMovies = 'http://localhost:3000/movies';
const urlFavourites = 'http://localhost:3000/favourites';
let moviesList = [];
let favouriteMovies = [];

function displaymoviesList(moviesListData) {
	// DOM manipulation
	let mytable = document.getElementById('moviesList');
	let innerhtml = '';
	let result = '';
	moviesListData.forEach(function (movie) {
		result = result + '<li class="justify-content-between d-flex my-4">	<ul>'
		+ '	<li class="justify-content-between d-flex my-4">	<label>'
		+ movie.title + '	</label>	</li>'
		+ '	<li class="justify-content-between d-flex my-4">	<img src='
		+ movie.posterPath + ' alt="Image not available" class="square">	</li>'
		+ '	<li class="justify-content-between d-flex my-4">	<a href="#" onclick="addFavourite('
		+ movie.id + ')" class="btn btn-primary">Add to favourties</a>	</li>' + '	</ul>	</li>';
	});
	mytable.innerHTML = innerhtml + result;
}

function displayFavouriteMovies(favouriteMoviesData) {
	// DOM manipulation
	let mytable = document.getElementById('favouritesList');
	let innerhtml = '';
	let result = '';
	favouriteMoviesData.forEach(function (movie) {
		result = result + '<li class="justify-content-between d-flex my-4">	<ul>'
		+ '	<li class="justify-content-between d-flex my-4">	<label>'
		+ movie.title + '	</label>	</li>'
		+ '	<li class="justify-content-between d-flex my-4">	<img src='
		+ movie.posterPath + ' alt="Image not available" class="square">	</li>'
		+ '	<li class="justify-content-between d-flex my-4">	<a href="#" onclick="removeFavourite('
		+ movie.id + ')" class="btn btn-primary">Remove from favourties</a>	</li>'
		+ '	</ul>	</li>';
	});
	mytable.innerHTML = innerhtml + result;
}

function getMovies() {
	// axios.get(url);
	let responseResult = '';
	return fetch(urlMovies, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).
	then((response) => {
		if (response.status === 200) {
			responseResult = response.json();
		} else {
			responseResult = Promise.reject('Error');
		}
		return responseResult;
	}).then((data) => {
		// console.log(data);
		moviesList = data;
		displaymoviesList(moviesList);
		return data;
	}).catch((err) => {
		// console.log(err);
		// throw(err);
		return err;
	});
}

function getFavourites() {
	// axios.get(url);
	let responseResult = '';
	return fetch(urlFavourites, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).
	then((response) => {
		if (response.status === 200) {
			responseResult = response.json();
		} else {
			responseResult = Promise.reject('Error');
		}
		return responseResult;
	}).then((data) => {
		// console.log(data);
		favouriteMovies = data;
		// console.log(mytable);
		displayFavouriteMovies(favouriteMovies);
		return data;
	}).catch((err) => {
		// console.log(err);
		// throw(err);
		return err;
	});
}

function addFavourite(movieId) {
	let movieData = moviesList.find(movie => {
		if (movie.id === movieId) {
			return movie;
		}
		return null;
	});
	let favExists = favouriteMovies.find(favMovie => {
		if (favMovie.id === movieData.id) {
			return favMovie;
		}
		return null;
	});
	if (favExists) {
		// alert('Movie is already added to favourites');
		return Promise.reject(new Error('Movie is already added to favourites'));
	}
	return fetch(urlFavourites, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movieData)
	}).then((data) => {
		if (data.ok) {
			return data.json();
		}
		return Promise.reject('Error');
	}).then(addedMovie => {
		favouriteMovies.push(addedMovie);
		displayFavouriteMovies(favouriteMovies);
		return favouriteMovies;
	}).catch((err) => {
		return err;
	});
}

function removeFavourite(id) {
	// axios.get(url);
	let responseResult = '';
	let movieName = moviesList.find(movie => {
		if (movie.id === id) {
			return movie;
		}
		return null;
	});
	let favExists = favouriteMovies.find(favMovie => {
		if (favMovie.id === movieName.id) {
			return favMovie;
		}
		return null;
	});
	if (favExists) {
		let removeFavouriteUrl = urlFavourites + '/' + id;
		return fetch(removeFavouriteUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(movieName)
		}).
		then((response) => {
			if (response.status === 200) {
				responseResult = response.json();
			} else {
				responseResult = Promise.reject('Error');
			}
			return responseResult;
		}).then((data) => {
			if (data.ok) {
				return data.json();
			}
			return Promise.reject('Error');
		}).then(removedMovie => {
			favouriteMovies = favouriteMovies.filter(arr => arr.id !== id);
			displayFavouriteMovies(removedMovie);
			return removedMovie;
		}).catch((err) => {
			// console.log(err);
			// throw(err);
			return err;
		});
	}
	// console.log('Movie is not there in favourites');
	// alert('Movie is not there in favourites');
	return Promise.reject(new Error('Movie is not there in favourites'));
}
module.exports = {
	getMovies,
	getFavourites,
	addFavourite,
	removeFavourite
};
// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
/*
function displaymoviesListActual(moviesListData) {
	// DOM manipulation
	let mytable = document.getElementById('moviesList');
	let innerhtml = '';
	let result = '';
	moviesListData.forEach(function(movie) {
		result = result + '<li class="justify-content-between d-flex my-4">'
		+ movie.title + '	<img src='+movie.posterPath+'>	<a href="#" onclick="addFavourite('
		+ movie.id + ')" class="btn btn-primary">Add to favourties</a>	</li>';
	});
	mytable.innerHTML = innerhtml + result;
}

function displayFavouriteMoviesActual(favouriteMoviesData) {
	// DOM manipulation
	let mytable = document.getElementById('favouritesList');
	let innerhtml = '';
	let result = '';
	favouriteMoviesData.forEach(function(movie) {
		result = result + '<li class="justify-content-between d-flex my-4">'
		+ movie.title + '	<img src='+movie.posterPath+'>	<a href="#" onclick="removeFavourite('
		+ movie.id + ')" class="btn btn-primary">Remove From favourites</a>	</li>';
	});
	mytable.innerHTML = innerhtml + result;
}
*/
