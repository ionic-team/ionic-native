import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

/**
 * @deprecated use ATTRIBUTION_NETWORK instead
 *
 * Enum for attribution networks
 * @readonly
 * @enum {Number}
 */
export enum ATTRIBUTION_NETWORKS {
  APPLE_SEARCH_ADS = 0,
  ADJUST = 1,
  APPSFLYER = 2,
  BRANCH = 3,
  TENJIN = 4,
  FACEBOOK = 5,
}

export enum ATTRIBUTION_NETWORK {
  APPLE_SEARCH_ADS = 0,
  ADJUST = 1,
  APPSFLYER = 2,
  BRANCH = 3,
  TENJIN = 4,
  FACEBOOK = 5,
}

export enum PURCHASE_TYPE {
  /**
   * A type of SKU for in-app products.
   */
  INAPP = 'inapp',

  /**
   * A type of SKU for subscriptions.
   */
  SUBS = 'subs',
}

/**
 * Enum for billing features.
 * Currently, these are only relevant for Google Play Android users:
 * https://developer.android.com/reference/com/android/billingclient/api/BillingClient.FeatureType
 */
export enum BILLING_FEATURE {
  /**
   * Purchase/query for subscriptions.
   */
  SUBSCRIPTIONS,

  /**
   * Subscriptions update/replace.
   */
  SUBSCRIPTIONS_UPDATE,

  /**
   * Purchase/query for in-app items on VR.
   */
  IN_APP_ITEMS_ON_VR,

  /**
   * Purchase/query for subscriptions on VR.
   */
  SUBSCRIPTIONS_ON_VR,

  /**
   * Launch a price change confirmation flow.
   */
  PRICE_CHANGE_CONFIRMATION,
}

/**
 * @deprecated use PURCHASE_TYPE instead
 *
 * Enum for attribution networks
 * @readonly
 * @enum {String}
 */
export enum ProductType {
  SUBS = 'subs',
  INAPP = 'inapp',
}

export enum PRORATION_MODE {
  UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY = 0,

  /**
   * Replacement takes effect immediately, and the remaining time will be
   * prorated and credited to the user. This is the current default behavior.
   */
  IMMEDIATE_WITH_TIME_PRORATION = 1,

  /**
   * Replacement takes effect immediately, and the billing cycle remains the
   * same. The price for the remaining period will be charged. This option is
   * only available for subscription upgrade.
   */
  IMMEDIATE_AND_CHARGE_PRORATED_PRICE = 2,

  /**
   * Replacement takes effect immediately, and the new price will be charged on
   * next recurrence time. The billing cycle stays the same.
   */
  IMMEDIATE_WITHOUT_PRORATION = 3,

  /**
   * Replacement takes effect when the old plan expires, and the new price will
   * be charged at the same time.
   */
  DEFERRED = 4,
}

export enum PACKAGE_TYPE {
  /**
   * A package that was defined with a custom identifier.
   */
  UNKNOWN = 'UNKNOWN',

  /**
   * A package that was defined with a custom identifier.
   */
  CUSTOM = 'CUSTOM',

  /**
   * A package configured with the predefined lifetime identifier.
   */
  LIFETIME = 'LIFETIME',

  /**
   * A package configured with the predefined annual identifier.
   */
  ANNUAL = 'ANNUAL',

  /**
   * A package configured with the predefined six month identifier.
   */
  SIX_MONTH = 'SIX_MONTH',

  /**
   * A package configured with the predefined three month identifier.
   */
  THREE_MONTH = 'THREE_MONTH',

  /**
   * A package configured with the predefined two month identifier.
   */
  TWO_MONTH = 'TWO_MONTH',

  /**
   * A package configured with the predefined monthly identifier.
   */
  MONTHLY = 'MONTHLY',

  /**
   * A package configured with the predefined weekly identifier.
   */
  WEEKLY = 'WEEKLY',
}

export enum INTRO_ELIGIBILITY_STATUS {
  /**
   * RevenueCat doesn't have enough information to determine eligibility.
   */
  INTRO_ELIGIBILITY_STATUS_UNKNOWN = 0,
  /**
   * The user is not eligible for a free trial or intro pricing for this product.
   */
  INTRO_ELIGIBILITY_STATUS_INELIGIBLE,
  /**
   * The user is eligible for a free trial or intro pricing for this product.
   */
  INTRO_ELIGIBILITY_STATUS_ELIGIBLE,
}

