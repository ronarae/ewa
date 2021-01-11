import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperComponent } from './wrapper.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule.withRoutes([{path: 'login', component: HomeComponent}])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
