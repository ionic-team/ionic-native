import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

/**
 * Outbox Lock Result States
 */
export enum OutboxLockStatus {
  LockApplied = 0,
  DataBeingSent = 1,
  DataNotInQueue = 2,
}

/**
 * Log levels supported in the sdk.
 */
export enum LogLevel {
  important = 7,
  error = 8,
  debug = 9,
}

/**
 * AuthenticateAndActivateResultType Some Documentation
 */
export enum AuthenticateAndActivateResultType {
  /**
   * This value indicates that UMP was able to validate users credentials & activation of the user is complete.
   * In mobile apps, this also means database is created & apps can proceed with their custom logic.
   */
  auth_activation_success = 2,
  /**
   * This value indicates that UMP was unable to validate users credentials.
   */
  auth_activation_error = 3,
}

export enum AuthenticateLocalResultType {
  /**
   * This value indicates that UnviredCordovaSDK was able to validate users credentials and apps can proceed with their custom logic.
   */
  login_success = 4,
  /**
   * This value indicates that UnviredCordovaSDK was unable to validate users credentials. You can retrieve the error information from AuthenticateLocalResult.
   */
  login_error = 5,
}

export enum LoginListenerType {
  /**
   * This value indicates that there is no user account exists and user needs to authenticate & activate. Call authenticateAndActivate() api to activate the user.
   */
  auth_activation_required = 0,
  /**
   * Applicable for mobile.
   * This value indicates user needs to login before using the app. This depends on the setting LOCAL_PASSWORD which is set in UMP Admin Cockpit.
   * If LOCAL_PASSWORD is set to true, this type is set everytime user opens the app.
   */
  app_requires_login = 1,
  /**
   * This value indicates app can proceed with its custom logic.
   */
  login_success = 4,
  /**
   * If there are multiple accounts active & no account is specified in the login(), then this value is returned indicating that a current account needs to be specified for the login().
   */
  app_requires_current_account = 6,

  /**
   * This value indicates app can proceed with demo mode.
   */
  login_demo = 7,
}

export enum LoginType {
  /**
   * This value represents authentication using Unvired ID.
   * Example:
   * ```
   * loginParameters.username = 'USER_NAME'
   * loginParameters.password = 'password'
   * loginParameters.company = 'unvired'
   * loginParameters.loginType = LoginType.unvired
   * ```
   */
  unvired = 'UNVIRED_ID',
  /**
   * This value represents authentication using Active Directory Service (ADS).
   * Example:
   * ```
   * loginParameters.username = 'USER_NAME'
   * loginParameters.password = 'password'
   * loginParameters.company = 'unvired'
   * loginParameters.domain = 'ADS_DOMAIN'
   * loginParameters.loginType = LoginType.ads
   * ```
   */
  ads = 'ADS',
  /**
   * This value represents authentication using SAP ID.
   * Example:
   * ```
   * loginParameters.username = 'USER_NAME'
   * loginParameters.password = 'password'
   * loginParameters.company = 'unvired'
   * loginParameters.port = 'SAP_PORT_NAME'
   * loginParameters.domain = 'SAP_DOMAIN'
   * loginParameters.loginType = LoginType.sap
   * ```
   */
  sap = 'SAP',
  /**
   * EMAIL
   * Set the type to email to login based on email id.
   */
  email = 'EMAIL',
  /**
   * SAML 2.0 Login Type
   */
  saml2 = 'SAML2',
  /**
   * TODO:
   */
  custom = 'CUSTOM',
}

export enum ResultType {
  /**
   * This value indicates a succesful operation.
   */
  success = 0,
  /**
   * This value indicates an error.
   */
  error,
}

export enum RequestType {
  /**
   * Set this type if the data exchange with UMP is 1:1. The header datastructure needs to be sent which also should be present in database prior to the call.
   * You can use UnviredCordovaSDK's db methods to insert data into database.
   */
  RQST = 'RQST',
  /**
   * Set this type if the data exchange with UMP is 1:N pr 0:N. Sending a datastructure is optional and is dependent on the Process Agent function.
   * If the Process Agent function is marked with metadata delete flag, then server data replaces the data in database.
   * If the Process Agent function is NOT marked with metadata delete flag, then this request type behaves the same as QUERY
   */
  PULL = 'PULL',
  /**
   * This request type is for those message which are initiated by the server. You typically do not set this request type in sync.. methods.
   */
  PUSH = 'PUSH',
  /**
   * Set this type if the data exchange with UMP is 1:N pr 0:N. Sending a datastructure is optional and is dependent on the Process Agent function.
   * Unlike PULL, this request type updates the data in database without deleting existing entries.
   */
  QUERY = 'QUERY',
  /**
   * Set this type if the data exchange with UMP is 1:0. This handles the case where no server response is expected.
   */
  REQ = 'REQ',
}

export enum NotificationListenerType {
  /**
   * Notify successful asynchronous send of data to the server. This type indicates that data has moved from outbox to sent items.
   */
  dataSend = 0,
  /**
   * Notify data changes for each BusinessEntity when received data from server. This type indicates when data is removed from sent items table.
   */
  dataChanged = 1,
  /**
   * Notify data receive completion on receiving of all BusinessEntities from server. Data would get processed after this step.
   */
  dataReceived = 2,
  /**
   * Notify application data reset.
   */
  appReset = 3,
  /**
   * Notify application with error message and attchment item on attachment download success
   */
  attachmentDownloadSuccess = 4,
  /**
   * Notify application with error message and attchment item on attachment download error
   */
  attachmentDownloadError = 5,
  /**
   * Notify application when incoming data handling finished
   */
  incomingDataProcessingFinished = 6,
  /**
   * Notify application when incoming data handling finished
   */
  attachmentDownloadWaiting = 7,
  /**
   * Notify application with any InfoMessages
   */
  infoMessage = 8,
  /**
   * Notify application with Server errors
   */
  serverError = 9,
  /**
   * Notify attachment downloads completed
   */
  attachmentDownloadCompleted = 10,
  /**
   * Notify when the sent item count changes.
   */
  SentItemChanged = 11,
  /**
   * Notify that the JWT token is received
   */
  JWTTokenReceived = 12
}

