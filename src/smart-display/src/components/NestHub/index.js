import React from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../../utils/openhab-client';

const timeCode = (seconds) => {
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor((seconds - (hours * 60 * 60)) / 60);
    const secondsRemaining = seconds % 60;

    return <>{hours > 0 ? <>{hours}:</> : null}{hours > 0 ? minutes.toString().padStart(2, '0') : minutes}:{secondsRemaining.toString().padStart(2, '0')}</>;
}

class NestHub extends React.Component {
    static propTypes = {
        appItemName: PropTypes.string,
        mediaTypeItemName: PropTypes.string,
        currentTimeItemName: PropTypes.string,
        durationItemName: PropTypes.string,
        albumNameItemName: PropTypes.string,
        mediaArtistItemName: PropTypes.string,
        imageURLItemName: PropTypes.string,
        mediaTitleItemName: PropTypes.string,
        subtitleItemName: PropTypes.string,
        updateInterval: PropTypes.number
    };

    static defaultProps = {
        updateInterval: 1000
    };

    constructor(props) {
        super(props);

        this.state = {
            app: null,
            mediaType: null,
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
        const { updateInterval } = this.props;

        this.update();
        this.interval = setInterval(this.update, updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        const self = this;
        const { appItemName, mediaTypeItemName, currentTimeItemName, durationItemName, albumNameItemName, mediaArtistItemName, imageURLItemName, mediaTitleItemName, subtitleItemName } = this.props;

        getItem(appItemName).then((item) => {
            if (item) {
                self.setState({
                    app: item.state
                });
            }
        });

        getItem(mediaTypeItemName).then((item) => {
            if(item) {
                self.setState({
                    mediaType: item.state
                });
            }
        });

        getItem(currentTimeItemName).then((item) => {
            if (item) {
                self.setState({
                    currentTime: parseInt(item.state)
                });
            }
        });

        getItem(durationItemName).then((item) => {
            if (item) {
                self.setState({
                    duration: parseInt(item.state)
                });
            }
        });

        getItem(albumNameItemName).then((item) => {
            if (item) {
                self.setState({
                    album: item.state
                });
            }
        });

        getItem(mediaArtistItemName).then((item) => {
            if (item) {
                self.setState({
                    artist: item.state
                });
            }
        });

        getItem(imageURLItemName).then((item) => {
            if (item && item.state !== "UNDEF") {
                self.setState({
                    imageUrl: item.state
                });
            }
            else {
                self.setState({
                    imageUrl: null
                });
            }
        });

        getItem(mediaTitleItemName).then((item) => {
            if (item) {
                self.setState({
                    title: item.state
                });
            }
        });

        getItem(subtitleItemName).then((item) => {
            if (item) {
                self.setState({
                    subtitle: item.state
                });
            }
        });
    }

    render() {
        const { app, mediaType, currentTime, duration, album, artist, imageUrl, title, subtitle } = this.state;

        var percent = 0;
        if (currentTime !== null) {
            percent = Math.floor((currentTime / duration) * 100);
        }

        return (
            <>
                {(app === "Google Play Music" || app === "YouTube" || app === "YouTube Music" || app === "Plex") &&
                    <div className="card">
                        {imageUrl &&
                            <img src={imageUrl} class="card-img-top"></img>
                        }
                        <ul className="list-group list-group-flush">
                            <li class="list-group-item d-flex flex-row justify-content-center">
                                <span className="text-center">{title}</span>
                            </li>
                            {app === "Google Play Music" || (app === "Plex" && mediaType === "MUSIC_TRACK") &&
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
                                <span>{timeCode(currentTime)}</span>
                                <span>{timeCode(duration)}</span>
                            </li>
                        </ul>
                    </div>
                }
            </>
        );
    }
};

export default NestHub;