import { Component, OnInit } from '@angular/core';
import { Beacon } from '../model/beacon';
import { RoomDetailComponent } from '../room/room-detail/room-detail.component';
import { Room } from '../model/room';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.css']
})
export class BeaconComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getBeacons();
  }

  getBeacons() {
    //
  }

  create(beacon: Beacon) {
    //
  }

  update(beacon: Beacon) {
    //
  }

  delete(i: number, beacon: Beacon) {
    //
  }

  private callDialog(beacon_: Beacon) {
    const dialogRef = this.dialog.open(RoomDetailComponent, {
      data: { beacon: beacon_ }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateOrInsert(result);
    });
  }

  private updateOrInsert(beacon: Beacon) {
    //
  }
}
