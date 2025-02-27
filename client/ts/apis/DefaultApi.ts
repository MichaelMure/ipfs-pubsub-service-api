// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { DiscoveryResponse } from '../models/DiscoveryResponse';
import { Failure } from '../models/Failure';
import { JoinResponse } from '../models/JoinResponse';
import { ListResponseInner } from '../models/ListResponseInner';
import { PublishMessageProperty } from '../models/PublishMessageProperty';
import { ReadAllResponseInner } from '../models/ReadAllResponseInner';
import { ReadResponse } from '../models/ReadResponse';

/**
 * no description
 */
export class DefaultApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Describe the service configuration and limits. This endpoint returns the maximum acceptable settings that a client can ask for.
     * Describe the service configuration and limits
     */
    public async discovery(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/discovery';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * One necessary component of pubsub is message filtering. This could be required for various reasons, ranging from technical (re-broadcasted message, maximum size ...) to malicious (spam, abuse ..). Some of those, the most generic, are expected to be handled by the service. On the other side of the spectrum, application logic and data is required to evaluate the validity of a message. This endpoint exist so that client can provide that feedback, which will allow the service to filter messages or prune bad peers.
     * Instruct the service about read messages that the client side consider bogus or malicious.
     * @param topic The name of the pubsub topic.
     * @param peerid The libp2p peer identity.
     */
    public async filterPeerID(topic: string, peerid: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'topic' is not null or undefined
        if (topic === null || topic === undefined) {
            throw new RequiredError("DefaultApi", "filterPeerID", "topic");
        }


        // verify required parameter 'peerid' is not null or undefined
        if (peerid === null || peerid === undefined) {
            throw new RequiredError("DefaultApi", "filterPeerID", "peerid");
        }


        // Path Params
        const localVarPath = '/filter-peerid';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (topic !== undefined) {
            requestContext.setQueryParam("topic", ObjectSerializer.serialize(topic, "string", ""));
        }

        // Query Params
        if (peerid !== undefined) {
            requestContext.setQueryParam("peerid", ObjectSerializer.serialize(peerid, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Subscribe to a pubsub topic. The client can define configuration for that topic (queue length, timeout...). Those configuration can be restricted by the server to conform to the server capability (see /discovery). The effective configuration is returned as part of the response. Join is only effective for some duration, defined by the previously described process. In order to keep listening to that topic, the client should perform a /join, /read, /read-all or /publish before expiration, to signal liveliness. This operation is idempotent if the given parameters result in the same configuration, but a different operation should be effective and drop messages if necessary. Note that subscription is not an instantaneous operation and can happen after this request returns. It may take some time before the subscription is processed and effective in the server.
     * Subscribe to a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param queueLength The maximum number of pubsub messages stored by the service.
     * @param queuePolicy The policy to apply when the message queue is full.
     * @param timeout The subscription timeout (in seconds) for a pubsub topic after a /join operation.
     * @param maxMessageSize The maximum allowed size (in bytes) for a pubsub message.
     */
    public async join(topic: string, queueLength?: number, queuePolicy?: 'drop-old' | 'drop-new', timeout?: number, maxMessageSize?: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'topic' is not null or undefined
        if (topic === null || topic === undefined) {
            throw new RequiredError("DefaultApi", "join", "topic");
        }






        // Path Params
        const localVarPath = '/join';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (topic !== undefined) {
            requestContext.setQueryParam("topic", ObjectSerializer.serialize(topic, "string", ""));
        }

        // Query Params
        if (queueLength !== undefined) {
            requestContext.setQueryParam("queue-length", ObjectSerializer.serialize(queueLength, "number", ""));
        }

        // Query Params
        if (queuePolicy !== undefined) {
            requestContext.setQueryParam("queue-policy", ObjectSerializer.serialize(queuePolicy, "'drop-old' | 'drop-new'", ""));
        }

        // Query Params
        if (timeout !== undefined) {
            requestContext.setQueryParam("timeout", ObjectSerializer.serialize(timeout, "number", ""));
        }

        // Query Params
        if (maxMessageSize !== undefined) {
            requestContext.setQueryParam("max-message-size", ObjectSerializer.serialize(maxMessageSize, "number", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Unsubscribe from a pubsub topic, and destroy any stored message for that topic.
     * Unsubscribe from a pubsub topic
     * @param topic The name of the pubsub topic.
     */
    public async leave(topic: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'topic' is not null or undefined
        if (topic === null || topic === undefined) {
            throw new RequiredError("DefaultApi", "leave", "topic");
        }


        // Path Params
        const localVarPath = '/leave';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (topic !== undefined) {
            requestContext.setQueryParam("topic", ObjectSerializer.serialize(topic, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * List subscribed topics
     * @param filterPrefix Filter topics by a prefix string.
     * @param filterSuffix Filter topics by a suffix string.
     * @param maxTopic The maximum number of topics to return.
     * @param afterTopic A pagination cursor to list topics after a specified topic.
     */
    public async list(filterPrefix?: string, filterSuffix?: string, maxTopic?: number, afterTopic?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;





        // Path Params
        const localVarPath = '/list';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (filterPrefix !== undefined) {
            requestContext.setQueryParam("filter-prefix", ObjectSerializer.serialize(filterPrefix, "string", ""));
        }

        // Query Params
        if (filterSuffix !== undefined) {
            requestContext.setQueryParam("filter-suffix", ObjectSerializer.serialize(filterSuffix, "string", ""));
        }

        // Query Params
        if (maxTopic !== undefined) {
            requestContext.setQueryParam("max-topic", ObjectSerializer.serialize(maxTopic, "number", ""));
        }

        // Query Params
        if (afterTopic !== undefined) {
            requestContext.setQueryParam("after-topic", ObjectSerializer.serialize(afterTopic, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Publish a message in a pubsub topic and signal liveness
     * @param topic The name of the pubsub topic.
     * @param publishMessageProperty 
     */
    public async publish(topic: string, publishMessageProperty: PublishMessageProperty, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'topic' is not null or undefined
        if (topic === null || topic === undefined) {
            throw new RequiredError("DefaultApi", "publish", "topic");
        }


        // verify required parameter 'publishMessageProperty' is not null or undefined
        if (publishMessageProperty === null || publishMessageProperty === undefined) {
            throw new RequiredError("DefaultApi", "publish", "publishMessageProperty");
        }


        // Path Params
        const localVarPath = '/publish';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (topic !== undefined) {
            requestContext.setQueryParam("topic", ObjectSerializer.serialize(topic, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(publishMessageProperty, "PublishMessageProperty", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Read message from a pubsub topic and signal liveness. This consumes the returned messages from the queue
     * @param topic The name of the pubsub topic.
     * @param maxMessages The maximum number of messages to read.
     * @param includeSignature If true, the response includes the public key and signature for each message.
     */
    public async read(topic: string, maxMessages?: number, includeSignature?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'topic' is not null or undefined
        if (topic === null || topic === undefined) {
            throw new RequiredError("DefaultApi", "read", "topic");
        }




        // Path Params
        const localVarPath = '/read';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (topic !== undefined) {
            requestContext.setQueryParam("topic", ObjectSerializer.serialize(topic, "string", ""));
        }

        // Query Params
        if (maxMessages !== undefined) {
            requestContext.setQueryParam("max-messages", ObjectSerializer.serialize(maxMessages, "number", ""));
        }

        // Query Params
        if (includeSignature !== undefined) {
            requestContext.setQueryParam("include-signature", ObjectSerializer.serialize(includeSignature, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Read messages from multiple topic at once and signal liveness. This consumes the returned messages from the queue.
     * @param maxMessages The maximum number of messages to read.
     * @param filterPrefix Filter topics by a prefix string.
     * @param filterSuffix Filter topics by a suffix string.
     * @param includeSignature If true, the response includes the public key and signature for each message.
     */
    public async readAll(maxMessages?: number, filterPrefix?: string, filterSuffix?: string, includeSignature?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;





        // Path Params
        const localVarPath = '/read-all';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (maxMessages !== undefined) {
            requestContext.setQueryParam("max-messages", ObjectSerializer.serialize(maxMessages, "number", ""));
        }

        // Query Params
        if (filterPrefix !== undefined) {
            requestContext.setQueryParam("filter-prefix", ObjectSerializer.serialize(filterPrefix, "string", ""));
        }

        // Query Params
        if (filterSuffix !== undefined) {
            requestContext.setQueryParam("filter-suffix", ObjectSerializer.serialize(filterSuffix, "string", ""));
        }

        // Query Params
        if (includeSignature !== undefined) {
            requestContext.setQueryParam("include-signature", ObjectSerializer.serialize(includeSignature, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DefaultApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to discovery
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async discoveryWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DiscoveryResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DiscoveryResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DiscoveryResponse", ""
            ) as DiscoveryResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DiscoveryResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DiscoveryResponse", ""
            ) as DiscoveryResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to filterPeerID
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async filterPeerIDWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("202", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating that the specified topic was not found.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to join
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async joinWithHttpInfo(response: ResponseContext): Promise<HttpInfo<JoinResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: JoinResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "JoinResponse", ""
            ) as JoinResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: JoinResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "JoinResponse", ""
            ) as JoinResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to leave
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async leaveWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating that the specified topic was not found.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to list
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<ListResponseInner> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<ListResponseInner> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<ListResponseInner>", ""
            ) as Array<ListResponseInner>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<ListResponseInner> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<ListResponseInner>", ""
            ) as Array<ListResponseInner>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to publish
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async publishWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating that the specified topic was not found.", body, response.headers);
        }
        if (isCodeInRange("413", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating that the message size exceeds the allowed limit.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to read
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ReadResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ReadResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ReadResponse", ""
            ) as ReadResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating that the specified topic was not found.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ReadResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ReadResponse", ""
            ) as ReadResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readAll
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readAllWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<ReadAllResponseInner> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<ReadAllResponseInner> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<ReadAllResponseInner>", ""
            ) as Array<ReadAllResponseInner>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a bad request.", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unauthorized request.", body, response.headers);
        }
        if (isCodeInRange("402", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating insufficient funds.", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response indicating that the specified topic was not found.", body, response.headers);
        }
        if (isCodeInRange("429", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for too many requests (rate limiting).", body, response.headers);
        }
        if (isCodeInRange("4XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for a custom service error.", body, response.headers);
        }
        if (isCodeInRange("5XX", response.httpStatusCode)) {
            const body: Failure = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Failure", ""
            ) as Failure;
            throw new ApiException<Failure>(response.httpStatusCode, "Error response for an unexpected internal server error.", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<ReadAllResponseInner> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<ReadAllResponseInner>", ""
            ) as Array<ReadAllResponseInner>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
