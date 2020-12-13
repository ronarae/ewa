import {Component, OnInit} from '@angular/core';
import {jean} from '../../models/Jean';

@Component({
  selector: 'app-managejeansoverview',
  templateUrl: './managejeansoverview.component.html',
  styleUrls: ['./managejeansoverview.component.css']
})
export class ManagejeansoverviewComponent implements OnInit {
  productCode = ['MB0001C001D001-28-32', 'MB0001C001D001-29-32', 'MB0001C001D001-30-32', 'MB0001C001D001-32-36', 'MB0001C001D001-36-38'];
  // tslint:disable-next-line:max-line-length
  description = ['Regular Bryce - Strong Blue', 'Regular Bryce - Authentic Indigo', 'Regular Bryce - Heavy Stone', 'Slim Lassen - Sea Stone', 'Slim Rick - Drip Dry'];
  size = ['W28 L32', 'W29 L32', 'W30 L32', 'W32 L36', 'W36 L38'];

  public jeans: jean[];

  constructor() {
  }

  ngOnInit() {

  }

  addJean() {

  }

}
