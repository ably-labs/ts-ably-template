import {
  describe,
  it,
  before
} from 'mocha';
import {
  expect
} from 'chai';
import * as Client from '../../src'
import * as TestClient from '../../src/testclient'
import {
  AblyTypescriptTemplateError
} from '../../src/AblyTypescriptTemplateError';
describe('streetlight/{streetlight_id}/command/turnon can talk to itself', () => {
  var client: Client.AblyAsyncApiClient;
  var testClient: TestClient.AblyAsyncApiTestClient;
  before(async () => {
    // TODO: Change keys for an auth server. Give different tokens to both clients
    client = new Client.AblyAsyncApiClient({
      key: process.env.ABLY_KEY
    });
    testClient = new TestClient.AblyAsyncApiTestClient({
      key: process.env.ABLY_KEY
    });
    await client.connect();
    await testClient.connect();
  });
  it('can send message', async () => {
    var receivedError: AblyTypescriptTemplateError | undefined = undefined;
    var receivedMsg: Client.TurnOnRequest | undefined = undefined;
    var receivedStreetlightId: string | undefined = undefined
    var publishMessage: TestClient.TurnOnRequest = TestClient.TurnOnRequest.unmarshal({
      "lumen": 0
    });
    var StreetlightIdToSend: string = "string"
    const subscription = await client.subscribeToStreetlightStreetlightIdCommandTurnon((err, msg, streetlight_id) => {
        receivedError = err;
        receivedMsg = msg;
        receivedStreetlightId = streetlight_id
      }, StreetlightIdToSend,
      true
    );
    const tryAndWaitForResponse = new Promise((resolve, reject) => {
      let isReturned = false;
      setTimeout(() => {
        if (!isReturned) {
          reject(new Error("Timeout"));
        }
      }, 3000)
      setInterval(async () => {
        if (subscription.getReceived() === 1) {
          resolve(undefined);
          isReturned = true
        }
      }, 100);
    });
    await testClient.publishToStreetlightStreetlightIdCommandTurnon(publishMessage, StreetlightIdToSend);
    await tryAndWaitForResponse;
    expect(receivedError).to.be.undefined;
    expect(receivedMsg).to.not.be.undefined;
    expect(receivedMsg!.marshal()).to.equal(publishMessage.marshal());
    expect(receivedStreetlightId).to.be.equal(StreetlightIdToSend);
  });
  after(async () => {
    await client.disconnect();
    await testClient.disconnect();
  });
});