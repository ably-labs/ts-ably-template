import { File } from '@asyncapi/generator-react-sdk';
import { Publish } from '../../../../components/channel/publish';
import { Subscribe } from '../../../../components/channel/subscribe';
import { General } from '../../../../components/channel/general';
import { pascalCase, isPubsub, camelCase} from '../../../../utils/index';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument, Channel } from '@asyncapi/parser';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {Channel} channel 
 * @property {string} channelName 
 */

/**
 * Return the correct channel component based on whether its `pubSub` or `requestReply`.
 * 
 * NOTICE this is a reverse of the normal client channel.
 * TODO: This currently only does pub/sub, which assumes bidirectional comms, so doesn't reverse it
 * 
 * @param {AsyncAPIDocument} asyncapi 
 * @param {Channel} channel 
 * @param {string} channelName 
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function getChannelCode(channel, channelName) {
  let channelcode = '';
  if (isPubsub(channel)) {
    if (channel.hasSubscribe()) {
      channelcode += Subscribe(
        channelName, 
        channel.subscribe() ? channel.subscribe().message(0) : undefined,
        channel.parameters());
    }
    if (channel.hasPublish()) {
      channelcode += Publish(
        channelName, 
        channel.publish() ? channel.publish().message(0) : undefined, 
        channel.parameters());
    }
  }
  return channelcode;
}

/**
 * Function to render file.
 * 
 * @param {RenderArgument} param0 render arguments received from the generator.
 */
export default function channelRender({ channelName, channel, params }) {
  if (!params.generateTestClient) {
    return;
  }

  const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
  const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;

  return <File name={`${pascalCase(channelName)}.ts`}>
    {`
${General(channel, publishMessage, subscribeMessage, '../..')}

/**
 * Module which wraps functionality for the \`${channelName}\` channel
 * @module ${camelCase(channelName)}
 */
${getChannelCode(channel, channelName, params)}
`}
  </File>;
}
