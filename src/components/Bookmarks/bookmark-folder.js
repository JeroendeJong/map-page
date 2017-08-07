import React, {Component} from 'react';
import PropTypes from 'prop-types';

import folderIcon from '../../assets/default-foldericon.png';

class BookmarkFolder extends Component {

    getFolderIcon() {
        return folderIcon;
    }

    render() {
        return (
            <div className="bookmarks-button bookmarks-item" style={{ "borderLeft": "5px solid gray" }} onClick={this.props.onClick}>
                <img className="bookmark-item-favicon" src={this.getFolderIcon()} alt="Smiley face" height="16" width="16"/>
                <div className="bookmark-item-title">{this.props.title}</div>
            </div>
        );
    }
}

BookmarkFolder.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default BookmarkFolder;
