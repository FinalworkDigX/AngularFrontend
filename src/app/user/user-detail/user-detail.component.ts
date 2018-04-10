import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../../service/user.service';
import { isNullOrUndefined } from 'util';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../model/user';
import { UserDto } from '../../dto/userDto';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;
  @Input() user: User;
  types = this.enumSelector(UserType);
  isNew: Boolean = true;
  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { user: User },
    public dialogRef: MatDialogRef<UserDetailComponent>,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.user = this.data.user;

    if (!isNullOrUndefined(this.user.user_id )) {
      this.isNew = false;
      this.userForm.removeControl('password');
    }
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }

  private createForm() {
    this.userForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@!%*?&éèà^\/{}\[\]]{8,}/)
      ])
    });
  }

  onSubmitClick() {
    if (this.isNew) {
      this.userService.create(this.user).subscribe(user => this.responseHandler(user));
    } else {
      const userDto = new UserDto(this.user);
      this.userService.update(userDto).subscribe(user => this.responseHandler(user));
    }
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  private responseHandler(user: User) {
    this.dialogRef.close(user);
  }

}
