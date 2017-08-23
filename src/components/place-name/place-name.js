import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './place-name.css';

class PlaceName extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            region: null,
            isDark: null,
        };
    }

    componentDidMount() {
        this.props.map.on('location retrieved', this.setLocation.bind(this));
        this.props.map.on('style retrieved', this.setTextColor.bind(this));
    }

    setLocation(location) {
        if (!location.name && !location.region) {
            location.getNameAndRegion().then((loc) => {
                this.setState({
                    name: loc.name,
                    region: loc.region,
                });
            });
        } else {
            this.setState({
                name: location.name,
                region: location.region,
            });
        }
    }

    setTextColor(style) {
        this.setState({ isDark: style.darkMode });
    }

    render() {
        if (!this.state.name || !this.state.region) {
            return null;
        }

        if (this.state.isDark === null) {
            return null;
        }

        const styleClass = this.state.isDark ? 'place-name-dark' : 'place-name-light';

        return (
            <div className={`place-name ${styleClass}`}>
                <div className="place-name-city">
                    {this.state.name}
                </div>

                <div className="place-name-region">
                    {this.state.region}
                </div>
            </div>
        );
    }
}

PlaceName.propTypes = {
    map: PropTypes.object.isRequired,
};

export default PlaceName;

// slowly fade in location details
