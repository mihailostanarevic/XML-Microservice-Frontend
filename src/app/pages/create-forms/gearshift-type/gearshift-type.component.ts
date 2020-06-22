import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { GearshiftTypeService } from 'src/app/services/gearshift-type.service';

@Component({
  selector: 'app-gearshift-type',
  templateUrl: './gearshift-type.component.html',
  styleUrls: ['./gearshift-type.component.css']
})
export class GearshiftTypeComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;
  isVisible: boolean;

  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private gearshiftTypeService: GearshiftTypeService) {}

  ngOnInit(): void {
    this.isVisible = false;
    this.open();
    this.isValid = true;
    this.validateForm = this.fb.group({
      type: ['', [Validators.required]],
      numberOfGears: ['', [Validators.required]],
    });
  }

  open() {
    this.isVisible = true;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      this.gearshiftTypeService.createGearshiftType(this.validateForm.value).subscribe(() => {
        this.isVisible = false;
        this.message.info('You have successfully created gearshift type.');
      }
        , error => {
          this.isVisible = false;
        this.message.info('Please check your data again. You have entered pre-existing data.');
      }
      );
    }
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.rePassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