/**
 * @name Purchases
 * @description
 * Purchases is a cross platform solution for managing in-app subscriptions. A backend is also provided via [RevenueCat](https://www.revenuecat.com)
 *
 * ## Features
 * |     | RevenueCat                                                                                                                                                   |
 * | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
 * | ✅  | Server-side receipt validation                                                                                                                               |
 * | ➡️  | [Webhooks](https://docs.revenuecat.com/docs/webhooks) - enhanced server-to-server communication with events for purchases, renewals, cancellations, and more |
 * | 🎯  | Subscription status tracking - know whether a user is subscribed whether they're on iOS, Android or web                                                      |
 * | 📊  | Analytics - automatic calculation of metrics like conversion, mrr, and churn                                                                                 |
 * | 📝  | [Online documentation](https://docs.revenuecat.com/docs) up to date                                                                                          |
 * | 🔀  | [Integrations](https://www.revenuecat.com/integrations) - over a dozen integrations to easily send purchase data where you need it                           |
 * | 💯  | Well maintained - [frequent releases](https://github.com/RevenueCat/cordova-plugin-purchases/releases)                                                                  |
 * | 📮  | Great support - [Help Center](https://revenuecat.zendesk.com)                                                                                           |
 * | 🤩  | Awesome [new features](https://trello.com/b/RZRnWRbI/revenuecat-product-roadmap)                                                                             |
 *
 * ## Getting Started
 *
 * For more detailed information, you can view our complete documentation at [docs.revenuecat.com](https://docs.revenuecat.com/docs).
 *
 * @usage
 * #### 1. Get a RevenueCat API key
 *
 * Log in to the [RevenueCat dashboard](https://app.revenuecat.com) and obtain a free API key for your application.
 *
 * #### 2. Initialize the SDK
 *
 * You should only configure _Purchases_ once (usually on app launch) as soon as your app has a unique user id for your user. This can be when a user logs in if you have accounts or on launch if you can generate a random user identifier.
 *
 * ```typescript
 *  import { Platform } from "@ionic/angular";
 *  import { Purchases } from "@ionic-native/purchases/ngx";
 *
 *  constructor(public platform: Platform, private purchases: Purchases) {
 *      platform.ready().then(() => {
 *          this.purchases.setDebugLogsEnabled(true); // Enable to get debug logs
 *          this.purchases.setup("my_api_key", "my_app_user_id");
 *      }
 *  }
 * ```
 *
 * #### 3. Quickstart
 * Please follow the [Quickstart Guide](https://docs.revenuecat.com/docs/) for more information on how to use the SDK
 *
 * ### Requirements
 * Requires XCode 11.0+ and minimum target iOS 9.0+
 * This plugin has been tested with cordova-plugin-purchases@
 *
 * @interfaces
 * PurchasesError
 * IntroEligibility
 * UpgradeInfo
 * PurchasesOfferings
 * PurchasesOffering
 * PurchasesPackage
 * PurchasesProduct
 * PurchaserInfo
 * PurchasesEntitlementInfos
 * PurchasesEntitlementInfo
 * PurchasesTransaction
 */
@Plugin({
  pluginName: 'Purchases',
  plugin: 'cordova-plugin-purchases@2.3.0',
  pluginRef: 'Purchases', // the variable reference to call the plugin, example: navigator.geolocation
  repo: 'https://github.com/RevenueCat/cordova-plugin-purchases', // the github repository URL for the plugin
  platforms: ['Android', 'iOS'], // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable({
  providedIn: 'root',
})
export class Purchases extends IonicNativePlugin {
  static ATTRIBUTION_NETWORKS = ATTRIBUTION_NETWORK;
  /**
   * Enum for attribution networks
   * @readonly
   * @enum {Number}
   */
  static ATTRIBUTION_NETWORK = ATTRIBUTION_NETWORK;

  /**
   * Supported SKU types.
   * @readonly
   * @enum {string}
   */
  static PURCHASE_TYPE = PURCHASE_TYPE;

  /**
   * Enum for billing features.
   * Currently, these are only relevant for Google Play Android users:
   * https://developer.android.com/reference/com/android/billingclient/api/BillingClient.FeatureType
   */
  static BILLING_FEATURE = BILLING_FEATURE;

  /**
   * Replace SKU's ProrationMode.
   * @readonly
   * @enum {number}
   */
  static PRORATION_MODE = PRORATION_MODE;

  /**
   * Enumeration of all possible Package types.
   * @readonly
   * @enum {string}
   */
  static PACKAGE_TYPE = PACKAGE_TYPE;

  /**
   * Enum of different possible states for intro price eligibility status.
   * @readonly
   * @enum {number}
   */
  static INTRO_ELIGIBILITY_STATUS = INTRO_ELIGIBILITY_STATUS;

