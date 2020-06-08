"use strict"

window.onload = e => {
    let secondsHand = document.querySelector('.seconds');
    let hoursHand = document.querySelector('.hours');
    let minutesHand = document.querySelector('.minutes');

    let date = new Date();
    
    //pido la hora, minutos y segundos
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    //si se pasa de las 12, por ej 18hs
    if (hours > 12)
        hours -= 12;

    seconds = seconds * 6;
    minutes = minutes * (360 / 60);
    hours = (hours * (360/12)) + (minutes/12);

    rotateHands();

    //faltaría hacer if o algo para que no
    //se pase de 360°
    setInterval(() => {
        rotateHands();
    }, 1000);

    function rotateHands() {
        //a los segundos le sumo 6 grados porque
        //360° / 60s = 6
        secondsHand.style.rotate = (seconds+=6) +  'deg';
        //360° / 60s * 60s = 0.1
        minutesHand.style.rotate = (minutes+=0.1) + 'deg';
        //360° / 60s * 60s * 12h = 0.00833333...
        hoursHand.style.rotate = (hours+=0.0083) + 'deg';
    }
};