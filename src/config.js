import { EventEmitter } from 'events';

import Chrome from './chrome';
import { Style } from './mapbox';

const defaultConfig = {
    styles: [
        new Style('mapbox://styles/mapbox/streets-v9', true),
        new Style('mapbox://styles/mapbox/light-v9', true),
        new Style('mapbox://styles/mapbox/dark-v9', false),
        new Style('mapbox://styles/mapbox/outdoors-v9', true),
        new Style('mapbox://styles/mapbox/satellite-streets-v9', false),
        new Style('mapbox://styles/mapbox/satellite-v9', false),
    ],
    userLocation: false,
};

class Config extends EventEmitter {
    constructor() {
        super();
        this.config = null;
        this.setConfig();
    }

    setConfig() {
        this.getConfigFromStorage().then((config) => {
            this.config = config;
            this.emit('config retrieved', config);
        }).catch(() => {
            this.config = defaultConfig;
            this.emit('config retrieved', defaultConfig);
        });
    }

    getConfigFromStorage() {
        return Chrome.getItemFromStorage('mapConfig');
    }

    putConfigToStorage() {
        Chrome.setItemToStorage(this.config, 'mapConfig').then(() => {
            this.emit('config saved', this.config);
        }).catch((err) => {
            if (err) { throw new Error(err); }
            this.getConfigFromStorage();
            this.emit('config not saved', this.config);
        });
    }

    addStyle(styleUrl) {
        this.config.styles.push(styleUrl);
        this.putConfigToStorage();
    }

    removeStyle(styleUrl) {
        const index = this.config.styles.indexOf(styleUrl);
        if (index > -1) {
            this.config.styles.splice(index, 1);
        }
        this.putConfigToStorage();
    }

    enableUserLocation() {
        this.config.userLocation = true;
        this.putConfigToStorage();
    }

    disableUserLocation() {
        this.config.userLocation = false;
        this.putConfigToStorage();
    }
}


export default Config;
