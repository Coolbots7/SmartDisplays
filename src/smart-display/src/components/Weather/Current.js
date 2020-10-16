import React from 'react';
import { getOpenWeatherMapData } from '../../utils/weather-client';
import { getUVIColor, getUVIDescription } from './utils/uvi-util';
import { degreesToCompass, invertDirection } from './utils/wind-util';

class Current extends React.Component {
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
        clearInterval(this.interval)
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
        const { units } = this.props;
        const { data } = this.state;

        if (data) {
            const icon = data.current.weather[0].icon;
            const rain = data.hourly[0].pop;
            const wind = data.current.wind_speed;
            const wind_deg = data.current.wind_deg;
            const temperature = data.current.feels_like;
            const uvi = data.current.uvi;
            const humidity = data.current.humidity;

            return (
                <div className="weather-current w-100">
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex flex-row justify-content-center mb-2">
                            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather" />
                            <span className="weather-value-large my-auto">{Math.round(temperature)}&deg;</span>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div className="d-flex flex-column text-center">
                                <span className="weather-label-primary">UVI</span>
                                <span className="weather-value-secondary" style={{ color: getUVIColor(uvi) }}>{Math.ceil(uvi)} {getUVIDescription(uvi)}</span>
                            </div>
                            <div className="d-flex flex-column text-center">
                                <span className="weather-label-primary">Rain</span>
                                <span className="weather-value-secondary">{Math.round(rain)}<small className="weather-value-label">%</small></span>
                            </div>
                            <div className="d-flex flex-column text-center">
                                <span className="weather-label-primary">Wind</span>
                                <span className="weather-value-secondary">{Math.round(wind)}<small className="weather-value-label">MPH</small> {degreesToCompass(invertDirection(wind_deg))}</span>
                            </div>
                            <div className="d-flex flex-column text-center">
                                <span className="weather-label-primary">Hum</span>
                                <span className="weather-value-secondary">{humidity}<small className="weather-value-label">%</small></span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

};

export default Current;