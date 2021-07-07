import { Injectable } from '@angular/core';
import { Cordova, CordovaProperty, IonicNativePlugin, Plugin } from '@ionic-native/core';

export interface HTTPResponse {
  /**
   * The HTTP status number of the response or a negative internal error code.
   */
  status: number;
  /**
   * The headers of the response.
   */
  headers: { [key: string]: string };
  /**
   * The URL of the response. This property will be the final URL obtained after any redirects.
   */
  url: string;
  /**
   * The data that is in the response. This property usually exists when a promise returned by a request method resolves.
   */
  data?: any;
  /**
   * Error response from the server. This property usually exists when a promise returned by a request method rejects.
   */
  error?: string;
}

interface AbortedResponse {
  aborted: boolean;
}

export interface ApproovLoggableToken {
  /**
   * Expiry
   * The only mandatory claim for Approov tokens. It specifies the expiry time for the token as a Unix timestamp.
   */
  exp: number;

  /**
   * Device ID
   * This claim identifies the device for which the token was issued. This is a base64 encoded string representing a 128-bit device identifier.
   * Note that this is not, strictly speaking, a device identifier as it is also influenced by the app identifier
   * and may change if the same app is uninstalled and then reinstalled on the same device.
   */
  did?: string;

  /**
   * Attestation Response Code
   * This is an optional claim that encodes information about a subset of the device property flags and also whether the attestation was a pass or fail.
   * The claim is encoded in base32 and is typically 10 characters long (although it may be longer in some circumstances).
   * This claim is not included by tokens from the failover.
   */
  arc?: string;

  /**
   * IP Address
   * This holds the IP address of the device as seen by the Approov cloud service. It is provided in a human readable IP address format (in either IPv4 or IPv6 format).
   * In practice this value can often change between the time a token is issued and the time it is sent to your backend, so you should never block if it differs, but you may include it as a signal that tokens have somehow been stolen and are being replayed.
   * This claim is not included by tokens from the failover or if the IP Tracking Policy for the account has been set to none.
   */
  ip?: string;

  /**
   * Issuer
   * An optional claim that is added if the issuer inclusion option is enabled. This provides the Approov account ID that was used to issue the token (suffixed with approov.io).
   * It can be used as an additional layer of backend verification if signing keys are shared between multiple accounts.
   * It indicates that tokens were issued from the expected Approov account. This claim may also be set to an explicit value for long lived Approov tokens.
   * This flexibility is designed for use with server-to-server communication (which may only be signed with the account specific secret keys).
   */
  iss?: string;

  /**
   * Annotation
   * This is an embedded JSON array of strings showing the list of flags that are set and are in the annotation set for the security policy that is selected.
   * This allows additional information to be collected about the state of a particular device without necessarily causing an attestation failure.
   * Note that if there are no possible annotations then this claim is not present at all. This claim is not included by tokens from the failover.
   */
  anno?: string[];

  /**
   * Payload Hash
   * An optional claim that is added if the protected app passes a token binding argument to the setDataHashInToken method.
   * The claim value is set to the base64 encoded SHA256 hash of the provided payload string.
   * This is typically used to bind an Approov token to some other data used by your app to enhance security (like a user auth token).
   */
  pay?: string;

  /**
   * Audience
   * An optional claim that is added if the audience inclusion option is enabled. This provides the domain for which the token was issued.
   * It can be used as an additional layer of backend verification to ensure that tokens intended for one domain cannot be used on to access a different one.
   */
  aud?: string;

  /**
   * Message Siging Key ID
   * This is an optional claim that encodes the ID of a key being used for Message Signing.
   * This is only present in Approov tokens for which message signing is active. This claim is not included by tokens from the failover.
   */
  mskid?: string;

  /**
   * Measurement Proof Key
   * An optional claim to provide the measurement proof key if a measurement has been requested by the SDK on the domain for which the token is issued.
   * This is a base64 encoded 128-bit proof key value. Note that if measurement is being used, then JWE tokens will be used to keep this claim secret.
   */
  mpk?: string;

  /**
   * Integrity Measurement Hash
   * An optional claim to provide the integrity measurement hash if a measurement has been requested by the SDK on the domain for which the token is issued.
   * This is a base64 encoded 256-bit SHA256 measurement value. Note that if measurement is being used, then JWE tokens will be used to keep this claim secret.
   */
  imh?: string;

