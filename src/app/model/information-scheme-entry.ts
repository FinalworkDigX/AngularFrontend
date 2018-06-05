import { ConversionSchemeEntry } from './conversion-scheme-entry';
import { InformationConversionDto } from '../dto/information-conversion-dto';

export class InformationSchemeEntry implements ConversionSchemeEntry {
  dataLogData: InformationConversionDto;
  incomingDataKey: string;

  constructor(incomingDataKey = '', dataLogData = new InformationConversionDto()) {
    this.incomingDataKey = incomingDataKey;
    this.dataLogData = dataLogData;
  }
}
