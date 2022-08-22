<h1 align="center">TypeScript/Node.js Ably template</h1>

<p align="center">
  <em>This is a TypeScript/Node.js Ably template for the AsyncAPI generator.</em>
</p>

This template is for generating a TypeScript/Node.js wrapper for the Ably client based on your AsyncAPI document. The template is based on the [ably.js](https://github.com/ably/ably-js) library and can be used as both a TypeScript and Node.js library.

Have you found a bug or have an idea for improvement? Feel free to contribute! See [the contribution guidelines](#Contributing) for how to do so.

# How to use
Example use-cases can be found under [examples](./examples).

Information about the generated files and a description can be found under [the documentation folder](./docs/general.md).

## Requirements
* @asyncapi/generator < v2.0.0 >v1.1.1

## Template Parameters
These are the available template parameters:
|Parameter|Type|Description|
|---|---|---|
| generateTestClient | Boolean | Use this parameter to generate the [test client](#test-client). Add the following to the CLI when generating your code `--param "generateTestClient=true"`

## Features
* Supports wildcard channels. AsyncAPI describes the channel path to be defined as [RFC 6570 URI](https://www.asyncapi.com/docs/specifications/2.0.0/#a-name-channelsobject-a-channels-object). So a channel containing a wildcard needs to be defined with parameters such as `smartylighting/streetlights/{wildcard}`.
* Supports [test/mirror client](./docs/general.md#test-client) for testing or other useful scenarios.
* This template can be used as a NodeJS library.
* Generates payload models using the [AsyncAPI model generation library](https://github.com/asyncapi/generator-model-sdk). 

## Restrictions 
* Empty objects are not supported, use `null` types instead.

# Contributing

Before contributing, please read the [CONTRIBUTING](CONTRIBUTING.md) document.

# Contributors ✨

This generator and template has been heavily based on the [ts-nats-template](https://github.com/asyncapi/ts-nats-template), so a massive thanks to everyone who's [contributed to that project](https://github.com/asyncapi/ts-nats-template#contributors-).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/tomczoink"><img src="https://avatars.githubusercontent.com/u/9784119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tom Camp</b></sub></a><br /><a href="https://github.com/ably/ts-ably-template/pulls?q=is%3Apr+reviewed-by%3tomczoink" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->