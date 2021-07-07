import { Injectable } from '@angular/core';
import { Cordova, IonicNativePlugin, Plugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

export interface Response {
  status: number;
  body?: string;
  path?: string;
  headers: { [key: string]: string };
}

export interface Request {
  requestId: string;
  body: string;
  headers: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  query: string;
}

/**
 * @name Web Server
 * @description
 * This plugin allows you to start a local dynamic content web server for android and iOS devices.
 *
 * @usage
 * ```typescript
 * import { WebServer } from '@ionic-native/web-server/ngx';
 *
 *
 * constructor(private webServer: WebServer) { }
 *
 * ...
 *
 * this.webServer.onRequest().subscribe(data => {
 *   console.log(data);
 *   const res: Response = {
 *     status: 200,
 *     body: '',
 *     headers: {
 *       'Content-Type': 'text/html'
 *     }
 *   };
 *
 *   this.webServer.sendResponse(data.requestId, res)
 *     .catch((error: any) => console.error(error));
 * });
 *
 * this.webServer.start(80)
 *   .catch((error: any) => console.error(error));
 *
 * ```
 *
 * @interfaces
 * Response
 * Request
 */
@Plugin({
  pluginName: 'WebServer',
  plugin: 'cordova-plugin-webserver2',
  pluginRef: 'window.webserver',
  repo: 'https://github.com/nguyenthanh1995/cordova-plugin-webserver2.git',
  platforms: ['Android', 'iOS'],
})
@Injectable()
export class WebServer extends IonicNativePlugin {
  /**
   * This method will start your webserver.
   * @param port {number} Port number (default to 8080)
   */
  @Cordova({
    callbackOrder: 'reverse',
  })
  start(port?: number): Promise<any> {
    return;
  }

  /**
   * This method will stop your webserver.
   */
  @Cordova()
  stop(): Promise<any> {
    return;
  }

  /**
   * This method returns an observable that streams HTTP requests to an observer.
   * @return {Observable<Request>} Returns an observable to resolve as a Request object
   */
  @Cordova({
    callbackOrder: 'reverse',
    observable: true,
    clearFunction: 'stop',
  })
  onRequest(): Observable<Request> {
    return;
  }

  /**
   * This method sends a response to a request.
   * @param requestId {string} Request ID to respond to
   * @param responseObject {Response} Response object
   * @return {Promise<any>} Returns a promise that resolves when something happens
   */
  @Cordova()
  sendResponse(requestId: string, responseObject: Response): Promise<any> {
    return;
  }
}
