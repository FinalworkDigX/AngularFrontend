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

  create(room: Room) {
    // Subscribe to return error or success!
    this.roomService.create(room);
  }

  edit(room: Room) {
    // Subscribe to return error or success!
    this.roomService.update(room);
  }

  delete(room: Room) {
    // Subscribe to return error or success!
    this.roomService.delete(room);
  }

  geRooms() {
    this.roomService.getAll()
      .subscribe(rooms => this.rooms = rooms);
  }

}
