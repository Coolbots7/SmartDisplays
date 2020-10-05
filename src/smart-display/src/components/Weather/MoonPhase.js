import React from 'react';
import { getMoonPhase } from '../../utils/weather-client';
import { getIconFromPhaseName } from './moon-phase-util';

class MoonPhase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phase: null
        };

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 60)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;
        // getMoonPhase().then((item) => {
        //     if (item && item.hasOwnProperty("state")) {
        //         self.setState({
        //             phase: item.state
        //         });
        //     }
        // });
    }

    render() {
        const { phase } = this.state;

        return (
            <div className="weather-moon-phase">
                <img src={getIconFromPhaseName(phase)} alt="moon" />
            </div>
        );
    }

};

export default MoonPhase;