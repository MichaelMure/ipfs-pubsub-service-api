# .DefaultApi

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


# **discovery**
> DiscoveryResponse discovery()

Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.

### Example


```typescript
import { createConfiguration, DefaultApi } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request = {};

const data = await apiInstance.discovery(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**DiscoveryResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the service configuration |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterPeerID**
> void filterPeerID()

One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.

### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiFilterPeerIDRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiFilterPeerIDRequest = {
    // The name of the pubsub topic.
  topic: "foo",
    // The libp2p peer identity.
  peerid: "QmdXGaeGiVA745XorV1jr11RHxB9z4fqykm6xCUPX1aTJo",
};

const data = await apiInstance.filterPeerID(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | [**string**] | The name of the pubsub topic. | defaults to undefined
 **peerid** | [**string**] | The libp2p peer identity. | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Service understood the instruction and will proceed. |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**404** | Error response indicating that the specified topic was not found. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **join**
> JoinResponse join()

Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.

### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiJoinRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiJoinRequest = {
    // The name of the pubsub topic.
  topic: "foo",
    // The maximum number of pubsub messages stored by the service. (optional)
  queueLength: 20,
    // The policy to apply when the message queue is full. (optional)
  queuePolicy: "drop-old",
    // The subscription timeout (in seconds) for a pubsub topic after a /join operation. (optional)
  timeout: 600,
    // The maximum allowed size (in bytes) for a pubsub message. (optional)
  maxMessageSize: 100000,
};

const data = await apiInstance.join(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | [**string**] | The name of the pubsub topic. | defaults to undefined
 **queueLength** | [**number**] | The maximum number of pubsub messages stored by the service. | (optional) defaults to 20
 **queuePolicy** | [**&#39;drop-old&#39; | &#39;drop-new&#39;**]**Array<&#39;drop-old&#39; &#124; &#39;drop-new&#39;>** | The policy to apply when the message queue is full. | (optional) defaults to undefined
 **timeout** | [**number**] | The subscription timeout (in seconds) for a pubsub topic after a /join operation. | (optional) defaults to 600
 **maxMessageSize** | [**number**] | The maximum allowed size (in bytes) for a pubsub message. | (optional) defaults to undefined


### Return type

**JoinResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Join accepted. The service will proceed and start to listen. |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **leave**
> void leave()

Unsubscribe from a pubsub topic, and destroy any stored message for that topic.

### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiLeaveRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiLeaveRequest = {
    // The name of the pubsub topic.
  topic: "foo",
};

const data = await apiInstance.leave(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | [**string**] | The name of the pubsub topic. | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Leave is effective |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**404** | Error response indicating that the specified topic was not found. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **list**
> Array<ListResponseInner> list()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiListRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiListRequest = {
    // Filter topics by a prefix string. (optional)
  filterPrefix: "/foo/bar",
    // Filter topics by a suffix string. (optional)
  filterSuffix: "/events",
    // The maximum number of topics to return. (optional)
  maxTopic: 5,
    // A pagination cursor to list topics after a specified topic. (optional)
  afterTopic: "after-topic_example",
};

const data = await apiInstance.list(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filterPrefix** | [**string**] | Filter topics by a prefix string. | (optional) defaults to undefined
 **filterSuffix** | [**string**] | Filter topics by a suffix string. | (optional) defaults to undefined
 **maxTopic** | [**number**] | The maximum number of topics to return. | (optional) defaults to undefined
 **afterTopic** | [**string**] | A pagination cursor to list topics after a specified topic. | (optional) defaults to undefined


### Return type

**Array<ListResponseInner>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a list of subscribed topic with characteristics. |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **publish**
> void publish(publishMessageProperty)


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiPublishRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiPublishRequest = {
    // The name of the pubsub topic.
  topic: "foo",
  
  publishMessageProperty: {
    data: "YWJj",
    _from: "QmcXhKGEAJT9DwwzKeEZsWrYTTGkzBdgeKif2MdAXBswJv",
    pubkey: [B@3dd818e8,
    signature: [B@4cb40e3b,
  },
};

const data = await apiInstance.publish(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **publishMessageProperty** | **PublishMessageProperty**|  |
 **topic** | [**string**] | The name of the pubsub topic. | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Message published successfully. |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**404** | Error response indicating that the specified topic was not found. |  -  |
**413** | Error response indicating that the message size exceeds the allowed limit. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **read**
> ReadResponse read()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiReadRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiReadRequest = {
    // The name of the pubsub topic.
  topic: "foo",
    // The maximum number of messages to read. (optional)
  maxMessages: 5,
    // If true, the response includes the public key and signature for each message. (optional)
  includeSignature: true,
};

const data = await apiInstance.read(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topic** | [**string**] | The name of the pubsub topic. | defaults to undefined
 **maxMessages** | [**number**] | The maximum number of messages to read. | (optional) defaults to undefined
 **includeSignature** | [**boolean**] | If true, the response includes the public key and signature for each message. | (optional) defaults to false


### Return type

**ReadResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the read messages as well as pagination information. |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**404** | Error response indicating that the specified topic was not found. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readAll**
> Array<ReadAllResponseInner> readAll()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiReadAllRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiReadAllRequest = {
    // The maximum number of messages to read. (optional)
  maxMessages: 5,
    // Filter topics by a prefix string. (optional)
  filterPrefix: "/foo/bar",
    // Filter topics by a suffix string. (optional)
  filterSuffix: "/events",
    // If true, the response includes the public key and signature for each message. (optional)
  includeSignature: true,
};

const data = await apiInstance.readAll(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **maxMessages** | [**number**] | The maximum number of messages to read. | (optional) defaults to undefined
 **filterPrefix** | [**string**] | Filter topics by a prefix string. | (optional) defaults to undefined
 **filterSuffix** | [**string**] | Filter topics by a suffix string. | (optional) defaults to undefined
 **includeSignature** | [**boolean**] | If true, the response includes the public key and signature for each message. | (optional) defaults to false


### Return type

**Array<ReadAllResponseInner>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the read messages as well as pagination information. |  -  |
**400** | Error response for a bad request. |  -  |
**401** | Error response for an unauthorized request. |  -  |
**402** | Error response indicating insufficient funds. |  -  |
**404** | Error response indicating that the specified topic was not found. |  -  |
**429** | Error response for too many requests (rate limiting). |  * Retry-After - Indicates how many seconds to wait before retrying. <br>  |
**4XX** | Error response for a custom service error. |  -  |
**5XX** | Error response for an unexpected internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


