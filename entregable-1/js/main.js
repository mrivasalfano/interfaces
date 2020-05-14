"use strict"

const btnLapiz = document.querySelector('#btnLapiz');
const btnGoma = document.querySelector('#btnGoma');
let lapizSelected = false;
let gomaSelected = false;

btnLapiz.addEventListener('click', (e) => {
	activarLapiz();
});

btnGoma.addEventListener('click', (e) => {
	activarGoma();
});

function activarLapiz() {
	lapizSelected = !lapizSelected;

	if (gomaSelected)
		gomaSelected = !gomaSelected;

	if (lapizSelected) {
		document.body.classList.add('lapiz');
		document.body.classList.remove('goma');
	}
	else {
		document.body.classList.remove('lapiz');
	}
}

function activarGoma() {
	gomaSelected = !gomaSelected;

		if (lapizSelected)
		lapizSelected = !lapizSelected;

	if (gomaSelected) {
		document.body.classList.add('goma');
		document.body.classList.remove('lapiz');
	}
	else {
		document.body.classList.remove('goma');
	}
}