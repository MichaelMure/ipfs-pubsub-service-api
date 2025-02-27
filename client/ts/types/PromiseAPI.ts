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
import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     */
    public discoveryWithHttpInfo(_options?: Configuration): Promise<HttpInfo<DiscoveryResponse>> {
        const result = this.api.discoveryWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     */
    public discovery(_options?: Configuration): Promise<DiscoveryResponse> {
        const result = this.api.discovery(_options);
        return result.toPromise();
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param topic The name of the pubsub topic.
     * @param peerid The libp2p peer identity.
     */
    public filterPeerIDWithHttpInfo(topic: string, peerid: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.filterPeerIDWithHttpInfo(topic, peerid, _options);
        return result.toPromise();
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param topic The name of the pubsub topic.
     * @param peerid The libp2p peer identity.
     */
    public filterPeerID(topic: string, peerid: string, _options?: Configuration): Promise<void> {
        const result = this.api.filterPeerID(topic, peerid, _options);
        return result.toPromise();
    }

    /**
     * Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.
     * Subscribe to a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param [queueLength] The maximum number of pubsub messages stored by the service.
     * @param [queuePolicy] The policy to apply when the message queue is full.
     * @param [timeout] The subscription timeout (in seconds) for a pubsub topic after a /join operation.
     * @param [maxMessageSize] The maximum allowed size (in bytes) for a pubsub message.
     */
    public joinWithHttpInfo(topic: string, queueLength?: number, queuePolicy?: 'drop-old' | 'drop-new', timeout?: number, maxMessageSize?: number, _options?: Configuration): Promise<HttpInfo<JoinResponse>> {
        const result = this.api.joinWithHttpInfo(topic, queueLength, queuePolicy, timeout, maxMessageSize, _options);
        return result.toPromise();
    }

    /**
     * Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.
     * Subscribe to a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param [queueLength] The maximum number of pubsub messages stored by the service.
     * @param [queuePolicy] The policy to apply when the message queue is full.
     * @param [timeout] The subscription timeout (in seconds) for a pubsub topic after a /join operation.
     * @param [maxMessageSize] The maximum allowed size (in bytes) for a pubsub message.
     */
    public join(topic: string, queueLength?: number, queuePolicy?: 'drop-old' | 'drop-new', timeout?: number, maxMessageSize?: number, _options?: Configuration): Promise<JoinResponse> {
        const result = this.api.join(topic, queueLength, queuePolicy, timeout, maxMessageSize, _options);
        return result.toPromise();
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param topic The name of the pubsub topic.
     */
    public leaveWithHttpInfo(topic: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.leaveWithHttpInfo(topic, _options);
        return result.toPromise();
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param topic The name of the pubsub topic.
     */
    public leave(topic: string, _options?: Configuration): Promise<void> {
        const result = this.api.leave(topic, _options);
        return result.toPromise();
    }

    /**
     * List subscribed topics
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [maxTopic] The maximum number of topics to return.
     * @param [afterTopic] A pagination cursor to list topics after a specified topic.
     */
    public listWithHttpInfo(filterPrefix?: string, filterSuffix?: string, maxTopic?: number, afterTopic?: string, _options?: Configuration): Promise<HttpInfo<Array<ListResponseInner>>> {
        const result = this.api.listWithHttpInfo(filterPrefix, filterSuffix, maxTopic, afterTopic, _options);
        return result.toPromise();
    }

    /**
     * List subscribed topics
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [maxTopic] The maximum number of topics to return.
     * @param [afterTopic] A pagination cursor to list topics after a specified topic.
     */
    public list(filterPrefix?: string, filterSuffix?: string, maxTopic?: number, afterTopic?: string, _options?: Configuration): Promise<Array<ListResponseInner>> {
        const result = this.api.list(filterPrefix, filterSuffix, maxTopic, afterTopic, _options);
        return result.toPromise();
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param publishMessageProperty
     */
    public publishWithHttpInfo(topic: string, publishMessageProperty: PublishMessageProperty, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.publishWithHttpInfo(topic, publishMessageProperty, _options);
        return result.toPromise();
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param publishMessageProperty
     */
    public publish(topic: string, publishMessageProperty: PublishMessageProperty, _options?: Configuration): Promise<void> {
        const result = this.api.publish(topic, publishMessageProperty, _options);
        return result.toPromise();
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param topic The name of the pubsub topic.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public readWithHttpInfo(topic: string, maxMessages?: number, includeSignature?: boolean, _options?: Configuration): Promise<HttpInfo<ReadResponse>> {
        const result = this.api.readWithHttpInfo(topic, maxMessages, includeSignature, _options);
        return result.toPromise();
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param topic The name of the pubsub topic.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public read(topic: string, maxMessages?: number, includeSignature?: boolean, _options?: Configuration): Promise<ReadResponse> {
        const result = this.api.read(topic, maxMessages, includeSignature, _options);
        return result.toPromise();
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public readAllWithHttpInfo(maxMessages?: number, filterPrefix?: string, filterSuffix?: string, includeSignature?: boolean, _options?: Configuration): Promise<HttpInfo<Array<ReadAllResponseInner>>> {
        const result = this.api.readAllWithHttpInfo(maxMessages, filterPrefix, filterSuffix, includeSignature, _options);
        return result.toPromise();
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public readAll(maxMessages?: number, filterPrefix?: string, filterSuffix?: string, includeSignature?: boolean, _options?: Configuration): Promise<Array<ReadAllResponseInner>> {
        const result = this.api.readAll(maxMessages, filterPrefix, filterSuffix, includeSignature, _options);
        return result.toPromise();
    }


}



