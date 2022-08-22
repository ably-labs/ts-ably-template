import {
  ErrorCode,
  AblyTypescriptTemplateError
} from '../AblyTypescriptTemplateError';
import * as Ably from 'ably';
import * as streetlightStreetlightIdCommandTurnonChannel from "./testchannels/StreetlightStreetlightIdCommandTurnon";
import TurnOnRequest from "../models/TurnOnRequest";
import GeneralReply from "../models/GeneralReply";
export {
  streetlightStreetlightIdCommandTurnonChannel
};
export {
  TurnOnRequest
};
export {
  GeneralReply
};
/**
 * @class AblyAsyncApiTestClient
 * 
 * The test/mirror client which is the reverse to the normal AblyAsyncApiClient.
 */
export class AblyAsyncApiTestClient {
  private ably ? : Ably.Realtime;
  private options ? : Ably.Types.ClientOptions | string;
  /**
   * Try to connect to an Ably server
   * @param options to use
   */
  constructor(options: Ably.Types.ClientOptions | string) {
    this.options = options;
    this.ably = new Ably.Realtime(this.options);
  }
  /**
   * Try to connect to an Ably server with the different payloads.
   * @param options to use, payload is omitted if sat in the AsyncAPI document.
   */
  connect(): Promise < void > {
    return new Promise(async (resolve: () => void, reject: (error: any) => void) => {
      try {
        this.ably?.connect();
        resolve();
      } catch (e: any) {
        reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_ABLY_TS_ERROR, e));
      }
    })
  }
  /**
   * Disconnect from Ably
   */
  async disconnect() {
    if (!this.isClosed() && this.ably !== undefined) {
      await this.ably.close();
    }
  }
  /**
   * Returns whether or not any of the clients are closed
   */
  isClosed() {
    if (!this.ably || this.ably!.connection.state === 'failed') {
      return true;
    }
    return false;
  }
  /**
   * Subscribe to the `streetlight/{streetlight_id}/command/turnon`
   * 
   * Channel for the turn on command which should turn on the streetlight
   * 
   * @param onDataCallback to call when messages are received
   * @param streetlight_id parameter to use in topic
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToStreetlightStreetlightIdCommandTurnon(
    onDataCallback: (
      msg ? : GeneralReply, streetlight_id ? : string) => void, streetlight_id: string,
    options ? : Ably.Types.ChannelOptions
  ): Promise < void > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.ably !== undefined) {
        try {
          streetlightStreetlightIdCommandTurnonChannel.subscribe(
            onDataCallback,
            this.ably, streetlight_id,
            options
          );
          resolve();
        } catch (e: any) {
          reject(e);
        }
      } else {
        reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
      }
    });
  }
  /**
   * Publish to the `streetlight/{streetlight_id}/command/turnon` channel 
   * 
   * Channel for the turn on command which should turn on the streetlight
   * 
   * @param message to publish
   * @param streetlight_id parameter to use in topic
   */
  public publishToStreetlightStreetlightIdCommandTurnon(
    message: TurnOnRequest, streetlight_id: string,
    options ? : Ably.Types.ChannelOptions
  ): Promise < void > {
    if (this.ably !== undefined) {
      return streetlightStreetlightIdCommandTurnonChannel.publish(
        message,
        this.ably, streetlight_id,
        options
      );
    } else {
      return Promise.reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
}