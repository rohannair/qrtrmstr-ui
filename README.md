# Quartermaster UI

## Introduction & Best Practices
Welcome to the Quartermaster UI repository; a React app, using:
- Flexbox
- Redux (state management)
- React Router
- PostCSS
- DraftJS

For all JS style related things, refer to the [JavaScript Style Guide](https://github.com/qrtrmstr/javascript) which is forked off Airbnb's JS style guide. *Note:* The React style guide isn't necessarily up-to date.

Other important rules
1. Do not add a UI kit/CSS framework!
2. 

## Set-up:
1. `$ npm install`
2. `$ npm start`
3. ... wait for `webpack: bundle is now VALID.` in the console
4. Open up [http://qrtrmstr.localhost:8080/](http://qrtrmstr.localhost:8080/)

## Troubleshooting
1. Webpack is red
Read the stack trace.. fix the issue. It's probably that you need to do an `npm install` because someone added a new package

2. Node is being weird
Make sure you're on Node 6, and have installed Node via nvm. `nvm use` should fix the issue. 
*NOTE: Our APIs are still using Node v4*

3. NPM takes forever to install!
YUP!

4. The dev server randomly breaks
Known bug... unknown fix. Bounty of 1 beer to whoever solves this problem for good.

## For Prod:
`npm run build`

### To serve:
Link: /var/www/html -> /root/of/repository

