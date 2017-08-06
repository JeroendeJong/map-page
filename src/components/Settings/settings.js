import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cogIcon from '../../assets/cog.svg'
import './settings.css';

class Settings extends Component {

    constructor() {
        super();
        this.state = {
            showSettings: false,
            hover: false,
            settingsStyle: {
                display: 'none'
            }
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleButtonHover = this.handleButtonHover.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.map);


        // this.props.map.config.on('config retrieved')
        // this.props.map.config.on('config saved')
        // this.props.map.config.on('config not saved')



    }

    handleButtonClick() {
        if (!this.state.showSettings) {
            this.setState({
                showSettings: true,
                settingsStyle: { display: 'block' }
            });
        } else {
            this.setState({ showSettings: false }, () => {
                // TODO this makes sure that it hides the div after animation
                // otherwise it keeps a small div element of 10 by 10px which prevents interaction.
                // 400 ms is the time it takes for the animation to complete
                setTimeout( () => {
                    if (!this.state.showSettings) {
                        this.setState({ settingsStyle: { display: 'none' } });
                    }
                },400);
            });
        }
    }

    handleButtonHover(_, evt) {
        if (evt.type === 'react-mouseover' && !this.state.hover) {
            this.setState({ hover: true });
        } else if (evt.type === 'react-mouseleave' && this.state.hover ) {
            this.setState({ hover: false });
        }
    }

    handleLocationChange(evt) {
        if (evt.target.checked) {
            this.props.map.config.enableUserLocation();
        } else {
            this.props.map.config.disableUserLocation();
        }
    }

    renderButton() {
        const animitedClass = this.state.hover ? "settings-button-cog-animated" : ""
        return (
            <div className="settings-button" onClick={this.handleButtonClick} onMouseOver={this.handleButtonHover} onMouseLeave={this.handleButtonHover}>
                <img className={"settings-button-cog " + animitedClass} src={cogIcon} alt="Loading Cog" height="28" width="28"/>
            </div>
        )
    }

    renderView() {
        const animitedClass = this.state.showSettings ? "popup-show" : "popup-hide"
        return (
            <div className={"settings-view " + animitedClass} style={this.state.settingsStyle}>
                <form>
                    <label>
                        Show User Location:
                        <input name="userLocation" type="checkbox" onChange={this.handleLocationChange}/>
                    </label>

                </form>
            </div>
        )
    }

    render() {
        return (
            <div className="settings">
                {this.renderButton()}
                {this.renderView()}
            </div>
        )
    }
}

Settings.propTypes = {
    map: PropTypes.object.isRequired
}

export default Settings;