export enum AttachmentItemStatus {
  DEFAULT = 0,
  QUEUED_FOR_DOWNLOAD,
  DOWNLOADED,
  ERROR_IN_DOWNLOAD,
  SAVED_FOR_UPLOAD,
  UPLOADED,
  ERROR_IN_UPLOAD,
  MARKED_FOR_DELETE,
  EXTERNAL,
}

export class Settings {
  loginType: LoginType;
  ADS_DOMAIN: string;
  SAP_PORT_NAME: string;
  EMAIL: string;
  ADS_USER_ID: string;
  SAP_USER_ID: string;
  FULL_NAME: string;
  SERVER_URL: string;
  USER_ID: string;
}

export class UnviredResult {
  /**
   * The data returned in response to the api call.
   */
  data: any;
  /**
   * The informational message returned in lieu of data.
   */
  message: string;
  /**
   * Refer to the overrided property in subclasses.
   */
  type: number;
  /**
   * Contains the error information which the apps can convey to the users.
   */
  error: string;
  /**
   * Contains the detailed error information which the apps can convey to the users.
   */
  errorDetail: string;
}

export class OutboxLockResult extends UnviredResult {
  type: ResultType;
  data: OutboxLockStatus;
}

export class LogResult extends UnviredResult {
  type: ResultType;
  data: LogLevel;
}

export class LogDataResult extends UnviredResult {
  type: ResultType;
  data: string;
}

export class NotifResult extends UnviredResult {
  type: NotificationListenerType;
}

export class SettingsResult extends UnviredResult {
  data: Settings;
  type: ResultType;
}

export class SyncResult extends UnviredResult {
  type: ResultType;
  /**
   * This code refers to the HTTP status code obtained during the network call.
   */
  code: number;
}

export class DbResult extends UnviredResult {
  type: ResultType;
}

export class LoginParameters {
  /**
   * Set the application name as configured in UMP.
   */
  appName: string;

  /**
   * Company name as configured in UMP.
   */
  company: string;

  /**
   * Username of the user trying to login.
   */
  username: string;

  /**
   * Password of the user trying to login.
   */
  password: string;

  /**
   * UMP URL. For example: https://umpdev.unvired.io/UMP
   */
  url: string;

  /**
   * Domain name. Required only if the login type is ADS or SAP.
   */
  domain: string;

  /**
   * Set this value to one of the allowed login types for your app as configured in UMP.
   */
  loginType: LoginType;

  /**
   * FrontEndUserId: This id uniquely identifies the user across devices of same type. If the Unvired user has multiple front end ids for a device type, you need to set this value.
   * If the Unvired user has only one front end id, leave this field blank.
   */
  feUserId: string;

  /**
   * Required only if the loginType is 'sap'. This sets the SAP Port Name.
   */
  port: string;

  /**
   * Required for Browser Platform.
   * For iOS Platform include the metadata.xml file as part of App Bundle
   * For Android Platform include the metadata.xml file in src > res > raw
   */
  metadataPath: string;

  /**
   * This is required for Android only. Setting this value would save the attachments as Base64 string for easy access.
   */
  isRequiredAttachmentBase64: boolean;

  /**
   * Set an interval in seconds at which the framework has to make an attempt to send data from outbox.
   * If the data-sender fails for reason, then the framework does not restart even if there are outbox items.
   * In those cases, you will have to set this value, so that the framework always makes an attempt to send from outbox.
   * Example:
   * loginParameters.autoSendTime = '5' // Make an attempt to send data every 5 seconds.
   */
  autoSendTime: string;

  /**
   * Set the number of seconds at which GetMessage should automatically run. When this value is set, GetMessage would run in a interval as long as there are entries in Sent Items.
   * You may need to set this value if your app doesn't support Push Notifications.
   * By default, the framework does not do GetMessage automatically.
   * Example:
   * loginParameters.autoSyncTime = '5' // Make an attempt to receive data (GetMessage) every 5 seconds.
   */
  autoSyncTime: string;

  /**
   * Specify the metadata as a JSON string. This will override metadata.xml set at platform level.
   */
  metadataJSON: string;

  /**
   * Specify the demo data xml string for demo mode.
   */
  demoData: string;

  /**
   * Set 'true' if the application supports demo mode otherwise set 'false'.
   */
  demoModeRequired: boolean;

  /*
   * Set this value to true to persist web application database. By default, this value is false.
   */
  persistWebDb: boolean;

  /*
   * JWT options.
   * loginParameters.jwtOptions = {"app": "myapp"};
   */
  jwtOptions: object;

  /**
   * Language code to be sent to UMP. Specify a two-letter language code.
   * The default value of this is 'en'.
   */
  loginLanguage: string;

  /**
   * Applicable for browser only. Set this flag to indicate that saved data should be reloaded upon launch.
   */
  cacheWebData: boolean;

  /**
   * Set this value if you the login process requires client credentials to be set. 
   * You can pass the client credentials with the method: |unviredSDK.setClientCredentials(credentials)|
   * The passed credentials will be used based on this flag.
   */
  requireClientCredentials: boolean;
}
export class LoginResult extends UnviredResult {
  type: LoginListenerType;
}

export class AuthenticateActivateResult extends UnviredResult {
  type: AuthenticateAndActivateResultType;
}

export class AuthenticateLocalResult extends UnviredResult {
  type: AuthenticateLocalResultType;
}

export class UnviredCredential {
  user: string;
  password: string;
  port: string;
}

