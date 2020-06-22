import { getItem } from "./openhab-client";

function getDoNotDisturbSwitch() {
    return getItem("DoNotDisturb_Switch");
}

function getDoNotDisturbReason() {
    return getItem("DoNotDisturb_Reason");
}

export {
    getDoNotDisturbSwitch, getDoNotDisturbReason
}