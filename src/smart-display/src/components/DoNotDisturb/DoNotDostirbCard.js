import React from 'react';
import PropTypes from 'prop-types';
import { getDoNotDisturbSwitch, getDoNotDisturbReason } from '../../utils/do_not_disturb-util';

class DoNotDisturbCard extends React.Component {
    static propTypes = {
        hideWhenOff: PropTypes.bool
    };

    static defaultProps = {
        hideWhenOff: false
    };

    constructor(props) {
        super(props);

        this.state = {
            doNotDisturb: null,
            doNotDisturbReason: null
        }

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 2);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;
        getDoNotDisturbSwitch().then((item) => {
            if (item) {
                const doNotDisturb = item.state === "ON";

                self.setState({
                    doNotDisturb
                });
            }
        });

        getDoNotDisturbReason().then((item) => {
            if (item) {
                self.setState({
                    doNotDisturbReason: item.state === "NULL" ? null : item.state
                });
            }
        });
    }

    render() {
        const { doNotDisturb, doNotDisturbReason } = this.state;
        const { hideWhenOff } = this.props;

        return (
            <>
                {(!hideWhenOff || doNotDisturb) &&
                    <div className="card">
                        <div className="card-header">
                            Do Not Disturb
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex flex-row justify-content-between">
                                <span>Do Not Disturb</span>
                                {doNotDisturb ? <span className="text-danger font-weight-bold">On</span> : <span className="text-success">Off</span>}
                            </li>
                            <li className="list-group-item d-flex flex-row justify-content-between">
                                <span>Reason</span>
                                {doNotDisturbReason ? <span>{doNotDisturbReason}</span> : <span className="font-italic">None</span>}
                            </li>
                        </ul>
                    </div>
                }
            </>
        )
    }
};

export default DoNotDisturbCard;