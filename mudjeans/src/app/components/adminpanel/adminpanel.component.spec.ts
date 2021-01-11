import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminpanelComponent} from './adminpanel.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {UserSbService} from "../../services/user-sb.service";
import {User} from "../../models/User";

describe('AdminpanelComponent', () => {
    let component: AdminpanelComponent;
    let fixture: ComponentFixture<AdminpanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdminpanelComponent],
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminpanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Kaspar
    it('should render "Users" as title', (() => {
        const titleDiv = fixture.debugElement.nativeElement.querySelector('h2');
        expect(titleDiv.textContent).toContain('Users');
    }));

    // Kaspar
    it('should use users from userSbService', () => {
        const userSbService = fixture.debugElement.injector.get(UserSbService);
        fixture.detectChanges();

        // Ceck if findAll users is the same as the users in the adminpanel component
        expect(userSbService.findAll()).toEqual(component.users);
    });

    // Kaspar
    it('should create new user', () => {
        const userSbService = fixture.debugElement.injector.get(UserSbService);
        fixture.detectChanges();

        // Make new test user and save it
        const newUser = new User(0, "test", "test@test.com", "test", "test", null);
        userSbService.save(newUser);

        // Search for the new user
        let foundUser;
        for (const user of userSbService.findAll()) {
            if (user.email === "test@test.com") {
                foundUser = user;
                break;
            }
        }

        // Check if user has been added
        expect(foundUser).toEqual(newUser);
    });
});
