import { Injectable } from '@angular/core';
import { Cordova, CordovaProperty, IonicNativePlugin, Plugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

/* Available status of device */
export type Status =
  | 'scanStarted'
  | 'scanStopped'
  | 'scanResult'
  | 'connected'
  | 'disconnected'
  | 'bonding'
  | 'bonded'
  | 'unbonded'
  | 'closed'
  | 'services'
  | 'discovered'
  | 'characteristics'
  | 'descriptors'
  | 'read'
  | 'subscribed'
  | 'unsubscribed'
  | 'subscribedResult'
  | 'written'
  | 'readDescriptor'
  | 'writeDescriptor'
  | 'rssi'
  | 'mtu'
  | 'connectionPriorityRequested'
  | 'enabled'
  | 'disabled'
  | 'readRequested'
  | 'writeRequested'
  | 'mtuChanged'
  | 'notifyReady'
  | 'notifySent'
  | 'serviceAdded'
  | 'serviceRemoved'
  | 'allServicesRemoved'
  | 'advertisingStarted'
  | 'advertisingStopped'
  | 'responded'
  | 'notified';

/** Available connection priorities */
export type ConnectionPriority = 'low' | 'balanced' | 'high';

export interface Params {
  /** The address/identifier provided by the scan's return object */
  address: string;
  /** The service's ID */
  service: string;
}

export interface InitPeripheralParams {
  /** Should user be prompted to enable Bluetooth */
  request?: boolean;
  /* A unique string to identify your app. Bluetooth Central background mode is required to use this, but background mode doesn't seem to require specifying the restoreKey */
  restoreKey?: string;
}

export interface InitParams extends InitPeripheralParams {
  /** Should change in Bluetooth status notifications be sent */
  statusReceiver?: boolean;
}

export interface ScanParams {
  /* An array of service IDs to filter the scan or empty array / null. This parameter is not supported on Windows platform yet */
  services?: string[];
  /* True/false to allow duplicate advertisement packets, defaults to false (iOS)*/
  allowDuplicates?: boolean;
  /** Defaults to Low Power. Available from API21 / API 23 (Android) */
  scanMode?: BluetoothScanMode;
  /** Defaults to Aggressive. Available from API23 (Android) */
  matchMode?: BluetoothMatchMode;
  /** Defaults to One Advertisement. Available from API23 (Android) */
  matchNum?: BluetoothMatchNum;
  /** Defaults to All Matches. Available from API21 / API 23. (Android) */
  callbackType?: BluetoothCallbackType;
  /** True/false to show only connectable devices, rather than all devices ever seen, defaults to false (Windows) */
  isConnectable?: boolean;
}

export interface NotifyParams {
  /** Service's UUID */
  service: string;
  /** Characteristic's UUID */
  characteristic: string;
  /** Base64 encoded string, number or string */
  value: string;
}

export interface RespondParams {
  /** This integer value will be incremented every read/writeRequested */
  requestId: number;
  /** base64 string */
  value: string;
  /** not documented */
  offset?: number;
}

export interface ConnectionParams {
  /** The address/identifier provided by the scan's return object */
  address: string;
  /** Automatically connect as soon as the remote device becomes available (Android) */
  autoConnect?: boolean;
  /**
   * Transport mode. Available from API 23 (Android).
   * If none is specified the default behavior is TRANSPORT_AUTO
   *
   * Note: On Android 10, TRANSPORT_AUTO can lead to connection errors with Status code 133.
   * In this case TRANSPORT_LE can be used.
   */
  transport?: AndroidGattTransportMode;
}

export enum AndroidGattTransportMode {
  /**
   * No preference of physical transport for GATT connections to remote dual-mode devices
   */
  TRANSPORT_AUTO = 0,

  /**
   * Prefer BR/EDR transport for GATT connections to remote dual-mode devices
   */
  TRANSPORT_BREDR = 1,

  /**
   * Prefer LE transport for GATT connections to remote dual-mode devices
   */
  TRANSPORT_LE = 2,
}

export interface CharacteristicParams extends Params {
  /** An array of characteristic IDs to discover or empty array / null */
  characteristics?: string[];
}

export interface DescriptorParams extends Params {
  /** The characteristic's ID */
  characteristic: string;
}

export interface OperationDescriptorParams extends DescriptorParams {
  /** The descriptor's ID */
  descriptor: string;
}

export interface WriteCharacteristicParams extends DescriptorParams {
  /* Base64 encoded string */
  value: string;
  /* Set to "noResponse" to enable write without response, all other values will write normally. */
  type?: string;
}

export interface WriteDescriptorParams extends DescriptorParams {
  /** The descriptor's ID */
  descriptor: string;
  /** Base64 encoded string, number or string */
  value: string;
}

export type AdvertisingParams = AdvertisingParamsAndroid | AdvertisingParamsIOS;
export type AdvertiseMode = 'balanced' | 'lowLatency' | 'lowPower';
export type TxPowerLevel = 'high' | 'low' | 'ultralow' | 'medium';

export interface AdvertisingParamsAndroid {
  /** Service UUID on Android */
  service: string;
  /** not documented */
  mode?: AdvertiseMode;
  /** not documented */
  connectable?: boolean;
  /** not documented */
  timeout?: number;
  /** not documented */
  txPowerLevel?: TxPowerLevel;
  /** not documented */
  manufacturerId?: number;
  /** not documented */
  manufacturerSpecificData?: any;
  /** not documented */
  includeDeviceName: boolean;
  /** not documented */
  includeTxPowerLevel: boolean;
}

export interface AdvertisingParamsIOS {
  /** Array of service UUIDs on iOS */
  services: string[];
  /** device's name */
  name?: string;
}

export interface CommonInfo {
  /** The device's display name */
  name: string;
  /** The device's address / identifier for connecting to the object */
  address: string;
}

export interface DeviceInfo extends CommonInfo {
  /** Device's status */
  status: Status;
}

export interface RSSI extends DeviceInfo {
  /** signal strength */
  rssi: number;
}

export interface MTU extends DeviceInfo {
  /* mtu value */
  mtu: number;
}

export interface BondedStatus extends CommonInfo {
  /* Bonded status*/
  isBonded: boolean;
}

export interface PrevConnectionStatus extends CommonInfo {
  /** Determine whether the device was connected */
  wasConnected: boolean;
}

export interface CurrConnectionStatus extends CommonInfo {
  /** Determine whether the device is connected */
  isConnected: boolean;
}

export interface DiscoverStatus extends CommonInfo {
  /** Determine whether the device's characteristics and descriptors have been discovered */
  isDiscovered: boolean;
}

export interface ScanStatus extends DeviceInfo {
  /** signal strength */
  rssi: number;
  /**
   * advertisement data in encoded string of bytes, use bluetoothle.encodedStringToBytes() (Android)
   * advertisement hash with the keys (iOS)
   * empty (Windows)
   */
  advertisement:
    | {
        /** An array of service UUIDs */
        serviceUuids: string[];
        /** A string representing the name of the manufacturer of the device */
        manufacturerData: string;
        /** A number containing the transmit power of a peripheral */
        txPowerLevel: number;
        /** An array of one or more CBUUID objects, representing CBService UUIDs that were found in the “overflow” area of the advertisement data */
        overflowServiceUuids: string[];
        /** A boolean value that indicates whether the advertising event type is connectable */
        isConnectable: boolean;
        /** An array of one or more CBUUID objects, representing CBService UUIDs */
        solicitedServiceUuids: string[];
        /* A dictionary containing service-specific advertisement data */
        serviceData: any;
        /* A string containing the local name of a peripheral */
        localName: string;
      }
    | string;
}

export interface Service {
  /** Service's uuid */
  uuid: string;
  /** Array of characteristics */
  characteristics: Characteristic[];
}

export interface Characteristic {
  /* Array of descriptors */
  descriptors?: Descriptor[];
  /**  Characteristic's uuid */
  uuid: string;
  /**
   *  Characteristic's properties
   *  If the property is defined as a key, the characteristic has that property
   */
  properties?: {
    write?: boolean;
    broadcast?: boolean;
    extendedProps?: boolean;
    writeWithoutResponse?: boolean;
    writeNoResponse?: boolean;
    signedWrite?: boolean;
    read?: boolean;
    notify?: boolean;
    indicate?: boolean;
    authenticatedSignedWrites?: boolean;
    notifyEncryptionRequired?: boolean;
    indicateEncryptionRequired?: boolean;
  };
  /**
   *  If the permission is defined as a key, the character has that permission
   */
  permissions?: {
    read?: boolean;
    readEncrypted?: boolean;
    readEncryptedMITM?: boolean;
    write?: boolean;
    writeSigned?: boolean;
    writeSignedMITM?: boolean;
    writeEncryptedMITM?: boolean;
    readEncryptionRequired?: boolean;
    writeEncryptionRequired?: boolean;
  };
}

export interface Descriptor {
  uuid: string;
}

export interface Device extends DeviceInfo {
  /** Device's services */
  services: Service[];
}

export interface Services extends DeviceInfo {
  /** Array of service UUIDS */
  services: string[];
}

export interface Descriptors extends DeviceInfo {
  /** Characteristic's UUID */
  characteristic: string;
  /** Service's UUID */
  service: string;
  /* Array of descriptor UUIDs */
  descriptors: string[];
}

export interface OperationResult extends DeviceInfo {
  /** Characteristic UUID */
  characteristic: string;
  /** Service's UUID */
  service: string;
  /** Base64 encoded string of bytes */
  value: string;
}

export interface UnsubscribeResult extends DeviceInfo {
  /** Characteristic UUID */
  characteristic: string;
  /** Service's UUID */
  service: string;
}

export interface DescriptorResult extends OperationResult {
  descriptor: string;
}

export interface Characteristics extends DeviceInfo {
  /** Service's id */
  service: string;
  /* Array of characteristic objects*/
  characteristics: Characteristic[];
}

export interface InitializeResult {
  /** Device's status */
  status: Status;
  /** The address/identifier provided by the scan's return object */
  address: string;
  /** Service's UUID */
  service: string;
  /** Characteristic UUID */
  characteristic: string;
  /** This integer value will be incremented every read/writeRequested */
  requestId: number;
  /** Offset value */
  offset: number;
  /** mtu value */
  mtu: number;
  /** Base64 encoded string of bytes */
  value: string;
}

export enum BluetoothScanMode {
  SCAN_MODE_OPPORTUNISTIC = -1,
  SCAN_MODE_LOW_POWER = 0,
  SCAN_MODE_BALANCED = 1,
  SCAN_MODE_LOW_LATENCY = 2,
}

export enum BluetoothMatchMode {
  MATCH_MODE_AGRESSIVE = 1,
  MATCH_MODE_STICKY = 2,
}

export enum BluetoothMatchNum {
  MATCH_NUM_ONE_ADVERTISEMENT = 1,
  MATCH_NUM_FEW_ADVERTISEMENT = 2,
  MATCH_NUM_MAX_ADVERTISEMENT = 3,
}

export enum BluetoothCallbackType {
  CALLBACK_TYPE_ALL_MATCHES = 1,
  CALLBACK_TYPE_FIRST_MATCH = 2,
  CALLBACK_TYPE_MATCH_LOST = 4,
}

export interface Error {
  code: number;
  message: string;
}

export interface AdapterInfo {
  name: string;
  address: string;
  isInitialized: boolean;
  isEnabled: boolean;
  isScanning: boolean;
  isDiscoverable: boolean;
}

/**
 * @name BluetoothLE
 * @description
 * This plugin has the most complete implementation for interacting with Bluetooth LE devices on Android, iOS and partially Windows.
 * It's a wrap around [randdusing/cordova-plugin-bluetoothle](https://github.com/randdusing/cordova-plugin-bluetoothle/blob/master/readme.md) cordova plugin for Ionic.
 * It supports peripheral **and** central modes and covers most of the API methods available on Android and iOS.
 *
 * @usage
 * ```typescript
 * import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
 *
 *
 * constructor(public bluetoothle: BluetoothLE, public plt: Platform) {
 *
 *  this.plt.ready().then((readySource) => {
 *
 *    console.log('Platform ready from', readySource);
 *
 *    this.bluetoothle.initialize().then(ble => {
 *      console.log('ble', ble.status) // logs 'enabled'
 *    });
 *
 *   });
 * }
 *
 * ```
 *
 */
@Plugin({
  pluginName: 'BluetoothLE',
  plugin: 'cordova-plugin-bluetoothle', // npm package name, example: cordova-plugin-camera
  pluginRef: 'bluetoothle', // the variable reference to call the plugin, example: navigator.geolocation
  repo: 'https://github.com/randdusing/cordova-plugin-bluetoothle', // the github repository URL for the plugin
  install: 'ionic cordova plugin add cordova-plugin-bluetoothle', // OPTIONAL install command, in case the plugin requires variables
  installVariables: [], // OPTIONAL the plugin requires variables
  platforms: ['Android', 'iOS'], // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable()
export class BluetoothLE extends IonicNativePlugin {
  /**
   * @name initialize
   * Initialize Bluetooth on the device
   * @param {InitParams} [params]
   * @returns {(Observable<{ status: 'enabled' | 'disabled'}>)} The callback that is passed initialize status (enabled/disabled)
   */
  @Cordova({ successIndex: 0, errorIndex: 2, observable: true })
  initialize(params?: InitParams): Observable<{ status: 'enabled' | 'disabled' }> {
    return;
  }

  /**
   * @name enable (Android)
   * Enable Bluetooth on the device. Android support only
   * @returns void
   */
  @Cordova({ callbackOrder: 'reverse', sync: true })
  enable() {
    return;
  }

  /**
   * @name disable (Android)
   * Disable Bluetooth on the device. Android support only
   * @returns void
   */
  @Cordova({ callbackOrder: 'reverse', sync: true })
  disable() {
    return;
  }

  /**
   * @name getAdapterInfo (Android)
   * Retrieve useful information such as the address, name, and various states (initialized, enabled, scanning, discoverable).
   * This can be very useful when the general state of the adapter has been lost, and we would otherwise need to go through a series of callbacks to get the correct state (first initialized, then enabled, then isScanning, and so forth).
   * The result of this method allows us to take business logic decisions while avoiding a large part of the callback hell.
   * Currently the discoverable state does not have any relevance because there is no "setDiscoverable" functionality in place. That may change in the future.
   * @returns {Promise<AdapterInfo>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  getAdapterInfo(): Promise<AdapterInfo> {
    return;
  }

  /**
   * @name startScan
   * Scan for Bluetooth LE devices.
   * Since scanning is expensive, stop as soon as possible. The Cordova app should use a timer to limit the scan interval.
   * Android API >= 23 requires ACCESS_COARSE_LOCATION permissions to find unpaired devices.
   * Permissions can be requested by using the hasPermission and requestPermission functions.
   * Android API >= 23 also requires location services to be enabled. Use isLocationEnabled to determine whether location services are enabled.
   * If not enabled, use requestLocation to prompt the location services settings page.
   * @param {ScanParams} params Scan params
   * @returns {(Observable< ScanStatus >)}
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  startScan(params: ScanParams): Observable<ScanStatus> {
    return;
  }

  /**
   * @name stopScan
   * Stop scan for Bluetooth LE devices. Since scanning is expensive, stop as soon as possible
   * The app should use a timer to limit the scanning time.
   * @returns {Promise<{status: 'scanStopped'}>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  stopScan(): Promise<{ status: 'scanStopped' }> {
    return;
  }

  /**
   * @name retrieveConnected
   * Retrieved paired Bluetooth LE devices. In iOS, devices that are "paired" to will not return during a normal scan.
   * Callback is "instant" compared to a scan.
   * @param {{ services: string[] }} An array of service IDs to filter the retrieval by. If no service IDs are specified, no devices will be returned.
   * @returns {Promise<{ devices: DeviceInfo[] }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  retrieveConnected(params?: { services?: string[] }): Promise<{ devices: DeviceInfo[] }> {
    return;
  }

  /**
   * @name bond (Android)
   * Bond with a device.
   * The device doesn't need to be connected to initiate bonding. Android support only.
   * @param {{ address: string }} params The address/identifier provided by the scan's return object
   * @returns {(Observable<{ status: DeviceInfo }>)}
   * success:
   *    The first success callback should always return with status == bonding.
   *    If the bond is created, the callback will return again with status == bonded.
   *    If the bonding popup is canceled or the wrong code is entered, the callback will return again with status == unbonded.
   * error:
   *    The callback that will be triggered when the bond operation fails
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  bond(params: { address: string }): Observable<DeviceInfo> {
    return;
  }

  /**
   * @name unbond (Android)
   * Unbond with a device. The device doesn't need to be connected to initiate bonding. Android support only.
   * @param {{address: string}} params The address/identifier
   * @returns {Promise<{ status: DeviceInfo }>}
   *    success: The success callback should always return with status == unbonded, that is passed with device object
   *    error: The callback that will be triggered when the unbond operation fails
   */
  @Cordova({ callbackOrder: 'reverse' })
  unbond(params: { address: string }): Promise<DeviceInfo> {
    return;
  }

  /**
   * @name connect
   * Connect to a Bluetooth LE device
   * @param connectSuccess The success callback that is passed with device object
   * @param connectError   The callback that will be triggered when the connect operation fails
   * @param params         The connection params
   *
   * @param {ConnectionParams} params
   * @returns {(Observable<{ status: DeviceInfo }>)}
   *    success: device object with status
   *    error: The callback that will be triggered when the unbond operation fails
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  connect(params: ConnectionParams): Observable<DeviceInfo> {
    return;
  }

  /**
   * @name reconnect
   * Reconnect to a previously connected Bluetooth device
   * @param {{address: string}} params The address/identifier
   * @returns {(Observable<DeviceInfo>)}
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  reconnect(params: { address: string }): Observable<DeviceInfo> {
    return;
  }

  /**
   * @name disconnect
   * Disconnect from a Bluetooth LE device.
   *              Note: It's simpler to just call close(). Starting with iOS 10, disconnecting before closing seems required!
   * @param {{address: string}} params The address/identifier
   * @returns {Promise<DeviceInfo>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  disconnect(params: { address: string }): Promise<DeviceInfo> {
    return;
  }

  /**
   * @name close
   * Close/dispose a Bluetooth LE device.
   * Prior to 2.7.0, you needed to disconnect to the device before closing, but this is no longer the case.
   * Starting with iOS 10, disconnecting before closing seems required!
   * @param {{ address: string }} params The address/identifier
   * @returns {Promise<DeviceInfo>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  close(params: { address: string }): Promise<DeviceInfo> {
    return;
  }

  /**
   * @name discover
   * Discover all the devices services, characteristics and descriptors.
   * Doesn't need to be called again after disconnecting and then reconnecting.
   * If using iOS, you shouldn't use discover and services/characteristics/descriptors on the same device.
   * There seems to be an issue with calling discover on iOS8 devices, so use with caution.
   * On some Android versions, the discovered services may be cached for a device.
   * Subsequent discover events will make use of this cache.
   * If your device's services change, set the clearCache parameter to force Android to re-discover services.
   * @param {{ address: string, clearCache: boolean }} params The address/identifier
   * @returns {Promise<Device>}
   *    success: device object (contains array of service objects)
   *    error: The callback that will be triggered when the unbond operation fails
   */
  @Cordova({ callbackOrder: 'reverse' })
  discover(params: { address: string; clearCache?: boolean }): Promise<Device> {
    return;
  }

  /**
   * @name services (iOS)
   * Discover the device's services.
   * Not providing an array of services will return all services and take longer to discover. iOS support only.
   * @param {{address: string, services: string[]}} params
   * @returns {Promise<Services>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  services(params: { address: string; services?: string[] }): Promise<Services> {
    return;
  }

  /**
   * @name characteristics (iOS)
   * Discover the service's characteristics.
   * Not providing an array of characteristics will return all characteristics and take longer to discover. iOS support only.
   * @param {CharacteristicParams} params Characteristic params
   * @returns {Promise<{ characteristics: Characteristics }>} The service id and an Array of characteristics
   */
  @Cordova({ callbackOrder: 'reverse' })
  characteristics(params: CharacteristicParams): Promise<{ characteristics: Characteristics }> {
    return;
  }

  /**
   * @name descriptors (iOS)
   * Discover the characteristic's descriptors. iOS support only.
   * @param {DescriptorParams} params
   * @returns {Promise<{ descriptors: Descriptors }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  descriptors(params: DescriptorParams): Promise<{ descriptors: Descriptors }> {
    return;
  }

  /**
   * @name read
   * Read a particular service's characteristic once
   * @param {DescriptorParams} params
   * @returns {Promise<OperationResult>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  read(params: DescriptorParams): Promise<OperationResult> {
    return;
  }

  /**
   * @name subscribe
   * Subscribe to a particular service's characteristic.
   * Once a subscription is no longer needed, execute unsubscribe in a similar fashion.
   * The Client Configuration descriptor will automatically be written to enable notification/indication based on the characteristic's properties.
   * @param {DescriptorParams} params
   * @returns {Observable<OperationResult>}
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  subscribe(params: DescriptorParams): Observable<OperationResult> {
    return;
  }

  /**
   * @name unsubscribe
   * Unsubscribe to a particular service's characteristic.
   * @param {DescriptorParams} params
   * @returns {Promise<UnsubscribeResult>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  unsubscribe(params: DescriptorParams): Promise<UnsubscribeResult> {
    return;
  }

  /**
   * @name write (limitation on iOS, read below)
   * Write a particular service's characteristic
   * Note: no callback will occur on write without response on iOS.
   * @param {WriteCharacteristicParams} params
   * @returns {Promise<OperationResult>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  write(params: WriteCharacteristicParams): Promise<OperationResult> {
    return;
  }

  /**
   * @name write (limitation on iOS, read below)
   * Write Quick / Queue, use this method to quickly execute write without response commands when writing more than 20 bytes at a time.
   * Note: no callback will occur on write without response on iOS.
   * @param {WriteCharacteristicParams} params
   * @returns {Promise<OperationResult>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  writeQ(params: WriteCharacteristicParams): Promise<OperationResult> {
    return;
  }

  /**
   * @name readDescriptor
   * Read a particular characterist's descriptor
   * @param {OperationDescriptorParams} params
   * @returns {Promise<DescriptorResult>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  readDescriptor(params: OperationDescriptorParams): Promise<DescriptorResult> {
    return;
  }

  /**
   * @name writeDescriptor
   * Write a particular characteristic's descriptor. Unable to write characteristic configuration directly to keep in line with iOS implementation.
   * Instead use subscribe/unsubscribe, which will automatically enable/disable notification.
   * @param {WriteDescriptorParams} params
   * @returns {Promise<DescriptorResult>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  writeDescriptor(params: WriteDescriptorParams): Promise<DescriptorResult> {
    return;
  }

  /**
   * @name rssi
   * Read RSSI of a connected device. RSSI is also returned with scanning.
   * @param {{ address: string }} params
   * @returns {Promise< RSSI >}
   */
  @Cordova({ callbackOrder: 'reverse' })
  rssi(params: { address: string }): Promise<RSSI> {
    return;
  }

  /**
   * @name mtu (Android, Android 5+)
   * Set MTU of a connected device. Android only.
   * @param {{ address: string, mtu: number }} params
   * @returns {Promise< MTU >}
   */
  @Cordova({ callbackOrder: 'reverse' })
  mtu(params: { address: string; mtu?: number }): Promise<MTU> {
    return;
  }

  /**
   * @name requestConnectionPriority (Android, Android 5+)
   * Request a change in the connection priority to improve throughput when transfer large amounts of data via BLE.
   * Android support only. iOS will return error.
   * @param {{ address: string, connectionPriority: ConnectionPriority }} params
   * @returns {Promise<DeviceInfo>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  requestConnectionPriority(params: { address: string; connectionPriority: ConnectionPriority }): Promise<DeviceInfo> {
    return;
  }

  /**
   * @name isInitialized
   * Determine whether the adapter is initialized. No error callback. Returns true or false
   * @returns {Promise<{ isInitialized: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isInitialized(): Promise<{ isInitialized: boolean }> {
    return;
  }

  /**
   * @name isEnabled
   * Determine whether the adapter is enabled. No error callback
   * @returns {Promise<{ isEnabled: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isEnabled(): Promise<{ isEnabled: boolean }> {
    return;
  }

  /**
   * @name isScanning
   * Determine whether the adapter is scanning. No error callback. Returns true or false
   * @returns {Promise<{ isScanning: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isScanning(): Promise<{ isScanning: boolean }> {
    return;
  }

  /**
   * @name isBonded (Android)
   * Determine whether the device is bonded or not, or error if not initialized. Android support only.
   * @param {{ address: string }} params
   * @returns {Promise<BondedStatus>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isBonded(params: { address: string }): Promise<BondedStatus> {
    return;
  }

  /**
   * @name wasConnected
   * Determine whether the device was connected, or error if not initialized.
   * @param {{ address: string }} params
   * @returns {Promise<PrevConnectionStatus>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  wasConnected(params: { address: string }): Promise<PrevConnectionStatus> {
    return;
  }

  /**
   * @name isConnected
   * Determine whether the device is connected, or error if not initialized or never connected to device
   * @param {{ address: string }} params
   * @returns {Promise<CurrConnectionStatus>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isConnected(params: { address: string }): Promise<CurrConnectionStatus> {
    return;
  }

  /**
   * @name isDiscovered
   * Determine whether the device's characteristics and descriptors have been discovered, or error if not initialized or not connected to device.
   * @param {{ address: string }} params
   * @returns {Promise<DiscoverStatus>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isDiscovered(params: { address: string }): Promise<DiscoverStatus> {
    return;
  }

  /**
   * @name hasPermission (useful only for Android 6+ / API 23)
   * Determine whether coarse location privileges are granted since scanning for unpaired devices requires it in Android API 23
   * @returns {Promise<{ hasPermission: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  hasPermission(): Promise<{ hasPermission: boolean }> {
    return;
  }

  /**
   * @name requestPermission (useful only for Android 6+ / API 23)
   * Request coarse location privileges since scanning for unpaired devices requires it in Android API 23.
   * Will return an error if called on iOS or Android versions prior to 6.0.
   * @returns {Promise<{ requestPermission: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  requestPermission(): Promise<{ requestPermission: boolean }> {
    return;
  }

  /**
   * @name isLocationEnabled (useful only for Android 6+ / API 23)
   * Determine if location services are enabled or not. Location Services are required to find devices in Android API 23
   * @returns {Promise<{ isLocationEnabled: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isLocationEnabled(): Promise<{ isLocationEnabled: boolean }> {
    return;
  }

  /**
   * @name requestLocation (useful only for Android 6+ / API 23)
   * Prompt location services settings pages. requestLocation property returns whether location services are enabled or disabled.
   * Location Services are required to find devices in Android API 23.
   * @returns {Promise<{ requestLocation: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  requestLocation(): Promise<{ requestLocation: boolean }> {
    return;
  }

  /**
   * @name initializePeripheral
   * Initialize Bluetooth on the device. Must be called before anything else.
   * Callback will continuously be used whenever Bluetooth is enabled or disabled.
   * @param {InitPeripheralParams} [params]
   * @returns {Observable<InitializeResult>}
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  initializePeripheral(params?: InitPeripheralParams): Observable<InitializeResult> {
    return;
  }

  /**
   * @name addService
   * Add a service with characteristics and descriptors. If more than one service is added, add them sequentially
   * @param {{ service: string, characteristics: Characteristic[] }} params
   * @returns {Promise<{ service: string, status: Status }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  addService(params: {
    service: string;
    characteristics: Characteristic[];
  }): Promise<{ service: string; status: Status }> {
    return;
  }

  /**
   * @name removeService
   * Remove a service
   * @param {{ service: string }} params
   * @returns {Promise<{ service: string, status: Status }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  removeService(params: { service: string }): Promise<{ service: string; status: Status }> {
    return;
  }

  /**
   * @name removeAllServices
   * Remove all services
   * @returns {Promise<{ status: Status }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  removeAllServices(): Promise<{ status: Status }> {
    return;
  }

  /**
   * @name startAdvertising (different behavior on Android/iOS, read below)
   * Start advertising as a BLE device.
   * Note: This needs to be improved so services can be used for both Android and iOS.
   * On iOS, the advertising devices likes to rename itself back to the name of the device, i.e. Rand' iPhone
   * @param {AdvertisingParams} params
   * @returns {Promise<{ status: Status }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  startAdvertising(params: AdvertisingParams): Promise<{ status: Status }> {
    return;
  }

  /**
   * @name stopAdvertising
   * Stop advertising
   * @returns {Promise<{ status: Status }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  stopAdvertising(): Promise<{ status: Status }> {
    return;
  }

  /**
   * @name isAdvertising
   * Determine if app is advertising or not.
   * @returns {Promise<{ status: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  isAdvertising(): Promise<{ status: boolean }> {
    return;
  }

  /**
   * @name respond
   * Respond to a read or write request
   * @param {RespondParams} params
   * @returns {Promise<{ status: Status }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  respond(params: RespondParams): Promise<{ status: Status }> {
    return;
  }

  /**
   * @name notify
   * Update a value for a subscription. Currently all subscribed devices will receive update.
   * Device specific updates will be added in the future.
   * If sent equals false in the return value, you must wait for the peripheralManagerIsReadyToUpdateSubscribers event before sending more updates.
   * @param {NotifyParams} params
   * @returns {Promise<{ status: Status, sent: boolean }>}
   */
  @Cordova({ callbackOrder: 'reverse' })
  notify(params: NotifyParams): Promise<{ status: Status; sent: boolean }> {
    return;
  }

  /**
   * @name encodedStringToBytes
   * Helper function to convert a base64 encoded string from a characteristic or descriptor value into a uint8Array object
   * @param {string} str
   * @returns {Uint8Array}
   */
  @Cordova({ sync: true })
  encodedStringToBytes(value: string): Uint8Array {
    return;
  }

  /**
   * @name bytesToEncodedString
   * Helper function to convert a unit8Array to a base64 encoded string for a characteric or descriptor write
   * @param {Uint8Array} bytes
   * @returns {string}
   */
  @Cordova({ sync: true })
  bytesToEncodedString(value: Uint8Array): string {
    return;
  }

  /**
   * @name stringToBytes
   * Helper function to convert a string to bytes
   * @param {string} value
   * @returns {Uint8Array}
   */
  @Cordova({ sync: true })
  stringToBytes(value: string): Uint8Array {
    return;
  }

  /**
   * @name bytesToString
   * Helper function to convert bytes to a string.
   * @param {Uint8Array} value
   * @returns {string}
   */
  @Cordova({ sync: true })
  bytesToString(value: Uint8Array): string {
    return;
  }

  @CordovaProperty()
  SCAN_MODE_OPPORTUNISTIC: number;
  @CordovaProperty()
  SCAN_MODE_LOW_POWER: number;
  @CordovaProperty()
  SCAN_MODE_BALANCED: number;
  @CordovaProperty()
  SCAN_MODE_LOW_LATENCY: number;
  @CordovaProperty()
  MATCH_MODE_AGGRESSIVE: number;
  @CordovaProperty()
  MATCH_MODE_STICKY: number;
  @CordovaProperty()
  MATCH_NUM_ONE_ADVERTISEMENT: number;
  @CordovaProperty()
  MATCH_NUM_FEW_ADVERTISEMENT: number;
  @CordovaProperty()
  MATCH_NUM_MAX_ADVERTISEMENT: number;
  @CordovaProperty()
  CALLBACK_TYPE_ALL_MATCHES: number;
  @CordovaProperty()
  CALLBACK_TYPE_FIRST_MATCH: number;
  @CordovaProperty()
  CALLBACK_TYPE_MATCH_LOST: number;
}