  /**
   * Sets up Purchases with your API key and an app user id.
   * @param {string} apiKey RevenueCat API Key. Needs to be a String
   * @param {string?} appUserID A unique id for identifying the user
   * @param {boolean} observerMode An optional boolean. Set this to TRUE if you have your own IAP implementation and
   * want to use only RevenueCat's backend. Default is FALSE. If you are on Android and setting this to ON, you will have
   * to acknowledge the purchases yourself.
   * @param {string?} userDefaultsSuiteName An optional string. iOS-only, will be ignored for Android.
   * Set this if you would like the RevenueCat SDK to store its preferences in a different NSUserDefaults
   * suite, otherwise it will use standardUserDefaults. Default is null, which will make the SDK use standardUserDefaults.
   */
  @Cordova({ sync: true })
  setup(apiKey: string, appUserID?: string | null, observerMode = false, userDefaultsSuiteName?: string): void {}

  /**
   * Set this to true if you are passing in an appUserID but it is anonymous, this is true by default if you didn't pass an appUserID
   * If a user tries to purchase a product that is active on the current app store account, we will treat it as a restore and alias
   * the new ID with the previous id.
   * @param allowSharing {boolean} true if enabled, false to disabled
   */
  @Cordova({ sync: true })
  setAllowSharingStoreAccount(allowSharing: boolean): void {}

  /**
   * Add a dict of attribution information
   *
   * @deprecated Use the set<NetworkId> functions instead.
   *
   * @param {object} data Attribution data from any of the attribution networks in Purchases.ATTRIBUTION_NETWORKS
   * @param {ATTRIBUTION_NETWORK} network Which network, see Purchases.ATTRIBUTION_NETWORK
   * @param {string?} networkUserId An optional unique id for identifying the user. Needs to be a string.
   */
  @Cordova({ sync: true })
  addAttributionData(data: { [key: string]: any }, network: ATTRIBUTION_NETWORK, networkUserId?: string): void {}

  /**
   * Gets the Offerings configured in the dashboard
   *
   * @return {Promise<PurchasesOfferings>} Will return a [PurchasesError] if the offerings are not properly configured in RevenueCat or if there is another error retrieving them.
   */
  @Cordova()
  getOfferings(): Promise<PurchasesOfferings> {
    return;
  }

  /**
   * Fetch the product info
   * @param {string[]} productIdentifiers Array of product identifiers
   * @param {PURCHASE_TYPE} type Optional type of products to fetch, can be inapp or subs. Subs by default
   *
   * @return {Promise<PurchasesProduct[]>} Will return a [PurchasesError] if the products are not properly configured in RevenueCat or if there is another error retrieving them.
   */
  @Cordova({
    successIndex: 1,
    errorIndex: 2,
  })
  getProducts(productIdentifiers: string[], type: PURCHASE_TYPE = PURCHASE_TYPE.SUBS): Promise<PurchasesProduct[]> {
    return;
  }

  /**
   * @typedef {Object} MakePurchaseResponse
   * @property {string} productIdentifier - The product identifier that has been purchased
   * @property {PurchaserInfo} purchaserInfo - The new PurchaserInfo after the successful purchase
   */

  /**
   * Make a purchase
   *
   * @param {string} productIdentifier The product identifier of the product you want to purchase.
   * @param {UpgradeInfo} upgradeInfo Android only. Optional UpgradeInfo you wish to upgrade from containing the oldSKU
   * and the optional prorationMode.
   * @param {PURCHASE_TYPE} type Optional type of product, can be inapp or subs. Subs by default
   *
   * @return {Promise<MakePurchaseResponse>} A [PurchasesError] is triggered after an error or when the user cancels the purchase.
   * If user cancelled, userCancelled will be true
   */
  @Cordova({
    successIndex: 1,
    errorIndex: 2,
  })
  purchaseProduct(
    productIdentifier: string,
    upgradeInfo?: UpgradeInfo | null,
    type: PURCHASE_TYPE = PURCHASE_TYPE.SUBS
  ): Promise<{ productIdentifier: string; purchaserInfo: PurchaserInfo }> {
    return;
  }

  /**
   * Make a purchase
   *
   * @param {PurchasesPackage} aPackage The Package you wish to purchase. You can get the Packages by calling getOfferings
   * @param {UpgradeInfo} upgradeInfo Android only. Optional UpgradeInfo you wish to upgrade from containing the oldSKU
   * and the optional prorationMode.
   *
   * @return {Promise<MakePurchaseResponse>} A [PurchasesError] is triggered after an error or when the user cancels the purchase.
   * If user cancelled, userCancelled will be true
   */
  @Cordova({
    successIndex: 1,
    errorIndex: 2,
  })
  purchasePackage(
    aPackage: PurchasesPackage,
    upgradeInfo?: UpgradeInfo | null
  ): Promise<{ productIdentifier: string; purchaserInfo: PurchaserInfo }> {
    return;
  }

