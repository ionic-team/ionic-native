import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

export type OS = 'Android' | 'iOS';
export type Gender = 'Male' | 'Female';
export type Event = 'messageReceived' |
  'notificationTapped' |
  'tokenReceived' |
  'registrationUpdated' |
  'geofenceEntered' |
  'actionTapped' |
  'installationUpdated' |
  'userUpdated' |
  'personalized' |
  'depersonalized';

export interface Configuration {
  /**
   * The application code of your Application from Push Portal website
   */
  applicationCode: string;
  geofencingEnabled?: boolean;
  /**
   * Message storage save callback
   */
  messageStorage?: string;
  defaultMessageStorage?: boolean;
  ios?: {
    notificationTypes?: string[];
    forceCleanup?: boolean;
    logging?: boolean
  };
  android?: {
    notificationIcon: string; // a resource name for a status bar icon (without extension), located in '/platforms/android/app/src/main/res/mipmap'
    multipleNotifications: boolean;
    notificationAccentColor: string;
  };
  privacySettings?: {
    applicationCodePersistingDisabled?: boolean;
    userDataPersistingDisabled?: boolean;
    carrierInfoSendingDisabled?: boolean;
    systemInfoSendingDisabled?: boolean
  };
  notificationCategories?: [
    {
      identifier?: string;
      actions?: [
        {
          identifier?: string;
          title?: string;
          foreground?: boolean;
          authenticationRequired?: boolean;
          moRequired?: boolean;
          destructive?: boolean;
          icon?: string;
          textInputActionButtonTitle?: string;
          textInputPlaceholder?: string
        }
        ]
    }];
}

export interface UserData {
  externalUserId: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: Gender;
  birthday?: Date;
  phones?: string[];
  emails?: string[];
  tags?: string[];
  customAttributes?: Record<string, string>;
}

export interface Installation {
  isPrimaryDevice?: boolean;
  isPushRegistrationEnabled?: boolean;
  notificationsEnabled?: boolean;
  geoEnabled?: boolean;
  sdkVersion?: string;
  appVersion?: string;
  os?: OS;
  osVersion: string;
  deviceManufacturer?: string;
  deviceModel?: string;
  deviceSecure?: boolean;
  language?: string;
  deviceTimezoneId?: string;
  applicationUserId?: string;
  deviceName?: string;
  customAttributes?: Record<string, string>;
}

export interface UserIdentity {
  phones?: string[];
  emails?: string[];
  externalUserId: string;
}

export interface PersonalizeContext {
  userIdentity: UserIdentity;
  userAttributes?: Record<string, string>;
  forceDepersonalize?: boolean;
}

export interface Message {
  messageId: string;
  title?: string;
  body?: string;
  sound?: string;
  silent?: boolean;
  customPayload?: Record<string, string>;
  internalData?: string;
  receivedTimestamp?: number;
  seenDate?: number;
  contentUrl?: string;
  seen?: boolean;
  geo?: boolean;
  originalPayload?: Record<string, string>; // iOS only
  vibrate?: boolean; // Android only
  icon?: string; // Android only
  category?: string; // Android only
}

export interface MobileMessagingError {
  code: string;
  message: string;
}

export class DefaultMessageStorage {

  @Cordova({ sync: true })
  find(messageId: string, callback: (message: Message) => void) {
    return;
  }

  @Cordova({ sync: true })
  findAll(callback: (messages: Message[]) => void) {
    return;
  }

  @Cordova({ sync: true })
  delete(messageId: string, callback: () => void) {
    return;
  }

  @Cordova({ sync: true })
  deleteAll(callback: () => void) {
    return;
  }
}

/**
 * @name Mobile Messaging
 * @description
 * Mobile Messaging SDK is designed and developed to easily enable push notification channel in your mobile application.
 * In almost no time of implementation you get push notification in your application and access to the features of [Infobip IP Messaging Platform](https://portal.infobip.com/push/).
 * This document describes library integration steps for your Cordova project.
 *
 * For more info see [Cordova plugin docs](https://github.com/infobip/mobile-messaging-cordova-plugin)
 *
 * @usage
 * ```typescript
 * import { MobileMessaging } from '@ionic-native/mobile-messaging';
 *
 *
 * constructor(private mobileMessaging: MobileMessaging) { }
 *
 * ...
 *
 *
 *  this.mobileMessaging.init({
 *    applicationCode: '<your_application_code>',
 *    geofencingEnabled: '<true/false>',
 *    defaultMessageStorage: '<true/false>',
 *    ios: {
 *      notificationTypes: ['alert', 'badge', 'sound']
 *    },
 *    android: {
 *      notificationIcon: <String; a resource name for a status bar icon (without extension), located in '/platforms/android/app/src/main/res/mipmap'>,
 *      multipleNotifications: <Boolean; set to 'true' to enable multiple notifications>,
 *      notificationAccentColor: <String; set to hex color value in format '#RRGGBB' or '#AARRGGBB'>
 *     }}, (err) => {
 *      ...
 *    });
 *
 *  this.mobileMessaging.register('messageReceived').subscribe((message: Message) => {
 *    ...
 *  });
 *
 * ```
 */
