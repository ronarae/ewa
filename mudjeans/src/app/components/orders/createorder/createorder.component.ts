import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  // tslint:disable-next-line:typedef
  showSuccessOrder() {
    this.toastr.success('You placed your order', 'Succesfully created an order');
  }



  ngOnInit(): void {
  }


}
