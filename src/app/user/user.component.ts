import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material';
import { User } from '../model/user';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
  private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe((users) => {
        this.users = users;
        console.log(this.users);
      });
  }

  create() {
    // Subscribe to return error or success!
    this.callDialog(new User());
  }

  update(user: User) {
    // Subscribe to return error or success!
    this.callDialog(user);
  }

  private callDialog(user: User) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      data: { user: user }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.updateOrInsert(result);
      }
    });
  }

  delete(arrayIndex: number, user: User) {
    this.userService.delete(user);
    this.users.splice(arrayIndex, 1);
  }

  private updateOrInsert(user: User) {
    const userIndex = this.users.findIndex(user_ => user_.user_id === user.user_id);

    if (userIndex === -1) {
      this.users.push(user);
    } else {
      this.users[userIndex] = user;
    }
  }
}
