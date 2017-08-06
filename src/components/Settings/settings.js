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
            },
            config: null
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.HandleButtonHoverOn = this.HandleButtonHoverOn.bind(this);
        this.HandleButtonHoverOff = this.HandleButtonHoverOff.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);

        this.getDefaultStateForInput = this.getDefaultStateForInput.bind(this)
    }

    componentDidMount() {
        this.props.map.mapConfig.on('config retrieved', config => {
            this.setState({ config: config });
        });

        this.props.map.mapConfig.on('config saved', config => {
            this.setState({ config: config });
        })

        this.props.map.mapConfig.on('config not saved', config => {
            this.setState({ config: config })
        })
    }

    getDefaultStateForInput(inputName) {
        console.log(inputName);
        const config = this.state.config

        switch (this.state.inputName) {
            case 'userLocation':
                return config ? config.userLocation : false;
                break;
            default:
                return config ? config.userLocation : false;
        }


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

    HandleButtonHoverOn() {
        if (!this.state.hover) {
            this.setState({ hover: true });
        }
    }

    HandleButtonHoverOff() {
        if (this.state.hover) {
            this.setState({ hover: false });
        }
    }

    handleLocationChange(evt) {
        if (evt.target.checked) {
            this.props.map.mapConfig.enableUserLocation();
        } else {
            this.props.map.mapConfig.disableUserLocation();
        }
    }

    renderButton() {
        const animitedClass = this.state.hover ? "settings-button-cog-animated" : ""
        return (
            <div className="settings-button" onClick={this.handleButtonClick} onMouseOver={this.HandleButtonHoverOn} onMouseLeave={this.HandleButtonHoverOff}>
                <img className={"settings-button-cog " + animitedClass} src={cogIcon} alt="Loading Cog" height="28" width="28"/>
            </div>
        )
    }

    renderView() {
        const animitedClass = this.state.showSettings ? "popup-show" : "popup-hide"
        return (
            <div className={"settings-view " + animitedClass} style={this.state.settingsStyle}>
                <h2 className="settings-view-header">
                    Extension Settings:
                </h2>
                <form>
                    <label>
                        Show User Location (Slow):
                        <input name="userLocation" type="checkbox" value={ e => { return this.getDefaultStateForInput('userLocation') }} onChange={this.handleLocationChange}/>
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
