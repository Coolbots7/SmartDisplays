import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getOpenWeatherMapData } from '../../utils/weather-client';
import { getUVIColor } from './utils/uvi-util';

class DayOfWeek extends React.Component {
    static propTypes = {
        date: PropTypes.object.isRequired,
        units: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null
        };

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 60);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;
        const { lat, lon, units } = this.props;

        //get weather data
        getOpenWeatherMapData(lat, lon, units).then((data) => {
            console.log(data);
            self.setState({
                data
            });
        });
    }

    render() {
        const { dayIndex, units } = this.props;
        const { data } = this.state;

        const now = new Date();
        const day = moment().add(dayIndex, 'days');

        const night = now.getHours() >= 12;

        var day_string = day.format("ddd");

        if (dayIndex == 0) {
            day_string = night ? 'Tonight' : 'Today';
        }

        var date_string = day.format("MMM D");

        //Get day data
        if (data) {
            //get day weather forecast from weather data
            //const high = data.daily[dayIndex].temp.max;
            //const low = data.daily[dayIndex].temp.min;
            const high = data.daily[dayIndex].feels_like.day;
            const low = data.daily[dayIndex].feels_like.night;
            const icon = data.daily[dayIndex].weather[0].icon;
            const uvi = data.daily[dayIndex].uvi;

            return (
                <div className="weather-day-of-week">
                    <div className="day bold">{day_string}</div>
                    <div className="date text-nowrap">{date_string}</div>
                    <div><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather" /></div>
                    <div className="weather-value-secondary bold" style={{ color: getUVIColor(uvi) }}>{Math.ceil(uvi)}</div>
                    <div className="temperature bold">H {Math.round(high)}&deg;</div>
                    <div className="temperature">L {Math.round(low)}&deg;</div>

                </div>
            );
        }

        return <div style={{ width: '2rem' }}></div>;
    }
};

export default DayOfWeek;