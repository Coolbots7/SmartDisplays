function invertDirection(direction) {
    direction += 180;

    if (direction > 360) {
        direction -= 360;
    }

    return direction;
}

function degreesToCompass(direction) {

    if (direction >= 340 || direction <= 20) {
        //N
        return 'N';
    }
    else if (direction > 20 && direction < 30) {
        //NNE
        return 'NNE ';
    }
    else if (direction >= 30 && direction <= 60) {
        //NE
        return 'NE';
    }
    else if (direction > 60 && direction < 70) {
        //ENE
        return 'ENE';
    }
    else if (direction >= 70 && direction <= 110) {
        //E
        return 'E';
    }
    else if (direction > 110 && direction < 120) {
        //ESE
        return 'ESE';
    }
    else if (direction >= 120 && direction <= 150) {
        //SE
        return 'SE';
    }
    else if (direction > 150 && direction < 160) {
        //SSE
        return 'SSW';
    }
    else if (direction >= 160 && direction <= 200) {
        //S
        return 'S';
    }
    else if (direction > 200 && direction < 210) {
        //SSW
        return 'SSW';
    }
    else if (direction >= 210 && direction <= 240) {
        //SW
        return 'SW';
    }
    else if (direction > 240 && direction < 250) {
        //WSW
        return 'WSW';
    }
    else if (direction >= 250 && direction <= 290) {
        //W
        return 'W';
    }
    else if (direction > 290 && direction < 300) {
        //WNW
        return 'WNW';
    }
    else if (direction >= 300 && direction <= 330) {
        //NW
        return 'NW';
    }
    else if (direction > 330 && direction < 340) {
        //NNW
        return 'NNW';
    }
    else {
        return 'ERR'
    }
}

export { invertDirection, degreesToCompass };