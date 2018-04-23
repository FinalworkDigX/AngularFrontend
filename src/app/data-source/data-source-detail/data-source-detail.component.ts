import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '../../model/data-source';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataSourceService } from '../../service/data-source.service';
import { isNullOrUndefined } from 'util';
import { DataDestination } from '../../model/data-destination';
import { StringConversion } from '../../model/string-conversion';
import { InformationConversion } from '../../model/information-conversion';

@Component({
  selector: 'app-data-source-detail',
  templateUrl: './data-source-detail.component.html',
  styleUrls: ['./data-source-detail.component.scss']
})
export class DataSourceDetailComponent implements OnInit {

  @Input() dataSource: DataSource;
  @Input() dataDestinations: DataDestination[];
  isNew: Boolean = true;
  dsJSON;


  // TODO: update code to new improved conversion entries

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { dataSource: DataSource },
    public dialogRef: MatDialogRef<DataSourceDetailComponent>,
    private dataSourceService: DataSourceService,
  ) { }

  ngOnInit() {
    this.dataSource = this.data.dataSource;
    this.dsJSON = JSON.parse(JSON.stringify(this.dataSource));

    if (!isNullOrUndefined(this.dataSource.id )) {
      this.isNew = false;
    }
    this.prepareDataForDisplay();
  }

  private prepareDataForDisplay() {
    if (this.isNew) {
      this.dataSource.destinations = [];
    } else {
      const newDataDestinations = [];
      for (const dd of this.dataSource.destinations) {
        const newDD = new DataDestination();
        newDD.destination = dd.destination;
        newDD.conversionScheme = [];
        for (const key of Object.keys(dd.conversionScheme)) {
          console.log(key + ' - ' + dd.conversionScheme[key] + '\n');
          let csItem;
          if (typeof dd.conversionScheme === 'string') {
            csItem = new StringConversion();
          } else {
            csItem = new InformationConversion();
          }
          csItem.incomingDataKey = key;
          csItem.dataLogData = dd.conversionScheme[key];
          newDD.conversionScheme.push(csItem);
        }
        newDataDestinations.push(newDD);
      }
      this.dataDestinations = newDataDestinations;
    }
  }

  onSubmitClick() {
    if (this.isNew) {
      this.dataSourceService.create(this.dataSource).subscribe(dataSource => this.responseHandler(dataSource));
    } else {
      this.dataSourceService.update(this.dataSource).subscribe(dataSource => this.responseHandler(dataSource));
    }
  }

  private prepareDataForSubmit() {
    // TODO: convert arrays back to objects
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  private responseHandler(dataSource: DataSource) {
    this.dialogRef.close(dataSource);
  }
}
