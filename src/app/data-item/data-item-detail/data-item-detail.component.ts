import { Component, Inject, Input, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataItemService } from '../../service/data-item.service';
import { DataItem } from '../../model/data-item';
import { isNullOrUndefined } from 'util';
import { Vector3 } from '../../model/vector3';

@Component({
  selector: 'app-data-item-detail',
  templateUrl: './data-item-detail.component.html',
  styleUrls: ['./data-item-detail.component.scss']
})
export class DataItemDetailComponent implements OnInit {

  @Input() dataItem: DataItem;
  isNew: Boolean = true;
  rooms: Room[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { dataItem: DataItem, rooms: Room[] },
    public dialogRef: MatDialogRef<DataItemDetailComponent>,
    private dataItemService: DataItemService,
  ) { }

  ngOnInit() {
    this.dataItem = this.data.dataItem;
    this.rooms = this.data.rooms;

    if (!isNullOrUndefined(this.dataItem.id )) {
      this.isNew = false;
    } else {
      this.dataItem.location = new Vector3();
    }
  }

  onSubmitClick() {
    if (this.isNew) {
      this.dataItemService.create(this.dataItem).subscribe(dataItem => this.responseHandler(dataItem));
    } else {
      this.dataItemService.update(this.dataItem).subscribe(dataItem => this.responseHandler(dataItem));
    }
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  private responseHandler(dataItem: DataItem) {
    this.dialogRef.close(dataItem);
  }

}
