import React, {Component} from 'react';
import PropTypes from 'prop-types';
import folderIcon from '../../assets/default-foldericon.png'

class BookmarkDropdown extends Component {

    constructor() {
        super();

        this.state = {
            subtree: false,
            currentChildren: null
        }

        this.renderNextView = this.renderNextView.bind(this);
    }

    getFolderIcon() {
        return folderIcon
    }

    renderNextView(children) {
        this.setState({
            subtree: !this.state.subtree,
            currentChildren: children
        });
    }

    getIconForUrl(url) {
        return 'https://www.google.com/s2/favicons?domain=' + url;
    }

    renderLinkForBookmark(bookmark, key) {
        if (bookmark.children) {
            // it is a folder
            return (
                <li className="dropdown-element bookmarks-item" key={key} onClick={e => {
                    this.renderNextView(bookmark.children);
                }}>
                    <img className="bookmark-item-favicon" src={this.getFolderIcon()} alt="Folder" height="16" width="16"/>
                    <div className="bookmark-item-title">{bookmark.title}</div>
                </li>
            )

        } else {
            // just a link
            return (
                <li className="dropdown-element bookmarks-item" key={key}>
                    <a href={bookmark.url}>
                        <img className="bookmark-item-favicon" src={this.getIconForUrl(bookmark.url)} alt="Link" height="16" width="16"/>
                        <div className="bookmark-item-title">{bookmark.title}</div>
                    </a>
                </li>
            )
        }
    }

    createBookmarksArray(bm) {
        let elements = [];
        for (var i = 0; i < bm.length; i++) {
            const link = this.renderLinkForBookmark(bm[i], i);
            elements.push(link);
        }
        return elements;
    }

    render() {
        if (!this.props.bookmarks) {
            return null;
        }

        if (this.state.subtree) {
            return (
                <div>
                    <ul className="dropdown bookmarks-dropdown" >
                        {this.createBookmarksArray(this.props.bookmarks)}
                    </ul>
                    <BookmarkDropdown bookmarks={this.state.currentChildren}/>
                </div>
            )
        } else {
            return (
                <ul className="dropdown bookmarks-dropdown">
                    {this.createBookmarksArray(this.props.bookmarks)}
                </ul>
            )
        }
    }
}

BookmarkDropdown.propTypes = {
    bookmarks: PropTypes.arrayOf(PropTypes.object)
}

export default BookmarkDropdown;
