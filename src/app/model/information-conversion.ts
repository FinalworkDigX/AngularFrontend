import { InformationConversionDto } from '../dto/information-conversion-dto';
import { BaseConversion } from './base-conversion';

export class InformationConversion implements BaseConversion {
  incomingDataKey: string;
  dataLogData: InformationConversionDto;
}
