import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import { RoomComponent } from './room/room.component';
import { BeaconComponent } from './beacon/beacon.component';
import { DataItemComponent } from './data-item/data-item.component';
import { AdminGuardService } from './guard/admin-guard.service';
import { UserComponent } from './user/user.component';
import { DataSourceComponent } from './data-source/data-source.component';
import { DataItemRequestComponent } from './data-item-request/data-item-request.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent,  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuardService] },
  { path: 'rooms', component: RoomComponent, canActivate: [AdminGuardService] },
  { path: 'beacons', component: BeaconComponent, canActivate: [AdminGuardService] },
  { path: 'dataItems', component: DataItemComponent, canActivate: [AdminGuardService] },
  { path: 'users', component: UserComponent, canActivate: [AdminGuardService] },
  { path: 'dataSources', component: DataSourceComponent, canActivate: [AdminGuardService] },
  { path: 'requests', component: DataItemRequestComponent, canActivate: [AdminGuardService] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
