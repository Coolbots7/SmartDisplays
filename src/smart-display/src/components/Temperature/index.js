import React from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../../utils/openhab-client';

class Temperature extends React.Component {
    static propTypes = {
        header: PropTypes.string,
        temperatureItem: PropTypes.string.isRequired,
        isCelsius:PropTypes.bool
    };

    static defaultProps = {
        header: 'Temperature',
        isCelsius: false
    };

    constructor(props) {
        super(props);

        this.state = {
            temperature: null
        };

        this.update = this.update.bind(this);

        this.interval = null;
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 60)
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    update() {
        const self = this;
        const { temperatureItem } = this.props;
        
        getItem(temperatureItem).then((item) => {
            if(item) {
                self.setState({
                    temperature: item.state
                });
            }
        })
    }

    render() {
        const { temperature } = this.state;
        const{ header, isCelsius } = this.props;
        return (
            <div className="card">
                <div className="card-header">{header}</div>
                <ul className="list-group">
                    <li className="list-group-item d-flex flex-row justify-content-between">
                        <span>Temp:</span>
                        <span>{temperature ? parseFloat(temperature.split(' ')[0]).toFixed(1) : null} &deg;{isCelsius ? 'C' : 'F'}</span>
                    </li>
                </ul>
            </div>
        )
    }
};

export default Temperature;