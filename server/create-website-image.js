const webshot = require('webshot');
const fs = require('fs');

class WebsiteImage {
    constructor(url) {
        this.url = url;
        this.outputUrl = `server/images/website/${this.url.split('www.')[1]}.png`;
    }

    request() {
        return new Promise((resolve, reject) => {

            if ( fs.existsSync(this.outputUrl) ) {
                resolve(this.outputUrl);
            } else {
                webshot(this.url, this.outputUrl, err => {
                    if (!err) {
                        resolve(this.outputUrl);
                    } else {
                        resolve(err);
                    }
                });
            }
        });
        console.log('request');
    }
}

module.exports = WebsiteImage;
