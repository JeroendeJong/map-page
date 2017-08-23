import React from 'react';
import PropTypes from 'prop-types';

function getIconForUrl(url) {
    return `https://www.google.com/s2/favicons?domain=${url}`;
}

function BookmarkLink(props) {
    return (
        <a href={props.url}>
            <div className="bookmarks-item" style={{ borderLeft: '5px solid skyblue' }}>
                <img
                    className="bookmark-item-favicon"
                    src={getIconForUrl(props.url)}
                    alt="Bookmark Favicon"
                    height="16"
                    width="16"
                />
                <div>{props.title}</div>
            </div>
        </a>
    );
}

BookmarkLink.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default BookmarkLink;
