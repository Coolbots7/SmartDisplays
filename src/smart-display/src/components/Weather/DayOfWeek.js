import React from 'react';
import PropTypes from 'prop-types';

const DayOfWeek = (props) => {
    const { day, date, weather_condition, high, low } = props;
    return (
        <div className="weather-day-of-week">
            <div className="day bold">{day}</div>
            <div className="date">{date}</div>
            <div><img src={weather_condition} alt="weather" /></div>
            <div className="temperature bold">{high}&deg;</div>

            {low &&
                <div className="temperature">{low}&deg;</div>
            }
        </div>
    )
};

DayOfWeek.propTypes = {
    day: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    weather: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired,
    low: PropTypes.number
}

DayOfWeek.defaultTypes = {
    low: null
};

export default DayOfWeek;