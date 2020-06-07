"use strict"

document.addEventListener('DOMContentLoaded', e => {
    let secondsHand = document.querySelector('.seconds');
    let hoursHand = document.querySelector('.hours');
    let minutesHand = document.querySelector('.minutes');

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes() * 6;
    let seconds = date.getSeconds() * 6;
    
    
    setInterval(() => {
        secondsHand.style.rotate = (seconds+=6) +  'deg';
        minutesHand.style.rotate = (minutes+=0.1) + 'deg';
        hoursHand.style.rotate = (hours+=0.0016) + 'deg';
    }, 1000);
});