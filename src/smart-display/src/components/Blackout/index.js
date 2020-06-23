import React from 'react';
import { getBlackout } from '../../utils/blackout-util';

class Blackout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blackout: null
        };

        this.update = this.update.bind(this);

        this.interval = null;
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;
        getBlackout().then((item) => {
            if (item) {
                self.setState({
                    blackout: item.state === "OFF"
                });
            }
        });
    }

    render() {
        const { blackout } = this.state;
        return (
            <>
                {blackout === true &&
                    <div className="position-absolute p-0 m-0" style={{ top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, backgroundColor: '#000' }}>

                    </div>
                }
            </>
        );
    }
}

export default Blackout;