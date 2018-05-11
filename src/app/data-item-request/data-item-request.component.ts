import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { isUndefined } from 'util';
import { DataItemRequest } from '../model/data-item-request';
import { DataItemRequestService } from '../service/data-item-request.service';
import { DataItemRequestDetailComponent } from './data-item-request-detail/data-item-request-detail.component';

@Component({
  selector: 'app-data-item-request',
  templateUrl: './data-item-request.component.html',
  styleUrls: ['./data-item-request.component.scss']
})
export class DataItemRequestComponent implements OnInit {

  dataItemRequests: DataItemRequest[];

  constructor(
    private dialog: MatDialog,
    private dataItemRequestService: DataItemRequestService,
  ) { }

  ngOnInit() {
    this.getDataItemRequests();
  }

  private getDataItemRequests() {
    this.dataItemRequestService.getAll().subscribe(requests => this.dataItemRequests = requests);
  }

  onProcess(request: DataItemRequest) {
    this.callDialog(request);
  }

  onDelete(arrayIndex: number, dataItemRequest: DataItemRequest) {
    this.dataItemRequestService.delete(dataItemRequest);
  }

  private callDialog(request: DataItemRequest) {
    const dialogRef = this.dialog.open(DataItemRequestDetailComponent, {
      data: {
        dataItemRequest: request
      }
    });
    dialogRef.afterClosed().subscribe(requestId => {
      if (!isUndefined(requestId)) {
        this.removeAfterProcessing(requestId);
      }
    });
  }

  private removeAfterProcessing(requestId: string) {
    const dataItemRequestsIndex = this.dataItemRequests.findIndex(request_ => request_.id === requestId);
    this.dataItemRequests.splice(dataItemRequestsIndex, 1);
  }
}
