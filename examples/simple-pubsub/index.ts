import { Types, Realtime, Rest } from 'ably';
import { AblyAsyncApiClient, TurnOnRequest, AblyTypescriptTemplateError, GeneralReply } from 'asyncapi-ably-client';
require('dotenv').config({ path: __dirname+'/.env' });
const streetlightToListenFor = '*';

/**
 * Setup a reply handler to process requests
 */
function testFunction (msg?: GeneralReply | undefined, streetlight_id?: string | undefined) {
  console.log(msg);
}

export async function setupPubSub() {
  // TODO: Swap this for a token auth server locally for better PoC demonstration
  const options: Types.ClientOptions = { key: process.env.ABLY_KEY };
  const client = new AblyAsyncApiClient(options);
  await client.subscribeToStreetlightStreetlightIdCommandTurnon(testFunction, "50");
  await client.publishToStreetlightStreetlightIdCommandTurnon(new TurnOnRequest({lumen: 40}), "50");
}
setupPubSub();
