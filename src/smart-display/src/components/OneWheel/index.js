import React from 'react';
import './OneWheel.css';
import { getBatteryRemaining, getLifetimeOdometer, getConnected, getCharging } from '../../utils/onewheel-client';

class OneWheel extends React.Component {

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

        getConnected().then((item) => {
            if (item) {
                self.setState({
                    connected: item.state === "true"
                });
            }
        });

        getCharging().then((item) => {
            console.log("charging", item);
            if (item) {
                self.setState({
                    charging: item.state === "true"
                });
            }
        })

        getBatteryRemaining().then((item) => {
            if (item) {
                self.setState({
                    batteryRemaining: item.state
                });
            }
        });

        getLifetimeOdometer().then((item) => {
            if (item) {
                self.setState({
                    lifetimeOdometer: item.state
                });
            }
        });
    }

    render() {
        const { connected, charging, batteryRemaining, lifetimeOdometer } = this.state;

        var progressColor = "bg-success";
        if (batteryRemaining < 20) {
            progressColor = "bg-danger";
        }
        else if (batteryRemaining < 90) {
            progressColor = "bg-warning";
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
                            <li className="list-group-item">
                                <div className="d-flex flex-row">
                                    <div className="col">
                                        <div class="progress mt-3" style={{ height: '0.3rem' }}>
                                            <div class={`progress-bar ${progressColor}`} role="progressbar" style={{ width: `${batteryRemaining}%` }} aria-valuenow={batteryRemaining} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Battery:</span> <span>{batteryRemaining}%</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Odometer:</span> <span>{lifetimeOdometer}mi</span></li>
                        </>
                    }
                </ul>
            </div >
        );
    }
}

export default OneWheel;