  /**
   * Restores a user's previous purchases and links their appUserIDs to any user's also using those purchases.
   *
   * @return {Promise<PurchaserInfo>} Errors are of type [PurchasesError]
   */
  @Cordova()
  restoreTransactions(): Promise<PurchaserInfo> {
    return;
  }

  /**
   * Get the appUserID that is currently in placed in the SDK
   *
   * @return {string}
   */
  @Cordova({ sync: true })
  getAppUserID(): string {
    return;
  }

  /**
   * This function will logIn the current user with an appUserID. Typically this would be used after a log in 
   * to identify a user without calling configure.
   * @param {String} appUserID The appUserID that should be linked to the currently user
   * 
   * @return {Promise<LogInResult>} an object that contains the purchaserInfo after logging in, as well as a boolean indicating 
   * whether the user has just been created for the first time in the RevenueCat backend. 
   */
  @Cordova()
  public static logIn(appUserID: string): Promise<LogInResult> { 
    return;
  }

  /**
   * Logs out the Purchases client clearing the saved appUserID. This will generate a random user id and save it in the cache.
   * If the current user is already anonymous, this will produce a PurchasesError.
   * @return {Promise<PurchaserInfo>} new purchaser info after resetting.
   */
  @Cordova()
  public static logOut(): Promise<PurchaserInfo> {
    return;
  }

  /**
   * @deprecated, use logIn instead.
   * This function will alias two appUserIDs together.
   * @param newAppUserID {String} The new appUserID that should be linked to the currently identified appUserID. Needs to be a string.
   *
   * @return {Promise<PurchaserInfo>} Errors are of type [PurchasesError] and get normally triggered if there
   * is an error retrieving the new purchaser info for the new user or if there is an error creating the alias.
   */
  @Cordova()
  createAlias(newAppUserID: string): Promise<PurchaserInfo> {
    return;
  }

  /**
   * @deprecated, use logIn instead.
   * This function will identify the current user with an appUserID. Typically this would be used after a logout to identify a new user without calling configure
   * @param newAppUserID {String} The new appUserID that should be linked to the currently identified appUserID. Needs to be a string.
   *
   * @return {Promise<PurchaserInfo>} Errors are of type [PurchasesError] and get normally triggered if there
   * is an error retrieving the new purchaser info for the new user.
   */
  @Cordova()
  identify(newAppUserID: string): Promise<PurchaserInfo> {
    return;
  }

  /**
   * @deprecated, use logOut instead.
   * Resets the Purchases client clearing the saved appUserID. This will generate a random user id and save it in the cache.
   *
   * @return {Promise<PurchaserInfo>} Errors are of type [PurchasesError] and get normally triggered if there
   * is an error retrieving the new purchaser info for the new user.
   */
  @Cordova()
  reset(): Promise<PurchaserInfo> {
    return;
  }

  /**
   * Gets the current purchaser info. This call will return the cached purchaser info unless the cache is stale, in which case,
   * it will make a network call to retrieve it from the servers.
   *
   * @return {Promise<PurchaserInfo>} Errors are of type [PurchasesError] and get normally triggered if there
   * is an error retrieving the purchaser info.
   */
  @Cordova()
  getPurchaserInfo(): Promise<PurchaserInfo> {
    return;
  }

  /**
   * Returns an observable that can be used to receive updates on the purchaser info
   *
   * @return {Observable<PurchaserInfo>}
   */
  @Cordova({
    eventObservable: true,
    event: 'onPurchaserInfoUpdated',
    element: 'window',
  })
  onPurchaserInfoUpdated(): Observable<PurchaserInfo> {
    return;
  }

  /**
   * Enables/Disables debugs logs
   * @param {boolean} enabled true to enable debug logs, false to disable
   */
  @Cordova({ sync: true })
  setDebugLogsEnabled(enabled: boolean): void {}

  /**
   * iOS only.
   * @param {boolean} simulatesAskToBuyInSandbox Set this property to true *only* when testing the ask-to-buy / SCA purchases flow.
   * More information: http://errors.rev.cat/ask-to-buy
   */
  @Cordova({ sync: true })
  setSimulatesAskToBuyInSandbox(enabled: boolean): void {}

  /**
   * This method will send all the purchases to the RevenueCat backend. Call this when using your own implementation
   * for subscriptions anytime a sync is needed, like after a successful purchase.
   *
   * @warning This function should only be called if you're not calling purchaseProduct.
   */
  @Cordova({ sync: true })
  syncPurchases(): void {}

