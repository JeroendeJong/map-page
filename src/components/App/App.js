import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookmarkView from '../Bookmarks/bookmarks-view';
import Settings from '../Settings/settings';
import PlaceName from '../place-name';
import './App.css';

const bookmarks = [{"children":[{"children":[{"children":[{"children":[{"children":[{"dateAdded":1502098207888,"id":"23","index":0,"parentId":"24","title":"random - Google Search","url":"https://www.google.nl/search?q=random&oq=random&aqs=chrome..69i57j0l5.1389j0j1&sourceid=chrome&ie=UTF-8"}],"dateAdded":1502098212370,"dateGroupModified":1502109238636,"id":"24","index":0,"parentId":"22","title":"New folder"},{"dateAdded":1502098192632,"id":"21","index":1,"parentId":"22","title":"hide ul bullets - Google Search","url":"https://www.google.nl/search?q=hide+ul+bullets&oq=hide+ul+&aqs=chrome.0.0j69i57j0l4.2249j0j1&sourceid=chrome&ie=UTF-8"}],"dateAdded":1502098200830,"dateGroupModified":1502098207888,"id":"22","index":0,"parentId":"17","title":"folder3"},{"dateAdded":1502024349886,"id":"16","index":1,"parentId":"17","title":"CSS Font Border? - Stack Overflow","url":"https://stackoverflow.com/questions/2570972/css-font-border"},{"dateAdded":1502024365879,"id":"18","index":2,"parentId":"17","title":"Belize - Wikipedia","url":"https://en.wikipedia.org/wiki/Belize"}],"dateAdded":1502024362075,"dateGroupModified":1502098192632,"id":"17","index":0,"parentId":"12","title":"folder2"},{"dateAdded":1501592866531,"id":"11","index":1,"parentId":"12","title":"Typechecking With PropTypes - React","url":"https://facebook.github.io/react/docs/typechecking-with-proptypes.html"},{"dateAdded":1501592882201,"id":"13","index":2,"parentId":"12","title":"Start Page Google Chrome","url":"http://localhost:3000/#12.26/37.7704/-122.4294"}],"dateAdded":1501592879470,"dateGroupModified":1502024349886,"id":"12","index":0,"parentId":"1","title":"ReactFolder"},{"children":[{"dateAdded":1502109238636,"id":"25","index":0,"parentId":"26","title":"Where To Get Support - React","url":"https://facebook.github.io/react/community/support.html"}],"dateAdded":1502109249259,"dateGroupModified":1502109249260,"id":"26","index":1,"parentId":"1","title":"MainFolder"},{"dateAdded":1478375833513,"id":"7","index":2,"parentId":"1","title":"React App","url":"http://localhost:3000/"},{"dateAdded":1501592770961,"id":"10","index":3,"parentId":"1","title":"HTML img tag","url":"https://www.w3schools.com/tags/tag_img.asp"}],"dateAdded":1478338934433,"dateGroupModified":1502109242813,"id":"1","index":0,"parentId":"0","title":"Bookmarks Bar"}]

class App extends Component {
    render() {
        return (
            <div className="App">
                <BookmarkView testBookmarks={bookmarks[0].children}/>
                <Settings map={this.props.map}/>
                <PlaceName map={this.props.map}/>
            </div>
        );
    }
}

App.propTypes = {
    map: PropTypes.object.isRequired
}

export default App;
