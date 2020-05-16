"use strict"

//constantes de los elementos del DOM
const btnLapiz = document.querySelector('#btnLapiz');
const btnGoma = document.querySelector('#btnGoma');
const canvas = document.querySelector('#imgContainer');
const context = canvas.getContext('2d');
const btnReset = document.querySelector('#btnReset');
let userImg = document.querySelector('#userImg');
let originalImg;
const filtros = document.querySelectorAll('.filtro');

//variables de control
let lapizSelected = false;
let gomaSelected = false;
let dibujo = false;
let tieneLinea = false;
let xInicio;
let yInicio;
let borro = false;

filtros.forEach(filtro => {
	filtro.addEventListener('click', (e) => {
		aplicarFiltro(filtro.getAttribute('data-type'));
	});
});

function aplicarFiltro(type) {
	if (type == 'brillo')
		brillo();
	else if (type == 'negativo')
		negativo();
	else if (type == 'grises')
		grises();
	else
		binarizacion();
}

function grises() {
	
}

//input de subir imagen
userImg.addEventListener('change', (e) => {
	if (e.target.value != null) {
		mostrarImagen(e);
	}
});

//guardo la imagen del usuario
//y la muestro en el canvas
function mostrarImagen(e) {
	let reader = new FileReader();
    let img = new Image();

    reader.onload = function(){
      let dataURL = reader.result;
      img.src = dataURL;
    };

    reader.readAsDataURL(e.target.files[0]);

    img.onload = function() {
    	context.drawImage(img, 0, 0, canvas.width, canvas.height);
    	originalImg = context.getImageData(0, 0, img.width, img.height);
    	context.putImageData(originalImg, 0, 0);
    }
}

//listener de los botones
//los cuales cambian el ícono del cursor
//y setean las variables de control
btnLapiz.addEventListener('click', (e) => {
	activarLapiz();
});

btnGoma.addEventListener('click', (e) => {
	activarGoma();
});

//el botón reset vuelve al cursor original
//y setea en false los otros
btnReset.addEventListener('click', (e) => {
	document.body.classList.remove('lapiz');
	document.body.classList.remove('goma');
	lapizSelected = false;
	gomaSelected = false;
});

function activarLapiz() {
	lapizSelected = !lapizSelected;

	if (gomaSelected)
		gomaSelected = false;

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
	lapizSelected = false;

	if (gomaSelected) {
		document.body.classList.add('goma');
		document.body.classList.remove('lapiz');
	}
	else {
		document.body.classList.remove('goma');
	}
}

//cuando el usuario mantiene el click en el canvas
//si tiene el lápiz o goma, pongo una variable en true
//para saber que está haciendo dicha acción
canvas.addEventListener('mousedown', (e) => {
	if (lapizSelected) {
		dibujo = true;
	}
	else if (gomaSelected) {
		borro = true;
	}
});

//cuando el usuario suelta el click, pongo en
//false las variables de accion
canvas.addEventListener('mouseup', (e) => {
	dibujo = false;
	borro = false;
	tieneLinea = false;
});

//cuando el usuario mueve el mouse por el canvas
//si la variable dibujo o borro están en true
//hago la acción correspondiente
canvas.addEventListener('mousemove', (e) => {
	if (dibujo) {
		if (!tieneLinea) {
			iniciarLinea(e);
		}
		else if (xInicio != e.offsetX || yInicio != e.offsetY) {
			context.lineWidth = 4;
			context.lineTo(e.offsetX, e.offsetY);
			context.globalCompositeOperation = 'source-over';
			context.stroke();
		}
	}
	else if (borro) {
		if (!tieneLinea) {
			iniciarLinea(e);
		}
		else if (xInicio != e.offsetX || yInicio != e.offsetY) {
			context.lineTo(e.offsetX, e.offsetY);
			context.globalCompositeOperation = 'destination-out';
			context.strokeStyle = 'rgba(0,0,0,1)';
			context.stroke();
		}
	}
});

//inicia la linea en el punto
//donde esté parado el mouse
function iniciarLinea(e) {
	tieneLinea = true;
	xInicio = e.offsetX;
	yInicio = e.offsetY;
	context.beginPath();
	context.moveTo(xInicio, yInicio);
}