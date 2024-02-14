# TDD Walk Thru

This repo contains two options. 

# Setup 

To run either option you'll need to run `npm install`. Notes on setup are for option 1 vs option 2 are below:

# Option 1

This one is very simple and is meant to only run as tests. Use `npm run test` or `npm run tests:watch`; replace the code in `tdd-project/src`.

# Option 2

This one is meant to simulate a more complex and "real-world-like" example; the intent is that you are able to build your work and run both the tests plus a "prod" instance of the app (not using any test infrastructure, stubbed data, etc.) so as to simulate real workflows for cases where you are working with external api dependencies, etc. There is a "fake-integration" which is meant to simulate a "prod" instance of an API you have a dependency on. That "fake-integration" is not meant to be used for testing but instead to simulate the "real prod instance" you have of an external api dependency so you can also run through your code outside of tests. (In a real scenario you wouldn't have that integration as part of your local setup (because its supposed to be an external dependency), but it's included here since this is meant to simulate that "real-world-like" scenario). 


## Setup

After running `npm install`, run `npm run setup:fakeintegration` and then `npm run run:fakeintegration` which will install the "fake integration". You can leave that running in the background; nothing will use it until you build out code that depends on it. You should never need to touch code in that folder since it is supposed to be an external dependency. It's running a node express server so you'll need to run it in its own dedicated terminal window. 

Your actual development happens in the `tdd-project/src` folder (replace hello world, etc.). Whatever is exported from that folder is available to run in your "app's" entry point in `tdd-project/index.ts`.

To confirm the initial setup run: `npm test` and `npm start`. The tests should pass a single test and the npm start should simply write "hello world" to the console. Throughout the exercise, both should always be capable of running. 



