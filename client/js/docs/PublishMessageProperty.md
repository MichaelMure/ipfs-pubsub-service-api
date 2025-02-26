# PubsubServiceApi.PublishMessageProperty

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | **String** | The content encoded with base64 standard alphabet with padding. | 
**from** | **String** | The peer ID of the sender. If not set, the client doesn&#39;t control the author of the message and the server will sign the message on behalf of the client. | [optional] 
**pubkey** | **Blob** | The sender&#39;s public key encoded with base64 standard alphabet with padding in X.509 DER format. This should be set if &#x60;from&#x60; is used and the pubkey can&#39;t be extracted from &#x60;from&#x60; or &#x60;pubkey&#x60;. For example with a Ed25519 or Secp256k1 peerID, the public key can be extracted. With ECDSA, the pubkey can be extracted from the signature and can also be omitted. On the other hand, none of that is possible with RSA and &#x60;pubkey&#x60; should be set if &#x60;from&#x60; is used.  | [optional] 
**signature** | **Blob** | The signature for the message. This should be set if &#x60;from&#x60; is used. | [optional] 


