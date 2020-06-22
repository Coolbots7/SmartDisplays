import React from 'react';
import './DoNotDisturb.css';
import { getDoNotDisturbSwitch, getDoNotDisturbReason } from '../../utils/do_not_disturb-util';

class DoNotDisturb extends React.Component {
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

        return (
            <>
                {doNotDisturb &&
                    <div className="do-not-disturb text-uppercase text-white font-weight-bold text-center bold text-truncate">
                        <div>DO <br /> NOT <br /> DISTURB</div>

                        {doNotDisturbReason &&
                            <div className="do-not-disturb-reason">{doNotDisturbReason}</div>
                        }
                    </div>
                }
            </>
        );
    }
}

export default DoNotDisturb;