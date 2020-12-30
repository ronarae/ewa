import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Jean} from "../../models/Jean";
import {UserSbService} from "../../services/user-sb.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  currentUser: User;
  users;

  constructor(private userService: UserSbService) {
    this.users = userService.findAll();
  }

  ngOnInit(): void {
  }

  addUser() {
    this.currentUser = new User();
  }

  newPassword(user: User) {

  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete ' + user.email + '?')) {
      this.userService.deleteById(user.id);
      alert('Succesfully deleted');
    }
  }

  onUserSelected(user: User) {
    this.currentUser = user;
    console.log(this.currentUser);
  }

  saveUser(user: User) {
    this.userService.save(user);
    alert('Succesfully saved!');
  }

}
