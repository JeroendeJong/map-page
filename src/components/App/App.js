import React from 'react';
import PropTypes from 'prop-types';

import BookmarkView from '../Bookmarks/bookmarks-view';
import Settings from '../Settings/settings';
import PlaceName from '../place-name';
import './App.css';

function App(props) {
    return (
        <div className="App">
            <BookmarkView />
            <Settings map={props.map} />
            <PlaceName map={props.map} />
        </div>
    );
}

App.propTypes = {
    map: PropTypes.object.isRequired,
};

export default App;
