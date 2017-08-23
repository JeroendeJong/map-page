import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateFormat from 'dateformat';

import './date-and-time.css';

class DateAndTime extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            date: new Date(),
            isDark: false,
        };
    }

    componentWillMount() {
        this.props.map.on('style retrieved', this.setTextColor.bind(this));
        this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setTextColor(style) {
        this.setState({ isDark: style.darkMode });
    }

    tick() {
        this.setState({ date: new Date() });
    }

    render() {
        const styleClass = this.state.isDark ? 'date-name-dark' : 'date-name-light';
        return (
            <div className="date-name">
                <div className={styleClass}>
                    {DateFormat(this.state.date, 'ddd d mmm yyyy HH:MM:ss')}
                </div>
            </div>
        );
    }
}

DateAndTime.propTypes = {
    map: PropTypes.object.isRequired,
};


export default DateAndTime;
