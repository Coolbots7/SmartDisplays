function getUVIDescription(uvi) {
    //Cap UVI value
    if (uvi < 0) {
        uvi = 0;
    }
    else if (uvi > 11) {
        uvi = 11;
    }

    switch (Math.ceil(uvi)) {
        case 0:
        case 1:
        case 2:
            //low
            return "Low";
        case 3:
        case 4:
        case 5:
            //moderate
            return "Moderate";
        case 6:
        case 7:
            //high
            return "High";
        case 8:
        case 9:
        case 10:
            //very high
            return "Very High";
        case 11:
            //extreme
            return "Extreme";
        default:
            return "Unknown";
    };
}

function getUVIColor(uvi) {
    //Cap UVI value
    if (uvi < 0) {
        uvi = 0;
    }
    else if (uvi > 11) {
        uvi = 11;
    }

    switch (Math.ceil(uvi)) {
        case 0:
        case 1:
        case 2:
            //low
            return "#8ec641";
        case 3:
        case 4:
        case 5:
            //moderate
            return "#fdaf40";
        case 6:
        case 7:
            //high
            return "#f7941d";
        case 8:
        case 9:
        case 10:
            //very high
            return "#df4128";
        case 11:
            //extreme
            return "#a85c9a";
        default:
            return "#898989";
    };
}

export { getUVIDescription, getUVIColor };