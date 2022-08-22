import { File } from '@asyncapi/generator-react-sdk';
import { getStandardClassCode, getStandardHeaderCode } from '../../components/index/standard';
import { Publish } from '../../components/index/publish';
import { Subscribe } from '../../components/index/subscribe';
import { isPubsub} from '../../utils/index';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument } from '@asyncapi/parser';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {AsyncAPIDocument} asyncapi received from the generator.
 */

/**
 * Return the correct channel functions for the client.
 * 
 * @param {AsyncAPIDocument} asyncapi 
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function getChannelWrappers(asyncapi) {
  let channelWrappers = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  channelWrappers = channelEntries.map(([channelName, channel]) => {
    const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
    const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
    const channelDescription = channel.description();
    const channelParameters = channel.parameters();
    let channelcode = '';

    if (isPubsub(channel)) {
      if (channel.hasSubscribe()) {
        // TODO: Was publish, why?
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
  });
  return channelWrappers;
}

/**
 * Function to render file.
 * 
 * @param {RenderArgument} param0 render arguments received from the generator.
 */
export default function index({ asyncapi, params }) {
  return (
    <File name="index.ts">
      {`
${params.generateTestClient && 'import * as TestClient from \'./testclient/\';'}
${getStandardHeaderCode(asyncapi, '.', './channels')}
export {ErrorCode, AblyTypescriptTemplateError}

${params.generateTestClient && 'export {TestClient};'}

/**
 * @class AblyAsyncApiClient
 * 
 * The generated client based on your AsyncAPI document.
 */
export class AblyAsyncApiClient{
  ${getStandardClassCode(asyncapi)}
  ${getChannelWrappers(asyncapi, params).join('')}
}
`}
    </File>
  );
}
