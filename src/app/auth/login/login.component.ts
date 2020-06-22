import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';

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
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
      password: [null, [Validators.required, ]]
    });
    if(!isNaN(parseFloat(localStorage.getItem('hours')))){
      const currentTime = moment().format('HH:mm:ss');
      var array = currentTime.split(':');
      // if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) == 0){
      if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) > 2 || Number(array[1]) - Number(localStorage.getItem('minutes')) < 0){
        localStorage.clear();
      }
    }
    if(isNaN(parseFloat(localStorage.getItem('attempts')))){
      this.attempts = 0;
    }else{
      this.attempts = Number(localStorage.getItem('attempts'));
    }
    if(Number(localStorage.getItem('attempts')) >=3){
      this.router.navigateByUrl('auth/limit-redirect');
    }
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
