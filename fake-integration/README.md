## Fake Integration

The basis of this sample is to build out something that includes an integration with an external API (i.e. either public or another teams, etc.). But since this is just an example, we don't have an actual API to use. This is NOT part of the tests and should not be used for the actual TDD tests; it exists to allow us to show how we handle external dependencies in prod code differently from in test code. So this "fake" is fake of what you'd point to in "prod code" so that we can verify that our code runs both with "real" dependencies (i.e. this fake integration) and without. 

There is barely any error handling in this as its a pretty bare skeleton. 

See the main readme for more comments.