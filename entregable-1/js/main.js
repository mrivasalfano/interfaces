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
let originalData;
const filtros = document.querySelectorAll('.filtro');
const filtrosContainer = document.querySelector('.filtros');
const download = document.querySelector('#btnDownload');
const descartar = document.querySelector('#btnDescartar');
let anchoLineas = 3;
let tieneFiltro = false;
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
    habilitarDownload(false);
    habilitarFiltros(false);
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
    if (type == 'original')
        reset();
    else {
        if (type == 'brillo')
            brillo();
        else if (type == 'negativo')
            negativo();
        else if (type == 'grises')
            grises();
        else if (type == 'binarizacion')
            binarizacion();
        else if (type == 'blur')
            blur();
        else if (type == 'sobel')
            sobel();
        else
            saturacion();

        habilitarDownload(true);
    }

}

function saturacion() {
    let imgData = new ImageData(canvasWidth, canvasHeight);

    for (let x=0; x<canvasWidth; x++) {
        for (let y=0; y<canvasHeight; y++) {
            let r = getRed(originalData, x, y);
            let g = getGreen(originalData, x, y);
            let b = getBlue(originalData, x, y);
            let hsl = RGBtoHSL(r, g, b);
            hsl[1] = hsl[1] + 0.2;
            let rgb = HSLtoRGB(hsl[0], hsl[1], hsl[2]);

            setPixel(imgData, x, y, rgb[0], rgb[1], rgb[2], 255);
        }
    }

    context.putImageData(imgData, 0, 0);
}

function RGBtoHSL(r, g, b) {
r /= 255, g /= 255, b /= 255;

var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, l = (max + min) / 2;

if (max == min) {
    h = s = 0; // achromatic
} else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
}

return [ h, s, l ];
}
  
function HSLtoRGB(h, s, l) {
var r, g, b;

if (s == 0) {
    r = g = b = l; // achromatic
} else {
    function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
}

return [ r * 255, g * 255, b * 255 ];
}

function sobel() {
    let imgData = new ImageData(canvasWidth, canvasHeight);

    let sobel_x = [1,0,-1];

    let sobel_y = [1,2,1];

    let w = 0;

    for (let j = 0, i = w + 4; i < originalData.length; i+=4, j++){
        let sobelX = getSobelX(i, w, sobel_x);
        let sobelY = getSobelY(i, w, sobel_y);
        let val = Math.abs(sobelX) + Math.abs(sobelY);
        imgData[j] = val;
    }

    context.putImageData(imgData, 0, 0);
}


function getSobelX(index, w, sobel){
	return (sobel[0]*originalData[index - w - 4] + sobel[1]*originalData[index - 4] + sobel[2]*originalData[index + w - 4]
			-sobel[0]*originalData[index - w + 4] - sobel[1]*originalData[index + 4] - sobel[2]*originalData[index + 4 + 4]);
}

function getSobelY(index, w, sobel){
	return (sobel[0]*originalData[index - w - 4] + sobel[1]*originalData[index - w] + sobel[2]*originalData[index - w + 4]
			-(sobel[0]*originalData[index + w - 4] + sobel[1]*originalData[index + w] + sobel[2]*originalData[index + w + 4]));
}

function blur() {
    let imgData = new ImageData(canvasWidth, canvasHeight);

    let matriz = [
        [1/9,1/9,1/9],
        [1/9,1/9,1/9],
        [1/9,1/9,1/9]
    ];


    // let matriz = [
    //     [0, -1,  0],
    //     [-1,  5, -1],
    //     [0, -1,  0] 
    // ];

    for (let x=1; x<canvasWidth-1; x++) {
        for (let y=1; y<canvasHeight-1; y++) {
            promedioMatriz(imgData, x, y, matriz);
        }
    }

    context.putImageData(imgData, 0, 0);
}

function promedioMatriz(imgData, x, y, matriz) {
    let r = Math.floor(getRed(originalData, x-1, y-1) * matriz[0][0] + getRed(originalData, x, y-1) * matriz[0][1] + getRed(originalData, x+1, y-1) * matriz[0][2]
                     + getRed(originalData, x-1, y) * matriz[1][0] + getRed(originalData, x, y) * matriz[1][1] + getRed(originalData, x+1, y) * matriz[1][2]
                     + getRed(originalData, x-1, y+1) * matriz[2][0] + getRed(originalData, x, y+1) * matriz[2][1] + getRed(originalData, x+1, y+1) * matriz[2][2]);
    
    let g = Math.floor(getGreen(originalData, x-1, y-1) * matriz[0][0] + getGreen(originalData, x, y-1) * matriz[0][1] + getGreen(originalData, x+1, y-1) * matriz[0][2]
                     + getGreen(originalData, x-1, y) * matriz[1][0] + getGreen(originalData, x, y) * matriz[1][1] + getGreen(originalData, x+1, y) * matriz[1][2]
                     + getGreen(originalData, x-1, y+1) * matriz[2][0] + getGreen(originalData, x, y+1) * matriz[2][1] + getGreen(originalData, x+1, y+1) * matriz[2][2]);

    let b = Math.floor(getBlue(originalData, x-1, y-1) * matriz[0][0] + getBlue(originalData, x, y-1) * matriz[0][1] + getBlue(originalData, x+1, y-1) * matriz[0][2]
                     + getBlue(originalData, x-1, y) * matriz[1][0] + getBlue(originalData, x, y) * matriz[1][1] + getBlue(originalData, x+1, y) * matriz[1][2]
                     + getBlue(originalData, x-1, y+1) * matriz[2][0] + getBlue(originalData, x, y+1) * matriz[2][1] + getBlue(originalData, x+1, y+1) * matriz[2][2]);

    setPixel(imgData, x, y, r, g, b, 255);
}

