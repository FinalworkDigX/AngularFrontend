import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '../../model/data-source';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataSourceService } from '../../service/data-source.service';
import { isNullOrUndefined } from 'util';
import { InformationConversionDto } from '../../dto/information-conversion-dto';
import { StringSchemeEntry } from '../../model/string-scheme-entry';
import { InformationSchemeEntry } from '../../model/information-scheme-entry';
import { ConversionSchemeEntry } from '../../model/conversion-scheme-entry';
import { DataDestination } from '../../model/data-destination';

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
    this.dataDestinations = [];
    if (this.isNew) {
      this.dataSource.destinations = [];
    } else {
      for (const dd of this.dataSource.destinations) {
        const newDD = new DataDestination(dd.destination);
        for (let ce of dd.conversionScheme) {
          if (typeof ce.dataLogData === 'string') {
            ce = new StringSchemeEntry(ce.incomingDataKey, ce.dataLogData);
          } else {
            ce = new InformationSchemeEntry(ce.incomingDataKey, ce.dataLogData);
          }
          newDD.conversionScheme.push(ce);
        }
        this.dataDestinations.push(newDD);
      }
    }
  }


  logTypeOf(val) {
    console.log(typeof val);
    if (val instanceof InformationSchemeEntry) {
      console.log('Info entry');
    }
    if (val instanceof StringSchemeEntry) {
      console.log('String entry');
    }
    if (val instanceof DataDestination) {
      console.log('Data destination');
    }
  }

  isInformationSchemeEntry(val) {
    this.logTypeOf(val);
    return val instanceof InformationSchemeEntry;
  }

  convertToInformation(val): InformationConversionDto {
    if (val.hasOwnProperty('index') &&
      val.hasOwnProperty('name')) {
      const info = new InformationConversionDto(val);
      return info;
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