  /**
   * iOS only. Presents a code redemption sheet, useful for redeeming offer codes
   * Refer to https://docs.revenuecat.com/docs/ios-subscription-offers#offer-codes for more information on how
   * to configure and use offer codes.
   */
  @Cordova({ sync: true })
  presentCodeRedemptionSheet(): void {}

  /**
   * iOS only.
   * @param {Boolean} enabled Set this property to true *only* when testing the ask-to-buy / SCA purchases flow.
   * More information: http://errors.rev.cat/ask-to-buy
   */
  @Cordova({ sync: true })
  setSimulatesAskToBuyInSandbox(enabled: boolean): void {}

  /**
   * Enable automatic collection of Apple Search Ads attribution. Disabled by default.
   * @param {Boolean} enabled Enable or not automatic collection
   */
  @Cordova({ sync: true })
  setAutomaticAppleSearchAdsAttributionCollection(enabled: boolean): void {}

  /**
   * @return {Promise<boolean>} A boolean indicating if the `appUserID` has been generated
   * by RevenueCat or not.
   */
  @Cordova({ sync: true })
  isAnonymous(): boolean {
    return;
  }

  /**
   *  iOS only. Computes whether or not a user is eligible for the introductory pricing period of a given product.
   *  You should use this method to determine whether or not you show the user the normal product price or the
   *  introductory price. This also applies to trials (trials are considered a type of introductory pricing).
   *
   *  @note Subscription groups are automatically collected for determining eligibility. If RevenueCat can't
   *  definitively compute the eligibility, most likely because of missing group information, it will return
   *  `INTRO_ELIGIBILITY_STATUS_UNKNOWN`. The best course of action on unknown status is to display the non-intro
   *  pricing, to not create a misleading situation. To avoid this, make sure you are testing with the latest version of
   *  iOS so that the subscription group can be collected by the SDK. Android always returns INTRO_ELIGIBILITY_STATUS_UNKNOWN.
   *
   *  @param productIdentifiers Array of product identifiers for which you want to compute eligibility
   *  @returns { Promise<Object.<string, IntroEligibility>> } Map of IntroEligibility per productId
   */
  @Cordova()
  checkTrialOrIntroductoryPriceEligibility(
    productIdentifiers: string[]
  ): Promise<{ [productId: string]: IntroEligibility }> {
    return;
  }

  /**
   * Sets a function to be called on purchases initiated on the Apple App Store. This is only used in iOS.
   * @param {ShouldPurchasePromoProductListener} shouldPurchasePromoProductListener Called when a user initiates a
   * promotional in-app purchase from the App Store. If your app is able to handle a purchase at the current time, run
   * the deferredPurchase function. If the app is not in a state to make a purchase: cache the deferredPurchase, then
   * call the deferredPurchase when the app is ready to make the promotional purchase.
   * If the purchase should never be made, you don't need to ever call the deferredPurchase and the app will not
   * proceed with promotional purchases.
   */
  @Cordova({ sync: true })
  addShouldPurchasePromoProductListener(shouldPurchasePromoProductListener: ShouldPurchasePromoProductListener): void {}

  /**
   * Removes a given ShouldPurchasePromoProductListener
   * @param {ShouldPurchasePromoProductListener} listenerToRemove ShouldPurchasePromoProductListener reference of the listener to remove
   * @returns {boolean} True if listener was removed, false otherwise
   */
  @Cordova({ sync: true })
  removeShouldPurchasePromoProductListener(listenerToRemove: ShouldPurchasePromoProductListener): boolean {
    return;
  }

  /**
   * Invalidates the cache for purchaser information.
   *
   * Most apps will not need to use this method; invalidating the cache can leave your app in an invalid state.
   * Refer to https://docs.revenuecat.com/docs/purchaserinfo#section-get-user-information for more information on
   * using the cache properly.
   *
   * This is useful for cases where purchaser information might have been updated outside of the
   * app, like if a promotional subscription is granted through the RevenueCat dashboard.
   */
  @Cordova({ sync: true })
  invalidatePurchaserInfoCache(): void {}

  /**
   * iOS only. Presents a code redemption sheet, useful for redeeming offer codes
   * Refer to https://docs.revenuecat.com/docs/ios-subscription-offers#offer-codes for more information on how
   * to configure and use offer codes.
   */
  @Cordova({ sync: true })
  presentCodeRedemptionSheet(): void {}

