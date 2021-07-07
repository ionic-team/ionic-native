import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';

export interface CkoCardTokenRequest {
  /**
   * The card number
   */
  number: string;
  /**
   * The expiry month of the card
   */
  expiry_month: string;
  /**
   * The expiry year of the card
   */
  expiry_year: string;
  /**
   * The card verification value/code. 3 digits, except for Amex (4 digits)
   */
  cvv?: string;
  /**
   * The cardholder's name
   */
  name?: string;
  /**
   * The cardholder's billing address
   */
  billing_address?: Address;
  /**
   * The cardholder's phone number
   */
  phone?: Phone;
}

export interface CkoCardTokenResponse {
  /**
   * The token type
   */
  type: string;
  /**
   * The token value
   */
  token: string;
  /**
   * The expiration datetime of the token
   */
  expires_on: string;
  /**
   * The expiry month of the card
   */
  expiry_month: number;
  /**
   * The expiry year of the card
   */
  expiry_year: number;
  /**
   * The cardholder's name
   */
  name: string;
  /**
   * The card scheme
   */
  scheme: string;
  /**
   * The last 4 digit of the card number
   */
  last4: string;
  /**
   * The bin range of the card
   */
  bin: string;
  /**
   * The card type
   */
  card_type: string;
  /**
   * The card category
   */
  card_category: string;
  /**
   * The card issuer name
   */
  issuer: string;
  /**
   * The card issuer country (two-letter ISO)
   */
  issuer_country: string;
  /**
   * The card product id
   */
  product_id: string;
  /**
   * The card product type
   */
  product_type: string;
  /**
   * The cardholder's billing address
   */
  billing_address: Address;
  /**
   * The cardholder's phone number
   */
  phone: Phone;
}

export interface Address {
  /**
   * The first line of the address
   */
  address_line1?: string;
  /**
   * The second line of the address
   */
  address_line2?: string;
  /**
   * The address city
   */
  city?: string;
  /**
   * The address state
   */
  state?: string;
  /**
   * The address zip/postal code
   */
  zip?: string;
  /**
   * The two-letter ISO country code of the address
   */
  country?: string;
}

export interface Phone {
  /**
   * The international country calling code. Required for some risk checks
   */
  country_code: string;
  /**
   * The phone number
   */
  number: string;
}

/**
 * @name Checkout
 * @description
 * Checkout.com cordova plugin
 *
 * @usage
 * ```typescript
 * import { Checkout } from '@ionic-native/checkout/ngx';
 *
 *
 * constructor(private checkout: Checkout) { }
 *
 * ...
 *
 *
 * this.checkout.initSandboxClient("pk_test_7d395871-0d66-4b62-85b6-8424df78b125")
 *     .then(() => this.label = "CKO init completed")
 *     .catch(err => this.label = err)
 *
 * ...
 *
 * let tokenRequest: CkoCardTokenRequest = {
 *     number: "4543474002249996",
 *     cvv: "010",
 *     expiry_month: "08",
 *     expiry_year: "2025",
 *     billing_address: {
 *       country: "FR"
 *     }
 *   }
 *
 *
 *   this.cko.generateToken(tokenRequest)
 *   .then(tokenResponse => this.label = "Token: " + tokenResponse.token)
 *   .catch(err => this.label = err)
 * ```
 */
@Plugin({
  pluginName: 'Checkout',
  plugin: '@checkout.com/cordova-plugin-checkout',
  pluginRef: 'cordova.plugins.Checkout',
  repo: 'https://github.com/checkout/frames-cordova',
  install: '',
  installVariables: [],
  platforms: ['Android', 'iOS'],
})
@Injectable()
export class Checkout extends IonicNativePlugin {
  /**
   * Initialize Frames plugin in Sandbox mode
   * @param publicKey {string} Merchant's sandbox public key
   * @return {Promise<any>} Returns a promise that resolves when Frames initiation is completed
   */
  @Cordova()
  initSandboxClient(publicKey: string): Promise<any> {
    return;
  }

  /**
   * Initialize Frames plugin in Live mode
   * @param publicKey {string} Merchant's live public key
   * @return {Promise<any>} Returns a promise that resolves when Frames initiation is completed
   */
  @Cordova()
  initLiveClient(publicKey: string): Promise<any> {
    return;
  }

  /**
   * Exchange card details for a reference token that can be used later to request a card payment from your backend. Tokens are single use and expire after 15 minutes.
   * @param ckoCardTokenRequest {CkoCardTokenRequest} Card tokenization request object
   * @return {Promise<CkoCardTokenResponse>} Returns a promise that resolves when Token response object
   */
  @Cordova()
  generateToken(ckoCardTokenRequest: CkoCardTokenRequest): Promise<CkoCardTokenResponse> {
    return;
  }
}
