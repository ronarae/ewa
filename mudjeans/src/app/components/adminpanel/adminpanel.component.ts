import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Jean} from '../../models/Jean';
import {UserSbService} from '../../services/user-sb.service';
import {User} from '../../models/User';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  newPassword = "";
  currentUser = new User(null, null, null, null, null, null);
  users = [];

  constructor(private userService: UserSbService, private toastr: ToastrService, private router: Router) {
    userService.restGetUser().subscribe(
        (data) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
            this.users.push(User.trueCopy(data[i]));
          }
        },
        (error) => {
          alert('Error:' + error);
        }
    );
  }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  addUser() {
    this.currentUser = new User(null, null, null, null, null, null);
  }

  // tslint:disable-next-line:typedef
  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete ' + user.email + '?')) {
      this.userService.deleteById(user.id);
      this.toastr.success('You have successfully deleted ' + user.email, 'Successfully deleted!');
    }
    window.location.reload();
  }

  // tslint:disable-next-line:typedef
  onUserSelected(user: User) {
    this.currentUser = user;
  }

  // tslint:disable-next-line:typedef
  hasSelection() {
    return !!this.currentUser;
  }

  // tslint:disable-next-line:typedef
  saveUser(user: User) {
    if (this.newPassword !== "") {
      user.password = this.newPassword;
      this.newPassword = "";
    }
    this.userService.save(user);
    this.toastr.success('You have successfully saved this user', 'Successfully saved!');
    this.router.navigate(['/adminpanel']);
    window.location.reload();
  }

}
