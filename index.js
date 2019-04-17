const clockContainer = document.querySelector(".js_clock"),
	clockTitle = clockContainer.querySelector(".js_title");

const form = document.querySelector(".js_form"),
	input = form.querySelector("input"),
	greeting = document.querySelector(".greeting");

const USER_LS = "currentUser",
	SHOW_CH = "showing";

function getTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function saveName(text) {
	localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
	e.preventDefault();
	const currentValue = input.value;
	console.log(currentValue);
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askName() {
	form.classList.add(SHOW_CH);
	form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
	form.classList.remove(SHOW_CH);
	greeting.classList.add(SHOW_CH);
	greeting.innerHTML = `hello ${text}`;
}

function loadName() {
	const currentUser = localStorage.getItem(USER_LS);
	if (currentUser === null) {
		askName();
	} else {
		paintGreeting(currentUser);
	}
}

function init() {
	setInterval(getTime, 1000);
	loadName();
}

init();