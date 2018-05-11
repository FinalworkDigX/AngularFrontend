import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class SocketService {
  private serverUrl = 'https://fw.ludovicmarchand.be/api/managerWS';
  private stompClient;

  private datalog_ = new ReplaySubject<any>(300);
  dataLog = this.datalog_.asObservable();

  private subscriptions = new Subscription();

  constructor() {
    this.connect();
  }

  private connect() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const thisObj = this;

    this.stompClient.connect({}, function (frame) {
      console.log(frame);
      thisObj.initDataLogMonitoring();
    });
  }

  private initDataLogMonitoring() {
    this.subscriptions.add(this.stompClient.subscribe('/topic/dataLog', (dataLog) => {
      if (dataLog.body) {
        this.datalog_.next(dataLog.body);
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
