import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Jean} from '../../models/Jean';
import {UserSbService} from '../../services/user-sb.service';
import {User} from '../../models/User';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  currentUser: User;
  users;

  constructor(private userService: UserSbService, private toastr: ToastrService) {
    this.users = userService.findAll();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addUser() {
    // @ts-ignore
    this.currentUser = new User();
  }

  // tslint:disable-next-line:typedef
  newPassword(user: User) {

  }

  // tslint:disable-next-line:typedef
  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete ' + user.email + '?')) {
      this.userService.deleteById(user.id);
      this.toastr.success('You have succesfully deleted ' + user.email, 'Succesfully deleted!');
    }
  }

  // tslint:disable-next-line:typedef
  onUserSelected(user: User) {
    this.currentUser = user;
    console.log(this.currentUser);
  }

  // tslint:disable-next-line:typedef
  saveUser(user: User) {
    this.userService.save(user);
    this.toastr.success('You have succesfully saved this user', 'Succesfully saved!');
  }

}
