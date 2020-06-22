import { getItem } from "./openhab-client";

function getBlackout() {
    return getItem("BedroomDisplay_Switch");
}

export { getBlackout };