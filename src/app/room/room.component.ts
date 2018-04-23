import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { Room } from '../model/room';
import { MatDialog } from '@angular/material';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { isUndefined } from "util";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms: Room[];

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.geRooms();
  }

  create() {
    // Subscribe to return error or success!
    this.callDialog(new Room());
  }

  update(room: Room) {
    // Subscribe to return error or success!
    this.callDialog(room);
  }

  private callDialog(room: Room) {
    const dialogRef = this.dialog.open(RoomDetailComponent, {
      // width: '30%',
      data: { room: room }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.updateOrInsert(result);
      }
    });
  }

  delete(arrayIndex: number, room: Room) {
    this.roomService.delete(room);
    this.rooms.splice(arrayIndex, 1);
  }

  geRooms() {
    this.roomService.getAll()
      .subscribe(rooms => this.rooms = rooms);
  }

  private updateOrInsert(room: Room) {
    const roomIndex = this.rooms.findIndex(room_ => room_.id === room.id);

    if (roomIndex === -1) {
      this.rooms.push(room);
    } else {
      this.rooms[roomIndex] = room;
    }
  }
}
