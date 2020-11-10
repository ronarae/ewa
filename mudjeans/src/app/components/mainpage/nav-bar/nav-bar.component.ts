import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

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

}
