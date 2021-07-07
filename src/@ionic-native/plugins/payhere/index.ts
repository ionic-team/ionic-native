import { Injectable } from '@angular/core';
import { Cordova, IonicNativePlugin, Plugin } from '@ionic-native/core';
@Plugin({
  pluginName: 'PayHere',
  plugin: 'cordova-plugin-payhere',
  pluginRef: 'payhere',
  repo: 'https://github.com/nipuna21018/cordova-plugin-payhere.git',
  platforms: ['iOS', 'android'],
})
@Injectable()
export class PayHere extends IonicNativePlugin {
  /**
   *
   * @param {checkoutRequest} Parameters see [documentation](https://support.payhere.lk/api-&-mobile-sdk/mobile-sdk-for-android)
   * @returns {Promise<any>} Returns a Promise that resolves if the payment completed successfully.
   */
  @Cordova()
  checkout(checkoutRequest: CheckoutRequest): Promise<PHResponse> {
    return;
  }

  /**
   *
   * @param {checkoutRequest} Parameters see [documentation](https://support.payhere.lk/api-&-mobile-sdk/mobile-sdk-for-android)
   * @returns {Promise<any>} Returns a Promise that resolves if the card validated successfully.
   */
  @Cordova()
  preApprove(checkoutRequest: PreApproveRequest): Promise<PHResponse> {
    return;
  }
}

export interface CheckoutRequest {
  sandboxEnabled?: boolean; // set this as true for sandbox environment for testing, default is false
  merchantId: String; // signup at https://payhere.lk to get merchant id
  merchantSecret: String;
  notifyURL: String; // URL to callback the status of the payment (Needs to be a URL accessible on a public IP/domain)
  amount: Number; // amount to charge by the user
  currency: Currency; // Currency code LKR/USD/GBP/EUR/AUD
  orderId: String; // an unique Reference ID
  itemsDescription: String; // Item title or Order/Invoice number
  customer: Customer; // customer details
  billing: Billing; // billing address details
  shipping?: Shipping; // delivery address details
  items: Array<Item>; // ites to get paid
  custom1?: String; // custom parameter 1 to send extra data to server
  custom2?: String; // custom parameter 2 to send extra data to server
}

export interface PreApproveRequest {
  sandboxEnabled?: boolean; // set this as true for sandbox environment for testing, default is false
  merchantId: String; // signup at https://payhere.lk to get merchant id
  merchantSecret: String;
  notifyURL: String; // URL to callback the status of the payment (Needs to be a URL accessible on a public IP/domain)
  currency: Currency; // Currency code LKR/USD/GBP/EUR/AUD
  orderId: String; // an unique Reference ID
  itemsDescription: String; // Item title or Order/Invoice number
  customer: Customer; // customer details
  billing: Billing; // billing address details
  items: Array<Item>; // ites to get paid
  custom1?: String; // custom parameter 1 to send extra data to server
  custom2?: String; // custom parameter 2 to send extra data to server
}

export interface Customer {
  firstName: String;
  lastName?: String;
  email?: String;
  phone?: String;
}

export interface Billing {
  address: String;
  city: String;
  country: String;
}

export interface Shipping {
  address: String;
  city: String;
  country: String;
}

export interface Item {
  id: String;
  name: String;
  quantity: Number;
  amount: Number;
}

export enum Currency {
  LKR = 'LKR',
  USD = 'GBP',
  EUR = 'EUR',
  AUD = 'AUD',
}

export interface PHResponse {
  status: String;
  statusCode: String;
  message: String;
  data?: Object;
}
