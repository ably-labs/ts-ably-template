import { pascalCase, camelCase, getMessageType, realizeParametersForChannelWrapper, realizeParametersForChannelWithoutType, renderJSDocParameters} from '../../utils/index';
// eslint-disable-next-line no-unused-vars
import { Message, ChannelParameter } from '@asyncapi/parser';

/**
 * Component which returns a subscribe to function for the client
 * 
 * @param {string} defaultContentType 
 * @param {string} channelName to publish to
 * @param {Message} message which is being received
 * @param {string} messageDescription 
 * @param {Object.<string, ChannelParameter>} channelParameters parameters to the channel
 */
export function Subscribe(channelName, message, messageDescription, channelParameters) {
  return  `
  /**
    * Subscribe to the \`${channelName}\`
    * 
    * ${messageDescription}
    * 
    * @param onDataCallback to call when messages are received
    ${renderJSDocParameters(channelParameters)}
    * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
    */
  public subscribeTo${pascalCase(channelName)}(
      onDataCallback : (
        msg?: ${getMessageType(message)}
        ${realizeParametersForChannelWrapper(channelParameters, false)}) => void
      ${realizeParametersForChannelWrapper(channelParameters)},
      options?: Ably.Types.ChannelOptions
    ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if(!this.isClosed() && this.ably !== undefined) {
        try{
          ${camelCase(channelName)}Channel.subscribe(
            onDataCallback, 
            this.ably
            ${Object.keys(channelParameters).length ? ` ,${realizeParametersForChannelWithoutType(channelParameters)},` : ''}
            options
          );
          resolve();
        }catch(e: any){
          reject(e);
        }
      }else{
        reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
      }
    });
  }
  `;
}
