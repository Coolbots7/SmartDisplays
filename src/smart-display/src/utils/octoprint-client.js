import { getItem } from "./openhab-client";

function getPrinterState() {
    return getItem("Ender3OctoPrintServerBinding_PrinterChannels_PrinterState");
}

function getStreamUrl() {
    return getItem("Ender3OctoPrintServerBinding_SettingChannels_StreamUrl");
}


function getExtruderTemperature() {
    return getItem("Ender3OctoPrintServerBinding_PrinterChannels_ExtruderTemperature");
}

function getBedTemperature() {
    return getItem("Ender3OctoPrintServerBinding_PrinterChannels_BedTemperature");
}



function getJobProgress() {
    return getItem("Ender3OctoPrintServerBinding_JobChannels_JobProgress");
}

function getJobName() {
    return getItem("Ender3OctoPrintServerBinding_JobChannels_JobName");
}

function getPrintTime() {
    return getItem("Ender3OctoPrintServerBinding_JobChannels_PrintTime");
}

function getPrintTimeLeft() {
    return getItem("Ender3OctoPrintServerBinding_JobChannels_PrintTimeLeft");
}

function getEstimatedPrintTime() {
    return getItem("Ender3OctoPrintServerBinding_JobChannels_EstimatedPrintTime");
}

function getJobUser() {
    return getItem("Ender3OctoPrintServerBinding_JobChannels_JobUser");
}

export {
    getPrinterState,
    getStreamUrl,
    getExtruderTemperature, getBedTemperature,
    getJobName, getJobProgress, getJobUser, getPrintTime, getPrintTimeLeft, getEstimatedPrintTime
}