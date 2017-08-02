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
        this.getMapCentre().then(location => {
            this._createMap(location);
        }).catch(err => {
            console.log('Map not Loaded:  ', err);
        })
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

    getMapCentre() {
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

                    resolve({
                        lat: pos.coords.latitude,
                        long: pos.coords.longitude
                    });
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

                resolve({
                    name: entry.city,
                    region: `${entry.province}, ${entry.country}`,
                    lat: entry.lat,
                    long: entry.lng
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    getInterestingLocation() {}


}

export default Map;