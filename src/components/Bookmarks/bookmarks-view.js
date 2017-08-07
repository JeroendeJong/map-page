//Library Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Project Imports
import Chrome from '../../chrome';
import BookmarkLink from './bookmark-link';
import BookmarkFolder from './bookmark-folder';

import BookmarkDropdown from './bookmark-dropdown';
import './bookmarks.css';

const BookmarkLength = 170;

class BookmarkView extends Component {

    constructor() {
        super();
        this.state = {
            bookmarks: null,
            showDropdown: false,
            currentChildren: null,
            currentSelectedIdx: null,

            currentPage: 0,
            windowWidth: null,
            pagesNeeded: null,
            maxBookmarksOnPage: null
        }

        this.handleFolderClick = this.handleFolderClick.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.updateWindowSize);
        this.getBookmarks();
        this.updateWindowSize();
    }

    getBookmarks() {
        if (this.props.testBookmarks) {
            this.setState({bookmarks: this.props.testBookmarks})
        } else {
            Chrome.getBookmarks().then( bm => {

                const containerTypes = bm[0].children;
                const bookmarks = containerTypes.filter(e => {
                    return e.title === 'Bookmarks Bar'
                })[0];

                const maxBmOnPage = parseInt(window.innerWidth / BookmarkLength, 10);
                this.setState({
                    bookmarks: bookmarks,
                    pagesNeeded: Math.ceil(bookmarks.length / maxBmOnPage)
                });
            });
        }
    }

    updateWindowSize() {
        const maxBmOnPage = parseInt(window.innerWidth / BookmarkLength, 10);
        this.setState({
            windowWidth: window.innerWidth,
            maxBookmarksOnPage: maxBmOnPage,

        });
    }

    handleFolderClick(bmChildren, index) {
        this.setState({
            showDropdown: !this.state.showDropdown,
            currentChildren: bmChildren,
            currentSelectedIdx: index
        });
    }

    handleChangePage(direction) {
        let page;
        if (direction === 'next') {
            page = this.state.currentPage + 1;
        } else {
            page = this.state.currentPage === 0 ? 0 : this.state.currentPage -1;
        }
        this.setState({currentPage: page});
    }

    renderBookmark(bmGroup, i) {
        if (bmGroup.children) {
            return <BookmarkFolder title={bmGroup.title} onClick={e => this.handleFolderClick(bmGroup.children, i)}/>
        } else {
            return <BookmarkLink title={bmGroup.title} url={bmGroup.url}/>
        }
    }

    renderDropdown() {
        if (this.state.showDropdown) {
            let margin = ((this.state.currentSelectedIdx % this.state.maxBookmarksOnPage) * 139) + 13;
            if (this.state.currentPage > 0) {
                margin += 27;
            }

            return (
                <div style={{
                    position: 'absolute',
                    marginTop: '48px',
                    marginLeft: `${margin}px`
                }}>
                    <BookmarkDropdown bookmarks={this.state.currentChildren} />
                </div>
            )
        }
        return null;
    }

    renderPaginationButton(direction) {
        const classes = `bookmarks-item bookmark-page-button bookmark-${direction}-button`
        return (
            <div className={classes} onClick={ () => this.handleChangePage(direction)}/>
        )
    }

    calculateStartingPosition() {
        const amountBookmarks = this.state.bookmarks.length;
        const maxBookmarks = this.state.maxBookmarksOnPage;
        const currentPage = this.state.currentPage;

        const start = amountBookmarks < maxBookmarks ? amountBookmarks * currentPage : maxBookmarks * currentPage;
        const end = amountBookmarks - start < maxBookmarks ?  amountBookmarks : maxBookmarks * (currentPage + 1);

        return {start,end};
    }

    render() {
        if (!this.state.bookmarks || !this.state.maxBookmarksOnPage) {
            return null;
        }

        let output = [];
        const bm = this.state.bookmarks;
        const r = this.calculateStartingPosition()

        for (let i = r.start; i < r.end; i++) {
            output.push(
                <td key={i}> {this.renderBookmark(bm[i], i)} </td>
            )
        }

        return (
            <div className="bookmarks-view">
                <table className="bookmarks-view-table">
                    <tbody>
                        <tr>
                            {this.state.currentPage > 0 &&
                                <td>{this.renderPaginationButton('back')}</td>
                            }
                            {output}
                            {r.end < this.state.bookmarks.length &&
                                <td>{this.renderPaginationButton('next')}</td>
                            }
                        </tr>
                    </tbody>
                </table>
                {this.renderDropdown()}
            </div>
        );
    }
}

BookmarkView.propTypes = {
    testBookmarks: PropTypes.arrayOf(PropTypes.object)
}


export default BookmarkView;
