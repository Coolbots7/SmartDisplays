import React from 'react';
import { getPrinterState, getJobProgress, getJobName, getPrintTime, getPrintTimeLeft, getEstimatedPrintTime, getStreamUrl } from '../../utils/octoprint-client';
import { formatSeconds } from './time-util';

class OctoPrint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            printerState: null,
            jobName: "",
            jobProgress: 0,
            printTime: 0,
            printTimeLeft: 0,
            estimatedPrintTime: 0,
            streamUrl: null
        }

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000 * 5);

        const self = this;
        getStreamUrl().then((item) => {
            if (item) {
                self.setState({
                    streamUrl: item.state
                });
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;

        getJobProgress().then((item) => {
            if (item) {
                self.setState({
                    jobProgress: item.state
                });
            }
        });

        getJobName().then((item) => {
            if (item) {
                self.setState({
                    jobName: item.state
                });
            }
        });

        getPrinterState().then((item) => {
            if (item) {
                self.setState({
                    printerState: item.state
                });
            }
        });

        getPrintTime().then((item) => {
            if (item) {
                self.setState({
                    printTime: item.state
                });
            }
        });

        getPrintTimeLeft().then((item) => {
            if (item) {
                self.setState({
                    printTimeLeft: item.state
                });
            }
        });

        getEstimatedPrintTime().then((item) => {
            if (item) {
                self.setState({
                    estimatedPrintTime: item.state
                });
            }
        });
    }


    render() {
        const { printerState, streamUrl, jobName, jobProgress, printTime, printTimeLeft, estimatedPrintTime } = this.state;

        return (
            <>
                {(printerState === "Printing" || printerState === "Finishing" || printerState === "Resuming") &&
                    <div className="card">
                        <div className="card-header border-none">
                            OctoPrint
                        </div>
                        <img src={`http://192.168.2.63${streamUrl}`} class="card-img-top"></img>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>State:</span> <span>{printerState}</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span className="mr-5">Job:</span> <span className="text-truncate">{jobName}</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Progress:</span> <span>{parseFloat(jobProgress).toFixed(1)}%</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Time:</span> <span>{formatSeconds(printTime)}</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Remaining:</span> <span>{printTimeLeft > 0 ? formatSeconds(printTimeLeft)  : "-"}</span></li>
                            <li class="list-group-item d-flex flex-row justify-content-between"><span>Estimated:</span> <span>{estimatedPrintTime !== 'NULL' ? <>{formatSeconds(estimatedPrintTime)}</> : '-'}</span></li>
                        </ul>
                    </div>
                }
            </>
        )
    }
}

export default OctoPrint;