  /**
   * Device Measurement Hash
   * An optional claim to provide the device measurement hash if a measurement has been requested by the SDK on the domain for which the token is issued.
   * This is a base64 encoded 256-bit SHA256 measurement value. Note that if measurement is being used, then JWE tokens will be used to keep this claim secret
   */
  dmh?: string;
}

/**
 * @name HTTP
 * @description
 * Cordova / Phonegap plugin for communicating with HTTP servers. Supports iOS and Android.
 *
 * Advantages over Javascript requests:
 * - SSL / TLS Pinning
 * - CORS restrictions do not apply
 * - Handling of HTTP code 401 - read more at [Issue CB-2415](https://issues.apache.org/jira/browse/CB-2415)
 *
 * Note: This plugin extends the pre-existing [cordova-advanced-http-plugin](https://github.com/silkimen/cordova-plugin-advanced-http),
 * we have only added approov functionality on top of it. All credit goes to the actual plugin developer.
 *
 * @usage
 * ```typescript
 * import { HTTP } from '@ionic-native/http/ngx';
 *
 * constructor(private http: HTTP) {}
 *
 * ...
 *
 * this.http.get('http://ionic.io', {}, {})
 *   .then(data => {
 *
 *     console.log(data.status);
 *     console.log(data.data); // data received by server
 *     console.log(data.headers);
 *
 *   })
 *   .catch(error => {
 *
 *     console.log(error.status);
 *     console.log(error.error); // error message as string
 *     console.log(error.headers);
 *
 *   });
 *
 * ```
 * @interfaces
 * HTTPResponse
 */
@Plugin({
  pluginName: 'HTTP',
  plugin: 'cordova-approov-advanced-http',
  pluginRef: 'cordova.plugin.http',
  repo: 'https://github.com/approov/quickstart-ionic-advancedhttp',
  platforms: ['Android', 'iOS'],
})
@Injectable()
export class HTTP extends IonicNativePlugin {
  /**
   * This enum represents the internal error codes which can be returned in a HTTPResponse object.
   * @readonly
   */
  @CordovaProperty()
  readonly ErrorCode: {
    GENERIC: number;
    SSL_EXCEPTION: number;
    SERVER_NOT_FOUND: number;
    TIMEOUT: number;
    UNSUPPORTED_URL: number;
    NOT_CONNECTED: number;
    POST_PROCESSING_FAILED: number;
    ABORTED: number;
  };

  /**
   * This returns an object representing a basic HTTP Authorization header of the form.
   * @param username {string} Username
   * @param password {string} Password
   * @returns {Object} an object representing a basic HTTP Authorization header of the form {'Authorization': 'Basic base64EncodedUsernameAndPassword'}
   */
  @Cordova({ sync: true })
  getBasicAuthHeader(username: string, password: string): { Authorization: string } {
    return;
  }

  /**
   * This sets up all future requests to use Basic HTTP authentication with the given username and password.
   * @param username {string} Username
   * @param password {string} Password
   */
  @Cordova({ sync: true })
  useBasicAuth(username: string, password: string): void {}

  /**
   * Get all headers defined for a given hostname.
   * @param host {string} The hostname
   * @returns {string} return all headers defined for the hostname
   */
  @Cordova({ sync: true })
  getHeaders(host: string): string {
    return;
  }

  /**
   * Set a header for all future requests. Takes a hostname, a header and a value.
   * @param host {string} The hostname to be used for scoping this header
   * @param header {string} The name of the header
   * @param value {string} The value of the header
   */
  @Cordova({ sync: true })
  setHeader(host: string, header: string, value: string): void {}

  /**
   * Get the name of the data serializer which will be used for all future POST and PUT requests.
   * @returns {string} returns the name of the configured data serializer
   */
  @Cordova({ sync: true })
  getDataSerializer(): string {
    return;
  }

  /**
   * Set the data serializer which will be used for all future POST, PUT and PATCH requests. Takes a string representing the name of the serializer.
   * @param serializer {string} The name of the serializer.
   * @see https://github.com/silkimen/cordova-plugin-advanced-http#setdataserializer
   */
  @Cordova({ sync: true })
  setDataSerializer(serializer: 'urlencoded' | 'json' | 'utf8' | 'multipart' | 'raw'): void {}

