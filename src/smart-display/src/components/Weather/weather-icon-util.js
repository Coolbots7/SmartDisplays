import React from 'react';
import sun from './icons/weather/32.png';
import moon from './icons/weather/31.png';
import sun_cloud from './icons/weather/30.png';
import moon_cloud from './icons/weather/29.png';
import cloudy from './icons/weather/26.png';
import shower from './icons/weather/39.png';
import rain from './icons/weather/40.png';
import thunderstorm from './icons/weather/3.png';
import snow from './icons/weather/14.png';
import mist from './icons/weather/20.png';

function getIconFromWeatherCondition(weather_condition, night = false) {
    switch (weather_condition) {
        default:
        case 'clear sky':
            return night ? moon : sun;
        case 'few clouds':
            return night ? moon_cloud : sun_cloud;
        case 'scattered clouds':
        case 'broken clouds':
            return cloudy;
        case 'shower rain':
            return shower;
        case 'rain':
            return rain;
        case 'thunderstorm':
            return thunderstorm;
        case 'snow':
            return snow;
        case 'mist':
            return mist;
    }
}

export { getIconFromWeatherCondition };