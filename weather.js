const weather = document.querySelector('.js_weather');

const COORDS = "coords";
const API_KEY = "9cb8931f06a1292ff3b7e4e9556b275c";

function getWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
		.then(function (response) {
			// console.log(response.json);
			return response.json()
		})
		.then(function (json) {
			console.log(json);
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} / ${place}`;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSucces(position) {
	// console.log(position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	}
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handelGeoError() {
	console.log('succes error');
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handelGeoSucces, handelGeoError)
}

function loadCoords() {
	const loadCoords = localStorage.getItem(COORDS);
	if (loadCoords === null) {
		askForCoords();
	} else {
		const parseCooeds = JSON.parse(loadCoords);
		console.log(parseCooeds);
		getWeather(parseCooeds.latitude, parseCooeds.longitude);
	}
}

function init() {
	loadCoords();
}

init();