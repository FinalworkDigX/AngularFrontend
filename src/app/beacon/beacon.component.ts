import { Component, OnInit } from '@angular/core';
import { Beacon } from '../model/beacon';
import { Room } from '../model/room';
import { MatDialog } from '@angular/material';
import { BeaconService } from '../service/beacon.service';
import { BeaconDetailComponent } from './beacon-detail/beacon-detail.component';
import { isUndefined } from 'util';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss']
})
export class BeaconComponent implements OnInit {

  beacons: Beacon[];
  rooms: Room[];

  constructor(
    private dialog: MatDialog,
    private beaconService: BeaconService,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
    this.getBeacons();
    this.getRooms();
  }

  private getBeacons() {
    this.beaconService.getAll().subscribe(beacons => this.beacons = beacons);
  }

  private getRooms() {
    // this.roomService.getAll().subscribe(rooms_ => this.roomsDict = UtilsModule.arrayToDictOnId(rooms_));
    this.roomService.getAll().subscribe(rooms_ => this.rooms = rooms_);
  }

  onCreate() {
    this.callDialog(new Beacon());
  }

  onUpdate(beacon: Beacon) {
    this.callDialog(beacon);
  }

  onDelete(arrayIndex: number, beacon: Beacon) {
    this.beaconService.delete(beacon);
    this.beacons.splice(arrayIndex, 1);
  }

  filterRoomArray(id: string): Room {
    return this.rooms.find(obj => obj.id === id);
  }

  private callDialog(beacon_: Beacon) {
    const dialogRef = this.dialog.open(BeaconDetailComponent, {
      data: {
        beacon: beacon_,
        rooms: this.rooms
      },
      panelClass: 'medium-mat-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.updateOrInsert(result);
      }
    });
  }

  private updateOrInsert(beacon: Beacon) {
    const beaconIndex = this.beacons.findIndex(beacon_ => beacon_.id === beacon.id);

    if (beaconIndex === -1) {
      this.beacons.push(beacon);
    } else {
      this.beacons[beaconIndex] = beacon;
    }
  }
}
