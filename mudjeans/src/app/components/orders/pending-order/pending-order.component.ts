import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})
export class PendingOrderComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  deleteInfo(): void {
    const confirmation = confirm('Are you sure you want to delete this order? This action cannot be undone!');
    if (confirmation === true){
      this.toastr.success('You have successfully deleted this pending order', 'Successfully deleted!');
      document.getElementById('closeModal').click();
    }
  }


}
