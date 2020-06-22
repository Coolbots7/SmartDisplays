function CelsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function KMPHToMPH(kilometers_per_hour) {
    return kilometers_per_hour / 1.609;
}

export { CelsiusToFahrenheit, KMPHToMPH };