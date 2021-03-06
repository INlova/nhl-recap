# nhl-recap

[![Build Status](https://travis-ci.org/peruukki/nhl-recap.svg?branch=master)](https://travis-ci.org/peruukki/nhl-recap)

A web app playing back the latest NHL scores fetched from [nhl-score-api](https://github.com/peruukki/nhl-score-api).
Built with [Cycle.js](http://cycle.js.org/) and `npm` scripts.

The app is running at [GitHub pages](http://peruukki.github.io/nhl-recap/). Add it to your home screen on Android for
a more app-like, chromeless experience.

## Running the app

To run the app and re-build on file changes:
```
npm start
```

NOTE: the app is opened in the browser too early, before it has been built. Just refresh the browser when you see
a message like this in the console:

```
1087061 bytes written to public/app.js (5.39 seconds)
```

## Running the app with local API server

To run the app using a local [nhl-score-api](https://github.com/peruukki/nhl-score-api) server on port 8080:
```
npm run start:local
```

## Linting JavaScript

One-time lint run:
```
npm run lint:js
```

Lint on file changes:
```
npm run watch:lint:js
```

## Linting SASS

I'm trying out the [BEM (Block-Element-Modifier)](http://getbem.com/introduction/) [naming convention](http://getbem.com/naming/)
in this project.

The lint scripts have a `css` suffix (instead of `sass` that you might expect) for uniformity with the other CSS related scripts.

One-time lint run:
```
npm run lint:css
```

Lint on file changes:
```
npm run watch:lint:css
```

## Testing

Lint SASS, lint JavaScript and run the tests:
```
npm test
```

## Building

Build the app to the `public` directory:
```
npm run build
```

## Publishing the app on GitHub pages

The `publish` script will build the app, clone the `gh-pages` branch to the `dist` directory, copy the build there,
create a commit, and push the commit to the `gh-pages` branch in `origin`:
```
npm run publish
```

## Generating SVG icon data with different fill colors

The `app/icons` directory contains SVG icons with a placeholder fill color `${fillColor}`. The `generate-svg-data.js`
script takes a filename and fill color and generates URI encoded SVG data that can be used in a `background-image` CSS
declaration. This helps to generate differently colored versions of the same icon, for example for different button
states.

You can use the `svg` `npm` script to generate the SVG data, for example:

```
npm run svg play.svg '#D0D1E2'
```

## License

[MIT](LICENSE)

## Acknowledgements

This project is a grateful recipient of the
[Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities?utm_source=github&utm_medium=spice).
