import { Component, OnInit } from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private session: SessionSbService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.session.LogOff();
    this.router.navigate(['/']);
  }

}
