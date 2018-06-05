import { Beacon } from './beacon';
import { Room } from './room';
import { DataItem } from './data-item';

export class DataItemRequest {
  id: string;
  beaconId: string;
  dataItemName: string;
  requester: string;
  beacon: Beacon;
  room: Room;
  currentDataItem: DataItem;
}
