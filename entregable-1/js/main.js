"use strict"

//constantes de los elementos del DOM
const btnLapiz = document.querySelector('#btnLapiz');
const btnGoma = document.querySelector('#btnGoma');
const canvas = document.querySelector('#imgContainer');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const context = canvas.getContext('2d');
const btnReset = document.querySelector('#btnReset');
let userImg = document.querySelector('#userImg');
let originalImg;
const filtros = document.querySelectorAll('.filtro');
const filtroContainer = document.querySelector('.filtros');
const download = document.querySelector('#btnDownload');
const descartar = document.querySelector('#btnDescartar');
//guardo el contexto default
const canvasOriginal = context.getImageData(0, 0, canvasWidth, canvasHeight);


download.addEventListener('click', e => {
    let link = document.createElement('a');
    link.download = 'imagenEditada.png';
    link.href = canvas.toDataURL()
    link.click();
});

descartar.addEventListener('click', e => {
    context.putImageData(canvasOriginal, 0, 0);
    userImg.value = '';
    descartar.classList.remove('show');
    descartar.classList.add('hide');
    download.classList.remove('show');
    download.classList.add('hide');
});

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
    let imgData = context.getImageData(0, 0, canvasWidth, canvasHeight);

	if (type == 'brillo')
		brillo(imgData);
	else if (type == 'negativo')
		negativo(imgData);
	else if (type == 'grises')
		grises(imgData);
	else if (type == 'binarizacion')
        binarizacion(imgData);
    else
        reset();
    
    //si se aplica un filtro muestro los
    //botones descargar
    download.classList.remove('hide');
    download.classList.add('show');
}

function brillo(imgData) {
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i=0; i<imgData.data.length; i+=4) {
        r = subirBrillo(imgData.data[i]);
        g = subirBrillo(imgData.data[i+1]);
        b = subirBrillo(imgData.data[i+2]);

        setPixel(imgData, i, r, g, b, 255);
    }
    
    context.putImageData(imgData, 0, 0);
}

function negativo(imgData) {
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i=0; i<imgData.data.length; i+=4) {
        r = 255 - imgData.data[i];
        g = 255 - imgData.data[i+1];
        b = 255 - imgData.data[i+2];

        setPixel(imgData, i, r, g, b, 255);
    }
    
    context.putImageData(imgData, 0, 0);
}

function binarizacion(imgData) {
    for (let i=0; i<imgData.data.length; i+=4) {
        let promedio = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;

        if (promedio > 127)
            promedio = 255;
        else
            promedio = 0;

        setPixel(imgData, i, promedio, promedio, promedio, 255);
    }
    
    context.putImageData(imgData, 0, 0);
}

function subirBrillo(valor) {
    let brillo = 20;
    valor += brillo;

    if (valor > 255)
        return 255;
    else
        return valor + brillo;
}

function reset() {
    context.putImageData(originalImg, 0, 0);
}

function grises(imgData) {
    for (let i=0; i<imgData.data.length; i+=4) {
        let promedio = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;
        setPixel(imgData, i, promedio, promedio, promedio, 255);
    }
    
    context.putImageData(imgData, 0, 0);
}

//input de subir imagen
userImg.addEventListener('change', (e) => {
	if (e.target.value != null) {
        mostrarImagen(e);
        habilitarFiltros();
        //muestro el botón descartar
        descartar.classList.remove('hide');
        descartar.classList.add('show');
	}
});

function habilitarFiltros() {
    if (filtroContainer.classList.contains('hide'))
        filtroContainer.classList.add('show');
}

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
    	context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
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
        context.globalCompositeOperation = 'source-over'; //lo hago acá para no repetirlo en el mousemove
	}
	else if (gomaSelected) {
		borro = true;
        context.globalCompositeOperation = 'destination-out'; //lo hago acá para no repetirlo en el mousemove
        context.strokeStyle = 'rgba(0,0,0,1)'; //lo hago acá para no repetirlo en el mousemove
	}
});

//cuando el usuario suelta el click, pongo en
//false las variables de accion
canvas.addEventListener('mouseup', (e) => {
	dibujo = false;
    borro = false;
    tieneLinea = false;
    context.globalCompositeOperation = 'source-over'; // si borra y queda en 'destination-uot' no puedo subir imagen
});

//cuando el usuario mueve el mouse por el canvas
//si la variable dibujo o borro están en true
//hago la acción correspondiente
canvas.addEventListener('mousemove', (e) => {
    if (dibujo || borro) {
        if (!tieneLinea) 
            iniciarLinea(e);
        else if (xInicio != e.offsetX || yInicio != e.offsetY) 
            cerrarLinea(e);
    }
});

//cierra la linea
//entre el moveTo y lineTo
function cerrarLinea(e) {
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
}

//inicia la linea en el punto
//donde esté parado el mouse
function iniciarLinea(e) {
	tieneLinea = true;
	xInicio = e.offsetX;
	yInicio = e.offsetY;
	context.beginPath();
	context.moveTo(xInicio, yInicio);
}

function setPixel(imgData, index, r, g, b, a) {
    imgData.data[index] = r;
    imgData.data[index + 1] = g;
    imgData.data[index + 2] = b;
    imgData.data[index + 3] = a;
}