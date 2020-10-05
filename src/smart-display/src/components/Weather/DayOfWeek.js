import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getOpenWeatherMapData } from '../../utils/weather-client';

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

        const hours = now.getHours();
        const night = hours >= 12;

        var day_string = day.format("ddd");

        if (dayIndex == 0) {
            day_string = night ? 'Tonight' : 'Today';
        }

        var date_string = day.format("MMM D");


        //Get day data
        var high = null;
        var low = null;
        var icon = null;
        if (data) {
            //get day weather forecast from weather data
            // high = data.daily[dayIndex].temp.max;
            // low = data.daily[dayIndex].temp.min;
            high = data.daily[dayIndex].feels_like.day;
            low = data.daily[dayIndex].feels_like.night;
            icon = data.daily[dayIndex].weather[0].icon;

            if (night) {
                icon = icon.replace('d', 'n');
            }
        }

        return (
            <>
                {data &&
                    <div className="weather-day-of-week">
                        <div className="day bold">{day_string}</div>
                        <div className="date">{date_string}</div>
                        <div><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather" /></div>
                        <div className="temperature bold">{Math.round(high)}&deg;</div>
                        <div className="temperature">{Math.round(low)}&deg;</div>
                    </div>
                }
            </>
        );
    }
};

export default DayOfWeek;