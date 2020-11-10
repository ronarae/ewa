import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-customize-order',
  templateUrl: './customize-order.component.html',
  styleUrls: ['./customize-order.component.css']
})
export class CustomizeOrderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  showAllInfo(): void {
    const showFullOrder = document.getElementById('showFullOrder');
    const info = document.getElementById('information');
    const editBtn = document.getElementById('editBtn');
    editBtn.style.display = 'block';
    info.style.display = 'block';
    showFullOrder.innerText = 'Hide Order';
  }

  deleteInfo(): void {
    const confirmation = confirm('Are you sure you want to delete this order? This action cannot be undone!');
    if (confirmation === true) {
      alert('Order has been successfully deleted');
      document.getElementById('closeModal').click();
    }
  }
}
