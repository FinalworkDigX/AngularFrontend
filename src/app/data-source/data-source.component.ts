import { Component, OnInit } from '@angular/core';
import { DataSource } from '../model/data-source';
import { MatDialog } from '@angular/material';
import { DataSourceService } from '../service/data-source.service';
import { isUndefined } from 'util';
import { DataSourceDetailComponent } from './data-source-detail/data-source-detail.component';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {

  dataSources: DataSource[];
  dsJSON;

  constructor(
    private dataSourceService: DataSourceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getDataSources();
  }


  private getDataSources() {
    this.dataSourceService.getAll().subscribe((dataSources) => {
      this.dataSources = dataSources;
      this.dsJSON = JSON.parse(JSON.stringify(dataSources));
    });
  }

  onCreate() {
    this.callDialog(new DataSource());
  }

  onUpdate(dataSource: DataSource) {
    this.callDialog(dataSource);
  }

  onDelete(arrayIndex: number, dataSource: DataSource) {
    this.dataSourceService.delete(dataSource);
    this.dataSources.splice(arrayIndex, 1);
  }

  onRestartClient() {
    this.dataSourceService.restartClient();
  }

  private callDialog(dataSource: DataSource) {
    const dialogRef = this.dialog.open(DataSourceDetailComponent, {
      data: {
        dataSource: dataSource
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.updateOrInsert(result);
      }
    });
  }

  private updateOrInsert(dataSource: DataSource) {
    const dataSourceIndex = this.dataSources.findIndex(dataSource_ => dataSource_.id === dataSource.id);

    if (dataSourceIndex === -1) {
      this.dataSources.push(dataSource);
    } else {
      this.dataSources[dataSourceIndex] = dataSource;
    }
  }

}
