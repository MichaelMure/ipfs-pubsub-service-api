import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { DiscoveryResponse } from '../models/DiscoveryResponse';
import { Failure } from '../models/Failure';
import { FailureError } from '../models/FailureError';
import { JoinResponse } from '../models/JoinResponse';
import { ListResponseInner } from '../models/ListResponseInner';
import { PublishMessageProperty } from '../models/PublishMessageProperty';
import { QueuePolicyProperty } from '../models/QueuePolicyProperty';
import { ReadAllResponseInner } from '../models/ReadAllResponseInner';
import { ReadMessageProperty } from '../models/ReadMessageProperty';
import { ReadResponse } from '../models/ReadResponse';

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiDiscoveryRequest {
}

export interface DefaultApiFilterPeerIDRequest {
    /**
     * The name of the pubsub topic.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApifilterPeerID
     */
    topic: string
    /**
     * The libp2p peer identity.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApifilterPeerID
     */
    peerid: string
}

export interface DefaultApiJoinRequest {
    /**
     * The name of the pubsub topic.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApijoin
     */
    topic: string
    /**
     * The maximum number of pubsub messages stored by the service.
     * Defaults to: 20
     * @type number
     * @memberof DefaultApijoin
     */
    queueLength?: number
    /**
     * The policy to apply when the message queue is full.
     * Defaults to: undefined
     * @type &#39;drop-old&#39; | &#39;drop-new&#39;
     * @memberof DefaultApijoin
     */
    queuePolicy?: 'drop-old' | 'drop-new'
    /**
     * The subscription timeout (in seconds) for a pubsub topic after a /join operation.
     * Defaults to: 600
     * @type number
     * @memberof DefaultApijoin
     */
    timeout?: number
    /**
     * The maximum allowed size (in bytes) for a pubsub message.
     * Defaults to: undefined
     * @type number
     * @memberof DefaultApijoin
     */
    maxMessageSize?: number
}

export interface DefaultApiLeaveRequest {
    /**
     * The name of the pubsub topic.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApileave
     */
    topic: string
}

export interface DefaultApiListRequest {
    /**
     * Filter topics by a prefix string.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApilist
     */
    filterPrefix?: string
    /**
     * Filter topics by a suffix string.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApilist
     */
    filterSuffix?: string
    /**
     * The maximum number of topics to return.
     * Defaults to: undefined
     * @type number
     * @memberof DefaultApilist
     */
    maxTopic?: number
    /**
     * A pagination cursor to list topics after a specified topic.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApilist
     */
    afterTopic?: string
}

export interface DefaultApiPublishRequest {
    /**
     * The name of the pubsub topic.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApipublish
     */
    topic: string
    /**
     * 
     * @type PublishMessageProperty
     * @memberof DefaultApipublish
     */
    publishMessageProperty: PublishMessageProperty
}

export interface DefaultApiReadRequest {
    /**
     * The name of the pubsub topic.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApiread
     */
    topic: string
    /**
     * The maximum number of messages to read.
     * Defaults to: undefined
     * @type number
     * @memberof DefaultApiread
     */
    maxMessages?: number
    /**
     * If true, the response includes the public key and signature for each message.
     * Defaults to: false
     * @type boolean
     * @memberof DefaultApiread
     */
    includeSignature?: boolean
}

