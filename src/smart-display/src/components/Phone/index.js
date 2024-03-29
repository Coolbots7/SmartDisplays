import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getItem } from '../../utils/openhab-client';

class Phone extends React.Component {
    static propTypes = {
        phoneName: PropTypes.string,
        batteryItemName: PropTypes.string,
        chargingItemName: PropTypes.string,
        wifiItemName: PropTypes.string,
        alarmItemName: PropTypes.string,
        callItemName: PropTypes.string,
        doNotDisturbItemName: PropTypes.string
    }

    static defaultProps = {
        phoneName: null,
        batteryItemName: null,
        chargingItemName: null,
        wifiItemName: null,
        alarmItemName: null,
        callItemName: null,
        doNotDisturbItemName: null
    }

    constructor(props) {
        super(props);

        this.state = {
            battery: null,
            charging: null,
            wifi: null,
            alarm: null,
            call: null,
            doNotDisturb: null
        };

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 2);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    update() {
        const self = this;
        const { batteryItemName, chargingItemName, wifiItemName, alarmItemName, callItemName, doNotDisturbItemName } = this.props;

        if (batteryItemName) {
            getItem(batteryItemName).then((item) => {
                if (item) {
                    self.setState({
                        battery: item.state
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

        if (wifiItemName) {
            getItem(wifiItemName).then((item) => {
                if (item) {
                    self.setState({
                        wifi: item.state
                    });
                }
            });
        }

        if (alarmItemName) {
            getItem(alarmItemName).then((item) => {
                if (item) {
                    self.setState({
                        alarm: item.state
                    });
                }
            });
        }

        if (callItemName) {
            getItem(callItemName).then((item) => {
                if (item) {
                    self.setState({
                        call: item.state
                    });
                }
            });
        }

        if (doNotDisturbItemName) {
            getItem(doNotDisturbItemName).then((item) => {
                if (item) {
                    self.setState({
                        doNotDisturb: item.state
                    });
                }
            });
        }
    }

    render() {
        const { battery, charging, wifi, alarm, call, doNotDisturb } = this.state;
        const { phoneName, batteryItemName, chargingItemName, wifiItemName, alarmItemName, callItemName, doNotDisturbItemName } = this.props;

        var progressColor = "bg-success";
        if (battery) {
            if (battery < 20) {
                progressColor = "bg-danger";
            }
            else if (battery < 40) {
                progressColor = "bg-warning";
            }
        }

        var chargingIcon = null;
        if (chargingItemName) {
            if (charging === "UNDEF") {
                if (battery <= 20) {
                    chargingIcon = <i className="fas fa-battery-quarter"></i>;
                }
                else if (battery > 20 && battery <= 50) {
                    chargingIcon = <i className="fas fa-battery-half"></i>;
                }
                else if (battery > 50 && battery <= 75) {
                    chargingIcon = <i className="fas fa-battery-three-quarters"></i>;
                }
                else {
                    chargingIcon = <i className="fas fa-battery-full"></i>;
                }
            }
            else if (charging === "USB") {
                chargingIcon = <i className="fab fa-usb"></i>;
            }
            else if (charging === "AC" || charging === "UNKNOWN_CHARGER") {
                chargingIcon = <i className="fas fa-plug"></i>;
            }
            else if (charging === "WIRELESS") {
                chargingIcon = <i className="fas fa-wifi"></i>;
            }
        }

        return (
            <div className="card">
                <div className="card-header">
                    {phoneName ? phoneName : "Phone"}
                </div>
                <ul className="list-group list-group-flush">
                    {batteryItemName &&
                        <li className="list-group-item">
                            <div className="d-flex flex-row">
                                {chargingItemName &&
                                    <div className="col-auto mt-1">
                                        {chargingIcon}
                                    </div>
                                }
                                <div className="col">
                                    <div className="progress mt-3" style={{ height: '0.3rem' }}>
                                        <div className={`progress-bar ${progressColor}`} role="progressbar" style={{ width: `${battery}%` }} aria-valuenow={battery} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <span>{battery}%</span>
                                </div>
                            </div>
                        </li>
                    }

                    {wifiItemName &&
                        <li className="list-group-item d-flex flex-row justify-content-between">
                            <span>WiFi</span>
                            {wifi && wifi !== "UNDEF" ? <span>{wifi}</span> : <span>Disconnected</span>}
                        </li>
                    }

                    {alarmItemName &&
                        <li className="list-group-item d-flex flex-row justify-content-between">
                            <span>Alarm</span>
                            {alarm && alarm !== "UNDEF" ? <span>{moment(parseInt(alarm)).calendar()}</span> : <span>None</span>}
                        </li>
                    }

                    {callItemName &&
                        <li className="list-group-item d-flex flex-row justify-content-between">
                            <span>Call</span>
                            <span>{call}</span>
                        </li>
                    }

                    {doNotDisturbItemName &&
                        <li className="list-group-item d-flex flex-row justify-content-between">
                            <span>Do Not Disturb</span>
                            <span>{doNotDisturb}</span>
                        </li>
                    }
                </ul>
            </div>
        );
    }

};

export default Phone;