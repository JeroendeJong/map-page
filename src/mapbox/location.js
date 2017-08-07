import mapboxgl from 'mapbox-gl';

class Location {
    name: null
    region: null
    lat: null
    long: null

    constructor(lat, long, opt) {
        if (!lat || !long) {
            throw new LocationError('Location needs a lat and long value!');
        }

        if (this.assertLatLong(lat, long)) {
            throw new LocationError('Invalid latitude or longitude value, maybe they are switched?')
        }
        opt = opt || {};

        this.lat = lat;
        this.long = long;
        this.name = opt.name || null;
        this.region = opt.region || null;
    }

    assertLatLong(lat, long) {
        const isLat = lat > -90 && lat < 90;
        const isLong = long > -180 && long < 180;
        return !isLat || !isLong
    }

    getNameAndRegion() {
        const self = this;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.long},${this.lat}.json?types=place&access_token=${mapboxgl.accessToken}`

        return new Promise(function(resolve, reject) {
            fetch(url)
                .then(resp => { return resp.json(); })
                .then(json => {
                    if (json.features.length > 0) {
                        self.name = json.features[0].text;
                        const placeArr = json.features[0].place_name.split(',')
                        self.region = `${placeArr[1]}, ${placeArr[2]}`;
                        resolve(self);
                    } else {
                        reject('No Geocoding available for location');
                    }
                }).catch(err => {
                    reject(err);
                })
        });
    }
}

function LocationError(message) {
  this.name = 'LocationError';
  this.message = message || 'Location Error';
  this.stack = (new Error()).stack;
}
LocationError.prototype = Object.create(Error.prototype);
LocationError.prototype.constructor = LocationError;

export default Location;