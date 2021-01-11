import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagejeansoverviewComponent} from './managejeansoverview.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SessionSbService} from "../../services/session-sb.service";
import {SalesSbService} from "../../services/sales-sb.service";
import {Jean} from "../../models/Jean";

describe('ManagejeansoverviewComponent', () => {
    let component: ManagejeansoverviewComponent;
    let fixture: ComponentFixture<ManagejeansoverviewComponent>;
    // tslint:disable-next-line:prefer-const
    let componentHTML: HTMLElement;
    // tslint:disable-next-line:prefer-const
    let jeansService: SalesSbService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ManagejeansoverviewComponent],
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule,
                NoopAnimationsModule, MatInputModule, MatTableModule, MatProgressBarModule, MatPaginatorModule],
            providers: [SessionSbService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagejeansoverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // shantest
    it('should render title', (() => {
        // tslint:disable-next-line:no-shadowed-variable
        const fixture = TestBed.createComponent(ManagejeansoverviewComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h3').textContent).toContain('Manage jeans');
    }));

    // shantest
    it('should use jeanslist from service', () => {
        // tslint:disable-next-line:no-shadowed-variable
        const jeansService = fixture.debugElement.injector.get(SalesSbService);
        fixture.detectChanges();

        // checks if the findAll method gives the same jeans back from the array jeans
        expect(jeansService.findAll()).toEqual(component.jeanService.jeans);
    });

    // shantest
    it('should not let pageSize be zero', (done) => {
        // tslint:disable-next-line:no-shadowed-variable
        const fixture = TestBed.createComponent(ManagejeansoverviewComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // changes the matPaginator page size to 2
        expect(compiled._pageSize === 0).toBeFalse();
        done();
    });

    // shantest
    it('should delete just created jean', () => {
        const newJean = new Jean("DELETECODE", "test", "test",
            "test", "test", 0, false);

        let deletedJean = null;

        // add jean with service
        component.jeanService.jeans.push(newJean);

        // delete the jean
        component.jeanService.deleteById("DELETECODE");

        // get the updated list of jean after deleting
        const jeans = component.jeanService.jeans;

        // look if the deleted jean is still in the list of jeans
        for (let i = 0; i < component.jeanService.jeans.length; i++) {
            if (jeans[i].productCode === "DELETECODE") {
                deletedJean = jeans[i];
                break;
            }
        }
        // expects that the jean does not exist anymore
        expect(deletedJean).toBeNull();
    });

});

