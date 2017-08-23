import React from 'react';
import PropTypes from 'prop-types';

import BookmarkView from '../Bookmarks/bookmarks-view';
import Settings from '../Settings/settings';
import PlaceName from '../place-name';
import DateAndTime from '../date-time';
import env from '../../environment';

import './App.css';

function App(props) {
    let bookmarks = null;
    if (env.bookmarks) {
        bookmarks = env.bookmarks;
    }

    return (
        <div className="App">
            <BookmarkView testBookmarks={bookmarks} />
            <Settings map={props.map} />
            <PlaceName map={props.map} />
            <DateAndTime map={props.map} />
        </div>
    );
}

App.propTypes = {
    map: PropTypes.object.isRequired,
};

export default App;
