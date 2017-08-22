import React from 'react';
import PropTypes from 'prop-types';

import folderIcon from '../../assets/default-foldericon.png';

function BookmarkFolder(props) {
    return (
        <div
            className="bookmarks-button bookmarks-item"
            role="button"
            tabIndex={0}
            style={{ borderLeft: '5px solid gray' }}
            onClick={props.onClick}
        >
            <img
                className="bookmark-item-favicon"
                src={folderIcon}
                alt="Bookmark Folder Icon"
                height="16"
                width="16"
            />
            <div className="bookmark-item-title">{props.title}</div>
        </div>
    );
}


BookmarkFolder.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

BookmarkFolder.defaultProps = {
    onClick: null,
};

export default BookmarkFolder;
