/**
 * Pubsub Service API
 * ## Goal  The goal of this API is to be able to use pubsub on any device and under any condition to build decentralized application. Powerful and well connected machine can use pubsub directly, but different reasons can make that difficult. Notable one are mobile or IOT devices: bad networking (NAT, ...), battery life, available compute or application lifespan.  This API allow to delegate to a more powerful instance or a service provider this role of interacting with pubsub. As this API is asynchronous at its core, it allows to instruct that provider to listen to topics, sleep, and come back later to retrieve messages.   ## Design Principles  - effort is made to allow client to operate with the minimum of requests, and within a limited time window. An example of that is /join that returns before the topic is actually subscribed and ready. - as the real world as shown, there is a gradient of necessary validation of received message, ranging from generic or protocol layer (ex:  deduplicate messages, max message size) to application specific (non-conforming message, abuse ...). All of those would usually be done in the same place if the application directly perform pubsub, but this is not the case here. The choice here is to split those into server side (the generic part, including some form of spam prevention) and the client side (anything that require specific logic or data), and have a way for the client to hint the server about those bad message or PeerID. - provide a versioned API from the start  ## Versioning  This API is expected to be hosted at an URL with a path ending with `/v1`, so that future major versions, if any, can be hosted side by side. An example of that would be `https://pubsub-service.example.com/v1`.  ## Expected Usage Patterns  ### Subscribing to a Topic  This first step to use a pubsub service is to join a topic, and optionally define limits. For example, the following will join the `foo` topic for a maximum of 3600s, have a queue of 10 messages of maximum 1000 bytes, and drop old messages if the queue fills up:  `POST /join?topic=foo&queue-length=10&queue-policy=drop-old&timeout=3600&max-message-size=1000`  The service will confirm with a 202, and returns the effective limits as a confirmation. Those limits can be restricted by the service if they are outside of the maximum advertised in the /discovery endpoints:  ```json {   \"queue-length\": 10,   \"queue-policy\": \"drop-old\",   \"timeout\": 3600,   \"max-message-size\": 1000 } ```  ### Publishing and Reading Messages  We now can publish a message, by passing it as the body of the following request:  `POST /publish?topic=foo`  We can read messages in the queue:  `POST /read?topic=foo&count=2`  Here, we ask for a maximum of 2 messages. The service returns them, and inform us that there is 8 more in the queue, and that 2 have been dropped due to the queue filling up:  ```json {   \"messages-dropped\": 2,   \"messages-remaining\": 8,   \"messages\": [     {       \"from\": \"QmdXGaeGiVA745XorV1jr11RHxB9z4fqykm6xCUPX1aTJo\",       \"data\": \"aGVsbG8gd29ybGQK\"     },     {       \"from\": \"QmdXGaeGiVA745XorV1jr11RHxB9z4fqykm6xCUPX1aTJo\",       \"data\": \"aG93IGFyZSB0aGluZ3MgdG9kYXk/Cg==\"     }   ] } ```  ### Maintaining Active Subscription  To avoid keeping alive irrelevant topic subscriptions, services have a timeout defined per topic. If the client is not active on that topic (/join, /publish, /read or /read-all), the service consider that the client is gone and teardown that subscription. To avoid that, clients should signal liveness with a query to one of those endpoints, which will reset the timeout to the maximum duration defined during /join.  Which endpoint to use is up to the client. For example, a client that does read message might want to periodically /read or /read-all, while a client only writing messages might want to periodically use /join again if not enough messages are published.  ## Multi-Tenant Considerations  This specification doesn't enforce anything about how multi-tenancy should be implemented. It is however expected that an authentication layer (BasicAuth, OAuth, UCAN ...) may be added, which should provide the relevant client identifier to return the appropriate responses for that specific client. This is however not a requirement, as an implementation could serve a single client without authentication. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ReadMessageProperty from './ReadMessageProperty';

/**
 * The ReadResponse model module.
 * @module model/ReadResponse
 * @version 1.0.0
 */
class ReadResponse {
    /**
     * Constructs a new <code>ReadResponse</code>.
     * Response schema for the /read endpoint.
     * @alias module:model/ReadResponse
     * @param messagesDropped {Number} The number of messages dropped due to queue capacity constraints.
     * @param messagesRemaining {Number} The number of messages remaining in the queue.
     * @param messages {Array.<module:model/ReadMessageProperty>} An array of messages that have been read.
     */
    constructor(messagesDropped, messagesRemaining, messages) { 
        
        ReadResponse.initialize(this, messagesDropped, messagesRemaining, messages);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, messagesDropped, messagesRemaining, messages) { 
        obj['messages-dropped'] = messagesDropped;
        obj['messages-remaining'] = messagesRemaining;
        obj['messages'] = messages;
    }

    /**
     * Constructs a <code>ReadResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ReadResponse} obj Optional instance to populate.
     * @return {module:model/ReadResponse} The populated <code>ReadResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ReadResponse();

            if (data.hasOwnProperty('messages-dropped')) {
                obj['messages-dropped'] = ApiClient.convertToType(data['messages-dropped'], 'Number');
            }
            if (data.hasOwnProperty('messages-remaining')) {
                obj['messages-remaining'] = ApiClient.convertToType(data['messages-remaining'], 'Number');
            }
            if (data.hasOwnProperty('messages')) {
                obj['messages'] = ApiClient.convertToType(data['messages'], [ReadMessageProperty]);
            }
            if (data.hasOwnProperty('pubkeys')) {
                obj['pubkeys'] = ApiClient.convertToType(data['pubkeys'], {'String': 'Blob'});
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ReadResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ReadResponse</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ReadResponse.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        if (data['messages']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['messages'])) {
                throw new Error("Expected the field `messages` to be an array in the JSON data but got " + data['messages']);
            }
            // validate the optional field `messages` (array)
            for (const item of data['messages']) {
                ReadMessageProperty.validateJSON(item);
            };
        }

        return true;
    }


}

ReadResponse.RequiredProperties = ["messages-dropped", "messages-remaining", "messages"];

/**
 * The number of messages dropped due to queue capacity constraints.
 * @member {Number} messages-dropped
 */
ReadResponse.prototype['messages-dropped'] = undefined;

/**
 * The number of messages remaining in the queue.
 * @member {Number} messages-remaining
 */
ReadResponse.prototype['messages-remaining'] = undefined;

/**
 * An array of messages that have been read.
 * @member {Array.<module:model/ReadMessageProperty>} messages
 */
ReadResponse.prototype['messages'] = undefined;

/**
 * A set of cryptographic public keys, one per peerID from. If `include-signature` is not used, this should not be populated. If the pubkey can be extracted from either `from` or `signature` in `ReadMessageProperty`, it should not be part of this list. For example with a Ed25519 or Secp256k1 peerID, the public key can be extracted. With ECDSA, the pubkey can be extracted from the signature and can also be omitted. On the other hand, none of that is possible with RSA and `pubkey` should be set if `include-signature` is used. 
 * @member {Object.<String, Blob>} pubkeys
 */
ReadResponse.prototype['pubkeys'] = undefined;






export default ReadResponse;

