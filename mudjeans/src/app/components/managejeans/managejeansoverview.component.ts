import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Jean} from '../../models/Jean';
import {SalesSbService} from '../../services/sales-sb.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-managejeansoverview',
  templateUrl: './managejeansoverview.component.html',
  styleUrls: ['./managejeansoverview.component.css']
})
export class ManagejeansoverviewComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  currentJean: Jean = new Jean();

  displayedColumns = ['Product Code', 'Style Name', 'Fabric', 'Washing', 'Product Category', 'Latest Stock', 'Should Order'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public jeanService: SalesSbService, private toastr: ToastrService) {
    // inside subscribe wordt elke keer gebruikt wanneer data wordt aangepast -> direct update in view
    this.jeanService.restGetJean().subscribe((data) => {
          this.dataSource = new MatTableDataSource<Jean>(data);
          this.dataSource.paginator = this.paginator;
          setTimeout(() => this.dataSource.paginator = this.paginator);
        },
        (error) => {
          this.toastr.error(error.error);
        });
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:typedef
  toggleStyleName(styleName: string) {
    this.dataSource.filter = styleName;
  }

  // tslint:disable-next-line:typedef
  addJean() {
    // @ts-ignore
    this.currentJean = new Jean();
  }

  onJeanSelected(jean: Jean): void {
    this.currentJean = jean;
    // console.log(jean);
  }

  // tslint:disable-next-line:typedef
  deleteCurrentJean(jean: Jean) {
    if (confirm('Are you sure you want to delete ' + jean.styleName + '?')) {
      this.jeanService.deleteById(jean.productCode);
      this.toastr.success('You have successfully deleted ' + jean.styleName, 'Successfully deleted');
    }
  }


  // tslint:disable-next-line:typedef
  saveCurrentJean(jean: Jean) {
  this.jeanService.save(jean);
  this.toastr.success('You have successfully saved your changes', 'Successfully saved');
  }
}
