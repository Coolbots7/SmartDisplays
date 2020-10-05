import React from 'react';
import sun from './icons/weather/32.png';
import { getCurrentTemperature, getCurrentRain, getCurrentWindSpeed, getCurrentWeatherCondition } from '../../utils/weather-client';
import { getIconFromWeatherCondition } from './weather-icon-util';
import { CelsiusToFahrenheit, KMPHToMPH } from './conversion-utils';
import Drop from './icons/weather/drop.png';
import Wind from './icons/weather/24.png';

class Current extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperature: null,
            rain: null,
            wind: null,
            weather_condition: null
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

        // getCurrentTemperature().then((item) => {
        //     if (item && item.hasOwnProperty("state")) {
        //         self.setState({
        //             temperature: Math.round(parseFloat(item.state.match(/\d+\.\d+/)))
        //         });
        //     }
        // });

        // getCurrentRain().then((item) => {
        //     if (item && item.hasOwnProperty("state")) {
        //         self.setState({
        //             rain: Math.round(parseFloat(item.state.match(/\d+\.\d+/)))
        //         });
        //     }
        // });

        // getCurrentWindSpeed().then((item) => {
        //     if (item && item.hasOwnProperty("state")) {
        //         self.setState({
        //             wind: Math.round(KMPHToMPH(parseFloat(item.state.match(/\d+\.\d+/))))
        //         });
        //     }
        // });

        // getCurrentWeatherCondition().then((item) => {
        //     if (item && item.hasOwnProperty("state")) {
        //         self.setState({
        //             weather_condition: item.state
        //         });
        //     }
        // });
    }

    render() {
        const { temperature, rain, wind, weather_condition } = this.state;

        const now = new Date();
        const hours = now.getHours();
        const night = hours < 6 || hours >= 18;

        return (
            <div className="weather-current">

                <div className="" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        <img src={getIconFromWeatherCondition(weather_condition, night)} alt="weather" />
                    </div>
                    <div className="" style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #FFFFFF', paddingLeft: '5px' }}>
                        <div className="bold" style={{ fontSize: '1.5rem' }}>{temperature}&deg;</div>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column mr-2">
                                <img src={Drop} style={{ width: '0.8rem' }} className="ml-auto" />
                                <img src={Wind} style={{ width: '1.2rem' }} />
                            </div>
                            <div className="d-flex flex-column">
                                <div>{rain}<small style={{ fontSize: '0.6rem' }}>%</small></div>
                                <div>{wind}<small style={{ fontSize: '0.6rem' }}>MPH</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Current;