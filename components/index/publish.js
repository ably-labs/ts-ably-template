import { pascalCase, camelCase, getMessageType, realizeParametersForChannelWrapper, realizeParametersForChannelWithoutType, renderJSDocParameters } from '../../utils/index';
// eslint-disable-next-line no-unused-vars
import { Message, ChannelParameter } from '@asyncapi/parser';

/**
 * Component which returns a publish to function for the client
 * 
 * @param {string} defaultContentType 
 * @param {string} channelName to publish to
 * @param {Message} message which is being published
 * @param {string} messageDescription 
 * @param {Object.<string, ChannelParameter>} channelParameters parameters to the channel
 */
export function Publish(channelName, message, messageDescription, channelParameters) {
  return `
  /**
   * Publish to the \`${channelName}\` channel 
   * 
   * ${messageDescription}
   * 
   * @param message to publish
   ${renderJSDocParameters(channelParameters)}
   */
    public publishTo${pascalCase(channelName)}(
      message: ${getMessageType(message)} 
      ${realizeParametersForChannelWrapper(channelParameters)},
      options?: Ably.Types.ChannelOptions
    ): Promise<void> {
      if (this.ably !== undefined) {
        return ${camelCase(channelName)}Channel.publish(
          message, 
          this.ably
          ${Object.keys(channelParameters).length ? `,${realizeParametersForChannelWithoutType(channelParameters)}` : ''},
          options
        );
      }else{
        return Promise.reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
      }
    }
  `;
}
