const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { processWebhookEvent } = require('Twitter/utils')

const {
  Timestamp
} = Models

beforeAll(async () => {
  await connectDB()
  await Timestamp.remove()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

const ORIGINAL_LAST_READ_DM = 5
let mockProcessMessage

beforeEach(async () => {
  mockProcessMessage = jest.fn().mockReturnValue(Promise.resolve())
  await setLastReadDM(ORIGINAL_LAST_READ_DM)
})

afterEach(async () => {
  await Timestamp.remove()
})

describe('if payload.direct_message_events !== undefined', () => {
  const NEW_LAST_READ_DM = '6'

  const EVENT = sampleEvent({
    eventType: 'direct_message_events',
    messageType: 'message_create',
    timestamp: NEW_LAST_READ_DM
  })

  describe('if event type === message_create', () => {
    it('should process the event', async () => {
      await processWebhookEvent(EVENT, mockProcessMessage)

      expect(mockProcessMessage).toBeCalled()
      expect(mockProcessMessage).toBeCalledWith(EVENT.direct_message_events[0])
    })

    it('should update the lastReadDM timestamp if received message is newer', async () => {
      const beforeLastReadDM = await fetchLastReadDM()
      await processWebhookEvent(EVENT, mockProcessMessage)

      const afterLastReadDM = await fetchLastReadDM()
      expect(beforeLastReadDM).toEqual(ORIGINAL_LAST_READ_DM)
      expect(afterLastReadDM).toEqual(Number(NEW_LAST_READ_DM))
    })

    it('should NOT update the lastReadDM timestamp if received messages are <= lastReadDM', async () => {
      const olderEvent = sampleEvent({
        eventType: 'direct_message_events',
        messageType: 'message_create',
        timestamp: ORIGINAL_LAST_READ_DM - 1
      })

      await processWebhookEvent(olderEvent, mockProcessMessage)

      const lastReadDM = await fetchLastReadDM()
      expect(lastReadDM).toEqual(ORIGINAL_LAST_READ_DM)
    })
  })

  describe('if event type !== message_create', () => {
    const EVENT_LAST_READ_DM = ORIGINAL_LAST_READ_DM + 1

    const EVENT = sampleEvent({
      eventType: 'direct_message_events',
      messageType: 'not_message_create',
      timestamp: EVENT_LAST_READ_DM
    })

    it('should NOT process event', async () => {
      await processWebhookEvent(EVENT, mockProcessMessage)

      expect(mockProcessMessage).not.toBeCalled()
    })

    it('should NOT update the lastReadDM timestamp', async () => {
      await processWebhookEvent(EVENT, mockProcessMessage)

      const lastReadDM = await fetchLastReadDM()
      expect(lastReadDM).toEqual(ORIGINAL_LAST_READ_DM)
    })
  })
})

describe('if payload.direct_message_events === undefined', () => {
  const EVENT_TIMESTAMP = 3

  const EVENT = sampleEvent({
    eventType: 'not_direct_message_events',
    messageType: 'message_create',
    timestamp: EVENT_TIMESTAMP
  })

  it('should NOT process event', async () => {
    await processWebhookEvent(EVENT, mockProcessMessage)

    expect(mockProcessMessage).not.toBeCalled()
  })

  it('should NOT update the lastReadDM timestamp', async () => {
    await setLastReadDM(EVENT_TIMESTAMP - 1)
    await processWebhookEvent(EVENT, mockProcessMessage)

    const lastReadDM = await fetchLastReadDM()
    expect(lastReadDM).toEqual(EVENT_TIMESTAMP - 1)
  })
})

// Data initialization

function sampleEvent({
  eventType,
  messageType,
  timestamp
}) {
  return { [eventType]: [
    {
      type: messageType,
      created_timestamp: timestamp,
      message_create: {
        sender_id: '12345',
        message_data: { text: 'some text' }
      }
    }
  ]}
}

// helpers

function fetchLastReadDM() {
  return Timestamp
    .findOne()
    .select({
      _id: 0,
      __v: 0
    })
    .lean()
    .then(doc => doc.lastReadDM)
}

function setLastReadDM(lastReadDM) {
  return Timestamp.updateOne({},
    { $set: { lastReadDM } },
    { upsert: true }
  ).exec()
}
