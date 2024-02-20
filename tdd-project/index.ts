import { App } from './src';

const main = async () => {
  // in a real world app we'd pull this from a param or might derive from auth token, etc.
  // for sake of time here we will hardcode to allow focus on some other areas
  const userId = '12345';

  const app = new App();
  const result = await app.tryReserveNextBookForUser(userId);
  console.log(result);
};

main(); // this is just the entry point to run
