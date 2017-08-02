/*
*  Local Storage Handlers
*/
function setItemToStorage(item, key) {
    if (!item || !key) {
        throw new Error('Both Item and Key must be present!')
    }

    return new Promise(function(resolve, reject) {
        if (!_getChromeInstance() ) {
            reject('No Chrome Object!');
        }

        if (!_getChromeInstance().storage) {
            reject('No Storage Object! (check permission!)');
        }

        _getChromeInstance().storage.sync.set({key, item}, () => {
            if (!_getLastRuntimeError) {
                resolve('Settings Saved!');
            } else {
                reject(_getLastRuntimeError)
            }
        });
    });
}

function getItemFromStorage(key) {
    if (!key) {
        throw new Error('Key must be present!')
    }

    return new Promise(function(resolve, reject) {
        if (!_getChromeInstance() ) {
            reject('No Chrome Object!');
        }

        if (!_getChromeInstance().storage) {
            reject('No Storage Object! (check permission!)');
        }

        _getChromeInstance().storage.sync.get(key, items => {
            if (!_getLastRuntimeError) {
                resolve(items);
            } else {
                reject(_getLastRuntimeError)
            }
        });
    });
}

/*
*  Bookmark Handler
*/
function getBookmarks() {
    return new Promise(function(resolve, reject) {
        if (!_getChromeInstance() ) {
            reject('No Chrome Object!');
        }

        if (!_getChromeInstance().bookmarks) {
            reject('No Bookmarks Object! (check permission!)');
        }

        _getChromeInstance().bookmarks.getTree( bm => {
            if (!_getLastRuntimeError) {
                resolve(bm);
            } else {
                reject(_getLastRuntimeError)
            }
        });
    });
}

/*
*  TopSites Handler
*/
function getTopSites() {
    return new Promise(function(resolve, reject) {
        if (!_getChromeInstance()) {
            reject('No Chrome Object!');
        }

        if (!_getChromeInstance().topSites) {
            reject('No topSites Object! (check permission!)');
        }

        _getChromeInstance().topSites.get( ts => {
            if (!_getLastRuntimeError) {
                resolve(ts);
            } else {
                reject(_getLastRuntimeError)
            }
        });
    });
}

/*
*  Helper Functions
*/
function _getChromeInstance() {
    return window.chrome;
}

function _getLastRuntimeError() {
    return _getChromeInstance() ? _getChromeInstance().runtime.lastError : undefined
}

export default {
    setItemToStorage,
    getItemFromStorage,
    getBookmarks,
    getTopSites
}