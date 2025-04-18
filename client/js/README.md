# pubsub_service_api

PubsubServiceApi - JavaScript client for pubsub_service_api
## Goal

The goal of this API is to be able to use pubsub on any device and under any condition to build decentralized application. Powerful and well connected machine can use pubsub directly, but different reasons can make that difficult. Notable one are mobile or IOT devices: bad networking (NAT, ...), battery life, available compute or application lifespan.

This API allow to delegate to a more powerful instance or a service provider this role of interacting with pubsub. As this API is asynchronous at its core, it allows to instruct that provider to listen to topics, sleep, and come back later to retrieve messages. 

## Design Principles

- effort is made to allow client to operate with the minimum of requests, and within a limited time window. An example of that is /join that returns before the topic is actually subscribed and ready.
- as the real world as shown, there is a gradient of necessary validation of received message, ranging from generic or protocol layer (ex:  deduplicate messages, max message size) to application specific (non-conforming message, abuse ...). All of those would usually be done in the same place if the application directly perform pubsub, but this is not the case here. The choice here is to split those into server side (the generic part, including some form of spam prevention) and the client side (anything that require specific logic or data), and have a way for the client to hint the server about those bad message or PeerID.
- provide a versioned API from the start

## Versioning

This API is expected to be hosted at an URL with a path ending with `/v1`, so that future major versions, if any, can be hosted side by side. An example of that would be `https://pubsub-service.example.com/v1`.

## Expected Usage Patterns

### Subscribing to a Topic

This first step to use a pubsub service is to join a topic, and optionally define limits. For example, the following will join the `foo` topic for a maximum of 3600s, have a queue of 10 messages of maximum 1000 bytes, and drop old messages if the queue fills up:

`POST /join?topic=foo&queue-length=10&queue-policy=drop-old&timeout=3600&max-message-size=1000`

The service will confirm with a 202, and returns the effective limits as a confirmation. Those limits can be restricted by the service if they are outside of the maximum advertised in the /discovery endpoints:

```json
{
  \"queue-length\": 10,
  \"queue-policy\": \"drop-old\",
  \"timeout\": 3600,
  \"max-message-size\": 1000
}
```

### Publishing and Reading Messages

We now can publish a message, by passing it as the body of the following request:

`POST /publish?topic=foo`

We can read messages in the queue:

`POST /read?topic=foo&count=2`

Here, we ask for a maximum of 2 messages. The service returns them, and inform us that there is 8 more in the queue, and that 2 have been dropped due to the queue filling up:

```json
{
  \"messages-dropped\": 2,
  \"messages-remaining\": 8,
  \"messages\": [
    {
      \"from\": \"QmdXGaeGiVA745XorV1jr11RHxB9z4fqykm6xCUPX1aTJo\",
      \"data\": \"aGVsbG8gd29ybGQK\"
    },
    {
      \"from\": \"QmdXGaeGiVA745XorV1jr11RHxB9z4fqykm6xCUPX1aTJo\",
      \"data\": \"aG93IGFyZSB0aGluZ3MgdG9kYXk/Cg==\"
    }
  ]
}
```

### Maintaining Active Subscription

To avoid keeping alive irrelevant topic subscriptions, services have a timeout defined per topic. If the client is not active on that topic (/join, /publish, /read or /read-all), the service consider that the client is gone and teardown that subscription. To avoid that, clients should signal liveness with a query to one of those endpoints, which will reset the timeout to the maximum duration defined during /join.

Which endpoint to use is up to the client. For example, a client that does read message might want to periodically /read or /read-all, while a client only writing messages might want to periodically use /join again if not enough messages are published.

## Multi-Tenant Considerations

This specification doesn't enforce anything about how multi-tenancy should be implemented. It is however expected that an authentication layer (BasicAuth, OAuth, UCAN ...) may be added, which should provide the relevant client identifier to return the appropriate responses for that specific client. This is however not a requirement, as an implementation could serve a single client without authentication.

This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.0.0
- Package version: 1.0.0
- Generator version: 7.11.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install pubsub_service_api --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your pubsub_service_api from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var PubsubServiceApi = require('pubsub_service_api');


var api = new PubsubServiceApi.DefaultApi()
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.discovery(callback);

```

## Documentation for API Endpoints

All URIs are relative to *https://pubsub-service.example.com/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*PubsubServiceApi.DefaultApi* | [**discovery**](docs/DefaultApi.md#discovery) | **GET** /discovery | Describe the service configuration and limits
*PubsubServiceApi.DefaultApi* | [**filterPeerID**](docs/DefaultApi.md#filterPeerID) | **POST** /filter-peerid | Instruct the service about read messages that the client side consider bogus or malicious.
*PubsubServiceApi.DefaultApi* | [**join**](docs/DefaultApi.md#join) | **POST** /join | Subscribe to a pubsub topic and signal liveness
*PubsubServiceApi.DefaultApi* | [**leave**](docs/DefaultApi.md#leave) | **POST** /leave | Unsubscribe from a pubsub topic
*PubsubServiceApi.DefaultApi* | [**list**](docs/DefaultApi.md#list) | **GET** /list | List subscribed topics
*PubsubServiceApi.DefaultApi* | [**publish**](docs/DefaultApi.md#publish) | **POST** /publish | Publish a message in a pubsub topic and signal liveness
*PubsubServiceApi.DefaultApi* | [**read**](docs/DefaultApi.md#read) | **POST** /read | Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
*PubsubServiceApi.DefaultApi* | [**readAll**](docs/DefaultApi.md#readAll) | **POST** /read-all | Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.


## Documentation for Models

 - [PubsubServiceApi.DiscoveryResponse](docs/DiscoveryResponse.md)
 - [PubsubServiceApi.Failure](docs/Failure.md)
 - [PubsubServiceApi.FailureError](docs/FailureError.md)
 - [PubsubServiceApi.JoinResponse](docs/JoinResponse.md)
 - [PubsubServiceApi.ListResponseInner](docs/ListResponseInner.md)
 - [PubsubServiceApi.PublishMessageProperty](docs/PublishMessageProperty.md)
 - [PubsubServiceApi.QueuePolicyProperty](docs/QueuePolicyProperty.md)
 - [PubsubServiceApi.ReadAllResponseInner](docs/ReadAllResponseInner.md)
 - [PubsubServiceApi.ReadMessageProperty](docs/ReadMessageProperty.md)
 - [PubsubServiceApi.ReadResponse](docs/ReadResponse.md)


## Documentation for Authorization

Endpoints do not require authorization.

