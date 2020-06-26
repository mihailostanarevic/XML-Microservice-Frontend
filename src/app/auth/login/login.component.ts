import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationRequestService } from 'src/app/services/registration-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  private attempts: number;

  constructor(private route: ActivatedRoute,
              private message: NzMessageService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private registrationRequestService: RegistrationRequestService,
              private store: Store<fromApp.AppState>) { }

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
    this.store.dispatch(new AuthActions.LoginStart({
      email: this.validateForm.value.username,
      password: this.validateForm.value.password
    }));

    // {
    //   this.authService.login(this.validateForm.value).subscribe(() => {
    //     this.router.navigateByUrl(`dashboard`);
    //   }, error => {
    //     this.message.info('Bad credentials.');
    //     this.attempts = this.attempts + 1;
    //     localStorage.setItem('attempts', this.attempts.toString());
    //   });
    // }
  }

  onRegistration() {
    this.router.navigateByUrl('auth/registration');
  }
}
