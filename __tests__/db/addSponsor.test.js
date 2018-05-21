const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils');
const { addSponsor } = require('DB/utils');

const {
  Sponsor
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});


beforeEach(async () => {
});

afterEach(async () => {
  await Sponsor.remove();
});


it("returns a status message that includes the sponsor's name", async () => {
  const sponsorName = 'sponsor1';
  const sponsorMessageTemplate = 'Sponsored by SPONSOR';
  const sponsors = {
    queue: [ sponsorName ],
    index: 0,
    messages: [ sponsorMessageTemplate ]
  };
  await Sponsor.create(sponsors);

  const oldStatus = 'some status';
  const newStatus = await addSponsor(oldStatus);

  const expectedNewStatus = sponsorMessageTemplate.replace('SPONSOR', sponsorName) + '\n' + oldStatus;  
  expect(newStatus).toEqual(expectedNewStatus);
});

it('increments the sponsor index in the database', async () => {
  await Sponsor.create(sampleSponsors());

  const beforeIndex = await getSponsorIndex();
  await addSponsor('some status');
  const afterIndex = await getSponsorIndex();

  expect(beforeIndex).toEqual(0);
  expect(afterIndex).toEqual(1);
});

it('resets the sponsor index to 0 when it gets to the end of the sponsor queue', async () => {
  await Sponsor.create(sampleSponsors());

  const beforeIndex = await getSponsorIndex();
  await addSponsor('some status');
  await addSponsor('some status');
  const afterIndex = await getSponsorIndex();

  expect(beforeIndex).toEqual(afterIndex);
});

it('does not modify the original status if the sponsor queue is empty', async () => {
  const sponsors = sampleSponsors();
  sponsors.queue = [];
  await Sponsor.create(sponsors);

  const oldStatus = 'some status';
  const newStatus = await addSponsor(oldStatus);

  expect(newStatus).toEqual(oldStatus);
});

it('does not modify the original status if the sponsors object does not exist', async () => {
  await Sponsor.remove();

  const oldStatus = 'some status';
  const newStatus = await addSponsor(oldStatus);

  expect(newStatus).toEqual(oldStatus);
});


// helpers

function getSponsorIndex() {
  return Sponsor.findOne().lean().then(sponsors => sponsors.index);
}

function sampleSponsors() {
  return {
    queue: [ 'sponsor1', 'sponsor2' ],
    index: 0,
    messages: [ 'msg1', 'msg2' ]
  };
}