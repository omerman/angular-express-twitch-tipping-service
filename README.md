# angular-express-twitch-tipping-service

## Description

This app is here to help with writing an application that mocks a tipping service using some of twitch's api. under /tip, you can tip a user. under /dashboard you can view tips and get real time tips. the /overlay is a page you add as a browser plugin for obs(this is for the streamers), the streaming platform, in this page you get live notifications about incoming tips.

## Installation

* `npm i`

## Development
* Linux: `MONGO_URI=<your mongo uri> npm start`, Windows: `set MONGO_URI=<your mongo uri> && npm start`

## Prod - If one ever feel the need to actually see this as more than a demo
* Well, the obvious things would be using the real twitch tipping service, also styling the application.
* Remove any usages of the dummy twitch account I opened. see `authentication/index.js` and `app/core/get-twitch-client-id.js`




