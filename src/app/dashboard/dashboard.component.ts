import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { DataItemRequestService } from '../service/data-item-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lineChartData: Array<any>;
  lineChartLabels: Array<any>;
  lineChartOptions: any;
  lineChartColors: Array<any>;
  lineChartLegend = true;
  lineChartType = 'line';

  dataLogCount = 0;
  pendingRequestsCount: any;

  constructor(
    private webSocket: SocketService,
    private dataItemRequestService: DataItemRequestService,
  ) { }

  ngOnInit() {
    this.handleDataLogs();
    this.setupChart();
    this.setupStats();
  }

  private handleDataLogs() {
    this.webSocket.dataLog.subscribe(dataLog => {
      this.dataLogCount++;
      console.log(this.dataLogCount);
    });
  }

  // Stats
  private setupStats() {
    this.dataItemRequestService.getAll().subscribe(val => this.pendingRequestsCount = val.length);
  }

  // charts
  private setupChart() {
    // lineChart
    this.lineChartData = [
      {data: [], label: 'DataLog'},
      // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    this.lineChartLabels = [];
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          time: {
            unit: 'second'
          }
        }],
        yAxes: [{
          id: 'Count',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    };
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(82,179,217,0.2)',
        borderColor: 'rgba(82,179,217,1)',
        pointBackgroundColor: 'rgba(82,179,217,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(82,179,217,0.8)'
      },
    //   { // dark grey
    //     backgroundColor: 'rgba(77,83,96,0.2)',
    //     borderColor: 'rgba(77,83,96,1)',
    //     pointBackgroundColor: 'rgba(77,83,96,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(77,83,96,1)'
    //   },
    //   { // grey
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //   }
    ];
    const date = new Date();
    for (let i = 14; i >= 0; i--) {
      const tmpDate = new Date(date);
      tmpDate.setSeconds(tmpDate.getSeconds() - i);
      this.chartUpdateData(tmpDate);
    }
    this.chartUpdate();
  }

  private chartUpdate() {
    const timer = IntervalObservable.create(1000).subscribe(val => {
      this.chartUpdateData(new Date());
    });
  }

  private chartUpdateData(date: Date) {

    if (this.lineChartLabels.length > 15) {
      this.lineChartLabels.shift();
    }
    let label = String(date.getSeconds());
    if (date.getSeconds() % 10 === 0) {
      label = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    this.lineChartLabels.push(label);

    // Data
    const chartDLIndex = this.lineChartData.findIndex(obj => obj.label === 'DataLog');
    if (this.lineChartData[chartDLIndex].data.length > 15) {
      this.lineChartData[chartDLIndex].data.shift();
    }
    this.lineChartData[chartDLIndex].data.push(this.dataLogCount);


    this.dataLogCount = 0;

    this.newDataPoint();
  }

  private newDataPoint() {

    const lineChartData_: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData_[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        lineChartData_[i].data[j] = this.lineChartData[i].data[j];
      }
    }
    this.lineChartData = lineChartData_;

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
