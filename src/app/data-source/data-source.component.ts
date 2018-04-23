import { Component, OnInit } from '@angular/core';
import { DataSource } from '../model/data-source';
import { MatDialog } from '@angular/material';
import { DataSourceService } from '../service/data-source.service';

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

  create() {}
  update(dataSource) {}
  delete(index, dataSource) {}

}
