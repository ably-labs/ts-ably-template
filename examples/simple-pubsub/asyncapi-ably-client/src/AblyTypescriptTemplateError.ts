import * as util from 'util';
// TODO:
export enum ErrorCode {
  NOT_CONNECTED = 'NOT_CONNECTED',
    INTERNAL_ABLY_TS_ERROR = 'INTERNAL_ABLY_TS_ERROR'
}
/** @internal **/
export class Messages {
  static messages = new Messages();
  messages: {
    [key: string]: string
  } = {};
  private constructor() {
    this.messages[ErrorCode.NOT_CONNECTED] = 'The client is not connected';
    this.messages[ErrorCode.INTERNAL_ABLY_TS_ERROR] = 'An error occured while trying to use the Ably Typescript library';
  }
  static getMessage(s: string): string {
    return Messages.messages.getMessage(s);
  }
  getMessage(s: string): string {
    let v = this.messages[s];
    if (!v) {
      v = s;
    }
    return v;
  }
}
export class AblyTypescriptTemplateError implements Error {
  name: string;
  message: string;
  code: string;
  chainedError ? : Error;
  /**
   * @param {String} message
   * @param {String} code
   * @param {Error} [chainedError]
   * @constructor
   *
   * @api private
   * @internal
   */
  constructor(message: string, code: string, chainedError ? : Error) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'AblyTypescriptTemplateError';
    this.message = message;
    this.code = code;
    this.chainedError = chainedError;
    util.inherits(AblyTypescriptTemplateError, Error);
  }
  /**
   * @param code
   * @param chainedError
   * @api private
   * @internal
   */
  static errorForCode(code: string, chainedError ? : Error): AblyTypescriptTemplateError {
    let m = Messages.getMessage(code);
    return new AblyTypescriptTemplateError(m, code, chainedError);
  }
}