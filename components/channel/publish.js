import { realizeChannelName, getMessageType, realizeParametersForChannelWrapper, messageHasNullPayload, renderJSDocParameters } from '../../utils/index';
// eslint-disable-next-line no-unused-vars
import { Message, ChannelParameter } from '@asyncapi/parser';

/**
 * Component which returns a function which publishes to the given channel
 * 
 * @param {string} channelName to publish to
 * @param {string | null} name which is being published
 * @param {Message} message which is being published
 * @param {Object.<string, ChannelParameter>} channelParameters parameters to the channel
 */
export function Publish(channelName, message, channelParameters) {
  const messageType = getMessageType(message);
  const ablyMsgName = `'${message['_json'].name}'` || null;
  const hasNullPayload = messageHasNullPayload(message.payload());
  //Determine the publish operation based on whether the message type is null
  let publishOperation = `await ably.channels.get(${realizeChannelName(channelParameters, channelName)}).publish(${ablyMsgName}, null);`;
  if (!hasNullPayload) {
    publishOperation = `
    let dataToSend : any = message.marshal();
    await ably.channels.get(${realizeChannelName(channelParameters, channelName)}).publish(${ablyMsgName}, dataToSend);`;
  }
  return `
  /**
   * Internal functionality to publish message to channel 
   * ${channelName}
   * 
   * @param message to publish
   * @param ably Ably Realtime object to publish with
   ${renderJSDocParameters(channelParameters)}
   * @param options to publish with
   */
    export function publish(
      message: ${messageType},
      ably: Ably.Realtime
      ${realizeParametersForChannelWrapper(channelParameters)},
      options?: Ably.Types.ChannelOptions
      ): Promise<void> {
      return new Promise<void>(async (resolve, reject) => {
        try{
          ${publishOperation}
          resolve();
        }catch(e: any){
          reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_ABLY_TS_ERROR, e));
        }
      });
    };
    `;
}
