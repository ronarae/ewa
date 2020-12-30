import { Component, OnInit } from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private session: SessionSbService) { }

  ngOnInit(): void {
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions typedef
    $('#sidebarToggle, #sidebarToggleTop').on('click', function(e) {
      // @ts-ignore
      $('body').toggleClass('sidebar-toggled');
      // @ts-ignore
      $('.sidebar').toggleClass('toggled');
      // @ts-ignore
      if ($('.sidebar').hasClass('toggled')) {
        // @ts-ignore
        $('.sidebar .collapse').collapse('hide');
      }
    });
  }

  isAdmin(): boolean {
    return this.session.isAdmin();
  }

}
