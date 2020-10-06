import { getItem } from "./openhab-client";

function getMoonPhase() {
    return getItem("LocalMoon_Phase_MoonPhaseName");
}

function getOpenWeatherMapData(lat, lon, units) {
    return window.fetch(`/api/openweathermap/onecall?exclude=minutely&lang=en&units=${units}&lat=${lat}&lon=${lon}`).then((response) => {
        return response.json();
    })
        .catch((error) => {
            return null;
        });
}

export {
    getMoonPhase,
    getOpenWeatherMapData
};