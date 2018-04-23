import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { UserComponent } from './user/user.component';
import { AuthenticationService } from './service/authentication.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AdminGuardService } from './guard/admin-guard.service';
import { SessionService } from './service/session.service';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './service/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataSourceComponent } from './data-source/data-source.component';
import { DataSourceService } from './service/data-source.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
        tokenGetter: getToken,
        whitelistedDomains: ['https://fw.ludovicmarchand.be']
      }}),
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
    DataItemDetailComponent,
    UserComponent,
    UserDetailComponent,
    DataSourceComponent,
  ],
  entryComponents: [
    RoomDetailComponent,
    BeaconDetailComponent,
    DataItemDetailComponent,
    UserDetailComponent,
  ],
  providers: [
    UserService,
    RoomService,
    BeaconService,
    DataItemService,
    DataSourceService,
    AuthenticationService,
    JwtHelperService,
    AdminGuardService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getToken() {
  return localStorage.getItem('token.access_token');
}
