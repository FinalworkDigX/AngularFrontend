import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../environments/environment';
import { ServerInformation } from '../model/server-information';


@Injectable()
export class SocketService {
  private baseUrl = environment.apiUrl + '/managerWS';
  private stompClient;

  private dataLog_ = new ReplaySubject<any>(300);
  dataLog = this.dataLog_.asObservable();

  private serverInfo_ = new ReplaySubject<ServerInformation>(300);
  serverInfo = this.serverInfo_.asObservable();
  lastServerInfo: ServerInformation;

  private requestNotification_ = new ReplaySubject<number>(300);
  requestNotification = this.requestNotification_.asObservable();
  lastRequestNotificationCount: number;

  private subscriptions = new Subscription();

  constructor() {
    this.connect();
  }

  private connect() {
    const ws = new SockJS(this.baseUrl);
    this.stompClient = Stomp.over(ws);
    const thisObj = this;

    this.stompClient.connect({}, function (frame) {
      console.log(frame);
      thisObj.initDataLogMonitoring();
      thisObj.initServerInfoMonitoring();
      thisObj.initRequestCountMonitoring();
    });
  }

  private initDataLogMonitoring() {
    this.subscriptions.add(this.stompClient.subscribe('/topic/dataLog', (dataLog) => {
      if (dataLog.body) {
        this.dataLog_.next(dataLog.body);
      }
    }));
  }

  private initServerInfoMonitoring() {
    this.subscriptions.add(this.stompClient.subscribe('/topic/monitoring', (serverInfo) => {
      if (serverInfo.body) {
        const newServerInfo: ServerInformation = JSON.parse(serverInfo.body);
        this.serverInfo_.next(newServerInfo);
        this.lastServerInfo = newServerInfo;
      }
    }));
  }

  private initRequestCountMonitoring() {
    this.subscriptions.add(this.stompClient.subscribe('/topic/notification/request', (requestCount) => {
      if (requestCount.body) {
        this.requestNotification_.next(requestCount.body);
        this.lastRequestNotificationCount = requestCount.body;
      }
    }));
  }

  isConnected(): Boolean {
    return !!(this.stompClient !== null && this.stompClient.connected());
  }

  disconnect() {
    if (this.isConnected()) {
      return;
    }
    this.subscriptions.unsubscribe();
    this.stompClient.disconnect();
  }
}
