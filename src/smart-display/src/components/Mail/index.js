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
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <ul class="list-group list-group-flush">
                    {unread !== "NULL" &&
                        // <li class="list-group-item d-flex flex-row justify-content-between"><span><i class="fas fa-envelope"></i></span> <span>{unread}</span></li>
                        <li class="list-group-item d-flex flex-row justify-content-between"><span>Unread:</span> <span>{unread}</span></li>
                    }
                    {total && total !== "NULL" &&
                        // <li class="list-group-item d-flex flex-row justify-content-between"><span><i class="fas fa-inbox"></i></span> <span>{total}</span></li>
                        <li class="list-group-item d-flex flex-row justify-content-between"><span>Total:</span> <span>{total}</span></li>
                    }
                </ul>
            </div>

        );
    }
};

export default Mail;