  /**
   * Subscriber attributes are useful for storing additional, structured information on a user.
   * Since attributes are writable using a public key they should not be used for
   * managing secure or sensitive information such as subscription status, coins, etc.
   *
   * Key names starting with "$" are reserved names used by RevenueCat. For a full list of key
   * restrictions refer to our guide: https://docs.revenuecat.com/docs/subscriber-attributes
   *
   * @param attributes Map of attributes by key. Set the value as an empty string to delete an attribute.
   */
  @Cordova({ sync: true })
  setAttributes(attributes: { [key: string]: string | null }): void {}

  /**
   * Subscriber attribute associated with the email address for the user
   *
   * @param email Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setEmail(email: string | null): void {}

  /**
   * Subscriber attribute associated with the phone number for the user
   *
   * @param phoneNumber Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setPhoneNumber(phoneNumber: string | null): void {}

  /**
   * Subscriber attribute associated with the display name for the user
   *
   * @param displayName Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setDisplayName(displayName: string | null): void {}

  /**
   * Subscriber attribute associated with the push token for the user
   *
   * @param pushToken Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setPushToken(pushToken: string | null): void {}

  /**
   * Subscriber attribute associated with the install media source for the user
   *
   * @param mediaSource Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setMediaSource(mediaSource: string | null): void {}

  /**
   * Subscriber attribute associated with the install campaign for the user
   *
   * @param campaign Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setCampaign(campaign: string | null): void {}

  /**
   * Subscriber attribute associated with the install ad group for the user
   *
   * @param adGroup Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setAdGroup(adGroup: string | null): void {}

  /**
   * Subscriber attribute associated with the install ad for the user
   *
   * @param ad Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setAd(ad: string | null): void {}

  /**
   * Subscriber attribute associated with the install keyword for the user
   *
   * @param keyword Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setKeyword(keyword: string | null): void {}

  /**
   * Subscriber attribute associated with the install ad creative for the user
   *
   * @param creative Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setCreative(creative: string | null): void {}

  /**
   * Subscriber attribute associated with the Adjust Id for the user
   * Required for the RevenueCat Adjust integration
   *
   * @param adjustID Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setAdjustID(adjustID: string | null): void {}

  /**
   * Subscriber attribute associated with the AppsFlyer Id for the user
   * Required for the RevenueCat AppsFlyer integration
   * @param appsflyerID Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setAppsflyerID(appsflyerID: string | null): void {}

  /**
   * Subscriber attribute associated with the Facebook SDK Anonymous Id for the user
   * Recommended for the RevenueCat Facebook integration
   *
   * @param fbAnonymousID Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setFBAnonymousID(fbAnonymousID: string | null): void {}

  /**
   * Subscriber attribute associated with the mParticle Id for the user
   * Recommended for the RevenueCat mParticle integration
   *
   * @param mparticleID Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setMparticleID(mparticleID: string | null): void {}

  /**
   * Subscriber attribute associated with the OneSignal Player Id for the user
   * Required for the RevenueCat OneSignal integration
   *
   * @param onesignalID Empty String or null will delete the subscriber attribute.
   */
  @Cordova({ sync: true })
  setOnesignalID(onesignalID: string | null): void {}

  /**
   * Automatically collect subscriber attributes associated with the device identifiers.
   * $idfa, $idfv, $ip on iOS
   * $gpsAdId, $androidId, $ip on Android
   */
  @Cordova({ sync: true })
  collectDeviceIdentifiers(): void {}

  /**
   * Check if billing is supported for the current user (meaning IN-APP purchases are supported)
   * and optionally, whether a list of specified feature types are supported.
   *
   * Note: Billing features are only relevant to Google Play Android users.
   * For other stores and platforms, billing features won't be checked.
   * @param feature An array of feature types to check for support. Feature types must be one of
   *       [BILLING_FEATURE]. By default, is an empty list and no specific feature support will be checked.
   * @return {Promise<boolean>} Or [PurchasesError] if there is an error.
   */
  @Cordova()
  canMakePayments(features: BILLING_FEATURE[] = []): Promise<boolean> {
    return;
  }

  /**
   * Set this property to your proxy URL before configuring Purchases *only* if you've received a proxy key value from your RevenueCat contact.
   * @param url Proxy URL as a string.
   */
  @Cordova({ sync: true })
  setProxyURL(url: string): void {}
}

/**
 * @deprecated use PurchasesProduct instead
 */
export interface RCProduct {}

/**
 * @deprecated use PurchaserInfo instead
 */
export interface RCPurchaserInfo {}

/**
 * @deprecated use PurchasesError instead
 */
export interface RCError {}
/**
 * The EntitlementInfo object gives you access to all of the information about the status of a user entitlement.
 */
