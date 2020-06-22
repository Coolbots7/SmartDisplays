import { getItem } from "./openhab-client";

//Current
function getCurrentTemperature() {
    return getItem("LocalWeatherAndForecast_Current_OutdoorTemperature");
}

function getCurrentWindSpeed() {
    return getItem("LocalWeatherAndForecast_Current_WindSpeed");
}

function getCurrentRain() {
    return getItem("LocalWeatherAndForecast_Current_Rain");
}

function getCurrentWeatherCondition() {
    return getItem("LocalWeatherAndForecast_Current_WeatherCondition");
}

function getMoonPhase() {
    return getItem("LocalMoon_Phase_MoonPhaseName");
}

//Today
function getTodayMaximumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours03_MaximumTemperature");
}

function getTodayMinimumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours03_MinimumTemperature");
}

function getTodayWeatherCondition() {
    return getItem("LocalWeatherAndForecast_ForecastHours03_ForecastedWeatherCondition");
}

//Tomorrow (24)
function getTomorrowMaximumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours24_MaximumTemperature");
}

function getTomorrowMinimumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours24_MinimumTemperature");
}

function getTomorrowWeatherCondition() {
    return getItem("LocalWeatherAndForecast_ForecastHours24_ForecastedWeatherCondition");
}

//Day 3 (48)
function getDay3MaximumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours48_MaximumTemperature");
}

function getDay3MinimumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours48_MinimumTemperature");
}

function getDay3WeatherCondition() {
    return getItem("LocalWeatherAndForecast_ForecastHours48_ForecastedWeatherCondition");
}

//Day 4 (72)
function getDay4MaximumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours72_MaximumTemperature");
}

function getDay4MinimumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours72_MinimumTemperature");
}

function getDay4WeatherCondition() {
    return getItem("LocalWeatherAndForecast_ForecastHours72_ForecastedWeatherCondition");
}

//Day 5 (96)
function getDay5MaximumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours96_MaximumTemperature");
}

function getDay5MinimumTemperature() {
    return getItem("LocalWeatherAndForecast_ForecastHours96_MinimumTemperature");
}

function getDay5WeatherCondition() {
    return getItem("LocalWeatherAndForecast_ForecastHours96_ForecastedWeatherCondition");
}

export {
    getCurrentTemperature, getCurrentWindSpeed, getCurrentRain, getCurrentWeatherCondition,
    getMoonPhase,
    getTodayMaximumTemperature, getTodayMinimumTemperature, getTodayWeatherCondition,
    getTomorrowMaximumTemperature, getTomorrowMinimumTemperature, getTomorrowWeatherCondition,
    getDay3MaximumTemperature, getDay3MinimumTemperature, getDay3WeatherCondition,
    getDay4MaximumTemperature, getDay4MinimumTemperature, getDay4WeatherCondition,
    getDay5MaximumTemperature, getDay5MinimumTemperature, getDay5WeatherCondition
};