function brillo() {
    let imgData = context.getImageData(0, 0, canvasWidth, canvasHeight);

    let r = 0;
    let g = 0;
    let b = 0;

    for (let x=0; x<canvasWidth; x++) {
        for (let y=0; y<canvasHeight; y++) {
            r = subirBrillo(getRed(imgData, x, y));
            g = subirBrillo(getGreen(imgData, x, y));
            b = subirBrillo(getBlue(imgData, x, y));

            setPixel(imgData, x, y, r, g, b, 255);
        }
    }
    
    context.putImageData(imgData, 0, 0);
}

function negativo() {
    let imgData = new ImageData(canvasWidth, canvasHeight);

    let r = 0;
    let g = 0;
    let b = 0;

    for (let x=0; x<canvasWidth; x++) {
        for (let y=0; y<canvasHeight; y++) {
            r = 255 - getRed(originalData, x, y);
            g = 255 - getGreen(originalData, x, y);
            b = 255 - getBlue(originalData, x, y);

            setPixel(imgData, x, y, r, g, b, 255);
        }
    }
    
    context.putImageData(imgData, 0, 0);
}

function binarizacion() {
    let imgData = new ImageData(canvasWidth, canvasHeight);

    for (let x=0; x<canvasWidth; x++) {
        for (let y=0; y<canvasHeight; y++) {
            let promedio = (getRed(originalData, x, y) + getGreen(originalData, x, y) + getBlue(originalData, x, y)) / 3;

            if (promedio > 127)
                promedio = 255;
            else
                promedio = 0;

            setPixel(imgData, x, y, promedio, promedio, promedio, 255);
        }
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
    context.putImageData(originalData, 0, 0);
    habilitarDownload(false);
    tieneFiltro = false;
}

function habilitarDownload(habilitar) {
    if (habilitar) {
        download.classList.remove('hide');
        download.classList.add('show');
    }
    else {
        download.classList.remove('show');
        download.classList.add('hide');
    }
}

function grises() {
    let imgData = new ImageData(canvasWidth, canvasHeight);

    for (let x=0; x<canvasWidth; x++) {
        for (let y=0; y<canvasHeight; y++) {
            let promedio = (getRed(originalData, x, y) + getGreen(originalData, x, y) + getBlue(originalData, x, y)) / 3;
            setPixel(imgData, x, y, promedio, promedio, promedio, 255);
        }
    }
    
    context.putImageData(imgData, 0, 0);
}

canvas.addEventListener('wheel', e => {
    if (lapizSelected || gomaSelected) {
        if (e.deltaY > 0)
            anchoLineas += 1;
        else {
            if (anchoLineas > 3)
                anchoLineas -= 1;
        }
    }
});

//input de subir imagen
userImg.addEventListener('change', (e) => {
	if (e.target.value != null) {
        mostrarImagen(e);
        habilitarFiltros(true);
        //muestro el botón descartar
        descartar.classList.remove('hide');
        descartar.classList.add('show');
	}
});

function habilitarFiltros(habilitar) {
    if (habilitar) {
        filtrosContainer.classList.remove('hide');
        filtrosContainer.classList.add('show');
    }
    else {
        filtrosContainer.classList.remove('show');
        filtrosContainer.classList.add('hide');
    }
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
    	originalData = context.getImageData(0, 0, img.width, img.height);
    	context.putImageData(originalData, 0, 0);
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
    context.lineWidth = anchoLineas;

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

function setPixel(imgData, x, y, r, g, b, a) {
    let index = (x + y * imgData.width) * 4;
    imgData.data[index] = r;
    imgData.data[index + 1] = g;
    imgData.data[index + 2] = b;
    imgData.data[index + 3] = a;
}

function getRed(imgData, x, y) {
    let index = (x + y * imgData.width) * 4;
    return imgData.data[index];
}

function getGreen(imgData, x, y) {
    let index = (x + y * imgData.width) * 4;
    return imgData.data[index+1];
}

function getBlue(imgData, x, y) {
    let index = (x + y * imgData.width) * 4;
    return imgData.data[index+2];
}