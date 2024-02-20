/* eslint-disable no-use-before-define */
import { App, BookStatus } from './app';

// ex. of how we might discuss related
// given user with id of 'xyz' has preferred branch of '15'
// and has a desired reads list with: ['isbn1', 'isbn2', 'isbn3']
// and the library availability for those books is 'isbn2' is available at another branch
// when holds are initiated
// then isbn2 should be put on hold
test('scenario: user has books where hold can be placed', async () => {
  const timeBeforeTest = new Date();
  const preferredBranch = '15';
  const desiredReadsList = ['isbn1', 'isbn2', 'isbn3'];
  const availability = [{ isbn2: { availability: { availabilityStatus: 'available', branch: '2' } } }];

  // now we have to set up user and book list
  // then we have to setup the availability to be returned
  // this is a lot of setup... it requires setup in two places with dependent data: of a user's books and preferred branch plus availability we get elsewhere
  // what does that tell us about testing challenges to guide next steps?

  const { user, app } = await setupUserBooksWithAvail(preferredBranch, desiredReadsList, availability);
  const result = await app.tryReserveNextBookForUser(user.id);
  // is there a better way to assert?
  expect(result.newHoldCreated).toBe(true);
  expect(result.newBookHold).toBeDefined();
  expect(result.newBookHold!.heldDate).toBeBetween(timeBeforeTest, new Date());
  expect(result.newBookHold!.holdStatus).toBe(BookStatus.OnHold);
});
test.todo('scenario: user has books but none of the books can be placed on hold');
test.todo('scenario: user has no books on their list');

async function setupUserBooksWithAvail(
  _preferredBranch: string,
  _desiredReadsList: string[],
  _availability: any,
): Promise<{ user: { id: string }; app: App }> {
  return { user: { id: '12345' }, app: new App() };
}
