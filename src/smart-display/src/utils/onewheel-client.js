import { getItem } from "./openhab-client";

function getConnected() {
    return getItem('OneWheel_Connected');
}

function getCharging() {
    return getItem('OneWheel_Charging')
}

function getBatteryRemaining() {
    return getItem('OneWheel_Battery_Remaining');
}

function getLifetimeOdometer() {
    return getItem('OneWheel_Lifetime_Odometer');
}

export { getConnected, getCharging, getBatteryRemaining, getLifetimeOdometer };