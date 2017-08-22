
function StyleError(message) {
    this.name = 'IncorrectStyleError';
    this.message = message || 'Mapbox style incorrect';
    this.stack = (new Error()).stack;
}
StyleError.prototype = Object.create(Error.prototype);
StyleError.prototype.constructor = StyleError;

class Style {
    constructor(url, darkMode) {
        this.url = url;
        this.darkMode = darkMode;

        this.assertStyle();
    }

    assertStyle() {
        if (!this.url.startsWith('mapbox://styles')) {
            if (this.url.split('.').length === 2) {
                throw new StyleError('Classic Mapbox Style URLS are not supported');
            } else {
                throw new StyleError('Incorrect URL provide, does the mapbox url exist?');
            }
        }
        return this.url;
    }
}

export default Style;
