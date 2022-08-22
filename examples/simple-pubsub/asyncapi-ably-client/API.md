## Modules

<dl>
<dt><a href="#module_streetlightStreetlightIdCommandTurnon">streetlightStreetlightIdCommandTurnon</a></dt>
<dd><p>Module which wraps functionality for the <code>streetlight/{streetlight_id}/command/turnon</code> channel</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#AblyAsyncApiClient">AblyAsyncApiClient</a></dt>
<dd><p>AblyAsyncApiClient</p>
<p>The generated client based on your AsyncAPI document.</p>
</dd>
<dt><a href="#AblyAsyncApiTestClient">AblyAsyncApiTestClient</a></dt>
<dd><p>AblyAsyncApiTestClient</p>
<p>The test/mirror client which is the reverse to the normal AblyAsyncApiClient.</p>
</dd>
</dl>

<a name="module_streetlightStreetlightIdCommandTurnon"></a>

## streetlightStreetlightIdCommandTurnon
Module which wraps functionality for the `streetlight/{streetlight_id}/command/turnon` channel


* [streetlightStreetlightIdCommandTurnon](#module_streetlightStreetlightIdCommandTurnon)
    * [~subscribe(onDataCallback, ably, streetlight_id, options)](#module_streetlightStreetlightIdCommandTurnon..subscribe)
    * [~publish(message, ably, streetlight_id, options)](#module_streetlightStreetlightIdCommandTurnon..publish)

<a name="module_streetlightStreetlightIdCommandTurnon..subscribe"></a>

### streetlightStreetlightIdCommandTurnon~subscribe(onDataCallback, ably, streetlight_id, options)
Internal functionality to setup subscription on the `streetlight/{streetlight_id}/command/turnon` channel

**Kind**: inner method of [<code>streetlightStreetlightIdCommandTurnon</code>](#module_streetlightStreetlightIdCommandTurnon)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| ably | to subscribe with |
| streetlight_id | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="module_streetlightStreetlightIdCommandTurnon..publish"></a>

### streetlightStreetlightIdCommandTurnon~publish(message, ably, streetlight_id, options)
Internal functionality to publish message to channel
streetlight/{streetlight_id}/command/turnon

**Kind**: inner method of [<code>streetlightStreetlightIdCommandTurnon</code>](#module_streetlightStreetlightIdCommandTurnon)  

| Param | Description |
| --- | --- |
| message | to publish |
| ably | Ably Realtime object to publish with |
| streetlight_id | parameter to use in topic |
| options | to publish with |

<a name="AblyAsyncApiClient"></a>

## AblyAsyncApiClient
AblyAsyncApiClient

The generated client based on your AsyncAPI document.

**Kind**: global class  

* [AblyAsyncApiClient](#AblyAsyncApiClient)
    * [new AblyAsyncApiClient(options)](#new_AblyAsyncApiClient_new)
    * [.connect(options)](#AblyAsyncApiClient+connect)
    * [.disconnect()](#AblyAsyncApiClient+disconnect)
    * [.isClosed()](#AblyAsyncApiClient+isClosed)
    * [.subscribeToStreetlightStreetlightIdCommandTurnon(onDataCallback, streetlight_id, options)](#AblyAsyncApiClient+subscribeToStreetlightStreetlightIdCommandTurnon)
    * [.publishToStreetlightStreetlightIdCommandTurnon(message, streetlight_id)](#AblyAsyncApiClient+publishToStreetlightStreetlightIdCommandTurnon)

<a name="new_AblyAsyncApiClient_new"></a>

### new AblyAsyncApiClient(options)
Try to connect to an Ably server


| Param | Description |
| --- | --- |
| options | to use |

<a name="AblyAsyncApiClient+connect"></a>

### ablyAsyncApiClient.connect(options)
Try to connect to an Ably server with the different payloads.

**Kind**: instance method of [<code>AblyAsyncApiClient</code>](#AblyAsyncApiClient)  

| Param | Description |
| --- | --- |
| options | to use, payload is omitted if sat in the AsyncAPI document. |

<a name="AblyAsyncApiClient+disconnect"></a>

### ablyAsyncApiClient.disconnect()
Disconnect from Ably

**Kind**: instance method of [<code>AblyAsyncApiClient</code>](#AblyAsyncApiClient)  
<a name="AblyAsyncApiClient+isClosed"></a>

### ablyAsyncApiClient.isClosed()
Returns whether or not any of the clients are closed

**Kind**: instance method of [<code>AblyAsyncApiClient</code>](#AblyAsyncApiClient)  
<a name="AblyAsyncApiClient+subscribeToStreetlightStreetlightIdCommandTurnon"></a>

### ablyAsyncApiClient.subscribeToStreetlightStreetlightIdCommandTurnon(onDataCallback, streetlight_id, options)
Subscribe to the `streetlight/{streetlight_id}/command/turnon`

Channel for the turn on command which should turn on the streetlight

**Kind**: instance method of [<code>AblyAsyncApiClient</code>](#AblyAsyncApiClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| streetlight_id | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="AblyAsyncApiClient+publishToStreetlightStreetlightIdCommandTurnon"></a>

### ablyAsyncApiClient.publishToStreetlightStreetlightIdCommandTurnon(message, streetlight_id)
Publish to the `streetlight/{streetlight_id}/command/turnon` channel

Channel for the turn on command which should turn on the streetlight

**Kind**: instance method of [<code>AblyAsyncApiClient</code>](#AblyAsyncApiClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| streetlight_id | parameter to use in topic |

<a name="AblyAsyncApiTestClient"></a>

## AblyAsyncApiTestClient
AblyAsyncApiTestClient

The test/mirror client which is the reverse to the normal AblyAsyncApiClient.

**Kind**: global class  

* [AblyAsyncApiTestClient](#AblyAsyncApiTestClient)
    * [new AblyAsyncApiTestClient(options)](#new_AblyAsyncApiTestClient_new)
    * [.connect(options)](#AblyAsyncApiTestClient+connect)
    * [.disconnect()](#AblyAsyncApiTestClient+disconnect)
    * [.isClosed()](#AblyAsyncApiTestClient+isClosed)
    * [.subscribeToStreetlightStreetlightIdCommandTurnon(onDataCallback, streetlight_id, options)](#AblyAsyncApiTestClient+subscribeToStreetlightStreetlightIdCommandTurnon)
    * [.publishToStreetlightStreetlightIdCommandTurnon(message, streetlight_id)](#AblyAsyncApiTestClient+publishToStreetlightStreetlightIdCommandTurnon)

<a name="new_AblyAsyncApiTestClient_new"></a>

### new AblyAsyncApiTestClient(options)
Try to connect to an Ably server


| Param | Description |
| --- | --- |
| options | to use |

<a name="AblyAsyncApiTestClient+connect"></a>

### ablyAsyncApiTestClient.connect(options)
Try to connect to an Ably server with the different payloads.

**Kind**: instance method of [<code>AblyAsyncApiTestClient</code>](#AblyAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| options | to use, payload is omitted if sat in the AsyncAPI document. |

<a name="AblyAsyncApiTestClient+disconnect"></a>

### ablyAsyncApiTestClient.disconnect()
Disconnect from Ably

**Kind**: instance method of [<code>AblyAsyncApiTestClient</code>](#AblyAsyncApiTestClient)  
<a name="AblyAsyncApiTestClient+isClosed"></a>

### ablyAsyncApiTestClient.isClosed()
Returns whether or not any of the clients are closed

**Kind**: instance method of [<code>AblyAsyncApiTestClient</code>](#AblyAsyncApiTestClient)  
<a name="AblyAsyncApiTestClient+subscribeToStreetlightStreetlightIdCommandTurnon"></a>

### ablyAsyncApiTestClient.subscribeToStreetlightStreetlightIdCommandTurnon(onDataCallback, streetlight_id, options)
Subscribe to the `streetlight/{streetlight_id}/command/turnon`

Channel for the turn on command which should turn on the streetlight

**Kind**: instance method of [<code>AblyAsyncApiTestClient</code>](#AblyAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| onDataCallback | to call when messages are received |
| streetlight_id | parameter to use in topic |
| options | to subscribe with, bindings from the AsyncAPI document overwrite these if specified |

<a name="AblyAsyncApiTestClient+publishToStreetlightStreetlightIdCommandTurnon"></a>

### ablyAsyncApiTestClient.publishToStreetlightStreetlightIdCommandTurnon(message, streetlight_id)
Publish to the `streetlight/{streetlight_id}/command/turnon` channel

Channel for the turn on command which should turn on the streetlight

**Kind**: instance method of [<code>AblyAsyncApiTestClient</code>](#AblyAsyncApiTestClient)  

| Param | Description |
| --- | --- |
| message | to publish |
| streetlight_id | parameter to use in topic |

