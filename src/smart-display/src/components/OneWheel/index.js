import React from 'react';
import './OneWheel.css';
import { getBatteryRemaining, getLifetimeOdometer, getConnected } from '../../utils/onewheel-client';

class OneWheel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connected: null,
            batteryRemaining: null,
            lifetimeOdometer: null
        }

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentWillMount() {
        this.update();
        this.interval = setInterval(this.update, 5000);
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
        const { connected, batteryRemaining, lifetimeOdometer } = this.state;

        return (
            <div className="card">
                <div className="card-header">
                    OneWheel
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-center" style={{fontWeight: 600}}>{connected ? <span className="text-success">Connected</span> : <span className="text-danger">Disconnected</span>}</li>

                    {connected &&
                        <>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Battery:</span> <span>{batteryRemaining}%</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Odometer:</span> <span>{lifetimeOdometer}mi</span></li>
                        </>
                    }
                </ul>
            </div>
        );
    }
}

export default OneWheel;