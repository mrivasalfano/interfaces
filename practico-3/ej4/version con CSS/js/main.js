"use strict"

window.onload = e => {
    let secondsHand = document.querySelector('.seconds');
    let hoursHand = document.querySelector('.hours');
    let minutesHand = document.querySelector('.minutes');

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes() * (360 / 60);
    let seconds = date.getSeconds() * 6;
    
    if (hours > 12)
        hours -=12;

    hours = (hours * (360 / 12)) + (minutes/12);
        
    secondsHand.style.rotate = seconds +  'deg';
    minutesHand.style.rotate = minutes + 'deg';
    hoursHand.style.rotate = hours  + 'deg';
};