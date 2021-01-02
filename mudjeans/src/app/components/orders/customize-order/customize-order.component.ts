import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from "../../../services/order.service";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../models/Order";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-customize-order',
  templateUrl: './customize-order.component.html',
  styleUrls: ['./customize-order.component.css']
})
export class CustomizeOrderComponent implements OnInit {

  // @ts-ignore
  currentOrder: Order = new Order();

  displayedColumns = ['Order Id', 'Order Date', 'Order Message', 'Placed By'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private toastr: ToastrService, private orderService: OrderService) {
    let array = [];
    this.orderService.restGetPendingOrders().subscribe((data) => {
          console.log(data);
          for(let i = 0; i < data.length; i++) {
            let order: Order = new Order(data[i].orderId, data[i].note, data[i].date, data[i].creator.name, data[i].status, data[i].reviewer.name);
            array.push(order);
          }
          this.dataSource = new MatTableDataSource<Order>(array);
        },
        (error) => {
          alert('Error:' + error);
        });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onOrderSelected(order: Order) {
    this.currentOrder = order;
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
      this.toastr.success('You have successfully deleted this order', 'Successfully deleted!');
      document.getElementById('closeModal').click();
    }
  }
}
