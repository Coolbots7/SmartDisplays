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

        return (
            <>
                {alarm &&
                    <div className="text-white text-center bold" style={{ fontSize: '1rem' }}>
                        <span><i className="far fa-clock"></i> {moment(alarm).calendar()}</span>
                    </div>
                }
            </>
        );
    }
}

export default Alarm;