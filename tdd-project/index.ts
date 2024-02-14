import * as app from './src';

const main = async () => {
  console.log(app.helloWorld());
  const awaitHello = await app.helloWorldAsync();

  console.log(awaitHello.data);
};

main();
