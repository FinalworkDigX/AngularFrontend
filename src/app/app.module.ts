import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomComponent } from './room/room.component';

import { RoomService } from './service/room.service';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { MaterialModule } from './material/material.module';
import { BeaconComponent } from './beacon/beacon.component';
import { BeaconService } from './service/beacon.service';
import { BeaconDetailComponent } from './beacon/beacon-detail/beacon-detail.component';
import { DataItemComponent } from './data-item/data-item.component';
import { DataItemService } from './service/data-item.service';
import { DataItemDetailComponent } from './data-item/data-item-detail/data-item-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RoomComponent,
    RoomDetailComponent,
    BeaconComponent,
    BeaconDetailComponent,
    DataItemComponent,
    DataItemDetailComponent
  ],
  entryComponents: [
    RoomDetailComponent,
    BeaconDetailComponent,
    DataItemDetailComponent,
  ],
  providers: [
    RoomService,
    BeaconService,
    DataItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
