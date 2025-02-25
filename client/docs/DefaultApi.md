# PubsubServiceApi.DefaultApi

All URIs are relative to *https://pubsub-service.example.com/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**discovery**](DefaultApi.md#discovery) | **GET** /discovery | Describe the service configuration and limits
[**filterPeerID**](DefaultApi.md#filterPeerID) | **POST** /filter-peerid | Instruct the service about read messages that the client side consider bogus or malicious.
[**join**](DefaultApi.md#join) | **POST** /join | Subscribe to a pubsub topic and signal liveness
[**leave**](DefaultApi.md#leave) | **POST** /leave | Unsubscribe from a pubsub topic
[**list**](DefaultApi.md#list) | **GET** /list | List subscribed topics
[**publish**](DefaultApi.md#publish) | **POST** /publish | Publish a message in a pubsub topic and signal liveness
[**read**](DefaultApi.md#read) | **POST** /read | Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
[**readAll**](DefaultApi.md#readAll) | **POST** /read-all | Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.



## discovery

> DiscoveryResponse discovery()

Describe the service configuration and limits

Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
apiInstance.discovery((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**DiscoveryResponse**](DiscoveryResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## filterPeerID

> filterPeerID(topic, peerid)

Instruct the service about read messages that the client side consider bogus or malicious.

One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let topic = "foo"; // String | The name of the pubsub topic.
let peerid = "QmdXGaeGiVA745XorV1jr11RHxB9z4fqykm6xCUPX1aTJo"; // String | The libp2p peer identity.
apiInstance.filterPeerID(topic, peerid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | **String**| The name of the pubsub topic. | 
 **peerid** | **String**| The libp2p peer identity. | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## join

> JoinResponse join(topic, opts)

Subscribe to a pubsub topic and signal liveness

Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let topic = "foo"; // String | The name of the pubsub topic.
let opts = {
  'queueLength': 20, // Number | The maximum number of pubsub messages stored by the service.
  'queuePolicy': "drop-old", // String | The policy to apply when the message queue is full.
  'timeout': 600, // Number | The subscription timeout (in seconds) for a pubsub topic after a /join operation.
  'maxMessageSize': 100000 // Number | The maximum allowed size (in bytes) for a pubsub message.
};
apiInstance.join(topic, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | **String**| The name of the pubsub topic. | 
 **queueLength** | **Number**| The maximum number of pubsub messages stored by the service. | [optional] [default to 20]
 **queuePolicy** | **String**| The policy to apply when the message queue is full. | [optional] 
 **timeout** | **Number**| The subscription timeout (in seconds) for a pubsub topic after a /join operation. | [optional] [default to 600]
 **maxMessageSize** | **Number**| The maximum allowed size (in bytes) for a pubsub message. | [optional] 

### Return type

[**JoinResponse**](JoinResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## leave

> leave(topic)

Unsubscribe from a pubsub topic

Unsubscribe from a pubsub topic, and destroy any stored message for that topic.

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let topic = "foo"; // String | The name of the pubsub topic.
apiInstance.leave(topic, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | **String**| The name of the pubsub topic. | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## list

> [ListResponseInner] list(opts)

List subscribed topics

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let opts = {
  'filterPrefix': "/foo/bar", // String | Filter topics by a prefix string.
  'filterSuffix': "/events", // String | Filter topics by a suffix string.
  'maxTopic': 5, // Number | The maximum number of topics to return.
  'afterTopic': "afterTopic_example" // String | A pagination cursor to list topics after a specified topic.
};
apiInstance.list(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filterPrefix** | **String**| Filter topics by a prefix string. | [optional] 
 **filterSuffix** | **String**| Filter topics by a suffix string. | [optional] 
 **maxTopic** | **Number**| The maximum number of topics to return. | [optional] 
 **afterTopic** | **String**| A pagination cursor to list topics after a specified topic. | [optional] 

### Return type

[**[ListResponseInner]**](ListResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## publish

> publish(topic, messageProperty)

Publish a message in a pubsub topic and signal liveness

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let topic = "foo"; // String | The name of the pubsub topic.
let messageProperty = new PubsubServiceApi.MessageProperty(); // MessageProperty | 
apiInstance.publish(topic, messageProperty, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | **String**| The name of the pubsub topic. | 
 **messageProperty** | [**MessageProperty**](MessageProperty.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## read

> ReadResponse read(topic, opts)

Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let topic = "foo"; // String | The name of the pubsub topic.
let opts = {
  'maxMessages': 5, // Number | The maximum number of messages to read.
  'includeSignature': true // Boolean | If true, the response includes the public key and signature for each message.
};
apiInstance.read(topic, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | **String**| The name of the pubsub topic. | 
 **maxMessages** | **Number**| The maximum number of messages to read. | [optional] 
 **includeSignature** | **Boolean**| If true, the response includes the public key and signature for each message. | [optional] [default to false]

### Return type

[**ReadResponse**](ReadResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## readAll

> [ReadAllResponseInner] readAll(opts)

Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.

### Example

```javascript
import PubsubServiceApi from 'pubsub_service_api';

let apiInstance = new PubsubServiceApi.DefaultApi();
let opts = {
  'maxMessages': 5, // Number | The maximum number of messages to read.
  'filterPrefix': "/foo/bar", // String | Filter topics by a prefix string.
  'filterSuffix': "/events", // String | Filter topics by a suffix string.
  'includeSignature': true // Boolean | If true, the response includes the public key and signature for each message.
};
apiInstance.readAll(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **maxMessages** | **Number**| The maximum number of messages to read. | [optional] 
 **filterPrefix** | **String**| Filter topics by a prefix string. | [optional] 
 **filterSuffix** | **String**| Filter topics by a suffix string. | [optional] 
 **includeSignature** | **Boolean**| If true, the response includes the public key and signature for each message. | [optional] [default to false]

### Return type

[**[ReadAllResponseInner]**](ReadAllResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

