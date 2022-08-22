import { realizeChannelName, camelCase, getMessageType, messageHasNullPayload, realizeParametersForChannelWrapper, renderJSDocParameters} from '../../utils/index';
// eslint-disable-next-line no-unused-vars
import { Message, ChannelParameter } from '@asyncapi/parser';

/**
 * Component which returns a function which subscribes to the given channel
 * 
 * @param {string} defaultContentType 
 * @param {string} channelName to subscribe to
 * @param {Message} message which is being received
 * @param {Object.<string, ChannelParameter>} channelParameters parameters to the channel
 */
export function Subscribe(channelName, message, channelParameters, operation) {
  const messageType = getMessageType(message);
  const ablyMsgName = message['_json'].name !== undefined ? `'${message['_json'].name}',` : ``;

  let parameters = [];
  parameters = Object.entries(channelParameters).map(([parameterName]) => {
    return `${camelCase(parameterName)}Param`;
  });
  const hasNullPayload = messageHasNullPayload(message.payload());

  //Determine the callback process when receiving messages.
  //If the message payload is null no hooks are called to process the received data.
  let whenReceivingMessage = `onDataCallback(null ${parameters.length > 0 && `, ${parameters.join(',')}`});`;
  if (!hasNullPayload) {
    whenReceivingMessage =  `
    let receivedData: any = msg.data;
    onDataCallback(${messageType}.unmarshal(receivedData) ${parameters.length > 0 && `, ${parameters.join(',')}`});
    `;
  }

  return `
  /**
   * Internal functionality to setup subscription on the \`${channelName}\` channel 
   * 
   * @param onDataCallback to call when messages are received
   * @param ably to subscribe with
   ${renderJSDocParameters(channelParameters)}
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
    export function subscribe(
      onDataCallback : (
        msg?: ${messageType}
        ${realizeParametersForChannelWrapper(channelParameters, false)}) => void, 
      ably: Ably.Realtime
      ${realizeParametersForChannelWrapper(channelParameters)},
      options?: Ably.Types.ChannelOptions
    ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let subscribeOptions: Ably.Types.ChannelOptions = {... options};

      try{
        await ably.channels.get(${realizeChannelName(channelParameters, channelName)}).subscribe(${ablyMsgName}(msg: Ably.Types.Message) => {
          onDataCallback(msg.data);
        }); 
        resolve();
      }catch(e: any){
        reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_ABLY_TS_ERROR, e));
      }
    });
  }  
    `;
}
