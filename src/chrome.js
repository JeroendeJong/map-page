import env from './environment';
/*
*  Helper Functions
*/
function getChromeInstance() {
    return window.chrome;
}

function getLastRuntimeError() {
    return getChromeInstance() ? getChromeInstance().runtime.lastError : undefined;
}

/*
*  Local Storage Handlers
*/
function setItemToStorage(item, key) {
    if (!item || !key) {
        throw new Error('Both Item and Key must be present!');
    }

    return new Promise(((resolve, reject) => {
        if (!getChromeInstance()) {
            reject('No Chrome Object!');
        }

        if (!getChromeInstance().storage) {
            reject('No Storage Object! (check permission!)');
        }

        const obj = {};
        obj[key] = item;
        getChromeInstance().storage.sync.set(obj, () => {
            if (!getLastRuntimeError()) {
                resolve('Settings Saved!');
            } else {
                reject(getLastRuntimeError());
            }
        });
    }));
}

function getItemFromStorage(key) {
    if (!key) {
        throw new Error('Key must be present!');
    }

    return new Promise((resolve, reject) => {
        if (!getChromeInstance()) {
            reject('No Chrome Object!');
        }

        if (!getChromeInstance().storage) {
            reject('No Storage Object! (check permission!)');
        }

        getChromeInstance().storage.sync.get(key, (item) => {
            const resultLength = Object.keys(item).length;

            if (getLastRuntimeError()) {
                reject(getLastRuntimeError());
            } else if (resultLength === 0 || Object.keys(item[env.configKey]).length === 0) {
                reject('Item not Stored');
            } else {
                resolve(item[key]);
            }
        });
    });
}

/*
*  Bookmark Handler
*/
function getBookmarks() {
    return new Promise(((resolve, reject) => {
        if (!getChromeInstance()) {
            reject('No Chrome Object!');
        }

        if (!getChromeInstance().bookmarks) {

            if (env.env === 'development' && env.bookmarks) {
                resolve(env.bookmarks);
            } else {
                reject('No Bookmarks Object! (check permission!)');
            }
        }

        getChromeInstance().bookmarks.getTree((bm) => {
            if (!getLastRuntimeError()) {
                resolve(bm);
            } else {
                reject(getLastRuntimeError());
            }
        });
    }));
}

/*
*  TopSites Handler
*/
function getTopSites() {
    return new Promise(((resolve, reject) => {
        if (!getChromeInstance()) {
            reject('No Chrome Object!');
        }

        if (!getChromeInstance().topSites) {

            if (env.env === 'development' && env.topSites) {
                resolve(env.topSites);
            } else {
                reject('No topSites Object! (check permission!)');
            }
        }

        getChromeInstance().topSites.get((ts) => {
            if (!getLastRuntimeError()) {
                resolve(ts);
            } else {
                reject(getLastRuntimeError());
            }
        });
    }));
}

export default {
    setItemToStorage,
    getItemFromStorage,
    getBookmarks,
    getTopSites,
};
