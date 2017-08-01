import React, { Component } from 'react';
import PropTypes from 'prop-types';
import folderIcon from '../../assets/default-foldericon.png'

class BookmarkItem extends Component {

    constructor() {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        switch (this.props.type) {
            case 'Link':

                // go to website
                return ''

            case 'Folder':

                // display children of said folder
                return ''
            default:
                return '';

        }
    }

    getIcon() {
        switch (this.props.type) {
            case 'Link':
                return 'https://www.google.com/s2/favicons?domain=' + this.props.url;
            case 'Folder':
                return folderIcon;
            default:
                return folderIcon;
        }
    }

    render() {
        return (
            <td>
                <div className="bookmark-item" onClick={this.handleOnClick} >
                    <img className="bookmark-item-favicon" src={this.getIcon()} width={this.props.type === 'Link' ? '16px' : '18px'} height='16px' alt='bookmark-favicon'/>
                    <div className="bookmark-item-title">{this.props.title}</div>
                </div>
            </td>
        );
    }
}

BookmarkItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    type: PropTypes.oneOf(['Folder', 'Link']).isRequired,
    bmChildren: PropTypes.arrayOf(PropTypes.object)
}


export default BookmarkItem;