export interface PurchasesEntitlementInfo {
  /**
   * The entitlement identifier configured in the RevenueCat dashboard
   */
  readonly identifier: string;
  /**
   * True if the user has access to this entitlement
   */
  readonly isActive: boolean;
  /**
   * True if the underlying subscription is set to renew at the end of the billing period (expirationDate).
   * Will always be True if entitlement is for lifetime access.
   */
  readonly willRenew: boolean;
  /**
   * The last period type this entitlement was in. Either: NORMAL, INTRO, TRIAL.
   */
  readonly periodType: string;
  /**
   * The latest purchase or renewal date for the entitlement.
   */
  readonly latestPurchaseDate: string;
  /**
   * The first date this entitlement was purchased.
   */
  readonly originalPurchaseDate: string;
  /**
   * The expiration date for the entitlement, can be `null` for lifetime access. If the `periodType` is `trial`,
   * this is the trial expiration date.
   */
  readonly expirationDate: string | null;
  /**
   * The store where this entitlement was unlocked from. Either: appStore, macAppStore, playStore, stripe,
   * promotional, unknownStore
   */
  readonly store: string;
  /**
   * The product identifier that unlocked this entitlement
   */
  readonly productIdentifier: string;
  /**
   * False if this entitlement is unlocked via a production purchase
   */
  readonly isSandbox: boolean;
  /**
   * The date an unsubscribe was detected. Can be `null`.
   *
   * @note: Entitlement may still be active even if user has unsubscribed. Check the `isActive` property.
   */
  readonly unsubscribeDetectedAt: string | null;
  /**
   * The date a billing issue was detected. Can be `null` if there is no billing issue or an issue has been resolved
   *
   * @note: Entitlement may still be active even if there is a billing issue. Check the `isActive` property.
   */
  readonly billingIssueDetectedAt: string | null;
}

/**
 * Contains all the entitlements associated to the user.
 */
export interface PurchasesEntitlementInfos {
  /**
   * Map of all EntitlementInfo (`PurchasesEntitlementInfo`) objects (active and inactive) keyed by entitlement identifier.
   */
  readonly all: { [key: string]: PurchasesEntitlementInfo };
  /**
   * Map of active EntitlementInfo (`PurchasesEntitlementInfo`) objects keyed by entitlement identifier.
   */
  readonly active: { [key: string]: PurchasesEntitlementInfo };
}

export interface PurchaserInfo {
  /**
   * Entitlements attached to this purchaser info
   */
  readonly entitlements: PurchasesEntitlementInfos;
  /**
   * Set of active subscription skus
   */
  readonly activeSubscriptions: [string];
  /**
   * Set of purchased skus, active and inactive
   */
  readonly allPurchasedProductIdentifiers: [string];
  /**
   * Returns all the non-subscription purchases a user has made.
   * The purchases are ordered by purchase date in ascending order.
   */
  readonly nonSubscriptionTransactions: PurchasesTransaction[];
  /**
   * The latest expiration date of all purchased skus
   */
  readonly latestExpirationDate: string | null;
  /**
   * The date this user was first seen in RevenueCat.
   */
  readonly firstSeen: string;
  /**
   * The original App User Id recorded for this user.
   */
  readonly originalAppUserId: string;
  /**
   * Date when this info was requested
   */
  readonly requestDate: string;
  /**
   * Map of skus to expiration dates
   */
  readonly allExpirationDates: { [key: string]: string | null };
  /**
   * Map of skus to purchase dates
   */
  readonly allPurchaseDates: { [key: string]: string | null };
  /**
   * Returns the version number for the version of the application when the
   * user bought the app. Use this for grandfathering users when migrating
   * to subscriptions.
   *
   * This corresponds to the value of CFBundleVersion (in iOS) in the
   * Info.plist file when the purchase was originally made. This is always null
   * in Android
   */
  readonly originalApplicationVersion: string | null;
  /**
   * Returns the purchase date for the version of the application when the user bought the app.
   * Use this for grandfathering users when migrating to subscriptions.
   */
  readonly originalPurchaseDate: string | null;
  /**
   * URL to manage the active subscription of the user. If this user has an active iOS
   * subscription, this will point to the App Store, if the user has an active Play Store subscription
   * it will point there. If there are no active subscriptions it will be null.
   * If there are multiple for different platforms, it will point to the device store.
   */
  readonly managementURL: string | null;
}

export interface PurchasesTransaction {
  /**
   * RevenueCat Id associated to the transaction.
   */
  readonly revenueCatId: string;
  /**
   * Product Id associated with the transaction.
   */
  readonly productId: string;
  /**
   * Purchase date of the transaction in ISO 8601 format.
   */
  readonly purchaseDate: string;
}

