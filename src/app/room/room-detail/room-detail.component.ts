import { Component, Inject, Input, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  @Input() room: Room;
  isNew: Boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { room: Room },
    public dialogRef: MatDialogRef<RoomDetailComponent>,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
    this.room = this.data.room;
    if (this.room.id !== undefined && this.room.id !== '') {
      this.isNew = false;
    }
  }

  onSubmitClick() {
    if (this.isNew) {
      this.roomService.create(this.room).subscribe(room => this.responseHandler(room));
    } else {
      this.roomService.update(this.room).subscribe(room => this.responseHandler(room));
    }
  }

  // On cancel return
  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  private responseHandler(room: Room) {
    this.dialogRef.close(room);
  }
}