@Plugin({
  pluginName: 'MobileMessaging',
  plugin: 'com-infobip-plugins-mobilemessaging',
  pluginRef: 'MobileMessaging',
  repo: 'https://github.com/infobip/mobile-messaging-cordova-plugin',
  platforms: ['Android', 'iOS']
})
@Injectable()
export class MobileMessaging extends IonicNativePlugin {

  /**
   * Starts a new Mobile Messaging session.
   *
   * @name init
   * @param config. Configuration for Mobile Messaging
   * @param {Function} onInitError. Error callback
   */
  @Cordova({ sync: true })
  init(config: Configuration, onInitError?: (error: MobileMessagingError) => void) {
    return;
  }

  /**
   * Register to event coming from MobileMessaging library.
   *
   * @name register
   * @param event
   */
  @Cordova({
    observable: true
  })
  register(event: Event): Observable<Message> {
    return;
  }

  @Cordova({
    observable: true
  })
  on(event: Event): Observable<Message> {
    return;
  }

  /**
   * Un register from MobileMessaging library event.
   *
   * @name unregister
   * @param {String} eventName
   * @param {Function} handler will be unregistered from event
   */
  @Cordova({
    observable: true
  })
  unregister(event: Event): Observable<Message> {
    return;
  }

  @Cordova({
    observable: true
  })
  off(event: Event): Observable<Message> {
    return;
  }


  /**
   * Saves user data to the server.
   *
   * @name saveUser
   * @param {Object} userData. An object containing user data
   */
  @Cordova()
  saveUser(userData: UserData): Promise<any> {
    return;
  }

  /**
   * Fetch user data from the server.
   *
   * @name fetchUser
   */
  @Cordova()
  fetchUser(): Promise<UserData> {
    return;
  }

  /**
   * Gets user data from the locally stored cache.
   *
   * @name getUser
   */
  @Cordova()
  getUser(): Promise<UserData> {
    return;
  }

  /**
   * Saves installation to the server.
   *
   * @name saveInstallation
   * @param {Object} installation. An object containing installation data
   */
  @Cordova()
  saveInstallation(installation: Installation): Promise<Installation> {
    return;
  }

  /**
   * Fetches installation from the server.
   *
   * @name fetchInstallation
   */
  @Cordova()
  fetchInstallation(): Promise<Installation> {
    return;
  }

  /**
   * Gets locally cached installation.
   *
   * @name getInstallation
   */
  @Cordova()
  getInstallation(): Promise<Installation> {
    return;
  }

  /**
   * Sets any installation as primary for this user.
   *
   * @name setInstallationAsPrimary
   * @param {String} pushRegistrationId of an installation
   * @param {Boolean} primary or not
   */
  @Cordova()
  setInstallationAsPrimary(pushRegistrationId: string,
                           primary: boolean): Promise<any> {
    return;
  }

  /**
   * Performs personalization of the current installation on the platform.
   *
   * @name personalize
   * @param {Object} context. An object containing user identity information as well as additional user attributes.
   */
  @Cordova()
  personalize(context: PersonalizeContext): Promise<PersonalizeContext> {
    return;
  }

  /**
   * Performs depersonalization of the current installation on the platform.
   *
   * @name depersonalize
   */
  @Cordova()
  depersonalize(): Promise<any> {
    return;
  }

  /**
   * Performs depersonalization of the installation referenced by pushRegistrationId.
   *
   * @param {String} pushRegistrationId of the remote installation to depersonalize
   */
  @Cordova()
  depersonalizeInstallation(pushRegistrationId: string): Promise<any> {
    return;
  }

  /**
   * Mark messages as seen
   *
   * @name markMessagesSeen
   * @param {Array} messageIds of identifiers of message to mark as seen
   */
  @Cordova()
  markMessagesSeen(messageIds: string[]): Promise<any> {
    return;
  }

  /**
   * Displays built-in error dialog so that user can resolve errors during sdk initialization.
   *
   * @name showDialogForError
   * @param {Number} errorCode to display dialog for
   */
  @Cordova()
  showDialogForError(errorCode: number): Promise<any> {
    return;
  }

  @Cordova({ sync: true })
  defaultMessageStorage(): DefaultMessageStorage | undefined {
    return;
  }
}


