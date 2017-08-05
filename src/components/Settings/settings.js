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
                display: 'block'
            }

        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleButtonHover = this.handleButtonHover.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
    }

    handleButtonClick() {
        if (!this.state.showSettings) {
            this.setState({
                showSettings: true,
                settingsStyle: {
                    display: 'block'
                }
            });
        } else {
            this.setState({
                showSettings: false
            }, () => {
                // TODO improve how this works. this makes sure that it hides the div after animation
                // otherwise it keeps a small div element of 10 by 10px which prevents interaction.
                // 400 ms is the time it takes for the animation to complete
                setTimeout( () => {
                    if (!this.state.showSettings) {
                        this.setState({
                            settingsStyle: {
                                display: 'none'
                            }
                        });
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

    handleLocationClick(e) {
        console.log(e);
    }

    renderButton() {
        const animitedClass =  this.state.hover ? "settings-button-cog-animated" : ""
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
                        Is going:
                        <input name="userLocation" type="checkbox" onChange={this.handleLocationClick}/>
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

export default Settings;
