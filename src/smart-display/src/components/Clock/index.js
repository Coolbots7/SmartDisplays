import React from 'react';
import './Clock.css';
import PropTypes from 'prop-types';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.update, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const { date } = this.state;

        return (
            <div className="clock">
                <div className="clock-time">{moment(date).format("HH:mm")}</div>
                <div className="clock-date">{moment(date).format("dddd, D MMMM YYYY")}</div>
            </div>
        );
    }
};

export default Clock;