export interface PurchasesProduct {
  /**
   * Product Id.
   */
  readonly identifier: string;
  /**
   * Description of the product.
   */
  readonly description: string;
  /**
   * Title of the product.
   */
  readonly title: string;
  /**
   * Price of the product in the local currency.
   */
  readonly price: number;
  /**
   * Formatted price of the item, including its currency sign, such as €3.99.
   */
  readonly price_string: string;
  /**
   * Currency code for price and original price.
   */
  readonly currency_code: string;
  /**
   * Introductory price of a subscription in the local currency.
   */
  readonly intro_price: number | null;
  /**
   * Formatted introductory price of a subscription, including its currency sign, such as €3.99.
   */
  readonly intro_price_string: string | null;
  /**
   * Billing period of the introductory price, specified in ISO 8601 format.
   */
  readonly intro_price_period: string | null;
  /**
   * Number of subscription billing periods for which the user will be given the introductory price, such as 3.
   */
  readonly intro_price_cycles: number | null;
  /**
   * Unit for the billing period of the introductory price, can be DAY, WEEK, MONTH or YEAR.
   */
  readonly intro_price_period_unit: string | null;
  /**
   * Number of units for the billing period of the introductory price.
   */
  readonly intro_price_period_number_of_units: number | null;
}

/**
 * Contains information about the product available for the user to purchase.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesPackage {
  /**
   * Unique identifier for this package. Can be one a predefined package type or a custom one.
   */
  readonly identifier: string;
  /**
   * Package type for the product. Will be one of [PACKAGE_TYPE].
   */
  readonly packageType: PACKAGE_TYPE;
  /**
   * Product assigned to this package.
   */
  readonly product: PurchasesProduct;
  /**
   * Offering this package belongs to.
   */
  readonly offeringIdentifier: string;
}

/**
 * An offering is a collection of Packages (`PurchasesPackage`) available for the user to purchase.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesOffering {
  /**
   * Unique identifier defined in RevenueCat dashboard.
   */
  readonly identifier: string;
  /**
   * Offering description defined in RevenueCat dashboard.
   */
  readonly serverDescription: string;
  /**
   * Array of `Package` objects available for purchase.
   */
  readonly availablePackages: PurchasesPackage[];
  /**
   * Lifetime package type configured in the RevenueCat dashboard, if available.
   */
  readonly lifetime: PurchasesPackage | null;
  /**
   * Annual package type configured in the RevenueCat dashboard, if available.
   */
  readonly annual: PurchasesPackage | null;
  /**
   * Six month package type configured in the RevenueCat dashboard, if available.
   */
  readonly sixMonth: PurchasesPackage | null;
  /**
   * Three month package type configured in the RevenueCat dashboard, if available.
   */
  readonly threeMonth: PurchasesPackage | null;
  /**
   * Two month package type configured in the RevenueCat dashboard, if available.
   */
  readonly twoMonth: PurchasesPackage | null;
  /**
   * Monthly package type configured in the RevenueCat dashboard, if available.
   */
  readonly monthly: PurchasesPackage | null;
  /**
   * Weekly package type configured in the RevenueCat dashboard, if available.
   */
  readonly weekly: PurchasesPackage | null;
}

/**
 * Contains all the offerings configured in RevenueCat dashboard.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesOfferings {
  /**
   * Map of all Offerings [PurchasesOffering] objects keyed by their identifier.
   */
  readonly all: { [key: string]: PurchasesOffering };
  /**
   * Current offering configured in the RevenueCat dashboard.
   */
  readonly current: PurchasesOffering | null;
}

export interface PurchasesError {
  code: number;
  message: string;
  readableErrorCode: string;
  underlyingErrorMessage?: string;
}

/**
 * Holds the information used when upgrading from another sku. For Android use only.
 */
export interface UpgradeInfo {
  /**
   * The oldSKU to upgrade from.
   */
  readonly oldSKU: string;
  /**
   * The [PRORATION_MODE] to use when upgrading the given oldSKU.
   */
  readonly prorationMode?: PRORATION_MODE;
}

/**
 * Holds the introductory price status
 */
export interface IntroEligibility {
  /**
   * The introductory price eligibility status
   */
  readonly status: INTRO_ELIGIBILITY_STATUS;
  /**
   * Description of the status
   */
  readonly description: string;
}

/**
 * Holds the logIn result
 */
export interface LogInResult {
  /**
   * The Purchaser Info for the user.
   */
  readonly purchaserInfo: PurchaserInfo;
  /**
   * True if the call resulted in a new user getting created in the RevenueCat backend.
   */
  readonly created: boolean;
}

export type ShouldPurchasePromoProductListener = (deferredPurchase: () => void) => void;
