import { camelCase, pascalCase, messageHasNullPayload, getSchemaFileName} from '../../utils/index';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument } from '@asyncapi/parser';

/**
 * Return ably object based on request
 * 
 * @param {AsyncAPIDocument} asyncapi 
 */
 function getConstructor() {
  return `
  /**
  * Try to connect to an Ably server
  * @param options to use
  */
  constructor(options: Ably.Types.ClientOptions | string) {
    this.options = options;
    this.ably = new Ably.Realtime(this.options);
  }`;
}

/**
 * Return disconnect function based on the payload
 */
function getDisconnectFunction() {
  return `        
    /**
     * Disconnect from Ably
     */
    async disconnect(){
      if (!this.isClosed() && this.ably !== undefined) {
        await this.ably.close();
      }
    }`;
}

/**
 * Return connect function based on the payload
 * 
 * @param {AsyncAPIDocument} asyncapi 
 */
function getConnectFunction(asyncapi) {
  return `
  /**
  * Try to connect to an Ably server with the different payloads.
  * @param options to use, payload is omitted if sat in the AsyncAPI document.
  */
  connect(): Promise<void>{
    return new Promise(async (resolve: () => void, reject: (error: any) => void) => {
      try {
        this.ably?.connect();
        resolve();
      } catch(e: any) {
        reject(AblyTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_ABLY_TS_ERROR, e));
      }
    })
  }`;
}

/**
 * Return isClosed function based on the payload
 */
function getIsDisconnectedFunction() {
  return `
  /**
   * Returns whether or not any of the clients are closed
   */
  isClosed(){
    if (!this.ably || this.ably!.connection.state === 'failed') {
      return true;
    }
    return false;
  }`;
}

/**
 * Component which returns the standard setup for the client class
 * 
 * @param {AsyncAPIDocument} asyncapi 
 */
export function getStandardClassCode(asyncapi) {
  return `
  private ably?: Ably.Realtime;
  private options?: Ably.Types.ClientOptions | string;
  ${getConstructor()}
  ${getConnectFunction(asyncapi)}
  ${getDisconnectFunction()}
  ${getIsDisconnectedFunction()}
  `;
}

/**
 * Get all the standard import and exports
 *
 * @param {AsyncAPIDocument} asyncapi 
 * @param {string} pathToRoot 
 * @param {string} channelPath 
 */
export function getStandardHeaderCode(asyncapi, pathToRoot, channelPath) {
  const channels = asyncapi.channels();
  //Import the channel code and re-export them
  const imports = [];
  const exports = [];
  for (const [channelName] of Object.entries(channels)) {
    const camelCaseChannelName = camelCase(channelName);
    imports.push(`import * as ${camelCaseChannelName}Channel from "${channelPath}/${pascalCase(channelName)}";`);
    exports.push(`export {${camelCaseChannelName}Channel};`);
  }

  //Import the messages and re-export them
  for (const [, message] of asyncapi.allMessages()) {
    const hasNullPayload = messageHasNullPayload(message.payload());
    if (!hasNullPayload) {
      const schemaName = getSchemaFileName(message.payload().uid());
      imports.push(`import ${schemaName} from "${pathToRoot}/models/${schemaName}";`);
      exports.push(`export {${schemaName}};`);
    }
  }
  return `
import {ErrorCode, AblyTypescriptTemplateError} from '${pathToRoot}/AblyTypescriptTemplateError';
import * as Ably from 'ably';

${imports.join('\n')}

${exports.join('\n')}`;
}