  /**
   * Add a custom cookie.
   * @param url {string} Scope of the cookie
   * @param cookie {string} RFC compliant cookie string
   */
  @Cordova({ sync: true })
  setCookie(url: string, cookie: string): void {}

  /**
   * Clear all cookies.
   */
  @Cordova({ sync: true })
  clearCookies(): void {}

  /**
   * Remove cookies for given URL.
   * @param url {string}
   * @param cb
   */
  @Cordova({ sync: true })
  removeCookies(url: string, cb: () => void): void {}

  /**
   * Resolve cookie string for given URL.
   * @param url {string}
   */
  @Cordova({ sync: true })
  getCookieString(url: string): string {
    return;
  }

  /**
   * Get global request timeout value in seconds.
   * @returns {number} returns the global request timeout value
   */
  @Cordova({ sync: true })
  getRequestTimeout(): number {
    return;
  }

  /**
   * Set global request timeout value in seconds.
   * @param timeout {number} The timeout in seconds. Default 60
   */
  @Cordova({ sync: true })
  setRequestTimeout(timeout: number): void {}

  /**
   * Resolve if it should follow redirects automatically.
   * @returns {boolean} returns true if it is configured to follow redirects automatically
   */
  @Cordova({ sync: true })
  getFollowRedirect(): boolean {
    return;
  }

  /**
   * Configure if it should follow redirects automatically.
   * @param follow {boolean} Set to false to disable following redirects automatically
   */
  @Cordova({ sync: true })
  setFollowRedirect(follow: boolean): void {}

  /**
   * Set server trust mode, being one of the following values:
   * default: default SSL trustship and hostname verification handling using system's CA certs;
   * legacy: use legacy default behavior (< 2.0.3), excluding user installed CA certs (only for Android);
   * nocheck: disable SSL certificate checking and hostname verification, trusting all certs (meant to be used only for testing purposes);
   * pinned: trust only provided certificates;
   * @see https://github.com/silkimen/cordova-plugin-advanced-http#setservertrustmode
   * @param {string} mode server trust mode
   */
  @Cordova()
  setServerTrustMode(mode: 'default' | 'legacy' | 'nocheck' | 'pinned'): Promise<void> {
    return;
  }

  /**
   * Make a POST request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  post(url: string, body: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make a sync POST request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'post',
    sync: true,
  })
  postSync(
    url: string,
    body: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * Make a GET request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  get(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make a sync GET request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'get',
    sync: true,
  })
  getSync(
    url: string,
    parameters: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * Make a PUT request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  put(url: string, body: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make a sync PUT request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'put',
    sync: true,
  })
  putSync(
    url: string,
    body: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * Make a PATCH request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  patch(url: string, body: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make a sync PATCH request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'patch',
    sync: true,
  })
  patchSync(
    url: string,
    body: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * Make a DELETE request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  delete(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make a sync DELETE request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'delete',
    sync: true,
  })
  deleteSync(
    url: string,
    parameters: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * Make a HEAD request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  head(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make a sync HEAD request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'head',
    sync: true,
  })
  headSync(
    url: string,
    parameters: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * Make an OPTIONS request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  options(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
    return;
  }

  /**
   * Make an sync OPTIONS request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'options',
    sync: true,
  })
  optionsSync(
    url: string,
    parameters: any,
    headers: any,
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   *
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param filePath {string} The local path(s) of the file(s) to upload
   * @param name {string} The name(s) of the parameter to pass the file(s) along as
   * @returns {Promise<any>} returns a FileEntry promise that will resolve on success, and reject on failure
   */
  @Cordova()
  uploadFile(url: string, body: any, headers: any, filePath: string | string[], name: string | string[]): Promise<any> {
    return;
  }

  /**
   *
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param filePath {string} The local path(s) of the file(s) to upload
   * @param name {string} The name(s) of the parameter to pass the file(s) along as
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'uploadFile',
    sync: true,
  })
  uploadFileSync(
    url: string,
    body: any,
    headers: any,
    filePath: string | string[],
    name: string | string[],
    success: (result: any) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   *
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param filePath {string} The path to download the file to, including the file name.
   * @returns {Promise<any>} returns a FileEntry promise that will resolve on success, and reject on failure
   */
  @Cordova()
  downloadFile(url: string, body: any, headers: any, filePath: string): Promise<any> {
    return;
  }

