import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { DataItemRequestService } from '../service/data-item-request.service';
import { ServerInformation } from '../model/server-information';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  static maxDataLogs = 0;

  static lineChartSetup = false;
  static lineChartData: Array<any>;
  static lineChartLabels: Array<any>;
  static lineChartOptions: any;
  static lineChartColors: Array<any>;
  lineChartLegend = true;
  lineChartType = 'line';

  cpuChartData: Array<number>;
  memoryChartData: Array<number>;
  usageChartLabel: Array<string>;
  usageChartColors: Array<any>;
  usageChartOptions: any;
  usageChartType = 'doughnut';

  dataLogCount = 0;
  pendingRequestsCount;
  currentServerInfo: ServerInformation;
  serverInfoPending = true;

  constructor(
    private webSocket: SocketService,
    private dataItemRequestService: DataItemRequestService,
  ) { }

  ngOnInit() {
    this.currentServerInfo = new ServerInformation();

    this.handleDataLogs();
    this.handleServerInfo();

    this.setupChart();
    this.handleRequestNotifications();
  }

  private handleDataLogs() {
    this.webSocket.dataLog.subscribe(dataLog => {
      this.dataLogCount++;
      console.log(this.dataLogCount);
    });
  }

  private handleServerInfo() {
    if (this.webSocket.lastServerInfo) {
      this.transformServerInfoData(this.webSocket.lastServerInfo);
    }

    this.webSocket.serverInfo.subscribe(serverInfo => {
      this.currentServerInfo = serverInfo;
      this.serverInfoPending = false;

      // CPU graph
      this.transformServerInfoData(serverInfo);
    });
  }

  private transformServerInfoData(serverInfo: ServerInformation) {
    const currentSpeed = parseFloat(serverInfo.cpu.currentClockSpeed);
    const reserveSpeed = parseFloat(serverInfo.cpu.maxClockSpeed) - currentSpeed;
    this.cpuChartData = [currentSpeed, reserveSpeed];
  }

  private handleRequestNotifications() {
    if (this.webSocket.lastRequestNotificationCount) {
      this.pendingRequestsCount = this.webSocket.lastRequestNotificationCount;
    } else {
      this.dataItemRequestService.getAll().subscribe(val => {
        this.pendingRequestsCount = val.length;
      });
    }
    this.webSocket.requestNotification.subscribe(requestCount => {
      this.pendingRequestsCount = requestCount;
    });
  }

  // charts
  get staticMaxDataLogs() {
    return DashboardComponent.maxDataLogs;
  }

  get staticLineChartData() {
    return DashboardComponent.lineChartData;
  }

  get staticLineChartLabels() {
    return DashboardComponent.lineChartLabels;
  }

  get staticLineChartColors() {
    return DashboardComponent.lineChartColors;
  }

  get staticLineChartOptions() {
    return DashboardComponent.lineChartOptions;
  }

  private setupChart() {
    if (!DashboardComponent.lineChartSetup) {
      DashboardComponent.lineChartSetup = true;
      // lineChart
      DashboardComponent.lineChartData = [
        {data: [], label: 'DataLog'},
        // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
      ];
      DashboardComponent.lineChartLabels = [];
      DashboardComponent.lineChartColors = [
        { // blue
          backgroundColor: 'rgba(82,179,217,0.2)',
          borderColor: 'rgba(82,179,217,1)',
          pointBackgroundColor: 'rgba(82,179,217,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(82,179,217,0.8)'
        },
      ];
      const date = new Date();
      for (let i = 14; i >= 0; i--) {
        const tmpDate = new Date(date);
        tmpDate.setSeconds(tmpDate.getSeconds() - i);
        this.chartUpdateData(tmpDate);
      }
      this.chartUpdate();
    }
    DashboardComponent.lineChartOptions = {
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
            stepSize: 1,
          }
        }]
      }
    };

    // Server usage charts (CPU & Memory)
    this.usageChartColors = [{ backgroundColor: ['#52b3d9', '#BBB'] }];
    this.usageChartOptions = {
      responsive: true,
      legend: false,
      tooltips: {
        enabled: false
      }
    };

    this.cpuChartData = [10, 90];
    this.memoryChartData = [10, 90];
    this.usageChartLabel = ['used', 'free'];
  }

  private chartUpdate() {
    const timer = IntervalObservable.create(1000).subscribe(val => {
      this.chartUpdateData(new Date());
    });
  }

  private chartUpdateData(date: Date) {

    if (DashboardComponent.lineChartLabels.length > 15) {
      DashboardComponent.lineChartLabels.shift();
    }
    let label = String(date.getSeconds());
    if (date.getSeconds() % 10 === 0) {
      label = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    DashboardComponent.lineChartLabels.push(label);

    // Data
    const chartDLIndex = DashboardComponent.lineChartData.findIndex(obj => obj.label === 'DataLog');
    if (DashboardComponent.lineChartData[chartDLIndex].data.length > 15) {
      DashboardComponent.lineChartData[chartDLIndex].data.shift();
    }
    DashboardComponent.lineChartData[chartDLIndex].data.push(this.dataLogCount);

    if (DashboardComponent.maxDataLogs < this.dataLogCount) {
      DashboardComponent.maxDataLogs = this.dataLogCount;
    }
    this.dataLogCount = 0;

    this.newDataPoint();
  }

  private newDataPoint() {

    const lineChartData_: Array<any> = new Array(DashboardComponent.lineChartData.length);
    for (let i = 0; i < DashboardComponent.lineChartData.length; i++) {
      lineChartData_[i] = {
        data: new Array(DashboardComponent.lineChartData[i].data.length),
        label: DashboardComponent.lineChartData[i].label
      };
      for (let j = 0; j < DashboardComponent.lineChartData[i].data.length; j++) {
        lineChartData_[i].data[j] = DashboardComponent.lineChartData[i].data[j];
      }
    }
    DashboardComponent.lineChartData = lineChartData_;

  }
}
