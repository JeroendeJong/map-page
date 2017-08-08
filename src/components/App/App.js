import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookmarkView from '../Bookmarks/bookmarks-view';
import Settings from '../Settings/settings';
import PlaceName from '../place-name';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BookmarkView/>
                <Settings map={this.props.map}/>
                <PlaceName map={this.props.map}/>
            </div>
        );
    }
}

App.propTypes = {
    map: PropTypes.object.isRequired
}

export default App;
