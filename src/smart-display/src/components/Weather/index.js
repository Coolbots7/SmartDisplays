import React from 'react';
import PropTypes from 'prop-types';
import './Weather.css';
import moment from 'moment';
import DayOfWeek from './DayOfWeek';
import Current from './Current';
import MoonPhase from './MoonPhase';

const WeatherCard = (props) => {
    const { children, lat, lon, units } = props;

    const childProps = { lat, lon, units };
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, childProps);
        }
        return child;
    });

    return (
        <div className="card">
            <div className="card-body">
                {childrenWithProps}
            </div>
        </div>
    );
};

WeatherCard.propTypes = {
    lat: PropTypes.string.isRequired,
    lon: PropTypes.string.isRequired,
    units: PropTypes.string
};

WeatherCard.defaultProps = {
    units: "imperial"
};

// const SunriseSunsetBar = () => {

// };

// const CurrentWeather = (props) => {
//     const { units } = props;

//     return (
//         <div className="d-flex flex-row justify-content-around">
//             {/* <Current units={units} />
//             <MoonPhase /> */}
//         </div>
//     );
// };

// CurrentWeather.propTypes = {
//     units: PropTypes.string.isRequired
// };

// const HourlyForecast = () => {

// };

const DailyForecast = (props) => {
    const { days, includeToday, lat, lon, units } = props;

    var dayIdxs = [];
    for (var i = 0; i < days; i++) {
        dayIdxs.push(i);
    }

    return (
        <div className="forecast">
            {dayIdxs.map((i) => (
                <DayOfWeek dayIndex={includeToday ? i : i + 1} lat={lat} lon={lon} units={units} />
            ))}
        </div>
    );
};

DailyForecast.propTypes = {
    lat: PropTypes.string.isRequired,
    lon: PropTypes.string.isRequired,
    days: PropTypes.number.isRequired,
    units: PropTypes.string.isRequired,
    includeToday: PropTypes.bool
};

DailyForecast.defaultProps = {
    includeToday: true
};

export {
    WeatherCard, 
    // SunriseSunsetBar,
    //  CurrentWeather, 
    //  HourlyForecast, 
    DailyForecast
};