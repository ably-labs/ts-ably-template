import { File } from '@asyncapi/generator-react-sdk';
import { publish, subscribe } from '../../../components/test/publishSubscribe';
import { isPubsub, pascalCase} from '../../../utils/index';
// eslint-disable-next-line no-unused-vars
import { Channel } from '@asyncapi/parser';

/**
 * Return the correct test code.
 * @param {Channel} channel 
 * @param {string} channelName 
 */
function getTestCode(channel, channelName) {
  const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
  const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
  const channelParameters = channel.parameters();
  let testMethod;
  if (isPubsub(channel)) {
    if (channel.hasSubscribe()) {
      testMethod = publish(
        channelName, 
        subscribeMessage, 
        channelParameters);
    }
    if (channel.hasPublish()) {
      testMethod = subscribe(
        channelName, 
        publishMessage, 
        channelParameters);
    }
  }
  return testMethod;
}

export default function channelRender({ channelName, channel, params }) {
  if (!params.generateTestClient) {
    return;
  }

  return <File name={`${pascalCase(channelName)}.spec.ts`}>
    {`
import {describe, it, before} from 'mocha';
import {expect} from 'chai';
import * as Client from '../../src'
import * as TestClient from '../../src/testclient'
import { AblyTypescriptTemplateError } from '../../src/AblyTypescriptTemplateError';

describe('${channelName} can talk to itself', () => {
  var client: Client.AblyAsyncApiClient;
  var testClient: TestClient.AblyAsyncApiTestClient;
  before(async () => {
    client = new Client.AblyAsyncApiClient({ key: process.env.ABLY_KEY });
    testClient = new TestClient.AblyAsyncApiTestClient({ key: process.env.ABLY_KEY });
    await client.connect();
    await testClient.connect();
  });

  it('can send message', async () => {
    ${getTestCode(channel, channelName)}
  });

  after( async () => {
    await client.disconnect();
    await testClient.disconnect();
  });
});
  `}
  </File>;
}