  /**
   *
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param filePath {string} The path to download the file to, including the file name.
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'downloadFile',
    sync: true,
  })
  downloadFileSync(
    url: string,
    body: any,
    headers: any,
    filePath: string,
    success: (result: any) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   *
   * @param url {string} The url to send the request to
   * @param options {Object} options for individual request
   * @param options.method {string} request method
   * @param options.data {Object} payload to be send to the server (only applicable on post, put or patch methods)
   * @param options.params {Object} query params to be appended to the URL (only applicable on get, head, delete, upload or download methods)
   * @param options.serializer {string} data serializer to be used (only applicable on post, put or patch methods), defaults to global serializer value, see setDataSerializer for supported values
   * @param options.timeout {number} timeout value for the request in seconds, defaults to global timeout value
   * @param options.headers {Object} headers object (key value pair), will be merged with global values
   * @param options.filePath {string} file path(s) to be used during upload and download see uploadFile and downloadFile for detailed information
   * @param options.name {string} name(s) to be used during upload see uploadFile for detailed information
   * @param options.responseType {string} response type, defaults to text
   *
   * @returns {Promise<HTTPResponse>} returns a promise that will resolve on success, and reject on failure
   */
  @Cordova()
  sendRequest(
    url: string,
    options: {
      method: 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'upload' | 'download';
      data?: { [index: string]: any };
      params?: { [index: string]: string | number };
      serializer?: 'json' | 'urlencoded' | 'utf8' | 'multipart' | 'raw';
      timeout?: number;
      headers?: { [index: string]: string };
      filePath?: string | string[];
      name?: string | string[];
      responseType?: 'text' | 'arraybuffer' | 'blob' | 'json';
    }
  ): Promise<HTTPResponse> {
    return;
  }

  /**
   *
   * @param url {string} The url to send the request to
   * @param options {Object} options for individual request
   * @param options.method {string} request method
   * @param options.data {Object} payload to be send to the server (only applicable on post, put or patch methods)
   * @param options.params {Object} query params to be appended to the URL (only applicable on get, head, delete, upload or download methods)
   * @param options.serializer {string} data serializer to be used (only applicable on post, put or patch methods), defaults to global serializer value, see setDataSerializer for supported values
   * @param options.timeout {number} timeout value for the request in seconds, defaults to global timeout value
   * @param options.headers {Object} headers object (key value pair), will be merged with global values
   * @param options.filePath {string} file path(s) to be used during upload and download see uploadFile and downloadFile for detailed information
   * @param options.name {string} name(s) to be used during upload see uploadFile for detailed information
   * @param options.responseType {string} response type, defaults to text
   * @param success {function} A callback that is called when the request succeed
   * @param failure {function} A callback that is called when the request failed
   *
   * @returns {string} returns a string that represents the requestId
   */
  @Cordova({
    methodName: 'sendRequest',
    sync: true,
  })
  sendRequestSync(
    url: string,
    options: {
      method: 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'upload' | 'download';
      data?: { [index: string]: any };
      params?: { [index: string]: string | number };
      serializer?: 'json' | 'urlencoded' | 'utf8' | 'multipart';
      timeout?: number;
      headers?: { [index: string]: string };
      filePath?: string | string[];
      name?: string | string[];
      responseType?: 'text' | 'arraybuffer' | 'blob' | 'json';
    },
    success: (result: HTTPResponse) => void,
    failure: (error: any) => void
  ): string {
    return;
  }

  /**
   * @param requestId {string} The RequestId of the request to abort
   */
  @Cordova()
  abort(requestId: string): Promise<AbortedResponse> {
    return;
  }

  /**
   * Initializes the approov service
   */
  @Cordova({ sync: true })
  initializeApproov(): void {
    return;
  }

  /**
   * @param dataHash {string} The data that will be set in the token
   */
  @Cordova({ sync: true })
  approovSetDataHashInToken(dataHash: string): void {
    return;
  }

  /**
   * @param header {string}
   */
  @Cordova({ sync: true })
  approovSetBindingHeader(header: string): void {
    return;
  }

  /**
   * @param host {string}
   */
  @Cordova()
  getApproovLoggableToken(host: string): Promise<ApproovLoggableToken> {
    return;
  }
}
