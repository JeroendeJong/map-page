import mapboxgl from 'mapbox-gl';
import {EventEmitter} from 'events';
import csvParser from 'comma-separated-values';

import './map.css';
import CitiesUrl from '../assets/countries.csv';

mapboxgl.accessToken = 'pk.eyJ1IjoieTBneiIsImEiOiJjaW9scWxsNzIwMDMxdzVtNm56MHhweGdjIn0.XrmaYtqwrszezXe9y-gBuw';

class Map extends EventEmitter {

    constructor(config) {
        super();
        this.map = null;
        this.style = null;
        this.location = null;
        this.mapConfig = config;
        this.mapConfig.once('config retrieved', this.CreateMap.bind(this));
    }

    CreateMap() {
        this.getMapLocation().then(location => {
            this._createMap(location);
            this.location = location;
            this.emit('location retrieved', location);
        }).catch(err => {
            console.log('Map not Loaded:  ', err);
        });
    }

    _createMap(centre) {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.getRandomStyle(),
            center: [centre.long, centre.lat],
            zoom: 13,
            hash: true
        });
    }

    getRandomStyle() {
        const stylesArr = this.mapConfig.config.styles;
        const randIdx = Math.floor(Math.random() * stylesArr.length);
        return stylesArr[randIdx];
    }

    getMapLocation() {
        const self = this;
        return new Promise(function(resolve, reject) {
            if (self.mapConfig.config.userLocation) {
                self.getUserLocation()
                    .then(succes => { resolve(succes); })
                    .catch(err => { reject(err); });
            } else {
                self.getRandomCity()
                    .then(succes => { resolve(succes) })
                    .catch(err => { reject(err); });
            }
        });
    }

    getUserLocation() {
        return new Promise(function(resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const loc = new Location(pos.coords.latitude, pos.coords.longitude);
                    resolve(loc);
                }, err => {
                    reject(err);
                });
            } else {
                reject('No Geolocation available');
            }
        });
    }

    getRandomCity() {
        return new Promise(function(resolve, reject) {
            fetch(CitiesUrl).then(response => {

                if (response.ok) {
                    return response.text()
                } else {
                    reject(response.statusText);
                }

            }).then(data => {
                const handler = new csvParser(data, {header: true});
                const csv = handler.parse();
                const randIdx = Math.floor( Math.random() * csv.length)
                const entry = csv[randIdx];
                console.log(entry);
                const loc = new Location(entry.lat, entry.lng, {
                    name: entry.city,
                    region: `${entry.province}, ${entry.country}`
                });

                resolve(loc);
            }).catch(err => {
                reject(err);
            });
        });
    }
}


class Location {
    name: null
    region: null
    lat: null
    long: null

    constructor(lat, long, opt) {
        if (!lat || !long) {
            throw new Error('Location needs a lat and long value!');
        }

        this.lat = lat;
        this.long = long;
        this.name = opt.name || null;
        this.region = opt.region || null;
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

export default Map;