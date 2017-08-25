const fetch = require('node-fetch');
const cheerio = require('cheerio')


class Favicon {
    constructor(url) {
        this.url = url;
    }

    request() {
        console.log('requesting Favicon for: ', this.url);

        return new Promise( (resolve, reject) => {
            fetch(this.url).then((response) => {
                return response.text();
            }).then((html) => {
                const $html = cheerio.load(html);
                const iconURL = this.getFavicon($html);

                if (iconURL) {
                    resolve({
                        icon_url: iconURL,
                        url: this.url,
                        error: undefined
                    });
                } else {
                    resolve({
                        error: 'no Icon found',
                        html
                    });
                }

            })
        });
    }

    getFavicon(html) {
        // const manifestUrl = this.getManifestBasedIcons(html);
        // if (manifestUrl) {
        //     return manifestUrl;
        // }

        const appleUrl = this.getAppleIcons(html);
        if (appleUrl) {
            return appleUrl;
        }

        const relUrl = this.getRelBasedIcon(html);
        if (relUrl) {
            return relUrl;
        }

        return '';
    }

    getManifestBasedIcons(html) {
        const manifest = html('link[rel=manifest]');
        if (manifest) {
            const manifestUrl = this.makeUrl(manifest[0].attribs.href);

            fetch(manifestUrl).then(response => {
                return response.json();
            }).then(manifest => {
                if (manifest.icons) {
                    // use icons
                }
            });
        } else {
            return null;
        }
    }

    getAppleIcons(html) {
        const icons = html('link[rel="apple-touch-icon"]');
        if (icons.length === 0) {
            return null;
        }

        if (icons.length === 1) {
            return this.makeUrl(icons[0].attribs.href);
        }
    }

    getRelBasedIcon(html) {
        const icons = html('link[rel="icon"]');
        if (icons.length === 0) {
            return null;
        }

        if (icons.length === 1) {
            return this.makeUrl(icons[0].attribs.href);
        }

        if (icons.length > 1) {
            let sizes = [];

            for (var i = 0; i < icons.length; i++) {
                const attr = icons[i].attribs;
                attr.type = attr.type || '';
                attr.sizes = attr.sizes || '0x0';

                if (attr.type.search('svg') !== -1) {
                    return this.makeUrl(attr.href);
                }

                sizes.push({
                    idx: i,
                    size: parseInt(attr.sizes.split('x')[0])
                });
            }

            let maxVal = { size: 0 };
            sizes.map(e =>  maxVal = e.size > maxVal.size ? e : maxVal)

            return this.makeUrl(icons[maxVal.idx].attribs.href);
        }
    }

    makeUrl(faviconUrl) {
        if (faviconUrl.search('http') === -1 && faviconUrl.search('www.') === -1) {
            return  `${this.url}${faviconUrl}`;
        } else {
            return faviconUrl;
        }
    }
}

module.exports = Favicon;
