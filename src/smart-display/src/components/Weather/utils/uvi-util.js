function getUVIDescription(uvi) {
    if (uvi < 3) {
        //low
        return "Low";
    }
    else if (uvi < 6) {
        //moderate
        return "Moderate";
    }
    else if (uvi < 8) {
        //high
        return "High";
    }
    else if (uvi < 11) {
        //very high
        return "Very High";
    }
    else {
        //extreme
        return "Extreme";
    }
}

function getUVIColor(uvi) {
    if (uvi < 3) {
        //low
        return "#0F0";
    }
    else if (uvi < 6) {
        //moderate
        return "#FF0";
    }
    else if (uvi < 8) {
        //high
        return "#F70";
    }
    else if (uvi < 11) {
        //very high
        return "#F00";
    }
    else {
        //extreme
        return "#F0F";
    }
}

export { getUVIDescription, getUVIColor };