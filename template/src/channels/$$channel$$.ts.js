import { File } from '@asyncapi/generator-react-sdk';
import { Publish } from '../../../components/channel/publish';
import { Subscribe } from '../../../components/channel/subscribe';
import { General } from '../../../components/channel/general';
import { pascalCase, isPubsub, camelCase} from '../../../utils/index';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument, Channel } from '@asyncapi/parser';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {Channel} channel 
 * @property {string} channelName 
 */

/**
 * Return the correct channel component.
 * 
 * @param {AsyncAPIDocument} asyncapi 
 * @param {Channel} channel to determine the type of
 * @param {string} channelName 
 */
function getChannelCode(channel, channelName) {
  const publishOperation = channel.publish() ? channel.publish() : undefined;
  const publishMessage = publishOperation ? publishOperation.message(0) : undefined;
  const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
  let channelcode = '';
  if (isPubsub(channel)) {
    if (channel.hasSubscribe()) {
      channelcode += Subscribe(
        channelName, 
        subscribeMessage, 
        channel.parameters());
    }
    if (channel.hasPublish()) {
      channelcode += Publish(
        channelName, 
        publishMessage, 
        channel.parameters(),
        publishOperation);
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
  const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
  const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;

  return <File name={`${pascalCase(channelName)}.ts`}>
    {`
${General(channel, publishMessage, subscribeMessage, '..')}

/**
 * Module which wraps functionality for the \`${channelName}\` channel
 * @module ${camelCase(channelName)}
 */

${getChannelCode(channel, channelName, params)}
    `}
  </File>;
}
