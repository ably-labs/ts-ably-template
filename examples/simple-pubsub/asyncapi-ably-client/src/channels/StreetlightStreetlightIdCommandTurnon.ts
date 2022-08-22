import TurnOnRequest from '../models/TurnOnRequest';
import GeneralReply from '../models/GeneralReply';
import * as Ably from 'ably';
import {
  ErrorCode,
  AblyTypescriptTemplateError
} from '../AblyTypescriptTemplateError';
/**
 * Module which wraps functionality for the `streetlight/{streetlight_id}/command/turnon` channel
 * @module streetlightStreetlightIdCommandTurnon
 */
/**
 * Internal functionality to setup subscription on the `streetlight/{streetlight_id}/command/turnon` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param ably to subscribe with
 * @param streetlight_id parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export function subscribe(
  onDataCallback: (
    msg ? : GeneralReply, streetlight_id ? : string) => void,
  ably: Ably.Realtime, streetlight_id: string,
  options ? : Ably.Types.ChannelOptions
): Promise < void > {
  return new Promise(async (resolve, reject) => {
    let subscribeOptions: Ably.Types.ChannelOptions = {
      ...options
    };
    try {
      await ably.channels.get(`streetlight:${streetlight_id}:command:turnon`).subscribe('turnOnCommand', (msg: Ably.Types.Message) => {
        onDataCallback(msg.data);
      });
      resolve();
    } catch (e: any) {
      reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_ABLY_TS_ERROR, e));
    }
  });
}
/**
 * Internal functionality to publish message to channel 
 * streetlight/{streetlight_id}/command/turnon
 * 
 * @param message to publish
 * @param ably Ably Realtime object to publish with
 * @param streetlight_id parameter to use in topic
 * @param options to publish with
 */
export function publish(
  message: TurnOnRequest,
  ably: Ably.Realtime, streetlight_id: string,
  options ? : Ably.Types.ChannelOptions
): Promise < void > {
  return new Promise < void > (async (resolve, reject) => {
    try {
      let dataToSend: any = message.marshal();
      await ably.channels.get(`streetlight:${streetlight_id}:command:turnon`).publish('turnonCommand', dataToSend);
      resolve();
    } catch (e: any) {
      reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_ABLY_TS_ERROR, e));
    }
  });
};