import { Component, OnInit } from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  constructor(private session: SessionSbService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.session.currentUser.name;
  }

  logOff() {
    this.session.logOff();
    this.router.navigate(['/login']);
  }

}
