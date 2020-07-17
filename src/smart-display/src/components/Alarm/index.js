import React from 'react';
import { getItem } from '../../utils/openhab-client';
import moment from 'moment';

class Alarm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alarm: null
        };

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 3);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;

        getItem('HAL_MOBILEAlarmClock').then((item) => {
            if (item && item.state !== "UNDEF") {
                self.setState({
                    alarm: parseInt(item.state)
                });
            }
            else {
                self.setState({
                    alarm: null
                });
            }
        })
    }


    render() {
        const { alarm } = this.state;

        var diffHours = 0;
        var alarmText = null;
        if(alarm) {
            const now = new Date();
            diffHours = (alarm - now) / 1000 / (60 * 60);

            if (diffHours <= 12) {
                alarmText = moment(alarm).fromNow();
            }
            else {
                alarmText = moment(alarm).calendar();
            }
        }

        return (
            <>
                {(alarm && diffHours <= 24) &&
                    <div className="text-white text-center bold" style={{ fontSize: '1rem' }}>
                        <span><i className="far fa-clock"></i> {alarmText}</span>
                    </div>
                }
            </>
        );
    }
}

export default Alarm;