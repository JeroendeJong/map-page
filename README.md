# Chrome Extension Mapbox Page
Chrome extension that replaces the new tab screen with a map from the Mapbox styling. This extension still loads your bookmarks as usual so you can still easily access those!

#### Steps to create the extension build for Chrome:
1. Install node modules: `npm install`
2. Build the project: `npm run build:test` (`build:production` also create .crx and .pem key which you only need for publishing)
3. Go To `chrome://extensions` in the browser
4. Enable developer mode and add the `build/` folder as an unpacked extension
5. Open a new tab and the page should be a beautifull map :)

## Todo's:

### Bookmarks Component:
- [ ] Parse bookmark name length to not exceed certain length and handle with ... at the end.
- [x] if more main bookmarks than can be shown on screen, render an arrow icon next to the settings and when clicked it slides to the next main bookmarks.

### Place Name Component:
- [x] Make styling dependent on map style (so you can always read the name)

### Map Component:
- [ ] Add option to slowly automatically pan the map
- [ ] Default the map interaction to false
- [ ] Find out a way to make user location quicker (maybe store it and when actual current location is in slowly pan over to that location)

### Settings Component:
- [ ] Make background semi-transparent black
- [ ] On background click remove settings view
- [ ] change rotating cog to stop instead of snapping back to starting position

### Style Class:
- [ ] fetch the style specs for a given style. If spec can't be retrieved, style does not exist.

### General:
- [ ] Add your own list of coordinates in CSV format
