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
                    // <div className="flex flex-column">
                    //     <div classNam="mb-2">
                    //         <img className="img-thumbnail rounded" src="http://octoprint.cb7.com/webcam/?action=stream&amp;ignored.mp4" style={{ width: '20rem' }}></img>
                    //     </div>
                    //     <small className="text-white">{jobName}</small>
                    //     <div className="progress" style={{ height: "1rem" }}>
                    //         <div className="progress-bar" role="progressbar" style={{ width: `${Math.round(jobProgress)}%` }} aria-valuenow={`${Math.round(jobProgress)}`} aria-valuemin="0" aria-valuemax="100">
                    //             <span style={{ fontSize: '0.8rem' }}>{Math.round(jobProgress)}%</span>
                    //         </div>
                    //     </div>
                    // </div>

                    <div className="text-uppercase" style={{ width: '30rem' }}>
                        <div className="title">
                            <div className="row p-2">
                                <div className="col d-flex flex-column">
                                    <small className="text-blue">data</small>
                                    <span className="text-white">octoprint</span>
                                </div>
                                <div className="col-auto ml-auto mt-auto">
                                    <span className="text-white">ENDER 3</span>
                                </div>
                            </div>
                        </div>

                        <div className="body">
                            <div className="row p-0 m-0 h-100 w-100" style={{ maxWidth: '100%' }}>
                                <div className="col-auto p-0 h-100" style={{ borderRight: "#FFF solid 1px" }}>
                                    <img src={`http://192.168.2.63${streamUrl}`} style={{ maxWidth: '15rem' }}></img>
                                </div>
                                <div className="col p-0">
                                    <div className="row h-25 p-0 m-0" style={{ borderBottom: '#FFF solid 1px' }}>
                                        <div className="col p-0 m-0 d-flex justify-content-center align-items-center">
                                            <span className="text-blue">{printerState}</span>
                                        </div>
                                    </div>
                                    <div className="row h-25 p-0 m-0" style={{ borderBottom: '#FFF solid 1px' }}>
                                        <div className="col p-0 m-0 d-flex justify-content-center align-items-center">
                                            <span className="text-white px-2">{jobName}</span>
                                        </div>
                                    </div>
                                    <div className="row h-50 p-0 m-0">
                                        <div className="col-5 d-flex justify-content-center align-items-center" style={{ borderRight: "#FFF solid 1px" }}>
                                            <span className="text-white" style={{ fontSize: '2.5rem' }}>{parseFloat(jobProgress).toFixed(1)}<small>%</small></span>
                                        </div>
                                        <div className="col p-0 m-0 d-flex flex-column justify-content-center align-items-center">
                                            <span className="text-white" style={{ borderBottom: '#007bff solid 3px' }}>Time {formatSeconds(printTime)}</span>
                                            <span className="text-white" style={{ borderBottom: '#007bff solid 3px' }}>Rem. {formatSeconds(printTimeLeft)}</span>
                                            <span className="text-white">Est. {estimatedPrintTime !== 'NULL' ? <>{formatSeconds(estimatedPrintTime)}</> : 'Unknown'}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default OctoPrint;