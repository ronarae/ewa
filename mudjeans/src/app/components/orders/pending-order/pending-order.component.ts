import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})
export class PendingOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  deleteInfo(): void {
    const confirmation = confirm('Are you sure you want to delete this order? This action cannot be undone!');
    if (confirmation === true){
      alert('Order has been successfully deleted');
      document.getElementById('closeModal').click();
    }
  }


}
