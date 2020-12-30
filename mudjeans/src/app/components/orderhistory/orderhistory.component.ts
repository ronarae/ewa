import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  // to delete order in the order history
  // tslint:disable-next-line:typedef
  deleteOrderHistory(){
    const confirmation = confirm('Are you sure you want to delete this order? THIS ACTION CANNOT BE UNDONE!');
    if (confirmation === true) {
      this.toastr.success('You have successfully deleted this order', 'Successfully deleted!');
      document.getElementById('closeModal').click();
    }
  }

}
