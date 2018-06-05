import { ConversionSchemeEntry } from './conversion-scheme-entry';

export class DataDestination {
  destination: string;
  conversionScheme: ConversionSchemeEntry[];

  constructor(destination = '', conversionScheme = []) {
    this.destination = destination;
    this.conversionScheme = conversionScheme;
  }
}
