import { File } from '@asyncapi/generator-react-sdk';
import { getStandardClassCode, getStandardHeaderCode } from '../../../components/index/standard';
import { Publish } from '../../../components/index/publish';
import { Subscribe } from '../../../components/index/subscribe';
import { isPubsub} from '../../../utils/index';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument } from '@asyncapi/parser';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {AsyncAPIDocument} asyncapi received from the generator.
 */

/**
 * Return the correct channel functions for the test client on whether a channel is `pubSub` or `requestReply`
 * 
 * @param {AsyncAPIDocument} asyncapi 
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function getChannelWrappers(asyncapi) {
  let channelWrappers = asyncapi.channels();
  channelWrappers = Object.keys(channelWrappers).length ? Object.entries(channelWrappers).map(([channelName, channel]) => {
    const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
    const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
    const channelDescription = channel.description();
    const channelParameters = channel.parameters();
    let channelcode = '';
    if (isPubsub(channel)) {
      if (channel.hasSubscribe()) {
        channelcode += Subscribe(
          channelName, 
          subscribeMessage, 
          channelDescription, 
          channelParameters);
      }
      if (channel.hasPublish()) {
        channelcode += Publish(
          channelName, 
          publishMessage, 
          channelDescription, 
          channelParameters);
      }
    }
    return channelcode;
  }) : '';
  return channelWrappers;
}

/**
 * Function to render file.
 * 
 * @param {RenderArgument} param0 render arguments received from the generator.
 */
export default function indexFile({ asyncapi, params }) {
  if (!params.generateTestClient) {
    return;
  }

  return (
    <File name="index.ts">
      {`
${getStandardHeaderCode(asyncapi, '..', './testchannels')}

/**
 * @class AblyAsyncApiTestClient
 * 
 * The test/mirror client which is the reverse to the normal AblyAsyncApiClient.
 */
export class AblyAsyncApiTestClient {
  ${getStandardClassCode(asyncapi)}
  ${getChannelWrappers(asyncapi, params).join('')}
}
      `}
    </File>
  );
}
