import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookmarkView from '../Bookmarks/bookmarks-view';
import PlaceName from '../place-name';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BookmarkView/>
                <PlaceName map={this.props.map}/>
            </div>
        );
    }
}

App.propTypes = {
    map: PropTypes.object.isRequired
}

export default App;
