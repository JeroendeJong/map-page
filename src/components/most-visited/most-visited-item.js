import React, { Component } from 'react';
import PropTypes from 'prop-types';

const mode = {
    IMAGE: 'image',
    FAVICON: 'favicon',
    BASIC: 'basic'
};

const API = {
    image: 'website',
    favicon: 'favicon'
}

class MostVisitedItem extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            mode: ''
        };
    }

    componentWillMount() {
        this.props.map.mapConfig.on('config retrieved', (config) => {
            if (config.serverURL) {
                this.setState({
                    url: config.serverURL,
                    mode: mode.IMAGE // make optional later on
                });
            } else {
                this.setState({
                    mode: mode.BASIC
                });
            }
        });
        console.log(this.props.title, this.props.url);
    }

    renderImageMode() {
        const url = `${this.state.url}/${API[this.state.mode]}`;
        console.log('fetching: ', url);

        fetch(url, {
            mode: 'no-cors',
            headers: {
              'content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                url: this.props.url
            })
        }).then(resp => {
            console.log(resp);
        })

    }

    renderFaviconMode() {}

    renderBasicMode() {}

    render() {
        console.log(64, this.state.url);
        if (!this.state.url) {
            console.log(null);
            return null;
        }

        return (
            <div>
                {this.renderImageMode()}
            </div>
        );
    }
}

MostVisitedItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
};

export default MostVisitedItem;