/**
 * @name Unvired Cordova SDK
 * @description
 * This plugin lets you build apps which connect to Unvired Mobile Platform (UMP).
 * -
 * iOS Requirements
 * -
 * Update your Cocoapods repo before you install the plugin.
 * ```
 * $ pod repo update
 * ```
 * -
 * Browser Requirements
 * -
 * After you install the plugin, for Ionic/Angular projects, please add a reference to the following JS files within <head></head> section of index.html.
 * ```
 * <script src="assets/js/sql.js"></script>
 * <script src="assets/js/kernel.js"></script>
 * <script src="assets/js/winstore-jscompat.js"></script>
 * <script src="assets/js/jquery-3.2.1.js"></script>
 * ```
 * @usage
 * ```typescript
 * import { UnviredCordovaSDK } from '@ionic-native/unvired-cordova-sdk/ngx';
 *
 *
 * constructor(private unviredSDK: UnviredCordovaSDK) { }
 *
 * ...
 * // This is usually done in app.component.ts of your app.
 * // Before you can interact with UMP, you need to initialize the SDK and authenticate with UMP.
 * // SDK Initialization
 * let loginParameters = new LoginParameters()
 * loginParameters.appName = 'UNVIRED_DIGITAL_FORMS'
 * loginParameters.metadataPath = '../assets/metadata.json'
 * let loginResult: LoginResult
 * try {
 *   loginResult = await this.unviredSDK.login(loginParameters)
 * }
 * catch (error) {
 *   this.unviredSDK.logError("AppComponent", "Initialize", "Error during login: " + error)
 * }
 *
 *
 * switch (loginResult.type) {
 * case LoginListenerType.auth_activation_required:
 * // App is not activated. i.e, User is using the app for the very first time.
 * // App needs to be activated before it can interact with UMP.
 * // At this point of time, you basically navigate to a login screen & accept username / password from the user.
 * // Set the username & password to loginParameters object and call authenticateAndActivate
 * try {
 *  // Execute this block of code in a login screen.
 * let loginParameters = new LoginParameters();
 * loginParameters.url = '<UMP_URL>';
 * loginParameters.company = '<Company>';
 * loginParameters.username = '<Username>';
 * loginParameters.password = '<Password>';
 * loginParameters.loginType = LoginType.unvired;
 * let authenticateActivateResult: AuthenticateActivateResult = await this.unviredSDK.authenticateAndActivate(loginParameters);
 * if (authenticateActivateResult.type === AuthenticateAndActivateResultType.auth_activation_success) {
 * // App is fully setup. Navigate to your app's home screen.
 * } else if (authenticateActivateResult.type === AuthenticateAndActivateResultType.auth_activation_error) {
 * console.log("Error during login: " + authenticateActivateResult.error)
 * } catch (error) {
 * this.unviredSDK.logError('LoginPage', 'auth_activation_required', 'ERROR: ' + error);
 * }
 * break;
 *
 *
 *
 * case LoginListenerType.app_requires_login:
 * // App is already activated. But, the user needs to enter credentials because the setting LOCAL_PASSWORD is set to YES in Unvired Admin Cockpit.
 * // To set LOCAL_PASSWORD property for your app, contact your administrator.
 * try {
 *  // Execute this block of code in a login screen.
 *  let loginParameters = new LoginParameters()
 *  loginParameters.username = '<Username>';
 *  loginParameters.password = '<Password>';
 *  let authenticateLocalResult: AuthenticateLocalResult = await this.unviredSDK.authenticateLocal(loginParameters);
 *  if (authenticateLocalResult.type === AuthenticateLocalResultType.login_success) {
 *  // App is fully setup. Navigate to your app's home screen.
 *  } else if (authenticateLocalResult.type === AuthenticateLocalResultType.login_error) {
 *   console.log("Error during local login: " + authenticateActivateResult.error)
 *  } catch (error) {
 *   this.unviredSDK.logError('LoginPage', 'app_requires_login', 'ERROR: ' + error);
 * }
 * break;
 *
 *
 *
 * case login_success:
 * // The setting LOCAL_PASSWORD is set to false.
 * // App is fully initialized. Users can interact with the UMP
 * // Navigate to Home screen
 * break;
 * }
 *
 *
 *
 *
 *
 * // Synchronization APIs
 * // Example 1: Make a Sync RQST call
 * ```
 * await this.unviredSDK.syncForeground(RequestType.RQST, {"CUSTOMER_HEADER": {"CUST_NO" : "007", "CUST_NAME" : "James Bond"}}, '', 'PA_GET_CUSTOMER_DETAILS', true)
 * ```
 *
 * // Example 2: Make a Sync QUERY / PULL call
 * ```
 * await this.unviredSDK.syncForeground(RequestType.QUERY, '', {"CUSTOMER_SEARCH_CONTEXT":[{"CUSTOMER_SEARCH_HEADER":{"CUST_NO":"007"}}]}, 'PA_SEARCH_CUSTOMER', true)
 * ```
 *
 * Example 3: Make a Async RQST call
 * ```
 * await this.unviredSDK.syncBackground(RequestType.RQST, {"CUSTOMER_HEADER": {"CUST_NO" : "007", "CUST_NAME" : "James Bond"}}, '', 'PA_GET_CUSTOMER_DETAILS', 'CUSTOMER', beLID, false)
 * ```
 *
 * Example 4: Make a Async QUERY / PULL call
 * ```
 * await this.unviredSDK.syncBackground(RequestType.QUERY, '', {"CUSTOMER_SEARCH_CONTEXT":[{"CUSTOMER_SEARCH_HEADER":{"CUST_NO":"007"}}]}, 'PA_SEARCH_CUSTOMER', '', '', true)
 * ```
 *
 * // Note: Subscribe to NotificationListener to get updates on data processing in background
 * // However, only one screen can listen to background data updates at any point of time.
 * this.unviredSDK.registerNotifListener().subscribe( data => {
 * switch (data.type) {
 * case NotificationListenerType.dataSend:
 * break;
 * case NotificationListenerType.dataChanged:
 * break;
 * case NotificationListenerType.dataReceived:
 * break;
 * .
 * .
 * .
 * }})
 *
 *
 *
 *
 *
 * // Database APIs
 * // Insert a record onto database
 * this.unviredsdk.dbInsert("CUSTOMER_HEADER", {"NAME":"James Bond","CUST_NO":"007"}, true);
 *
 * // Update a record in database
 * this.unviredSDK.dbUpdate('CUSTOMER_HEADER', {"NAME":"John Doe","CUST_NO":"008"}, "CUST_NO = '007'")
 *
 * // Delete a record in database
 * this.unviredSDK.dbDelete('CUSTOMER_HEADER', "CUST_NO = '007'")
 *
 * // Execute a SQL Query
 * this.unviredSDK.dbExecuteStatement('SELECT * FROM CUSTOMER_HEADER WHERE CUSTOMER_ID = "007"')
 */
