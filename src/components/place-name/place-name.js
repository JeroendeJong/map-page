import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './place-name.css';

class PlaceName extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            region: null
        }
    }

    componentDidMount() {
        this.props.map.on('location retrieved', this.locationParse.bind(this));
    }

    locationParse(location) {
        console.log(location);
        this.setState({
            name: location.name,
            region: location.region
        });
    }

    render() {

        if (!this.state.name || !this.state.region) {
            return null;
        }

        return (
            <div className="place-name">
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
    map: PropTypes.object.isRequired
}

export default PlaceName;

// slowly fade in location details