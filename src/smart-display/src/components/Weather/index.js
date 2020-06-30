import React from 'react';
import './Weather.css';
import DayOfWeek from './DayOfWeek';
import Current from './Current';
import MoonPhase from './MoonPhase';
import moment from 'moment';
import { getDayMaximumTemperature, getDayMinimumTemperature, getDayWeatherCondition } from './weather-day-util';
import { CelsiusToFahrenheit } from './conversion-utils';
import { getIconFromWeatherCondition } from './weather-icon-util';

class WeatherDay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather_condition: null,
            high: null,
            low: null
        }

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
        const { idx } = this.props;

        getDayMaximumTemperature(idx).then((item) => {
            if (item && item.hasOwnProperty("state")) {
                self.setState({
                    high: Math.round(parseFloat(item.state.match(/\d+\.\d+/)))
                });
            }
        });

        getDayMinimumTemperature(idx).then((item) => {
            if (item && item.hasOwnProperty("state")) {
                self.setState({
                    low: Math.round(parseFloat(item.state.match(/\d+\.\d+/)))
                });
            }
        });

        getDayWeatherCondition(idx).then((item) => {
            if (item && item.hasOwnProperty("state")) {
                self.setState({
                    weather_condition: item.state
                });
            }
        });
    }


    render() {
        const { idx } = this.props;
        const { weather_condition, high, low } = this.state;

        const now = new Date();
        const day = moment().add(idx, 'days');

        const hours = now.getHours();
        const night = hours >= 12;

        var day_string = day.format("ddd");

        if (idx < 1) {
            day_string = night ? 'Tonight' : 'Today';
        }

        var date_string = day.format("MMM D");

        const weather_condition_icon = getIconFromWeatherCondition(weather_condition);

        return <DayOfWeek day={day_string} date={date_string} weather_condition={weather_condition_icon} high={high} />;
    }
}

class Weather extends React.Component {

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-row justify-content-around">
                        <Current />
                        <MoonPhase />
                    </div>
                    {/* <div className="forecast">
                    {[0, 1, 2, 3, 4].map((i) => {
                        return <WeatherDay idx={i} key={i} />
                    })}

                </div> */}
                </div>
            </div>
        )
    }
};

export default Weather;