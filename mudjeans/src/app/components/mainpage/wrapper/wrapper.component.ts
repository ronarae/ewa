import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

// @ts-ignore
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  check(): void {
    if (this.location.path() === '/login') {
      document.getElementById('wrapper').classList.add('d-none');
      document.getElementById('login').classList.remove('d-none');
    } else {
      document.getElementById('wrapper').classList.remove('d-none');
      document.getElementById('login').classList.add('d-none');
    }
  }
}
