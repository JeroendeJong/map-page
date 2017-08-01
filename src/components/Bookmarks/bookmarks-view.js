//Library Imports
import React, { Component } from 'react';

//Project Imports
import Chrome from '../../chrome';
import BookmarkItem from './bookmark-item';
import './bookmarks.css';

class BookmarkView extends Component {

    constructor() {
        super();
        this.state = {
            bookmarks: null
        }
    }

    componentWillMount() {
        Chrome.getBookmarks().then( bm => {
            const Bookmarks = this._parseBookmarks(bm);
            this.setState({bookmarks: Bookmarks});
        });
    }

    _parseBookmarks(bookmarksTree) {
        const containerTypes = bookmarksTree[0].children;
        const bookmarksBar = containerTypes.filter(e => {
            return e.title === 'Bookmarks Bar'
        })[0];

        let output = [];
        for (let child of bookmarksBar.children) {
            output.push(this._parseBookMarkGroup(child));
        }
        return output;
    }

    _parseBookMarkGroup(bmGroup) {
        if (bmGroup.children) {
            return <BookmarkItem title={bmGroup.title} type={'Folder'} bmChildren={bmGroup.children}/>
        } else {
            return <BookmarkItem title={bmGroup.title} url={bmGroup.url} type={'Link'}/>
        }
    }

    render() {
        if (this.state.bookmarks) {

            return (
                <div className="bookmarks-view">
                    <table>
                        <tbody>
                            <tr> {this.state.bookmarks} </tr>
                        </tbody>
                    </table>
                </div>


            )


        }

        return null

    }
}

export default BookmarkView;
