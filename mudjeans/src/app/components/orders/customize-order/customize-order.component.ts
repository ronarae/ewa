import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customize-order',
  templateUrl: './customize-order.component.html',
  styleUrls: ['./customize-order.component.css']
})
export class CustomizeOrderComponent implements OnInit {

  constructor(private toastr: ToastrService) {
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
      this.toastr.success('You have succesfully deleted this order', 'Succesfully deleted!');
      document.getElementById('closeModal').click();
    }
  }
}
