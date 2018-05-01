import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '../../model/data-source';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataSourceService } from '../../service/data-source.service';
import { isNullOrUndefined } from 'util';
import { StringSchemeEntry } from '../../model/string-scheme-entry';
import { InformationSchemeEntry } from '../../model/information-scheme-entry';
import { DataDestination } from '../../model/data-destination';
import { UtilsModule } from '../../utils/utils.module';

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

  isInformationSchemeEntry(val) {
    UtilsModule.logTypeOf(val);
    return val instanceof InformationSchemeEntry;
  }

  onAddDestination() {
    const newDD = new DataDestination();
    const idStringSchemeEntry = new StringSchemeEntry();
    idStringSchemeEntry.dataLogData = 'item_id';
    newDD.conversionScheme.push(idStringSchemeEntry);
    newDD.conversionScheme.push(new InformationSchemeEntry());
    this.dataDestinations.push(newDD);
  }

  onAddInformationSchemeEntry(dataDestination: DataDestination) {
    dataDestination.conversionScheme.push(new InformationSchemeEntry());
  }

  onRemoveInformationSchemeEntry(dataDestination: DataDestination, infoSchemeEntry: InformationSchemeEntry) {
    const index = dataDestination.conversionScheme.indexOf(infoSchemeEntry);
    dataDestination.conversionScheme.splice(index, 1);
  }

  onRemoveDestination(dataDestination: DataDestination) {
    const index = this.dataDestinations.indexOf(dataDestination);
    this.dataDestinations.splice(index, 1);
  }

  onSubmitClick() {
    this.prepareDataForSubmit();
    if (this.isNew) {
      this.dataSourceService.create(this.dataSource).subscribe(dataSource => this.responseHandler(dataSource));
    } else {
      this.dataSourceService.update(this.dataSource).subscribe(dataSource => this.responseHandler(dataSource));
    }
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
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

  private prepareDataForSubmit() {
    // TODO: convert arrays back to objects
    this.dataSource.destinations = this.dataDestinations;
  }

  private responseHandler(dataSource: DataSource) {
    this.dialogRef.close(dataSource);
  }
}
