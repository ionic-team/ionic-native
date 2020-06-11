import { Injectable } from '@angular/core';
import { Cordova, CordovaProperty, IonicNativePlugin, Plugin } from '@ionic-native/core';

export interface AppRatePreferences {
  /**
   * Custom BCP 47 language tag
   */
  useLanguage?: string;

  /**
   * Custom application title
   */
  displayAppName?: string;

  /**
   * Show dialog again when application version will be updated. Defaults to `true`
   */
  promptAgainForEachNewVersion?: boolean;

  /**
   * count of runs of application before dialog will be displayed. Defaults to `3`
   */
  usesUntilPrompt?: number;

  /**
   * Simple Mode to display the rate dialog directly and bypass negative feedback filtering flow
   */
  simpleMode?: boolean;

  /**
   * leave app or no when application page opened in app store (now supported only for iOS). Defaults to `false`
   */
  inAppReview?: boolean;

  /**
   * use custom view for rate dialog. Defaults to `false`
   */
  useCustomRateDialog?: boolean;

  /**
   * Custom locale object
   */
  customLocale?: AppRateCustomLocale;

  /**
   * Callbacks for events
   */
  callbacks?: AppRateCallbacks;

  /**
   * App Store URLS
   */
  storeAppURL?: AppUrls;
  
  /**
   * Open Store URL
   */
  openUrl?: (url: string) => void;
}

export interface AppRateCustomLocale {
  /** Title */
  title?: string;

  /** Message */
  message?: string;

  /** Cancel button label */
  cancelButtonLabel?: string;

  /** Later button label */
  laterButtonLabel?: string;

  /** Rate button label */
  rateButtonLabel?: string;

  /** Yes button label */
  yesButtonLabel?: string;

  /** No button label */
  noButtonLabel?: string;

  /** App rate prompt title */
  appRatePromptTitle?: string;

  /** Feedback prompt title */
  feedbackPromptTitle?: string;

  /** Feedback prompt message */
  appRatePromptMessage?: string;

  /** Feedback prompt message */
  feedbackPromptMessage?: string;
}

export interface AppRateCallbacks {
  /**
   * call back function. called when user clicked on rate-dialog buttons
   */
  onButtonClicked?: Function;

  /**
   * call back function. called when rate-dialog showing
   */
  onRateDialogShow?: Function;
  /**
   * call back function. called when user clicked on negative feedback
   */
  handleNegativeFeedback?: Function;
}

export interface AppUrls {
  /**
   * application id in AppStore
   */
  ios?: string;

  /**
   * application URL in GooglePlay
   */
  android?: string;

  /**
   * application URL in Windows Store
   */
  windows?: string;

  /**
   * application URL in AppWorld
   */
  blackberry?: string;

  /**
   * application URL in WindowsStore
   */
  windows8?: string;
}

/**
 * @name App Rate
 * @premier app-rate
 * @description
 * The AppRate plugin makes it easy to prompt the user to rate your app, either now, later, or never.
 *
 * Requires Cordova plugin: cordova-plugin-apprate. For more info, please see the [AppRate plugin docs](https://github.com/pushandplay/cordova-plugin-apprate).
 *
 * @usage
 * ```typescript
 * import { AppRate } from '@ionic-native/app-rate/ngx';
 *
 * constructor(private appRate: AppRate) { }
 *
 * ...
 * // set certain preferences
 * this.appRate.preferences.storeAppURL = {
 *   ios: '<app_id>',
 *   android: 'market://details?id=<package_name>',
 *   windows: 'ms-windows-store://review/?ProductId=<store_id>'
 * }
 *
 * this.appRate.promptForRating(true);
 *
 * // or, override the whole preferences object
 * this.appRate.preferences = {
 *   usesUntilPrompt: 3,
 *   storeAppURL: {
 *    ios: '<app_id>',
 *    android: 'market://details?id=<package_name>',
 *    windows: 'ms-windows-store://review/?ProductId=<store_id>'
 *   },
 *   openUrl: this.appRate.preferences.openUrl // @see https://github.com/pushandplay/cordova-plugin-apprate#installation-prerequisites
 * }
 *
 * this.appRate.promptForRating(false);
 * ```
 *
 * @interfaces
 * AppRatePreferences
 * AppUrls
 * AppRateCallbacks
 * AppRateCustomLocal
 *
 */
@Plugin({
  pluginName: 'AppRate',
  plugin: 'cordova-plugin-apprate',
  pluginRef: 'AppRate',
  repo: 'https://github.com/pushandplay/cordova-plugin-apprate',
  platforms: ['Android', 'BlackBerry 10', 'iOS', 'Windows'],
})
@Injectable()
export class AppRate extends IonicNativePlugin {
  /**
   * Configure various settings for the Rating View.
   * See table below for options
   */
  @CordovaProperty()
  preferences: AppRatePreferences;

  /**
   * Prompts the user for rating
   * @param {boolean} immediately  Show the rating prompt immediately.
   */
  @Cordova()
  promptForRating(immediately: boolean): void {}

  /**
   * Immediately send the user to the app store rating page
   */
  @Cordova()
  navigateToAppStore(): void {}
}
