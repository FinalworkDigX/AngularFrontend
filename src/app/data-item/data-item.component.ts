import { Component, OnInit } from '@angular/core';
import { DataItem } from '../model/data-item';
import { Room } from '../model/room';
import { MatDialog } from '@angular/material';
import { DataItemService } from '../service/data-item.service';
import { RoomService } from '../service/room.service';
import { DataItemDetailComponent } from './data-item-detail/data-item-detail.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.scss']
})
export class DataItemComponent implements OnInit {

  dataItems: DataItem[];
  rooms: Room[];

  constructor(
    private dialog: MatDialog,
    private dataItemService: DataItemService,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
    this.getDataItems();
    this.getRooms();
  }

  private getDataItems() {
    this.dataItemService.getAll().subscribe(dataItems => this.dataItems = dataItems);
  }

  private getRooms() {
    this.roomService.getAll().subscribe(rooms => this.rooms = rooms);
  }

  onCreate() {
    this.callDialog(new DataItem());
  }

  onUpdate(dataItem: DataItem) {
    this.callDialog(dataItem);
  }

  onDelete(arrayIndex: number, dataItem: DataItem) {
    this.dataItemService.delete(dataItem);
    this.dataItems.splice(arrayIndex, 1);
  }

  private callDialog(dataItem: DataItem) {
    const dialogRef = this.dialog.open(DataItemDetailComponent, {
      data: {
        dataItem: dataItem,
        rooms: this.rooms
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.updateOrInsert(result);
      }
    });
  }

  private updateOrInsert(dataItem: DataItem) {
    const dataItemIndex = this.dataItems.findIndex(dataItem_ => dataItem_.id === dataItem.id);

    if (dataItemIndex === -1) {
      this.dataItems.push(dataItem);
    } else {
      this.dataItems[dataItemIndex] = dataItem;
    }
  }
}
