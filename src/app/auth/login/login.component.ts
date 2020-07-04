import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';
import { RegistrationRequestService } from 'src/app/services/registration-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  private attempts: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private authService: AuthService,
              private message: NzMessageService,
              private registrationRequestService: RegistrationRequestService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
      password: [null, [Validators.required, ]]
    });
    const id = this.route.snapshot.params.id;
    if(id != undefined){
      const body = {
        id: id
      }
      this.registrationRequestService.approveRegistrationRequest(body).subscribe(() => {
        this.message.info('You have registred successfully!');
      },
      error => {
        this.message.info('Your activation link has expired.');
      });
    }

    this.authService.loggingLimit().subscribe(data => {
      if(data.message === 'LIMIT'){
        this.router.navigateByUrl('auth/limit-redirect');
      }
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value.username + " => " + this.validateForm.value.password);
    // this.store.dispatch(new AuthActions.LoginStart({
    //   email: this.validateForm.value.username,
    //   password: this.validateForm.value.password
    // }));

    {
      this.authService.login(this.validateForm.value).subscribe(user => {
        this.router.navigateByUrl(`dashboard`);
        const expirationDate = new Date(new Date().getTime() + user.tokenExpiresIn * 1000);
        let changedUser = new User(user.id, user.username, user.token, expirationDate, user.userRole);
        localStorage.setItem('userData', JSON.stringify(changedUser));
        this.store.dispatch(new AuthActions.LoginSuccess({
          email: user.username,
          userId: user.id,
          token: user.token,
          expirationDate: expirationDate,
          userRole: user.userRole,
          redirect: false
        }));
      }, error => {
        this.message.info('Bad credentials.');
      });
    }
  }

  onRegistration() {
    this.router.navigateByUrl('auth/registration');
  }
}
