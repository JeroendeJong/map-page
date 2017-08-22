import React, { Component } from 'react';
import PropTypes from 'prop-types';
import folderIcon from '../../assets/default-foldericon.png';

function getIconForUrl(url) {
    return `https://www.google.com/s2/favicons?domain=${url}`;
}

class BookmarkDropdown extends Component {
    constructor() {
        super();

        this.state = {
            subtree: false,
            currentChildren: null,
        };

        this.renderNextView = this.renderNextView.bind(this);
    }

    createBookmarksArray(bm) {
        const elements = [];
        for (let i = 0; i < bm.length; i += 1) {
            const link = this.renderLinkForBookmark(bm[i], i);
            elements.push(link);
        }
        return elements;
    }

    renderLinkForBookmark(bookmark, key) {
        if (bookmark.children) {
            // it is a folder
            return (
                <li key={key}>
                    <div
                        role="button"
                        tabIndex={0}
                        className="dropdown-element bookmarks-item"
                        onClick={() => {
                            this.renderNextView(bookmark.children);
                        }}
                    >
                        <img
                            className="bookmark-item-favicon"
                            src={folderIcon}
                            alt="Folder"
                            height="16"
                            width="16"
                        />
                        <div className="bookmark-item-title">{bookmark.title}</div>
                    </div>
                </li>
            );
        }
        // just a link
        return (
            <li className="dropdown-element bookmarks-item" key={key} >
                <a href={bookmark.url}>
                    <img
                        className="bookmark-item-favicon"
                        src={getIconForUrl(bookmark.url)}
                        alt="Link"
                        height="16"
                        width="16"
                    />
                    <div className="bookmark-item-title">{bookmark.title}</div>
                </a>
            </li>
        );
    }

    renderNextView(children) {
        this.setState({
            subtree: !this.state.subtree,
            currentChildren: children,
        });
    }

    render() {
        if (!this.props.bookmarks) {
            return null;
        }

        if (this.state.subtree) {
            return (
                <div>
                    <ul className="dropdown bookmarks-dropdown">
                        {this.createBookmarksArray(this.props.bookmarks)}
                    </ul>
                    <BookmarkDropdown bookmarks={this.state.currentChildren} />
                </div>
            );
        }
        return (
            <ul className="dropdown bookmarks-dropdown">
                {this.createBookmarksArray(this.props.bookmarks)}
            </ul>
        );
    }
}

BookmarkDropdown.propTypes = {
    bookmarks: PropTypes.arrayOf(PropTypes.object),
};

BookmarkDropdown.defaultProps = {
    bookmarks: {},
};

export default BookmarkDropdown;
