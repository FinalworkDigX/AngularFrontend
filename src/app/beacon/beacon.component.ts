import { Component, OnInit } from '@angular/core';
import { Beacon } from '../model/beacon';
import { RoomDetailComponent } from '../room/room-detail/room-detail.component';
import { Room } from '../model/room';
import { MatDialog } from '@angular/material';
import { BeaconService } from '../service/beacon.service';
import { BeaconDetailComponent } from './beacon-detail/beacon-detail.component';
import { isUndefined } from 'util';
import { RoomService } from '../service/room.service';
import { utils } from 'protractor';
import { UtilsModule } from '../utils/utils.module';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.css']
})
export class BeaconComponent implements OnInit {

  beacons: Beacon[];
  roomsDict: any[];

  constructor(
    private dialog: MatDialog,
    private beaconService: BeaconService,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
    this.getBeacons();
    this.getRooms();
  }

  getBeacons() {
    this.beaconService.getAll().subscribe(beacons => this.beacons = beacons);
  }

  getRooms() {
    // this.roomService.getAll().subscribe(rooms_ => this.roomsDict = UtilsModule.arrayToDictOnId(rooms_));
    this.roomService.getAll().subscribe(rooms_ => this.roomsDict = rooms_);
  }

  create() {
    this.callDialog(new Beacon());
  }

  update(beacon: Beacon) {
    this.callDialog(beacon);
  }

  delete(arrayIndex: number, beacon: Beacon) {
    this.beaconService.delete(beacon);
    this.beacons.splice(arrayIndex, 1);
  }

  private callDialog(beacon_: Beacon) {
    const dialogRef = this.dialog.open(BeaconDetailComponent, {
      data: {
        beacon: beacon_,
        rooms: this.roomsDict
      }
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
