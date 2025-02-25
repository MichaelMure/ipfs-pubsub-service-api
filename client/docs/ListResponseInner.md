# PubsubServiceApi.ListResponseInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**topic** | **String** | The name of the pubsub topic. | 
**queueLength** | **Number** | The maximum number of pubsub messages that can be stored by the service. | [optional] 
**queuePolicy** | [**QueuePolicyProperty**](QueuePolicyProperty.md) |  | [optional] 
**timeout** | **Number** | The duration (in seconds) for which a pubsub topic remains subscribed after a /join operation. | [optional] 
**maxMessageSize** | **Number** | The maximum size (in bytes) allowed for a single pubsub message. | [optional] 
**messagesRemaining** | **Number** | The number of messages remaining in the queue. | [optional] 
**messagesDropped** | **Number** | The number of messages dropped due to queue capacity constraints. | [optional] 


