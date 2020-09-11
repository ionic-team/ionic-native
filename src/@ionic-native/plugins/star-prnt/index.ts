import { Injectable } from '@angular/core';
import { Cordova, IonicNativePlugin, Plugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

export interface Printer {
  /**
   * Printer model name and model number
   */
  modelName?: string;

  /**
   * Printer Mac Address
   */
  macAddress?: string;

  /**
   * Printer port name used to create a new port instance of SMPort or StarIOExtManager
   */
  portName?: string;
  /**
   * USB Serial Number (USB Printers Only)
   */
  USBSerialNumber?: string;
}
/**
 * Array of Printer objects returned by the portDiscovery() function
 */
export interface Printers extends Array<Printer> {}

export interface PrinterStatus {
  /**
   * Printer Online/Offline status
   */
  offline?: boolean;

  /**
   *  Printer model name and model number
   */
  ModelName?: string;

  /**
   * Printer cover status
   */
  coverOpen?: boolean;

  /**
   * Printer Paper Cutter status
   */
  cutterError?: boolean;

  /**
   * Printer Paper status
   */
  receiptPaperEmpty?: boolean;

  /**
   * Printer Firmware information
   */
  FirmwareVersion?: string;
}

export interface PrintObj {
  /**
   * string containing the text to print, Example: "Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n"
   */
  text: string;

  /**
   *  Sends a PartialCutWithFeed command to the printer, defaults to true
   */
  cutReceipt?: boolean;

  /**
   * sends a appendPeripheral command to the printer for channels No1 and No2 - Defaults to true
   */
  openCashDrawer?: boolean;
}
export interface RasterObj extends PrintObj {
  /**
   * Font size number, defaults to 25
   */
  fontSize?: number;

  /**
   * Paper width (Units: Dots). 2 inches: 384, 3 inches: 576, 4 inches: 832, ESCPos 3 inches: 512, Dot 3 inches: 210. Defaults to 576
   */
  paperWidth?: number;
}
export interface ImageObj {
  /**
   * Image URI to print, this can be obtained via the camera or photo library or as a static resource saved on the phone memory
   */
  uri: string;

  /**
   * Image width (Units: Dots) defaults to 576
   */
  paperWidth?: number;

  /**
   *  Sends a PartialCutWithFeed command to the printer, defaults to true
   */
  cutReceipt?: boolean;

  /**
   * sends a appendPeripheral command to the printer for channels No1 and No2 - Defaults to true
   */
  openCashDrawer?: boolean;
}
export interface PrintCommand {
  /**
   * Characther encoding is used to getByte data from all subsequent commands. Default 'US-ASCII'
   * Choose the format of the return value Defined in StarPRNT.Encoding or the Encoding enum.
   * Example: {appendEncoding:'US-ASCII'}
   */
  appendEncoding?: string;

  /**
   * Select command of the code page is generated and added to the commands property.
   * Choose the format of the return value Defined in StarPRNT.CodePageType or the CodePageType enum.
   * Example: {appendCodePage:'CP858'}
   */
  appendCodePage?: string;

  /**
   * Data (Text) is added to the command buffer. Example: {append:"Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n"}
   */
  append?: string;

  /**
   * Data (Text) is added to the command buffer. Example: {appendRaw:"Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n"}
   */
  appendRaw?: string;

  /**
   * Data (Command) is added to the command buffer. Takes an array of bytes.
   * Example: {appendBytes:[0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x2e]}
   */
  appendBytes?: number[];

  /**
   * Data (Command) is added to the command buffer. Takes an array of bytes.
   * Example: {appendRawBytes:[0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x2e]}
   */
  appendRawBytes?: number[];

  /**
   * Set command of the character space is generated and added to the command buffer. Character Spacs (Unit: Dots) Example: 4
   */
  appendCharacterSpace?: number;

  /**
   *  Select command of the emphasis mode is generated and added to the command buffer. Example: {appendEmphasis:"SALE\n"}
   */
  appendEmphasis?: string;

  /**
   *  Enable emphasis mode is generated and added to the command buffer. Example: {enableEmphasis:true}
   */
  enableEmphasis?: boolean;

  /**
   *  Select command of the invert mode is generated and added to the command buffer. Example: {appendInvert:"Refunds and Exchanges\n"}
   */
  appendInvert?: string;
  /**
   *  Enable invert mode is generated and added to the command buffer. Example: {enableInvert:true}
   */
  enableInvert?: boolean;
  /**
   *  Select command of the under line mode is generated and added to the command buffer. Example: {appendUnderline:"30 days"}
   */
  appendUnderline?: string;
  /**
   *  Enable under line mode is generated and added to the command buffer. Example: {enableUnderline:true}
   */
  enableUnderline?: boolean;

  /**
   * Select command of the international character mode is generated and added to the command buffer.
   * Choose the format of the return value Defined in StarPRNT.InternationalType or the InternationalType enum.
   * 'UK' | 'USA' | 'France' | 'Germany' | 'Denmark' | 'Sweden' | 'Italy' | 'Spain' | 'Japan' | 'Norway' | 'Denmark2' | 'Spain2' | 'LatinAmerica' | 'Korea' | 'Ireland' | 'Legal'
   * Example {appendInternational:InternationalType.UK}
   */
  appendInternational?: string;

  /**
   * Line feed command is generated and added to the command buffer. Paper feed units (Units: Lines) Example: 2
   */
  appendLineFeed?: number;

  /**
   * Unit feed command is generated and added to the command buffer. Paper feed units (Units: Dots) Example: 64
   */
  appendUnitFeed?: number;

  /**
   * Set command of the line space is generated and added to the command buffer. Line spaces (Units: Dots) Example: 32
   */
  appendLineSpace?: number;

  /**
   * Select command of the font style is generated and added to the command buffer.
   * Choose the format of the return value defined in StarPRNT.FontStyleType or the FontStyleType enum. 'A' | 'B'
   * Example: {appendFontStyle:FontStyleType.A}
   */
  appendFontStyle?: string;

  /**
   * Paper cut command is generated and added to the command buffer.
   * Choose the format of the return value defined in StarPRNT.CutPaperAction or the CutPaperAction enum. 'FullCut' | 'FullCutWithFeed' | 'PartialCut' | 'PartialCutWithFeed'
   * Example: {appendCutPaper:CutPaperAction.PartialCutWithFeed}
   */
  appendCutPaper?: string;

  /**
   * Black mark command is generated and added to the command buffer.
   * Choose the format of the return value defined in StarPRNT.BlackMarkType or the BlackMarkType enum. 'Valid' | 'Invalid' | 'ValidWithDetection'
   * Example: {appendBlackMark: BlackMarkType.Valid}
   */
  appendBlackMark?: string;

  /**
   * Absolute position command is generated and added to the command buffer. (Unit: Dots). Send in conjunction with the data property to append absolute position just to that string
   * Example1: Append data with Absolute position {appendAbsolutePosition:40, data: "Text with absolute position"}
   * Example2: Append absolute position to subsequent commands: {appendAbsolutePosition:40}
   */
  appendAbsolutePosition?: number;

  /**
   * Alignment command is generated and added to the command buffer. Send in conjunction with the data property to append alignment position just to that string
   * Choose the format of the return value defined in StarPRNT.AlignmentPosition or the AlignmentPosition enum. 'Left' | 'Center' | 'Right'.
   * Example1 Append data with Alignment position: {appendAlignment:AlignmentPosition.Center, data: "Text with centered position"}
   * Example2 Append absolute position to subsequent commands: {appendAlignment:AlignmentPosition.Center}
   */
  appendAlignment?: string;

  /**
   * Horizontal tab set/clear command is generated and added to the command buffer. (Only works for certain printer models, check the starSDK documentation for details)
   * Array of horizontal tab positions (Units: ANK character pitch). Specifying empty array deletes all currently set horizontal tab positions.
   * Example: {appendHorizontalTabPosition:[15, 35]}
   * Delete positions Example: {appendHorizontalTabPosition:[]}
   */
  appendHorizontalTabPosition?: number[];

  /**
   * Print command of the logo is generated and added to the command buffer. The logo has to be uploaded to the printer using the Star Print utility.
   * Send in conjuction with the logoSize property to set the logo size
   * Example: {appendLogo:1}
   * Example with LogoSize: {appendLogo:1, logoSize:LogoSize.DoubleWidthDoubleHeight}
   */
  appendLogo?: number;

  /**
   * Property to be used with the appendLogo command.
   * Choose the format of the return value defined in StarPRNT.LogoSize or the LogoSize enum. 'Normal' | 'DoubleWidth' | 'DoubleHeight' | 'DoubleWidthDoubleHeight';
   * Example: {appendLogo:1, logoSize:LogoSize.DoubleWidthDoubleHeight}
   */
  logoSize?: string;

  /**
   * Print command of the barcode is generated and added to the command buffer.
   * Additional Properties: BarcodeSymbology, BarcodeWidth, height, hri, absolutePosition, alignment.
   * Example: {appendBarcode:"{BStar", BarcodeSymbology:BarcodeSymbology.Code128, BarcodeWidth:BarcodeWidth.Mode2, height:40, hri:true }
   * Example with absolutePosition: {appendBarcode:"{BStar", BarcodeSymbology:BarcodeSymbology.Code128, BarcodeWidth:BarcodeWidth.Mode2, height:40, hri:true, absolutePosition:40 }
   * Example with alignment:{appendBarcode:"{BStar", BarcodeSymbology:BarcodeSymbology.Code128, BarcodeWidth:BarcodeWidth.Mode2, height:40, hri:true, alignment:alignment:AlignmentPosition.Center }
   */
  appendBarcode?: string;

  /**
   * Property to be used with the appendBarcode command.
   * Choose the format of the return value defined in StarPRNT.BarcodeSymbology or the BarcodeSymbology enum.
   * 'Code128' | 'Code39' | 'Code93' | 'ITF' | 'JAN8' | 'JAN13' | 'NW7' | 'UPCA' | 'UPCE' |
   * Example: {appendBarcode:'{BStar', BarcodeSymbology:BarcodeSymbology.Code128}
   */
  BarcodeSymbology?: string;

  /**
   * Property to be used with the appendBarcode command.
   * Choose the format of the return value defined in StarPRNT.BarcodeWidth or the BarcodeWidth enum.
   * Mode1 | Mode2 | Mode3 | Mode4 | Mode5 | Mode6 | Mode7 | Mode8 | Mode9
   * Example: {appendBarcode:'{BStar', BarcodeWidth:BarcodeWidth.Mode2}
   */
  BarcodeWidth?: string;

  /**
   * Property to be used with the appendBarcode command.
   * Under-bar characters. true = Valid, false = Invalid
   * Example: {appendBarcode:'{BStar', hri:true}
   */
  hri?: boolean;

  /**
   * Property to be used with the appendBarcode command or the appendMultiple command (Units:Dots)
   * appendBarcode Example: {appendBarcode:'{BStar', height:40}
   * appendMultiple: {appendMultiple:'text to print', height:40}
   */
  height?: number;

  /**
   * Property to be used with the appendBitmap command or the appendMultiple command (Units:Dots)
   * appendBitmap Example: {appendBitmap:uri, width:576}
   * appendMultiple: {appendMultiple:'text to print', width:40}
   */
  width?: number;

  /**
   * Property to be used with the appendBitmap command, the appendBarcode command, or the appendQrCode command (Units:Dots)
   * appendBitmap Example: {appendBitmap:uri, absolutePosition:40}.
   * appendBarcode Example: {appendBarcode:'{BStar', absolutePosition:40}.
   * appendQrCode Example: {appendQrCode:'{BStar', absolutePosition:40}.
   */
  absolutePosition?: number;

  /**
   * Property to be used with the appendBitmap command, the appendBarcode command, or the appendQrCode command (Units:Dots)
   * Choose the format of the return value defined in StarPRNT.AlignmentPosition or the AlignmentPosition enum. 'Left' | 'Center' | 'Right'.
   * appendBitmap Example: {appendBitmap:uri, alignment:AlignmentPosition.Center}.
   * appendBarcode Example: {appendBarcode:'{BStar', alignment:AlignmentPosition.Center}.
   * appendQrCode Example: {appendQrCode:'{BStar', alignment:AlignmentPosition.Center}.
   */
  alignment?: string;

  /**
   * Select command of the multiple mode is generated and added to the command buffer.
   * Additional properties: width:number, height:number
   * Example: {appendMultiple:"   $156.95\n", width:2, height:2}.
   */
  appendMultiple?: string;

  /**
   * Enable multiple mode is generated and added to the command buffer.
   * Additional properties: width:number, height:number
   * Example: {enableMultiple:true, width:2, height:2}
   * Disable Example: {enableMultiple:false}
   */
  enableMultiple?: boolean;

  /**
   * Print command of the QR code is generated and added to the command buffer.
   * Additional Properties: QrCodeModel, QrCodeLevel, cell, absolutePosition, alignment.
   * Example: {appendQrCode:"{BStar", QrCodeModel:"No2", QrCodeLevel:"L", cell: 8}.
   * Example with absolutePosition: {appendQrCode:"{BStar", QrCodeModel:"No2", QrCodeLevel:"L", cell: 8, absolutePosition: 40 }.
   * Example with alignment: {appendQrCode:"{BStar", QrCodeModel:"No2", QrCodeLevel:"L", cell: 8, alignment:"Center" }.
   */
  appendQrCode?: string;

  /**
   * Property to be used with the appendQrCode command.
   * Choose the format of the return value defined in StarPRNT.QrCodeModel or the QrCodeModel enum. 'No1' | 'No2' Default 'No2'
   * Example: {appendQrCode:'{BStar', QrCodeModel:QrCodeModel.No1}
   */
  QrCodeModel?: string;

  /**
   * Property to be used with the appendQrCode command.
   * Choose the format of the return value defined in StarPRNT.QrCodeLevel or the QrCodeLevel enum. 'No1' | 'No2'. Default 'H'
   * Example: {appendQrCode:'{BStar', QrCodeLevel:QrCodeLevel.H}
   */
  QrCodeLevel?: string;

  /**
   * Property to be used with the appendQrCode command. QRCode Cell size. Default 4.
   * Example: {appendQrCode:'{BStar', cell:8}
   */
  cell?: number;

  /**
   * Print command of the bitmap is generated and added to the command buffer. Takes a string image URI
   * this can be obtained via the camera or photo library or as a static resource saved on the phone memory.
   * Additional Properties: diffusion, width, bothScale, rotation, absolutePosition, alignment.
   * Example: {appendBitmap:uri, diffusion: true, width:576, bothScale: true}
   * Example with absolutePosition: {appendBitmap:uri, diffusion: true, width:576, bothScale: true, absolutePosition: 40 }.
   * Example with alignment: {appendBitmap:uri, diffusion: true, width:576, bothScale: true, alignment:"Center" }.
   */
  appendBitmap?: string;

  /**
   * Property to be used with the appendBitmap command. Random dither: true = Valid, false = Invalid. Default true.
   * Example: {appendBitmap:uri, diffusion: false }
   */
  diffusion?: boolean;

  /**
   * Property to be used with the appendBitmap command. Height is changed according to the conversion rate of the width property.
   * true = Valid, false = Invalid. Default true.
   * Example: {appendBitmap:uri, bothScale: true }
   */
  bothScale?: boolean;

  /**
   * Property to be used with the appendBitmap command.
   * Choose the format of the return value defined in StarPRNT.BitmapConverterRotation or the BitmapConverterRotation enum.
   * 'Normal' | 'Left90' | 'Right90' | 'Rotate180'
   * Example: {appendBitmap:uri, rotation: BitmapConverterRotation.Left90 }
   */
  rotation?: string;

  /**
   * sends a appendPeripheral command to the printer for channel number: Example: 1 = No1, 2 = No2
   */
  openCashDrawer?: number;
}

/**
 * Emulation constants
 */
export enum Emulation {
  /** mPOP, SM-L200, SM-L300, SM-S210i, SM-S220i, SM-S230i, SM-T300i/T300, SM-T400i */
  StarPRNT = 'StarPRNT',
  /** SM-L200, SM-L300 */
  StarPRNTL = 'StarPRNTL',
  /** FVP10, TSP650II, TSP700II, TSP800II */
  StarLine = 'StarLine',
  /** TSP100 */
  StarGraphic = 'StarGraphic',
  /** BSC10 */
  EscPos = 'EscPos',
  /** SM-S210i, SM-S220i, SM-S230i, SM-T300i/T300, SM-T400i */
  EscPosMobile = 'EscPosMobile',
  /** SP700 */
  StarDotImpact = 'StarDotImpact',
}

/**
 * Encoding constants
 */
export enum Encoding {
  /** English */
  USASCII = 'US-ASCII',
  /** French, German, Portuguese, Spanish */
  Windows1252 = 'Windows-1252',
  /** Japanese */
  ShiftJIS = 'Shift-JIS',
  /** Russian */
  Windows1251 = 'Windows-1251',
  /** Simplified Chinese */
  GB2312 = 'GB2312',
  /** Traditional Chinese */
  Big5 = 'Big5',
  /** UFT8 */
  UTF8 = 'UTF-8',
}

/**
 * CodePageType constants
 */
export enum CodePageType {
  CP737 = 'CP737',
  CP772 = 'CP772',
  CP774 = 'CP774',
  CP851 = 'CP851',
  CP852 = 'CP852',
  CP855 = 'CP855',
  CP857 = 'CP857',
  CP858 = 'CP858',
  CP860 = 'CP860',
  CP861 = 'CP861',
  CP862 = 'CP862',
  CP863 = 'CP863',
  CP864 = 'CP864',
  CP865 = 'CP865',
  CP869 = 'CP869',
  CP874 = 'CP874',
  CP928 = 'CP928',
  CP932 = 'CP932',
  CP999 = 'CP999',
  CP1001 = 'CP1001',
  CP1250 = 'CP1250',
  CP1251 = 'CP1251',
  CP1252 = 'CP1252',
  CP2001 = 'CP2001',
  CP3001 = 'CP3001',
  CP3002 = 'CP3002',
  CP3011 = 'CP3011',
  CP3012 = 'CP3012',
  CP3021 = 'CP3021',
  CP3041 = 'CP3041',
  CP3840 = 'CP3840',
  CP3841 = 'CP3841',
  CP3843 = 'CP3843',
  CP3845 = 'CP3845',
  CP3846 = 'CP3846',
  CP3847 = 'CP3847',
  CP3848 = 'CP3848',
  UTF8 = 'UTF8',
  Blank = 'Blank',
}

/**
 * InternationalType constants
 */
export enum InternationalType {
  UK = 'UK',
  USA = 'USA',
  France = 'France',
  Germany = 'Germany',
  Denmark = 'Denmark',
  Sweden = 'Sweden',
  Italy = 'Italy',
  Spain = 'Spain',
  Japan = 'Japan',
  Norway = 'Norway',
  Denmark2 = 'Denmark2',
  Spain2 = 'Spain2',
  LatinAmerica = 'LatinAmerica',
  Korea = 'Korea',
  Ireland = 'Ireland',
  Legal = 'Legal',
}

/**
 * FontStyleType constants.
 */
export enum FontStyleType {
  /** Font-A (12 x 24 dots) / Specify 7 x 9 font (half dots) */
  A = 'A',
  /** Font-B (9 x 24 dots) / Specify 5 x 9 font (2P-1) */
  B = 'B',
}

/**
 * CutPaperAction constants.
 */
export enum CutPaperAction {
  FullCut = 'FullCut',
  FullCutWithFeed = 'FullCutWithFeed',
  PartialCut = 'PartialCut',
  PartialCutWithFeed = 'PartialCutWithFeed',
}

/**
 * BlackMarkType constants.
 */
export enum BlackMarkType {
  Valid = 'Valid',
  Invalid = 'Invalid',
  ValidWithDetection = 'ValidWithDetection',
}

/**
 * LogoSize constants
 */
export enum LogoSize {
  Normal = 'Normal',
  DoubleWidth = 'DoubleWidth',
  DoubleHeight = 'DoubleHeight',
  DoubleWidthDoubleHeight = 'DoubleWidthDoubleHeight',
}

/**
 * AlignmentPosition constants
 */
export enum AlignmentPosition {
  Left = 'Left',
  Center = 'Center',
  Right = 'Right',
}

/**
 * BarcodeSymbology constants
 */
export enum BarcodeSymbology {
  Code128 = 'Code128',
  Code39 = 'Code39',
  Code93 = 'Code93',
  ITF = 'ITF',
  JAN8 = 'JAN8',
  JAN13 = 'JAN13',
  NW7 = 'NW7',
  UPCA = 'UPCA',
  UPCE = 'UPCE',
}

/**
 * BarcodeWidth constants
 */
export enum BarcodeWidth {
  Mode1 = 'Mode1',
  Mode2 = 'Mode2',
  Mode3 = 'Mode3',
  Mode4 = 'Mode4',
  Mode5 = 'Mode5',
  Mode6 = 'Mode6',
  Mode7 = 'Mode7',
  Mode8 = 'Mode8',
  Mode9 = 'Mode9',
}

/**
 * QrCodeModel constants
 */
export enum QrCodeModel {
  No1 = 'No1',
  No2 = 'No2',
}

/**
 * QrCodeLevel constants
 */
export enum QrCodeLevel {
  H = 'H',
  L = 'L',
  M = 'M',
  Q = 'Q',
}

/**
 * BitmapConverterRotation constants
 */
export enum BitmapConverterRotation {
  Normal = 'Normal',
  Left90 = 'Left90',
  Right90 = 'Right90',
  Rotate180 = 'Rotate180',
}

/**
 * Push a new PrintCommand object to the array for a separate instruction to the printer. Example [{append:"text"}, {"openCashDrawer: 1"}]
 */
export interface CommandsArray extends Array<PrintCommand> {}

/**
 * @name StarPRNT
 * @description
 * * Ionic Native wrappers for the starprnt cordova plugin for Star Micronics Bluetooth/LAN printers
 *
 * @usage
 * ```typescript
 * import { StarPRNT } from '@ionic-native/star-prnt/ngx';
 *
 *
 * constructor(private starprnt: StarPRNT) { }
 *
 * ...
 *
 *
 * this.starprnt.portDiscovery('All')
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
@Plugin({
  pluginName: 'StarPRNT',
  plugin: 'cordova-plugin-starprnt', // npm package name, example: cordova-plugin-camera
  pluginRef: 'starprnt', // the variable reference to call the plugin, example: navigator.geolocation
  repo: 'https://github.com/auctifera-josed/starprnt', // the github repository URL for the plugin
  platforms: ['Android', 'iOS'], // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable()
export class StarPRNT extends IonicNativePlugin {
  /**
   * Constant for Emulation
   */
  Emulation = {
    StarPRNT: 'StarPRNT',
    StarPRNTL: 'StarPRNTL',
    StarLine: 'StarLine',
    StarGraphic: 'StarGraphic',
    EscPos: 'EscPos',
    EscPosMobile: 'EscPosMobile',
    StarDotImpact: 'StarDotImpact',
  };

  /**
   * Constant for possible Encoding
   */
  Encoding = {
    USASCII: 'US-ASCII',
    Windows1252: 'Windows-1252',
    ShiftJIS: 'Shift-JIS',
    Windows1251: 'Windows-1251',
    GB2312: 'GB2312',
    Big5: 'Big5',
    UTF8: 'UTF-8',
  };

  /**
   * CodePageType constants
   */
  CodePageType = {
    CP737: 'CP737',
    CP772: 'CP772',
    CP774: 'CP774',
    CP851: 'CP851',
    CP852: 'CP852',
    CP855: 'CP855',
    CP857: 'CP857',
    CP858: 'CP858',
    CP860: 'CP860',
    CP861: 'CP861',
    CP862: 'CP862',
    CP863: 'CP863',
    CP864: 'CP864',
    CP865: 'CP865',
    CP869: 'CP869',
    CP874: 'CP874',
    CP928: 'CP928',
    CP932: 'CP932',
    CP999: 'CP999',
    CP1001: 'CP1001',
    CP1250: 'CP1250',
    CP1251: 'CP1251',
    CP1252: 'CP1252',
    CP2001: 'CP2001',
    CP3001: 'CP3001',
    CP3002: 'CP3002',
    CP3011: 'CP3011',
    CP3012: 'CP3012',
    CP3021: 'CP3021',
    CP3041: 'CP3041',
    CP3840: 'CP3840',
    CP3841: 'CP3841',
    CP3843: 'CP3843',
    CP3845: 'CP3845',
    CP3846: 'CP3846',
    CP3847: 'CP3847',
    CP3848: 'CP3848',
    UTF8: 'UTF8',
    Blank: 'Blank',
  };

  /**
   * Constant for possible InternationalType
   */
  InternationalType = {
    UK: 'UK',
    USA: 'USA',
    France: 'France',
    Germany: 'Germany',
    Denmark: 'Denmark',
    Sweden: 'Sweden',
    Italy: 'Italy',
    Spain: 'Spain',
    Japan: 'Japan',
    Norway: 'Norway',
    Denmark2: 'Denmark2',
    Spain2: 'Spain2',
    LatinAmerica: 'LatinAmerica',
    Korea: 'Korea',
    Ireland: 'Ireland',
    Legal: 'Legal',
  };

  /**
   * Constant for possible FontStyleType
   */
  FontStyleType = {
    /** Font-A (12 x 24 dots) / Specify 7 x 9 font (half dots) */
    A: 'A',
    /** Font-B (9 x 24 dots) / Specify 5 x 9 font (2P-1) */
    B: 'B',
  };

  /**
   * Constant for possible CutPaperAction
   */
  CutPaperAction = {
    FullCut: 'FullCut',
    FullCutWithFeed: 'FullCutWithFeed',
    PartialCut: 'PartialCut',
    PartialCutWithFeed: 'PartialCutWithFeed',
  };

  /**
   * Constant for possible BlackMarkType
   */
  BlackMarkType = {
    Valid: 'Valid',
    Invalid: 'Invalid',
    ValidWithDetection: 'ValidWithDetection',
  };

  /**
   * Constant for possible AlignmentPosition
   */
  AlignmentPosition = {
    Left: 'Left',
    Center: 'Center',
    Right: 'Right',
  };

  /**
   * Constant for possible LogoSize
   */
  LogoSize = {
    Normal: 'Normal',
    DoubleWidth: 'DoubleWidth',
    DoubleHeight: 'DoubleHeight',
    DoubleWidthDoubleHeight: 'DoubleWidthDoubleHeight',
  };

  /**
   * Constant for possible BarcodeSymbology
   */
  BarcodeSymbology = {
    Code128: 'Code128',
    Code39: 'Code39',
    Code93: 'Code93',
    ITF: 'ITF',
    JAN8: 'JAN8',
    JAN13: 'JAN13',
    NW7: 'NW7',
    UPCA: 'UPCA',
    UPCE: 'UPCE',
  };

  /**
   * Constant for possible BarcodeWidth
   */
  BarcodeWidth = {
    Mode1: 'Mode1',
    Mode2: 'Mode2',
    Mode3: 'Mode3',
    Mode4: 'Mode4',
    Mode5: 'Mode5',
    Mode6: 'Mode6',
    Mode7: 'Mode7',
    Mode8: 'Mode8',
    Mode9: 'Mode9',
  };

  /**
   * Constant for possible QrCodeModel
   */
  QrCodeModel = {
    No1: 'No1',
    No2: 'No2',
  };

  /**
   * Constant for possible QrCodeLevel
   */
  QrCodeLevel = {
    H: 'H',
    L: 'L',
    M: 'M',
    Q: 'Q',
  };

  /**
   * Constant for possible BitmapConverterRotation
   */
  BitmapConverterRotation = {
    Normal: 'Normal',
    Left90: 'Left90',
    Right90: 'Right90',
    Rotate180: 'Rotate180',
  };

  /**
   * Find available printers
   * @param {string} type  Interface Type: All, LAN, Bluetooth, USB
   * @return {Promise<Printers>} Returns a promise that resolves with an array of printers
   */
  @Cordova()
  portDiscovery(type: string): Promise<Printers> {
    return;
  }

  /**
   * Checks the status of the printer
   * @param {string} port  Printer name i.e BT:StarMicronics
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @return {Promise<PrinterStatus>} Returns a promise that resolves with the PrinterStatus object
   */
  @Cordova()
  checkStatus(port: string, emulation: string): Promise<PrinterStatus> {
    return;
  }

  /**
   * Prints plain text
   * @param {string} port  Printer name i.e BT:StarMicronics. Send null to use a printer connected via StarIOExtManager using the connect() function
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @param {PrintObj} printObj  text:string, cutReceipt?:boolean, openCashDrawer?:boolean
   * @return {Promise<any>} Success! if printed correctly or error message string returned by the SDK.
   */
  @Cordova()
  printRawText(port: string, emulation: string, printObj: PrintObj): Promise<any> {
    return;
  }

  /**
   * Converts the text into a bitmap image and sends it to the printer
   * @param {string} port  Printer name i.e BT:StarMicronics.  Send null to use a printer connected via StarIOExtManager using the connect() function
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @param {RasterObj} rasterObj  text:string, cutReceipt?:boolean, openCashDrawer?:boolean, fontSize:number, paperWidth:number
   * @return {Promise<any>} Success! if printed correctly or error message string returned by the SDK.
   */
  @Cordova()
  printRasterReceipt(port: string, emulation: string, rasterObj: RasterObj): Promise<any> {
    return;
  }

  /**
   * Gets an image from a string URI and converts it to bitmap to send it to the printer
   * @param {string} port Printer name i.e BT:StarMicronics.  Send null to use a printer connected via StarIOExtManager using the connect() function
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @param {ImageObj} imageObj  uri:string, paperWidth?:number, cutReceipt?:boolean, openCashDrawer?:boolean
   * @return {Promise<any>} Success! if printed correctly or error message string returned by the SDK.
   */
  @Cordova()
  printImage(port: string, emulation: string, imageObj: ImageObj): Promise<any> {
    return;
  }

  /**
   * sends an appendPeripheral command to the printer for channels No1 and No2
   * @param {string} port  Printer name i.e BT:StarMicronics.  Send null to use a printer connected via StarIOExtManager using the connect() function
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @return {Promise<any>} Success! if opened or error message string returned by the SDK.
   */
  @Cordova()
  openCashDrawer(port: string, emulation: string): Promise<any> {
    return;
  }

  /**
   * Sends an Array of commands to the command buffer using the Android ICommandBuilderInterface or iOS ISCBBuilderInterface
   * @param {string} port  Printer name i.e BT:StarMicronics.  Send null to use a printer connected via StarIOExtManager using the connect() function
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @param {CommandsArray} commandsArray  each command in the array should be an instance of the PrintCommand object. Example [{append:"text"}, {"openCashDrawer: 1"}]
   * @return {Promise<any>} Success! if printed correctly or error message string returned by the SDK.
   */
  @Cordova()
  print(port: string, emulation: string, commandsArray: CommandsArray): Promise<any> {
    return;
  }

  /**
   * Allows you to connect to the printer, keep the connection alive and receive status updates through an observable
   * @param {string} port  printer name i.e BT:StarMicronics.
   * @param {string} emulation  StarPrinter Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
   * @return {Observable<any>} Success! if connected or error message string returned by the SDK.
   */
  @Cordova({
    observable: true,
    callbackStyle: 'node',
  })
  connect(port: string, emulation: string, hasBarcodeReader: boolean): Observable<any> {
    return;
  }

  /**
   * Returns an observable with the device status events. Only fires when a printer is connnected through the connect() function
   * @return {Observable<any>} dataType: printerOnline, printerOffline, printerImpossible, printerPaperEmpty, printerPaperNearEmpty, printerPaperReady, printerCoverOpen, printerCoverClose, cashDrawerOpen, cashDrawerClose
   */
  @Cordova({
    eventObservable: true,
    event: 'starPrntData',
  })
  getStatus(): Observable<any> {
    return;
  }

  /**
   * Allows to disconnect (close the connection to the peripherals), this is useful to avoid keeping alive a connection when not in the app to save device battery
   * (energy consumption). You should call this function when the app is paused or closed.
   * @return {Promise<any>} Success! if connected or error message string returned by the SDK.
   */
  @Cordova()
  disconnect(): Promise<any> {
    return;
  }
}
