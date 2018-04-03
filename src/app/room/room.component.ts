import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { Room } from '../model/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms: Room[];

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.geRooms();
  }

  edit(room: Room) {
    // do something
  }

  delete(room: Room) {
    // do something
  }

  geRooms() {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }

}
