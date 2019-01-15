# Assignment #

The task is to build a simple podcast player.
Use this repo as the boilerplate, without modifying the included dev server.

## Provided Materials ##

Contained within this package is a simple dev server with the following endpoints:

`/api/episodes` returns episodes list.

`/api/episodes/:episode_id` returns info about one episode.


Install the dependencies by running `npm install`.
Run the server with `npm run dev`.
Then the server listens at port 8080, so for example the list of all episodes is at `http://localhost:8080/api/episodes`.

Static assets are in `/audio` and `/images`.

### Basic playback ###

The player allows the user to play, pause, seek forward/back (jump ahead or back five seconds), and to jump to a user-chosen point in the timeline.

### Markers ###

The player also features "markers". A marker is a text, an image or an advertisement that is shown to the user when the current playback time is within the markers start and end time. At most one marker is displayed at any point in time.

#### Text Link Marker ####

Displays text.

#### Image Link Marker ####

Displays an image.

#### Advertisement (Ad) Marker ####

Displays text that links to an external URL. 