export interface DefaultApiReadAllRequest {
    /**
     * The maximum number of messages to read.
     * Defaults to: undefined
     * @type number
     * @memberof DefaultApireadAll
     */
    maxMessages?: number
    /**
     * Filter topics by a prefix string.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApireadAll
     */
    filterPrefix?: string
    /**
     * Filter topics by a suffix string.
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApireadAll
     */
    filterSuffix?: string
    /**
     * If true, the response includes the public key and signature for each message.
     * Defaults to: false
     * @type boolean
     * @memberof DefaultApireadAll
     */
    includeSignature?: boolean
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     * @param param the request object
     */
    public discoveryWithHttpInfo(param: DefaultApiDiscoveryRequest = {}, options?: Configuration): Promise<HttpInfo<DiscoveryResponse>> {
        return this.api.discoveryWithHttpInfo( options).toPromise();
    }

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     * @param param the request object
     */
    public discovery(param: DefaultApiDiscoveryRequest = {}, options?: Configuration): Promise<DiscoveryResponse> {
        return this.api.discovery( options).toPromise();
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param param the request object
     */
    public filterPeerIDWithHttpInfo(param: DefaultApiFilterPeerIDRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.filterPeerIDWithHttpInfo(param.topic, param.peerid,  options).toPromise();
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param param the request object
     */
    public filterPeerID(param: DefaultApiFilterPeerIDRequest, options?: Configuration): Promise<void> {
        return this.api.filterPeerID(param.topic, param.peerid,  options).toPromise();
    }

    /**
     * Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.
     * Subscribe to a pubsub topic and signal liveness
     * @param param the request object
     */
    public joinWithHttpInfo(param: DefaultApiJoinRequest, options?: Configuration): Promise<HttpInfo<JoinResponse>> {
        return this.api.joinWithHttpInfo(param.topic, param.queueLength, param.queuePolicy, param.timeout, param.maxMessageSize,  options).toPromise();
    }

    /**
     * Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.
     * Subscribe to a pubsub topic and signal liveness
     * @param param the request object
     */
    public join(param: DefaultApiJoinRequest, options?: Configuration): Promise<JoinResponse> {
        return this.api.join(param.topic, param.queueLength, param.queuePolicy, param.timeout, param.maxMessageSize,  options).toPromise();
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param param the request object
     */
    public leaveWithHttpInfo(param: DefaultApiLeaveRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.leaveWithHttpInfo(param.topic,  options).toPromise();
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param param the request object
     */
    public leave(param: DefaultApiLeaveRequest, options?: Configuration): Promise<void> {
        return this.api.leave(param.topic,  options).toPromise();
    }

    /**
     * List subscribed topics
     * @param param the request object
     */
    public listWithHttpInfo(param: DefaultApiListRequest = {}, options?: Configuration): Promise<HttpInfo<Array<ListResponseInner>>> {
        return this.api.listWithHttpInfo(param.filterPrefix, param.filterSuffix, param.maxTopic, param.afterTopic,  options).toPromise();
    }

    /**
     * List subscribed topics
     * @param param the request object
     */
    public list(param: DefaultApiListRequest = {}, options?: Configuration): Promise<Array<ListResponseInner>> {
        return this.api.list(param.filterPrefix, param.filterSuffix, param.maxTopic, param.afterTopic,  options).toPromise();
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param param the request object
     */
    public publishWithHttpInfo(param: DefaultApiPublishRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.publishWithHttpInfo(param.topic, param.publishMessageProperty,  options).toPromise();
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param param the request object
     */
    public publish(param: DefaultApiPublishRequest, options?: Configuration): Promise<void> {
        return this.api.publish(param.topic, param.publishMessageProperty,  options).toPromise();
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param param the request object
     */
    public readWithHttpInfo(param: DefaultApiReadRequest, options?: Configuration): Promise<HttpInfo<ReadResponse>> {
        return this.api.readWithHttpInfo(param.topic, param.maxMessages, param.includeSignature,  options).toPromise();
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param param the request object
     */
    public read(param: DefaultApiReadRequest, options?: Configuration): Promise<ReadResponse> {
        return this.api.read(param.topic, param.maxMessages, param.includeSignature,  options).toPromise();
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param param the request object
     */
    public readAllWithHttpInfo(param: DefaultApiReadAllRequest = {}, options?: Configuration): Promise<HttpInfo<Array<ReadAllResponseInner>>> {
        return this.api.readAllWithHttpInfo(param.maxMessages, param.filterPrefix, param.filterSuffix, param.includeSignature,  options).toPromise();
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param param the request object
     */
    public readAll(param: DefaultApiReadAllRequest = {}, options?: Configuration): Promise<Array<ReadAllResponseInner>> {
        return this.api.readAll(param.maxMessages, param.filterPrefix, param.filterSuffix, param.includeSignature,  options).toPromise();
    }

}
