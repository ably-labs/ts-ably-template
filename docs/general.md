# General
These are all the general information about the generated client wrapper and what is available.

## Connection options
The generated client offers some connection functions

Connect to the Ably servers with the `connect` method with your custom options. Currently, the template does not care which security details you have defined in your AsyncAPI document or which servers are listed.

## Supported Content Types
The following payload types are supported, this is limited to the underlying Ably TypeScript library:

* For JSON payloads use: `application/json` content type, this is default if nothing is specified
* For string payloads use: `text/plain` content type
