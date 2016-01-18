# nhl-recap

[![Build Status](https://travis-ci.org/peruukki/nhl-recap.svg?branch=master)](https://travis-ci.org/peruukki/nhl-recap)

A web app playing back the latest NHL scores fetched from [nhl-score-api](https://github.com/peruukki/nhl-score-api).
Built with [Cycle.js](http://cycle.js.org/) and `npm` scripts.

The app is running at [GitHub pages](http://peruukki.github.io/nhl-recap/).


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

## Linting JavaScript

One-time lint run:
```
npm run lint
```

Lint on file changes:
```
npm run lint-watch
```

## Testing

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
and create a commit, ready to be pushed:
```
npm run publish
```

## License

[MIT](LICENSE)

## Acknowledgements

This project is a grateful recipient of the
[Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities?utm_source=github&utm_medium=spice).
