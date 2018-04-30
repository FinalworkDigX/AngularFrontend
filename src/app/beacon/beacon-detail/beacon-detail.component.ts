import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Beacon } from '../../model/beacon';
import { BeaconService } from '../../service/beacon.service';
import { Room } from '../../model/room';

@Component({
  selector: 'app-beacon-detail',
  templateUrl: './beacon-detail.component.html',
  styleUrls: ['./beacon-detail.component.scss']
})
export class BeaconDetailComponent implements OnInit {

  @Input() beacon: Beacon;
  isNew: Boolean = true;
  rooms: Room[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { beacon: Beacon, rooms: Room[] },
    public dialogRef: MatDialogRef<BeaconDetailComponent>,
    private beaconService: BeaconService,
  ) { }

  ngOnInit() {
    this.beacon = this.data.beacon;
    this.rooms = this.data.rooms;

    if (this.beacon.id !== undefined && this.beacon.id !== '') {
      this.isNew = false;
    }
  }

  onSubmitClick() {
    if (this.isNew) {
      this.beaconService.create(this.beacon).subscribe(beacon => this.responseHandler(beacon));
    } else {
      this.beaconService.update(this.beacon).subscribe(beacon => this.responseHandler(beacon));
    }
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  private responseHandler(beacon: Beacon) {
    this.dialogRef.close(beacon);
  }
}
