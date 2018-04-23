import { InformationConversionDto } from '../dto/information-conversion-dto';
import { BaseConversion } from './base-conversion';

export class InformationConversion implements BaseConversion {
  dataLogInformation: InformationConversionDto;
  incomingDataKey: string;
}
