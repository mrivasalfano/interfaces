"use strict"

document.addEventListener('DOMContentLoaded', e => {
    let secondsHand = document.querySelector('.seconds');
    let hoursHand = document.querySelector('.hours');
    let minutesHand = document.querySelector('.minutes');

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes() * 6;
    let seconds = date.getSeconds() * 6;
    
    secondsHand.style.rotate = (seconds) +  'deg';
    minutesHand.style.rotate = (minutes) + 'deg';
    hoursHand.style.rotate = (hours) + 'deg';
});