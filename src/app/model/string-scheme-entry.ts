import { ConversionSchemeEntry } from './conversion-scheme-entry';

export class StringSchemeEntry implements ConversionSchemeEntry {
  dataLogData: string;
  incomingDataKey: string;

  constructor(incomingDataKey = '', dataLogData = '') {
    this.incomingDataKey = incomingDataKey;
    this.dataLogData = dataLogData;
  }
}
