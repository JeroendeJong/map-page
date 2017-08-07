import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookmarkLink extends Component {

    getIconForUrl() {
        return 'https://www.google.com/s2/favicons?domain=' + this.props.url;
    }

    render() {
        return (
            <a href={this.props.url}>
                <div className="bookmarks-item" style={{ "borderLeft": "5px solid skyblue" }}>
                    <img className="bookmark-item-favicon" src={this.getIconForUrl()} alt="Smiley face" height="16" width="16"/>
                    <div className="bookmark-item-title">{this.props.title}</div>
                </div>
            </a>
        );
    }
}

BookmarkLink.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default BookmarkLink;
