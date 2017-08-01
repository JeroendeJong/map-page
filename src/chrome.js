function getBookmarks() {
    return new Promise(function(resolve, reject) {
        if (!_getChromeInstance() ) {
            reject('No Chrome Object!');
        }

        if (!_getChromeInstance().bookmarks) {
            reject('No Bookmarks Object! (check permission!)');
        }

        _getChromeInstance().bookmarks.getTree( bm => {
            resolve(bm);
        });


    });
}

function getTopSites() {
    return new Promise(function(resolve, reject) {
        if (!_getChromeInstance()) {
            reject('No Chrome Object!');
        }

        if (!_getChromeInstance().topSites) {
            reject('No topSites Object! (check permission!)');
        }

        _getChromeInstance().topSites.get( ts => {
            resolve(ts)
        });
    });
}

function _getChromeInstance() {
    return window.chrome;
}

export default {
    getBookmarks,
    getTopSites,
}