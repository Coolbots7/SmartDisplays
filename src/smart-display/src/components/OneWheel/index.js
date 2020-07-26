import React from 'react';
import PropTypes from 'prop-types';
import './OneWheel.css';
import { getItem } from '../../utils/openhab-client';

class OneWheel extends React.Component {
    static propTypes = {
        connectedItemName: PropTypes.string.isRequired,
        chargingItemName: PropTypes.string,
        batteryRemainingItemName: PropTypes.string,
        lifetimeOdometerItemName: PropTypes.string
    }

    static defaultProps = {
        chargingItemName: null,
        batteryRemainingItemName: null,
        lifetimeOdometerItemName: null
    }

    constructor(props) {
        super(props);

        this.state = {
            connected: null,
            charging: null,
            batteryRemaining: null,
            lifetimeOdometer: null
        }

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentWillMount() {
        this.update();
        this.interval = setInterval(this.update, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;
        const { connectedItemName, chargingItemName, batteryRemainingItemName, lifetimeOdometerItemName } = this.props;

        if (connectedItemName) {
            getItem(connectedItemName).then((item) => {
                if (item) {
                    self.setState({
                        connected: item.state === "true"
                    });
                }
            });
        }

        if (chargingItemName) {
            getItem(chargingItemName).then((item) => {
                if (item) {
                    self.setState({
                        charging: item.state
                    });
                }
            });
        }

        if (batteryRemainingItemName) {
            getItem(batteryRemainingItemName).then((item) => {
                if (item) {
                    self.setState({
                        batteryRemaining: item.state
                    });
                }
            });
        }

        if (lifetimeOdometerItemName) {
            getItem(lifetimeOdometerItemName).then((item) => {
                if (item) {
                    self.setState({
                        lifetimeOdometer: item.state
                    });
                }
            })
        }
    }

    render() {
        const { connected, charging, batteryRemaining, lifetimeOdometer } = this.state;
        const { chargingItemName, batteryRemainingItemName, lifetimeOdometerItemName } = this.props;

        var progressColor = null;
        if (batteryRemaining) {
            if (batteryRemaining < 20) {
                progressColor = "bg-danger";
            }
            else if (batteryRemaining < 90) {
                progressColor = "bg-warning";
            }
            else {
                progressColor = "bg-success";
            }
        }

        var chargingIcon = null;
        if (charging) {
            if (charging === "true") {
                chargingIcon = <i className="fas fa-plug"></i>;
            }
            else {
                if (batteryRemaining <= 20) {
                    chargingIcon = <i className="fas fa-battery-quarter"></i>;
                }
                else if (batteryRemaining > 20 && batteryRemaining <= 50) {
                    chargingIcon = <i className="fas fa-battery-half"></i>;
                }
                else if (batteryRemaining > 50 && batteryRemaining < 75) {
                    chargingIcon = <i className="fas fa-battery-three-quarters"></i>;
                }
                else {
                    chargingIcon = <i className="fas fa-battery-full"></i>;
                }
            }
        }

        return (
            <div className="card">
                <div className="card-header">
                    OneWheel
                </div>
                <ul className="list-group list-group-flush">
                    {!connected &&
                        <li className="list-group-item text-center" style={{ fontWeight: 600 }}>
                            <span className="text-danger">Disconnected</span>
                        </li>
                    }

                    {connected &&
                        <>
                            {(chargingItemName || batteryRemainingItemName) &&
                                <li className="list-group-item">
                                    <div className="d-flex flex-row">
                                        {chargingItemName &&
                                            <div className="col-auto mt-1">
                                                {chargingIcon}
                                            </div>
                                        }
                                        {batteryRemainingItemName &&
                                            <>
                                                <div className="col">
                                                    <div class="progress mt-3" style={{ height: '0.3rem' }}>
                                                        <div class={`progress-bar ${progressColor}`} role="progressbar" style={{ width: `${batteryRemaining}%` }} aria-valuenow={batteryRemaining} aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <span>{batteryRemaining}%</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </li>
                            }

                            {lifetimeOdometerItemName &&
                                <li class="list-group-item d-flex flex-row justify-content-between"><span>Odometer:</span> <span>{lifetimeOdometer}mi</span></li>
                            }
                        </>
                    }
                </ul>
            </div >
        );
    }
}

export default OneWheel;