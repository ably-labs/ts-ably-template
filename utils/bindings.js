// eslint-disable-next-line no-unused-vars
import { Operation, Channel } from '@asyncapi/parser';
/**
 * Is the channel a publish and subscribe. This is the default type if none is defined.
 * 
 * @param {Channel} channel 
 * @returns {boolean}
 */
export function isPubsub(channel) {
  if (!channel.hasBinding('ably') ||
      !channel.binding('ably').is || 
      channel.binding('ably').is === 'pubsub') {
    return true;
  }
  return false;
}

/* TODO: Need isHistory, isPresence */