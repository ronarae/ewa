// @ts-ignore
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {HomeComponent} from "../home/home.component";
import {Location} from "@angular/common";


describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;
    let button;
    let location: Location;

    // @ts-ignore
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavBarComponent, HomeComponent],
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule.withRoutes([{path: 'home', component: HomeComponent}])],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        button = fixture.debugElement.nativeElement.querySelector('img');
        location = TestBed.get(Location);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Wang
    it('Should redirect to home on click', (() => {
        button.click();
        expect(location.path()).toBe('');
    }));

});
