import React from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../../utils/openhab-client';

class Mail extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        unreadItem: PropTypes.string.isRequired,
        totalItem: PropTypes.string.isRequired
    }

    static defaultProps = {
        title: "Mail"
    }

    constructor(props) {
        super(props);

        this.state = {
            unread: null,
            total: null
        }

        this.interval = null;

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    update() {
        const self = this;
        const { unreadItem, totalItem } = this.props;

        getItem(unreadItem).then((item) => {
            if (item) {
                self.setState({
                    unread: item.state
                });
            }
        });

        getItem(totalItem).then((item) => {
            if (item) {
                self.setState({
                    total: item.state
                });
            }
        });
    }

    render() {
        const { title } = this.props;
        const { total, unread } = this.state;

        return (
            <div className="d-flex flex-column text-white">
                <div className="bold pl-2" style={{ fontSize: '1.3rem' }}>
                    {title}
                </div>

                {unread !== "NULL" &&
                    <div className="d-flex flex-row">
                        <span><i class="fas fa-envelope fa-2x"></i></span>
                        <span className="bold pl-2" style={{ fontSize: '1.3rem' }}>{unread}</span>
                    </div>
                }

                {total !== "NULL" &&
                    <div className="d-flex flex-row">
                        <span><i class="fas fa-inbox fa-2x"></i></span>
                        <span className="bold pl-2" style={{ fontSize: '1.3rem' }}>{total}</span>
                    </div>
                }
            </div>
        );
    }
};

export default Mail;