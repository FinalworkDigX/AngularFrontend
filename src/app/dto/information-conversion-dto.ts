export class InformationConversionDto {
  name: string;
  index: number;

  constructor(obj = null) {
    obj && Object.assign(this, obj);
  }
}
