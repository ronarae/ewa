import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/User';
import {NgForm} from '@angular/forms';
import {SessionSbService} from '../../../services/session-sb.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  user: User = new User();
  errorMessage: string;
  expectedUrl: string;

  @ViewChild('f')
  myForm: NgForm;

  constructor(private session: SessionSbService, private router: Router, private route: ActivatedRoute) {
    this.expectedUrl = '/';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
        (params: Params) => {
          if (params.expectedUrl) {
            this.expectedUrl = params.expectedUrl;
          }
        });
  }

  onSubmit(): void {
    this.session.logIn(this.user.email, this.user.password).subscribe((data) => {
      this.router.navigate(['/']);
    }, (error) => {
      this.errorMessage = error.error.message || 'Apparently your server is down: ' + error.message;
    });
  }
}
