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
    RoomDetailComponent
  ],
  entryComponents: [
    RoomDetailComponent,
  ],
  providers: [
    RoomService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
