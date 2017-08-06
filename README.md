Chrome extension that replaces the new tab screen with a map from the mapbox styling. This extension still loads your bookmarks as usual so you can still easily access those!


Todo:

### Bookmarks Component:
- Parse bookmark name length to not exceed certain length and handle with ... at the end.
- if more main bookmarks than can be shown on screen, render an arrow icon next to the settings and when clicked it slides to the next main bookmarks.

### Place Name Component:
- Make styling dependant on map style (so you can always read the name)

### Map Component:
- Add option to slowly automatically pan the map
- Default the map interaction to false
- Find out a way to make user location quicker (maybe store it and when actual current location is in slowly pan over to that location)

###Style Class:
- fetch the style specs for a given style. If spec can't be retrieved, style does not exist. 