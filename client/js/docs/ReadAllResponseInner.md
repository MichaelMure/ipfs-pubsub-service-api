# PubsubServiceApi.ReadAllResponseInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**topic** | **String** | The name of the pubsub topic. | 
**messagesDropped** | **Number** | The number of messages dropped due to queue capacity constraints. | 
**messagesRemaining** | **Number** | The number of messages remaining in the queue. | 
**messages** | [**[ReadMessageProperty]**](ReadMessageProperty.md) | An array of messages that have been read. | 
**pubkeys** | **{String: Blob}** | A set of cryptographic public keys, one per peerID from. If &#x60;include-signature&#x60; is not used, this should not be populated. If the pubkey can be extracted from either &#x60;from&#x60; or &#x60;signature&#x60; in &#x60;ReadMessageProperty&#x60;, it should not be part of this list. For example with a Ed25519 or Secp256k1 peerID, the public key can be extracted. With ECDSA, the pubkey can be extracted from the signature and can also be omitted. On the other hand, none of that is possible with RSA and &#x60;pubkey&#x60; should be set if &#x60;include-signature&#x60; is used.  | [optional] 


