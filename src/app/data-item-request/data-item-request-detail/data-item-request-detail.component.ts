import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataItem } from '../../model/data-item';
import { Room } from '../../model/room';
import { isNullOrUndefined } from 'util';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataItemService } from '../../service/data-item.service';
import { DataItemDetailComponent } from '../../data-item/data-item-detail/data-item-detail.component';
import { DataItemRequest } from '../../model/data-item-request';
import { DataItemRequestService } from '../../service/data-item-request.service';
import { Vector3 } from '../../model/vector3';

@Component({
  selector: 'app-data-item-request-detail',
  templateUrl: './data-item-request-detail.component.html',
  styleUrls: ['./data-item-request-detail.component.scss']
})
export class DataItemRequestDetailComponent implements OnInit {

  dataItemRequest: DataItemRequest;
  @Input() dataItemName: string;
  hasCurrentDataItem: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { dataItemRequest: DataItemRequest },
    public dialogRef: MatDialogRef<DataItemRequestDetailComponent>,
    private dataItemRequestService: DataItemRequestService,
    private dataItemService: DataItemService,
  ) { }

  ngOnInit() {
    this.dataItemRequest = this.data.dataItemRequest;
    this.dataItemName = this.dataItemRequest.dataItemName;

    if (this.dataItemRequest.currentDataItem !== null) {
      this.hasCurrentDataItem = true;
    }
  }

  onAcceptClick() {
    const dataItem = new DataItem();
    dataItem.name = this.dataItemName;
    dataItem.roomId = this.dataItemRequest.room.id;
    dataItem.location = new Vector3();
    dataItem.itemId = 'temp_item_id';

    if (this.hasCurrentDataItem) {
      this.dataItemService.delete(this.dataItemRequest.currentDataItem);
    }

    this.dataItemService.create(dataItem);
    this.responseHandler();
  }

  onRefuseClick() {
    this.dataItemRequestService.delete(this.dataItemRequest);
    this.responseHandler();
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  private responseHandler() {
    this.dialogRef.close(this.dataItemRequest.id);
  }


}
