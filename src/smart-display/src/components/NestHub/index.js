import React from 'react';
import { getItem } from '../../utils/openhab-client';

const timeCode = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    return <>{minutes}:{secondsRemaining.toString().padStart(2, '0')}</>;
}

class NestHub extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            app: null,
            currentTime: null,
            duration: null,
            album: null,
            artist: null,
            imageUrl: null,
            title: null,
            subtitle: null
        }

        this.interval = null;

        this.update = this.update.bind(this);
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

        getItem('BedroomGoogleHub_App').then((item) => {
            if (item) {
                self.setState({
                    app: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_CurrentTime').then((item) => {
            if (item) {
                self.setState({
                    currentTime: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_Duration').then((item) => {
            if (item) {
                self.setState({
                    duration: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_AlbumName').then((item) => {
            if (item) {
                self.setState({
                    album: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_MediaArtist').then((item) => {
            if (item) {
                self.setState({
                    artist: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_ImageURL').then((item) => {
            if (item) {
                self.setState({
                    imageUrl: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_MediaTitle').then((item) => {
            if (item) {
                self.setState({
                    title: item.state
                });
            }
        });

        getItem('BedroomGoogleHub_Subtitle').then((item) => {
            if (item) {
                self.setState({
                    subtitle: item.state
                });
            }
        });
    }

    render() {
        const { app, currentTime, duration, album, artist, imageUrl, title, subtitle } = this.state;

        var percent = 0;
        if (currentTime !== null) {
            percent = Math.floor((parseInt(currentTime) / parseInt(duration)) * 100);
        }

        return (
            <>
            {(app === "Google Play Music" || app === "YouTube" || app === "YouTube Music" || app === "Plex") &&
                    <div className="card">
                        <div className="card-header border-none">
                            Nest Hub
                        </div>
                        <img src={imageUrl} class="card-img-top"></img>
                        <ul className="list-group list-group-flush">
                            <li class="list-group-item d-flex flex-row justify-content-center">
                                <span className="text-center">{title}</span>
                            </li>
                            {app === "Google Play Music" &&
                                <li class="list-group-item d-flex flex-row justify-content-center">
                                    <span>{artist} - {album}</span>
                                </li>
                            }
                            {(app === "YouTube" || app === "YouTube Music") &&
                                <li class="list-group-item d-flex flex-row justify-content-center">
                                    <span>{subtitle}</span>
                                </li>
                            }
                            <li class="list-group-item">
                                <div className="progress mt-3" style={{ height: '0.3rem' }}>
                                    <div className={`progress-bar bg-primary`} role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </li>
                            <li class="list-group-item d-flex flex-row justify-content-between">
                                <span>{timeCode(parseInt(currentTime))}</span>
                                <span>{timeCode(parseInt(duration))}</span>
                            </li>
                        </ul>
                    </div>
                }
            </>
        );
    }
};

export default NestHub;