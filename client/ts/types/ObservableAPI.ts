import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     */
    public discoveryWithHttpInfo(_options?: Configuration): Observable<HttpInfo<DiscoveryResponse>> {
        const requestContextPromise = this.requestFactory.discovery(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.discoveryWithHttpInfo(rsp)));
            }));
    }

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     */
    public discovery(_options?: Configuration): Observable<DiscoveryResponse> {
        return this.discoveryWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<DiscoveryResponse>) => apiResponse.data));
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param topic The name of the pubsub topic.
     * @param peerid The libp2p peer identity.
     */
    public filterPeerIDWithHttpInfo(topic: string, peerid: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.filterPeerID(topic, peerid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.filterPeerIDWithHttpInfo(rsp)));
            }));
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param topic The name of the pubsub topic.
     * @param peerid The libp2p peer identity.
     */
    public filterPeerID(topic: string, peerid: string, _options?: Configuration): Observable<void> {
        return this.filterPeerIDWithHttpInfo(topic, peerid, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
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
    public joinWithHttpInfo(topic: string, queueLength?: number, queuePolicy?: 'drop-old' | 'drop-new', timeout?: number, maxMessageSize?: number, _options?: Configuration): Observable<HttpInfo<JoinResponse>> {
        const requestContextPromise = this.requestFactory.join(topic, queueLength, queuePolicy, timeout, maxMessageSize, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.joinWithHttpInfo(rsp)));
            }));
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
    public join(topic: string, queueLength?: number, queuePolicy?: 'drop-old' | 'drop-new', timeout?: number, maxMessageSize?: number, _options?: Configuration): Observable<JoinResponse> {
        return this.joinWithHttpInfo(topic, queueLength, queuePolicy, timeout, maxMessageSize, _options).pipe(map((apiResponse: HttpInfo<JoinResponse>) => apiResponse.data));
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param topic The name of the pubsub topic.
     */
    public leaveWithHttpInfo(topic: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.leave(topic, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.leaveWithHttpInfo(rsp)));
            }));
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param topic The name of the pubsub topic.
     */
    public leave(topic: string, _options?: Configuration): Observable<void> {
        return this.leaveWithHttpInfo(topic, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * List subscribed topics
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [maxTopic] The maximum number of topics to return.
     * @param [afterTopic] A pagination cursor to list topics after a specified topic.
     */
    public listWithHttpInfo(filterPrefix?: string, filterSuffix?: string, maxTopic?: number, afterTopic?: string, _options?: Configuration): Observable<HttpInfo<Array<ListResponseInner>>> {
        const requestContextPromise = this.requestFactory.list(filterPrefix, filterSuffix, maxTopic, afterTopic, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listWithHttpInfo(rsp)));
            }));
    }

    /**
     * List subscribed topics
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [maxTopic] The maximum number of topics to return.
     * @param [afterTopic] A pagination cursor to list topics after a specified topic.
     */
    public list(filterPrefix?: string, filterSuffix?: string, maxTopic?: number, afterTopic?: string, _options?: Configuration): Observable<Array<ListResponseInner>> {
        return this.listWithHttpInfo(filterPrefix, filterSuffix, maxTopic, afterTopic, _options).pipe(map((apiResponse: HttpInfo<Array<ListResponseInner>>) => apiResponse.data));
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param publishMessageProperty
     */
    public publishWithHttpInfo(topic: string, publishMessageProperty: PublishMessageProperty, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.publish(topic, publishMessageProperty, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.publishWithHttpInfo(rsp)));
            }));
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param publishMessageProperty
     */
    public publish(topic: string, publishMessageProperty: PublishMessageProperty, _options?: Configuration): Observable<void> {
        return this.publishWithHttpInfo(topic, publishMessageProperty, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param topic The name of the pubsub topic.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public readWithHttpInfo(topic: string, maxMessages?: number, includeSignature?: boolean, _options?: Configuration): Observable<HttpInfo<ReadResponse>> {
        const requestContextPromise = this.requestFactory.read(topic, maxMessages, includeSignature, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.readWithHttpInfo(rsp)));
            }));
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param topic The name of the pubsub topic.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public read(topic: string, maxMessages?: number, includeSignature?: boolean, _options?: Configuration): Observable<ReadResponse> {
        return this.readWithHttpInfo(topic, maxMessages, includeSignature, _options).pipe(map((apiResponse: HttpInfo<ReadResponse>) => apiResponse.data));
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public readAllWithHttpInfo(maxMessages?: number, filterPrefix?: string, filterSuffix?: string, includeSignature?: boolean, _options?: Configuration): Observable<HttpInfo<Array<ReadAllResponseInner>>> {
        const requestContextPromise = this.requestFactory.readAll(maxMessages, filterPrefix, filterSuffix, includeSignature, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.readAllWithHttpInfo(rsp)));
            }));
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param [maxMessages] The maximum number of messages to read.
     * @param [filterPrefix] Filter topics by a prefix string.
     * @param [filterSuffix] Filter topics by a suffix string.
     * @param [includeSignature] If true, the response includes the public key and signature for each message.
     */
    public readAll(maxMessages?: number, filterPrefix?: string, filterSuffix?: string, includeSignature?: boolean, _options?: Configuration): Observable<Array<ReadAllResponseInner>> {
        return this.readAllWithHttpInfo(maxMessages, filterPrefix, filterSuffix, includeSignature, _options).pipe(map((apiResponse: HttpInfo<Array<ReadAllResponseInner>>) => apiResponse.data));
    }

}
