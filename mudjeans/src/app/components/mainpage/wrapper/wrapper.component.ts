import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SessionSbService} from "../../../services/session-sb.service";

@Component({
    selector: 'app-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

    constructor(private location: Location, private session: SessionSbService, private router: Router) {
    }

    ngOnInit(): void {
        this.changeOfRoute();
    }

    changeOfRoute(): void {
        if (this.location.path() === '/login') {
            if (this.session.isAuthenticated()) {
                this.router.navigate(['/']);
            } else {
                document.getElementById('wrapper').classList.add('d-none');
                document.getElementById('login').classList.remove('d-none');
            }
        } else {
            if (!this.session.isAuthenticated()) {
                this.router.navigate(['/login']);
            } else {
                document.getElementById('wrapper').classList.remove('d-none');
                document.getElementById('login').classList.add('d-none');
            }
        }
    }
}
