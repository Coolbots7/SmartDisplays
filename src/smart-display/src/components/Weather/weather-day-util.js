import {
    getTodayMaximumTemperature, getTodayMinimumTemperature, getTodayWeatherCondition,
    getTomorrowWeatherCondition, getTomorrowMinimumTemperature, getTomorrowMaximumTemperature,
    getDay3MaximumTemperature, getDay3MinimumTemperature, getDay3WeatherCondition,
    getDay4MaximumTemperature, getDay4MinimumTemperature, getDay4WeatherCondition,
    getDay5MaximumTemperature, getDay5MinimumTemperature, getDay5WeatherCondition
} from '../../utils/weather-client';

function getDayMaximumTemperature(idx) {
    if (idx === 0) {
        return getTodayMaximumTemperature();
    }
    else if (idx === 1) {
        return getTomorrowMaximumTemperature();
    }
    else if (idx === 2) {
        return getDay3MaximumTemperature();
    }
    else if (idx === 3) {
        return getDay4MaximumTemperature();
    }
    else if (idx === 4) {
        return getDay5MaximumTemperature();
    }
    else {
        return getTodayMaximumTemperature();
    }
}

function getDayMinimumTemperature(idx) {
    if (idx === 0) {
        return getTodayMinimumTemperature();
    }
    else if (idx === 1) {
        return getTomorrowMinimumTemperature();
    }
    else if (idx === 2) {
        return getDay3MinimumTemperature();
    }
    else if (idx === 3) {
        return getDay4MinimumTemperature();
    }
    else if (idx === 4) {
        return getDay5MinimumTemperature();
    }
    else {
        return getTodayMinimumTemperature();
    }
}

function getDayWeatherCondition(idx) {
    if (idx === 0) {
        return getTodayWeatherCondition();
    }
    else if (idx === 1) {
        return getTomorrowWeatherCondition();
    }
    else if (idx === 2) {
        return getDay3WeatherCondition();
    }
    else if (idx === 3) {
        return getDay4WeatherCondition();
    }
    else if (idx === 4) {
        return getDay5WeatherCondition();
    }
    else {
        return getTodayWeatherCondition();
    }
}

export { getDayMaximumTemperature, getDayMinimumTemperature, getDayWeatherCondition };