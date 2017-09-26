# TypeScript + React + Express Template

## At a glance.

```
$ npm run init	// install packages global and modules both.
$ npm run build	// build webpack and tsc compile.
$ npm run dev	// luanch app.
```

## 1. Setting

```
$ npm run init
```

It will install [PM2](https://www.npmjs.com/package/pm2), [Webpack](https://www.npmjs.com/package/webpack), [TypeScript](https://www.npmjs.com/package/typescript) in global.
Then install modules depencencies and devDependencies both.

## 2. Build

```
$ npm run build
```

Webpack build and typescript compile.

See <code>webpack.config.js</code> to change webpack configuration.

See <code>tsconfig.json</code> to change typescript compile options.

## 3. Launch

```
$ npm run dev
```

Launch application via pm2. See <code>pm2.config.js</code> to change pm2 options.

## 4. Directories.

- <code>/bin</code>

Auto generate. Complied js files for server. Sources are placed in <code>/src/server</code>.

- <code>/public</code>

Resources for web services.

- <code>/public/js</code>

Auto generate. Compiled js files for react. Sources are placeed in <code>/src/tsx/view</code>.

- <code>/public/libs</code>

React js files or some js sources what will not compiled.