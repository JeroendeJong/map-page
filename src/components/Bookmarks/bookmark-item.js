import React, {Component} from 'react';
import PropTypes from 'prop-types';
import folderIcon from '../../assets/default-foldericon.png'

class BookmarkItem extends Component {

    constructor() {
        super();
        this.state = {
            enableDropdown: false
        }

        this.handleFolderClick = this.handleFolderClick.bind(this);
    }

    handleFolderClick(e) {
        this.setState({
            enableDropdown: !this.state.enableDropdown
        })
    }

    getFolderIcon() {
        return folderIcon
    }

    getIconForUrl(url) {
        return 'https://www.google.com/s2/favicons?domain=' + url;
    }

    renderLink() {
        return (
            <a href={this.props.url}>
                <div className="bookmarks-button" style={{ "borderLeft": "5px solid skyblue" }}>
                    <img className="bookmark-item-favicon" src={this.getIconForUrl(this.props.url)} alt="Smiley face" height="16" width="16"/>
                    <div className="bookmark-item-title">{this.props.title}</div>
                </div>
            </a>
        )
    }

    renderFolder() {
        if (this.state.enableDropdown) {
            let elements = [];
            const bookmarks = this.props.bmChildren
            for (var i = 0; i < bookmarks.length; i++) {
                const img = bookmarks[i].children ? this.getFolderIcon() : this.getIconForUrl(bookmarks[i].url)

                elements.push(
                    <li className="dropdown-element" key={i}>
                        <a href={bookmarks[i].url}>
                        <img className="bookmark-item-favicon" src={img} alt="Smiley face" height="16" width="16"/>
                        <div className="bookmark-item-title">{bookmarks[i].title}</div>
                        </a>
                    </li>
                )
            }
            return this.baseFolderStructure(elements);
        } else {
            return this.baseFolderStructure();
        }
    }

    baseFolderStructure(elements) {
        return (
            <div className="bookmarks-button" onClick={this.handleFolderClick} style={{
                "borderLeft": "5px solid gray"
            }}>
                <img className="bookmark-item-favicon" src={this.getFolderIcon()} alt="Smiley face" height="16" width="16"/>
                <div className="bookmark-item-title">{this.props.title}</div>
                <ul className="dropdown">
                    {elements}
                </ul>

            </div>
        )
    }

    render() {
        let extraContent = null
        switch (this.props.type) {
            case 'Link':
                extraContent = this.renderLink();
                break;
            case 'Folder':
                extraContent = this.renderFolder();
                break;
            default:
                extraContent = this.renderLink();
                break;
        }

        return <td>
            {extraContent}
        </td>
    }
}

BookmarkItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    type: PropTypes.oneOf(['Folder', 'Link', 'FolderLink']).isRequired,
    bmChildren: PropTypes.arrayOf(PropTypes.object)
}

export default BookmarkItem;

