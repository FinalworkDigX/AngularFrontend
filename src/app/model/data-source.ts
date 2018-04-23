import { DataDestination } from './data-destination';

export class DataSource {
  id: string;
  url: string;
  destinations: DataDestination[];
}