@Plugin({
  pluginName: 'UnviredCordovaSDK',
  plugin: 'cordova-plugin-unvired-sdk', // npm package name, example: cordova-plugin-camera
  pluginRef: 'ump', // the variable reference to call the plugin, example: navigator.geolocation
  repo: 'https://github.com/unvired/cordova-plugin-unvired-sdk/', // the github repository URL for the plugin
  install: 'ionic cordova plugin add @ionic-native/unvired-cordova-sdk', // OPTIONAL install command, in case the plugin requires variables
  installVariables: [], // OPTIONAL the plugin requires variables
  platforms: ['iOS', 'Android', 'Windows', 'Browser'], // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable()
export class UnviredCordovaSDK extends IonicNativePlugin {
  loginParameters: LoginParameters;

  /**
   * Write debug logs.
   * @param sourceClass Name of the class
   * @param method Name of the method
   * @param message The actual message
   * Example:
   * ```
   * this.unviredSDK.logDebug("Class Name", "Method Name", "Log Message")
   * ```
   * would produce the log message like this
   * 01-07-2019 15:52 | DEBUG | Class Name | Method Name | Log Message
   */
  @Cordova()
  logDebug(sourceClass: string, method: string, message: string): Promise<any> {
    return;
  }

  /**
   * Write error logs.
   * @param sourceClass Name of the class
   * @param method Name of the method
   * @param message The actual message
   * Example:
   * ```
   * this.unviredSDK.logError("Class Name", "Method Name", "Log Message")
   * ```
   * would produce the log message like this
   * 01-07-2019 15:52 | ERROR | Class Name | Method Name | Log Message
   */
  @Cordova()
  logError(sourceClass: string, method: string, message: string): Promise<any> {
    return;
  }

  /**
   * Write Info logs.
   * @param sourceClass Name of the class
   * @param method Name of the method
   * @param message The actual message
   * Example:
   * ```
   * this.unviredSDK.logInfo("Class Name", "Method Name", "Log Message")
   * ```
   * would produce the log message like this
   * 01-07-2019 15:52 | IMPORTANT | Class Name | Method Name | Log Message
   */
  @Cordova()
  logInfo(sourceClass: string, method: string, message: string): Promise<any> {
    return;
  }

  /**
   * Returns the contents of the log file as a string.
   */
  @Cordova()
  logRead(): Promise<LogDataResult> {
    return;
  }

  /**
   * Resets the log file.
   */
  @Cordova()
  logDelete(): Promise<any> {
    return;
  }

  /**
   * Sends log file to server. The log file can be viewed under Settings > Device & Data in UMP Admin Cockpit.
   */
  @Cordova()
  sendLogToServer(): Promise<any> {
    return;
  }

  /**
   * Send logs via email interface. Calling this function opens up the default email interface with the log file as an attachment.
   */
  @Cordova()
  sendLogViaEmail(): Promise<any> {
    return;
  }

  /**
   * Returns the current log level.
   */
  @Cordova()
  getLogLevel(): Promise<LogResult> {
    return;
  }

  /**
   * Returns the path of the log file.
   */
  @Cordova()
  getLogFilePath(): Promise<string> {
    return;
  }

  /**
   * Set the log level of the app.
   * @param logLevel The log level to set
   */
  @Cordova()
  setLogLevel(logLevel: LogLevel): Promise<any> {
    return;
  }

  /**
   * This api initializes the Unvired Application.
   * @param loginParameters Set of parameters to be passed the login()
   * For Example:
   * ```
   * let loginParameters = new LoginParameters()
   * loginParameters.appName = 'UNVIRED_DIGITAL_FORMS'
   * loginParameters.metadataPath = '../assets/metadata.json'
   * loginParameters.loginType = LoginType.unvired
   * ```
   */
  @Cordova()
  login(loginParameters: LoginParameters): Promise<LoginResult> {
    return;
  }

  /**
   * This api initializes the Unvired Application.
   * @param loginParameters Set of parameters to be passed the loginWithDemoData()
   * For Example:
   * ```
   * let loginParameters = new LoginParameters()
   * loginParameters.appName = 'UNVIRED_DIGITAL_FORMS'
   * loginParameters.metadataPath = '../assets/metadata.json'
   * loginParameters.loginType = LoginType.unvired
   * loginParameters.demoData = "<tag></tag>"
   * ```
   */
  @Cordova()
  loginWithDemoData(loginParameters: LoginParameters): Promise<LoginResult> {
    return;
  }

  /**
   * Logs out the last active user.
   */
  @Cordova()
  logout(): Promise<any> {
    return;
  }

  /**
   * Authenticates ( With the Unvired Server ) & activates ( Receives Framework Settings ) the app against UMP
   *  Example:
   *  ```
   *  let loginParameters = new LoginParameters()
   *  loginParameters.username = 'MY_USERNAME'
   *  loginParameters.password = 'MY_PASSWORD'
   *  await this.unviredSDK.authenticateAndActivate(loginParameters)
   *  ```
   * @param loginParameters LoginParamerter instance used to send username / password.
   */
  @Cordova()
  authenticateAndActivate(loginParameters: LoginParameters): Promise<AuthenticateActivateResult> {
    return;
  }

  /**
   * Authenticates the user against the previously saved username & password.
   * For ADS Login, authentication is performed with the ADS Server.
   * @param loginParameters Send username & Password through LoginParameters
   * Example:
   *  ```
   *  let loginParameters = new LoginParameters()
   *  loginParameters.username = 'MY_USERNAME'
   *  loginParameters.password = 'MY_PASSWORD'
   *  await this.unviredSDK.authenticateLocal(loginParameters)
   */
  @Cordova()
  authenticateLocal(loginParameters: LoginParameters): Promise<AuthenticateLocalResult> {
    return;
  }

  /**
   * Get all the accounts configured on the device.
   */
  @Cordova()
  getAllAccounts(): Promise<any> {
    return;
  }

  /**
   * Switch account
   * @param account The account to switch to
   */
  @Cordova()
  switchAccount(account: any): Promise<any> {
    return;
  }

  /**
   * Delete account
   * @param account The account to delete
   */
  @Cordova()
  deleteAccount(account: any): Promise<any> {
    return;
  }

  /**
   * Get all InfoMessages linked to the header.
   * @param headerName Name of the header. Example: CUSTOMER_HEADER
   * @param lid LID of the header.
   */
  @Cordova()
  getInfoMessages(headerName: string, lid: string): Promise<any> {
    return;
  }

  /**
   * Supported for mobile Platforms.
   * Display framework settings.
   */
  @Cordova()
  showSettings(): Promise<any> {
    return;
  }

  /**
   * Get User settings.
   * Returns User setting in the following format:
   * ```
   * {
   * "UNVIRED_ID": "",                               // The Unvired ID configured in UMP
   * "USER_ID": "",                                  // Deprecated. Select among UNVIRED_ID / EMAIL / ADS_USER_ID / SAP_USER_ID depending on the LoginType
   * "FULL_NAME": "FirstName LastName",
   * "EMAIL": "abc@example.com",                     // Email id of the user as configurd in UMP
   * "SERVER_URL": "https://umpdev.unvired.io/UMP",  // UMP Server's URL
   * "SAP_USER_ID": "SAP_ID",                        // If LoginType is SAP
   * "SAP_PORT_NAME": "",                            // If LoginType is SAP
   * "LOGIN_TYPE": "",                               // @see LoginType
   * "ADS_USER_ID": "ADS_USER_ID",                   // If LoginType is ADS
   * "ADS_DOMAIN": "ADS_DOMAIN"                      // If LoginType is ADS
   * }
   * ```
   */
  @Cordova()
  userSettings(): Promise<SettingsResult> {
    return;
  }

  /**
   * Update System Credential
   * @param credentials The credential to update to
   */
  @Cordova()
  updateSystemCredentials(credentials: any): Promise<any> {
    return;
  }

  /**
   * Get all system credentials.
   */
  @Cordova()
  getSystemCredentials(): Promise<any> {
    return;
  }

  /**
   * Get version number of unvired-cordova-sdk.
   */
  @Cordova()
  getVersionNumbers(): Promise<any> {
    return;
  }

  /**
   * Delete all data from the device.
   */
  @Cordova()
  clearData(): Promise<any> {
    return;
  }

  /**
   * Check whether the device has internet.
   */
  @Cordova()
  hasInternet(): Promise<any> {
    return;
  }

  /**
   * Get a random id to use as guid.
   */
  @Cordova({ sync: true })
  guid(): string {
    return;
  }

  /**
   * For Debugging Only. pull database file to "temp" folder for development purpose only.
   */
  @Cordova()
  pullDb(): Promise<any> {
    return;
  }

  /**
   * For Debugging Only. ush updated database file from "temp" folder to application directory for development purpose only
   */
  @Cordova()
  pushDb(): Promise<any> {
    return;
  }

  /**
   * Select records from Database
   * @param tableName table name. Example: CUSTOMER_HEADER
   * @param whereClause {Object} Browser: JSON object containing name-value pairs.
   * Mobile: Or a Sqlite whereClause ( without the 'where' keyword )
   * Example:
   * ```
   * # Select values from FORM_HEADER table where FORM_ID is 5caed815892215034dacad56
   * this.unviredSDK.dbSelect('FORM_HEADER', "FORM_ID = '5caed815892215034dacad56'")
   * ```
   */
  @Cordova()
  dbSelect(tableName: string, whereClause: any): Promise<DbResult> {
    return;
  }

  /**
   * Insert record into database.
   * In browser platform this function always inserts or updates based on GID.
   * @param tableName Name of the table.
   * @param structureObject - JSON object containing name-value pairs.
   * @param isHeader {boolean} - is DataStructure a header or item?
   * Example:
   * ```
   * # Insert CUSTOMER_HEADER Datastructure into DB.
   * this.unviredsdk.dbInsert("CUSTOMER_HEADER", {"NAME":"USER","NO":"0039"}, true);
   * ```
   */
  @Cordova()
  dbInsert(tableName: string, structureObject: any, isHeader: boolean): Promise<DbResult> {
    return;
  }

  /**
   * insert or update the record ( if record exists ) into database.
   * In browser insert always inserts or updates based on gid
   * @param tableName Name of the table
   * @param structureObject - JSON object containing name-value pairs.
   * @param isHeader {boolean}  - is DataStructure a header or item?
   * Example:
   * ```
   * # Insert or update a CUSTOMER_HEADER with NAME as USER and NO as '0039'
   * this.unviredsdk.dbInsertOrUpdate("CUSTOMER_HEADER",{"NAME":"UPDATED_USER","UPDATED_NO":"0039"},true);
   * ```
   */
  @Cordova()
  dbInsertOrUpdate(tableName: string, structureObject: any, isHeader: boolean): Promise<DbResult> {
    return;
  }

  /**
   * Delete records from the database.
   * @param tableName Name of the table
   * @param whereClause {Object} Browser: JSON object containing name-value pairs.
   * Mobile: Or a Sqlite whereClause ( without the 'where' keyword )
   * Example:
   * ```
   * # Select values from FORM_HEADER table where FORM_ID is 5caed815892215034dacad56
   * this.unviredSDK.dbDelete('FORM_HEADER', "FORM_ID = '5caed815892215034dacad56'")
   * ```
   */
  @Cordova()
  dbDelete(tableName: string, whereClause: any): Promise<DbResult> {
    return;
  }

  /**
   * Update records in database.
   * @param tableName Name of the table
   * @param updatedObject JSON object containing updated name-value pairs.
   * @param whereClause {Object} Browser: JSON object containing name-value pairs.
   * Mobile: Or a Sqlite where Clause ( without the 'where' keyword )
   * Example:
   * ```
   * # Update NAME & NO from FORM_HEADER table where FORM_ID is 5caed815892215034dacad56
   * this.unviredSDK.dbUpdate('FORM_HEADER', {"NAME":"UPDATED_USER","UPDATED_NO":"0039"}, "FORM_ID = '5caed815892215034dacad56'")
   * ```
   */
  @Cordova()
  dbUpdate(tableName: string, updatedObject: any, whereClause: any): Promise<DbResult> {
    return;
  }

  /**
   * Execute a SQL statement
   * @param query {string} SQL Statement.
   * Example:
   * ```
   * this.unviredSDK.dbExecuteStatement("SELECT * FROM CUSTOMER_HEADER WHERE CUSTOMER_ID = '39'")
   * ```
   */
  @Cordova()
  dbExecuteStatement(query: string): Promise<DbResult> {
    return;
  }

  /**
   * Create Savepoint. For more info consult SQLite Documentation ( https://www.sqlite.org/lang_savepoint.html )
   * @param savePoint {string} Name of savepoint
   * Example:
   * ```
   * this.unviredSDK.dbCreateSavePoint('MySavePointName')
   * ```
   */
  @Cordova()
  dbCreateSavePoint(savePoint: string): Promise<DbResult> {
    return;
  }

  /**
   * Release Savepoint. For more info consult SQLite Documentation ( https://www.sqlite.org/lang_savepoint.html )
   * @param savePoint {string} Name of savepoint
   * ```
   * this.unviredSDK.dbReleaseSavePoint('MySavePointName')
   * ```
   */
  @Cordova()
  dbReleaseSavePoint(savePoint: string): Promise<DbResult> {
    return;
  }

  /**
   * Rollback Savepoint. For more info consult SQLite Documentation ( https://www.sqlite.org/lang_savepoint.html )
   * @param savePoint {string} Name of the savepoint
   * Example:
   * ```
   * this.unviredSDK.dbRollbackToSavePoint('MySavePointName')
   * ```
   */
  @Cordova()
  dbRollbackToSavePoint(savePoint: string): Promise<DbResult> {
    return;
  }

  /**
   * Begin database transaction.
   * For more info, consult SQLite documentation ( https://www.sqlite.org/lang_transaction.html )
   * Example:
   * ```
   * this.unviredSDK.dbBeginTransaction()
   * ```
   */
  @Cordova()
  dbBeginTransaction(): Promise<any> {
    return;
  }

  /**
   * End database transaction.
   * For more info, consult SQLite documentation ( https://www.sqlite.org/lang_transaction.html )
   * Example:
   * ```
   * this.unviredSDK.dbEndTransaction()
   * ```
   */
  @Cordova()
  dbEndTransaction(): Promise<any> {
    return;
  }

  /**
   * Browser platform only. Call this function to save the WebData. This function can be used to preserve a large data that is downloaded.
   * If you set the loginParameter flag, |cacheWebData|, then the plugin loads this data.
   */
  @Cordova()
  dbSaveWebData(): Promise<any> {
    return;
  }

  /**
   * Browser platform only. Call this function to export the Webdata. 
   * Call this function to export the Web 
   */
  @Cordova()
  dbExportWebData(): Promise<any> {
    return;
  }

  /**
   * Supported in Android & Windows only.
   * Launch a file from a file path
   * @param filePath file path
   */
  @Cordova()
  launchFile(filePath: string): Promise<any> {
    return;
  }

  /**
   * Supported in Android & Windows only.
   * Write Base64 string to a file and launch.
   */
  @Cordova()
  launchBase64(base64string: string, fileName: string, extension: string): Promise<any> {
    return;
  }

  /**
   * Supported in Windows Only
   * Unzip file.
   */
  @Cordova()
  unzip(srcPath: string, destPath: string) {
    return;
  }

  /**
   * Get the path for the folder where attachments are stored.
   * Apps can combine this with the attachment filename to construct absolute path to an attachment file.
   */
  @Cordova()
  getAttachmentFolderPath(): Promise<any> {
    return;
  }

  /**
   * Saves attachment item in database and prepares it for uploading to server. This api is required to associate attachment file to a Business Entity.
   * This api copies the attachment file to a new path, links the attachment with the header in database.
   * To send the attachment item, just send the header using either syncForeground / syncBackground api and sdk will upload all the linked attachments.
   * @param tableName Table name of attachment item structure. This usually ends with _ATTACHMENT.
   * @param structureObject {Object} attachment item as a JSON object. Please check the example below.
   * Example:
   * ```
   * // Steps to upload attachment.
   * // 1. Store the file to be attached in device's path.
   * // 2. Create an attachment item to send this file.
   * var attachmentObject = new INSPECTION_ATTACHMENT()
   * attachmentObject.LID = guid(); // Random id
   * attachmentObject.FID = lid  // LID of the header.
   * attachmentObject.UID = guid(); // Random id
   * attachmentObject.EXTERNAL_URL = ""; // Optional: Check with your Unvired Process Agent developer.
   * attachmentObject.FILE_NAME = 'myfile.jpg'; // Name of the file as stored in the device.
   * attachmentObject.LOCAL_PATH = /<folder_location>/myfile.jpg // File path. Please make sure that the path starts with a '/'
   * attachmentObject.TAG1 = '' // Optional: Check with your Unvired Process Agent developer.
   * attachmentObject.TAG2 = '' // Optional: Check with your Unvired Process Agent developer.
   * attachmentObject.TAG2 = '' // Optional: Check with your Unvired Process Agent developer.
   * attachmentObject.TAG4 = '' // Optional: Check with your Unvired Process Agent developer.
   * attachmentObject.TAG5 = '' // Optional: Check with your Unvired Process Agent developer.
   * await this.unviredCordovaSDK.createAttachmentItem('INSPECTION_ATTACHMENT', attachmentObject)
   * ```
   */
  @Cordova()
  createAttachmentItem(tableName: string, structureObject: any): Promise<any> {
    return;
  }

  /**
   * Upload attachment item to server.
   * @param tableName Table name of attachment item.
   * @param structureObject JSON object containing name-value pairs.
   * @param isAsync Flag which indicates whether the upload should happen in async.
   */
  @Cordova()
  uploadAttachment(tableName: string, structureObject: any, isAsync: boolean): Promise<any> {
    return;
  }

  /**
   * Download attachment from server.
   * @param tableName Table name of attachment item.
   * @param structureObject JSON object containing name-value pairs.
   */
  @Cordova()
  downloadAttachment(tableName: string, structureObject: any): Promise<any> {
    return;
  }

  /**
   * Sends data to UMP in Sync mode. This means user has to wait until the duration of SYNC call. Only one SYNC call can be active at any point of time. Once the call completes, the result would be available in the Promise.
   * Apps typically block UI during a SYNC call so that there are no user-actions possible until the call completes.
   *
   * Example 1: Make a RQST call
   * ```
   * await this.unviredSDK.syncForeground(RequestType.RQST, {"CUSTOMER_HEADER": {"CUST_NO" : "007", "CUST_NAME" : "James Bond"}}, '', 'PA_GET_CUSTOMER_DETAILS', true)
   * ```
   *
   * Example 2: Make a QUERY / PULL call
   * ```
   * await this.unviredSDK.syncForeground(RequestType.QUERY, '', {"CUSTOMER_SEARCH_CONTEXT":[{"CUSTOMER_SEARCH_HEADER":{"CUST_NO":"007"}}]}, 'PA_SEARCH_CUSTOMER', true)
   * ```
   *
   * @param reqype RequestType for the message. Please check RequestType to select the right request type.
   * @param header {Object} Send a value for this parameter only if RequestType is RQST. For others, send an empty string. This parameter represents the header datastructure of the Business Entity which needs to be sent as input to a Process Agent function.
   * Before you make this call, ensure that the object statuses are updated for header and child tables.
   * Framework builds the input by considering only those child entities whose object status is one among ADD, MODIFY or DELETE.
   * Example:
   * ```json
   * {
   *  "NAME_OF_HEADER": {
   *     "FIELD1": "FIELD_1_VALUE",
   *     "FIELD2": "FIELD_2_VALUE"
   *   }
   * }
   * ```
   *
   * @param customData {Object} Send a value for this parameter only if |reqType| is QUERY or PULL. For others, send an empty string.
   * This parameter represents the actual input which need to be sent to the server. Usually this is an input entity, but check with your Process Agent developer on the type of input.
   *
   * Example:
   * ```json
   * {
   *  "BE_NAME": [
   *   {
   *      "NAME_OF_HEADER": {
   *         "FIELD1": "FIELD_1_VALUE",
   *         "FIELD2": "FIELD_2_VALUE"
   *       }
   *   }
   *  ]
   * }
   * ```
   *
   * @param paFunction Name of the Process Agent function to be executed. Example: PA_MOBILE_EXECUTE_SALES_ORDER.
   * @param autoSave This defines whether to save the response to database.
   */
  @Cordova()
  syncForeground(
    reqype: RequestType,
    header: any,
    customData: any,
    paFunction: string,
    autoSave: boolean
  ): Promise<SyncResult> {
    return;
  }

  /**
   * Make an async call to UMP.
   * The result of the call would be notified through the observable returned for the function registerNotifListener().
   *
   * Pre-requisites:
   * 1. Object status is updated for header and items which need to be synced with the server.
   * 2. Updated header and items are saved in database.
   * 3. The LID of the header. This value needs to be passed for the parameter `belid`.
   *
   * Example 1: Make a RQST call
   * ```
   * let customerHeader = new CUSTOMER_HEADER()
   * customerHeader.LID = // TODO
   * customerHeader.CUST_NO = '007'
   * customerHeader.CUST_NAME = 'James Bond'
   *
   * await this.unviredSDK.syncBackground(RequestType.RQST, {"CUSTOMER_HEADER": customerHeader}, '', 'PA_GET_CUSTOMER_DETAILS', 'CUSTOMER', customerHeader.LID, false)
   * ```
   * Example 2: Make a QUERY / PULL call
   * ```
   * await this.unviredSDK.syncBackground(RequestType.QUERY, '', {"CUSTOMER_SEARCH_CONTEXT":[{"CUSTOMER_SEARCH_HEADER":{"CUST_NO":"007"}}]}, 'PA_SEARCH_CUSTOMER', '', '', true)
   * ```
   *
   * @param reqype RequestType for the message. Please check RequestType to select the right request type.
   * @param header {Object} Send a value for this parameter only if RequestType is RQST. For others, send an empty string. This parameter represents the header datastructure of the Business Entity which needs to be sent as input to a Process Agent function.
   * Before you make this call, ensure that the object statuses are updated for header and child tables.
   * Framework builds the input by considering only those child entities whose object status is one among ADD, MODIFY or DELETE.
   * Example:
   * ```json
   * {
   *  "NAME_OF_HEADER": {
   *     "FIELD1": "FIELD_1_VALUE",
   *     "FIELD2": "FIELD_2_VALUE"
   *   }
   * }
   * ```
   *
   * @param customData {Object} Send a value for this parameter only if |reqType| is QUERY or PULL. For others, send an empty string.
   * This parameter represents the actual input which need to be sent to the server. Usually this is an input entity, but check with your Process Agent developer on the type of input.
   *
   * Example:
   * ```json
   * {
   *  "BE_NAME": [
   *   {
   *      "NAME_OF_HEADER": {
   *         "FIELD1": "FIELD_1_VALUE",
   *         "FIELD2": "FIELD_2_VALUE"
   *       }
   *   }
   *  ]
   * }
   * ```
   *
   * @param paFunction Name of the Process Agent function to be executed. Example: PA_MOBILE_EXECUTE_SALES_ORDER.
   * @param beName Name of the Business Entity. Required for the RequestType RQST only. For others, send empty string.
   * @param belid LID of the Header datastructure. Required for the RequestType RQST only. For others, send empty string.
   * @param bypassAttachment a true value would upload the data to the server followed by attachments. A false value would do the reverse.
   */
  @Cordova()
  syncBackground(
    reqype: RequestType,
    header: any,
    customData: any,
    paFunction: string,
    beName: string,
    belid: string,
    bypassAttachment: boolean
  ): Promise<SyncResult> {
    return;
  }

  /**
   * Returns an observable containing the state of the synchronisation along with count (if applicable). Possible values are as follows:
   * 1. Sending (count) // Ex: sending(3), there are 3 items in outbox and device is online. i.e datasender thread running
   * 2. Receiving // There are items to be received from server & device is online
   * 3. Processing (count) // Ex: processing (5), there are 5 items in inbox and they are being processed.
   * 4. Waiting to connect // The device is offline & there are items in outbox
   * 5. Idle // there is no synchronisation activity going on.
   */
  @Cordova({
    observable: true,
  })
  getSynchronizationState(): Observable<string> {
    return;
  }

  /**
   * For Browser platform only.
   * Reinitialize web db. Use this api to initialize db from persisted local storage db
   */
  @Cordova()
  dbReload() {
    return;
  }

  /**
   * For Browser platform only.
   * Generate Unvired BusinessEntity json from header and items
   * @param headerName Header Table Name
   * @param header Header Datastructure object
   * @param itemName Item Table Name
   * @param items Array of Item Structures.
   */
  @Cordova()
  generateUBJson(headerName: string, header: any, itemName: string, items: any) {
    return;
  }

  /**
   * For Browser platform only.
   * parseRawUBJson - Parse response json returned from syncForeground api.
   * @param json JSON string
   */
  @Cordova()
  parseRawUBJson(json: string) {
    return;
  }

  /**
   * For Browser platform only.
   * Returns a collection of all entities which belong to |tableName|
   * @param tableName Name of the table Exanple: CUSTOMER_HEADER
   */
  @Cordova()
  dbGetCollection(tableName: string) {
    return;
  }

  /**
   * Make a GetMessage call.
   * A GetMessage call is a network request to download all ready messages for the user.
   * To keep track of returned data, you would need to register a notification listener (registerNotifListener()) & subscribe to the observable.
   */
  @Cordova()
  getMessages() {
    return;
  }

  /**
   * Subscribe to this observable to listen for life-cyle events in the case of an async message.
   * Only one class can subscribe to notifications at any point of time.
   */
  @Cordova({
    observable: true,
  })
  registerNotifListener(): Observable<NotifResult> {
    return;
  }

  /**
   * Supported in mobile only
   * Check whether a Header datastructure is in outbox.
   * @param beLid LID of the Header datastructure.
   */
  @Cordova()
  isInOutBox(beLid: string): Promise<UnviredResult> {
    return;
  }

  /**
   * Supported in mobile only
   * Returns the count of outbox items.
   */
  @Cordova()
  outBoxItemCount(): Promise<string> {
    return;
  }

  /**
   * Supported in mobile only
   * Checks whether a Header datastructure is in sent and is waiting for response.
   * Typically you would use before allowing the user to update the Header datastructure.
   * @param beLid LID of the Business Entity
   */
  @Cordova()
  isInSentItem(beLid: string): Promise<UnviredResult> {
    return;
  }

  /**
   * Supported in mobile only
   * Returns the count of sent items.
   */
  @Cordova()
  sentItemCount(): Promise<string> {
    return;
  }

  /**
   * Supported in mobile only
   * Returns the count of Inbox items.
   */
  @Cordova()
  inBoxItemCount(): Promise<string> {
    return;
  }

  /**
   * Supported in mobile only
   * Delete outbox entry for a Header datastructure.
   * @param beLid LID of the Business Entity
   */
  @Cordova()
  deleteOutBoxEntry(beLid: string): Promise<any> {
    return;
  }

  /**
   * Resets sync data with the application such as outbox, inbox & sent item entries.
   * You may want to call this function before switching account.
   */
  @Cordova()
  resetApplicationSyncData(): Promise<any> {
    return;
  }

  /**
   * For Browser platform only
   * Helps in updating application database without reauthenticating with server which requires to drop both app and framework database.
   */
  @Cordova()
  reCreateAppDB(): Promise<any> {
    return;
  }

  /**
   * For Mobile platform only
   * Starts Inbox handler if there are items in inbox.
   */
  @Cordova()
  startInboxHandler(): Promise<any> {
    return;
  }

  /**
   * For Mobile platform only
   * Starts DataSender if there are items in outbox.
   */
  @Cordova()
  startDataSender(): Promise<any> {
    return;
  }

  /**
   * Returns platform name
   * Ex: ios, android, windows, browser
   */
  @Cordova()
  platform(): Promise<string> {
    return;
  }

  /**
   * Mobile Platform only.
   * Test whether push notifications can be received on the device
   */
  @Cordova()
  testPushNotification(): Promise<any> {
    return;
  }

  /**
   * Mobile Platform only.
   * Lock sending of data for this BE.
   * @param beLid LID of the Business Entity
   */
  @Cordova()
  lockDataSender(beLid: string): Promise<OutboxLockResult> {
    return;
  }

  /**
   * Mobile Platform only.
   * Release any locks applied for sending data (DataSender Thread) to the server.
   */
  @Cordova()
  unlockDataSender(): Promise<UnviredResult> {
    return;
  }

  /**
   * Mobile Platform only.
   * Delete an outbox item based on header's lid.
   */
  @Cordova()
  removeOutObjectBasedOnLid(lid: string): Promise<UnviredResult> {
    return;
  }

  /**
   * Returns a promise containing UMP servers which are discoverable within the network.
   * Clients can use this information to allow users to select appropriate UMP server in the login page.
   * ```
   * let discoveryServiceResult = await this.unviredSDK.startDiscoveryService()
   * if (discoveryServiceResult.type == ResultType.success) {
   *   let UMPServers: any[] = discoveryServiceResult.data
   *   UMPServers.forEach(element => {
   *     console.log(JSON.stringify(element))  // {"name":"Chyme 98","url":"http://192.168.98.98:8080/UMP/","root":"UNVIRED","type":"DEVELOPMENT"}
   *   });
   * }
   * else {
   *  console.log('Error searching for UMP Servers: ' + discoveryServiceResult.error)
   * }
   * ```
   */
  @Cordova()
  startDiscoveryService(): Promise<UnviredResult> {
    return;
  }

  /**
   * Use this function to set the SAP credentials to be sent to UMP.
   * @param credentials Array of |Credential| objects.
   */
  @Cordova()
  setClientCredentials(credentials: UnviredCredential[]) {
    return;
  }

  /**
   * Check for client credentials.
   * @returns Returns true if client credentials are set
   */
  @Cordova()
  isClientCredentialsSet(): Promise<UnviredResult> {
    return;
  }

  /**
   * Encrypt a string with the key stored by the Unvired SDK.
   * @returns UnviredResult.data which should contains the encrypted string.
   */
   @Cordova()
   encrypt(stringToBeEncrypted: string): Promise<UnviredResult> {
     return;
   }

  /**
   * Decrypt a string with the string encrypted with the key (key stored by the Unvired SDK)
   * @returns UnviredResult.data which should contains the decrypted string.
   */
  @Cordova()
  decrypt(stringToBeDecrypted: string): Promise<UnviredResult> {
    return;
  }
}
