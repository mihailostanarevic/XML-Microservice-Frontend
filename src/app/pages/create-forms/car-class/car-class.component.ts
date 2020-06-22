import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { CarClassService } from 'src/app/services/car-class.service';

@Component({
  selector: 'app-car-class',
  templateUrl: './car-class.component.html',
  styleUrls: ['./car-class.component.css']
})
export class CarClassComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;
  isUpdate: boolean;

  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private carClassService: CarClassService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.isUpdate = false;
    if(this.route.snapshot.params.id != undefined){
      this.getDetails();
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      if(!this.isUpdate){
        this.carClassService.createCarClass(this.validateForm.value).subscribe(() => {
          this.message.info('You have successfully created car class.');
        }, error => {
          this.message.info('Please check your data again. You have entered pre-existing data.');
        });
      }else if(this.isUpdate){
        this.carClassService.updateCarClass(this.validateForm.value, this.route.snapshot.params.id).subscribe(() => {
          this.message.info('You have successfully updated car class.');
        }, error => {
          this.message.info('Please check your data again. You have entered pre-existing data.');
        });
      }
    }
  }

  public getDetails(): void {
    this.isUpdate = true;
    this.carClassService.getCarClass(this.route.snapshot.params.id).subscribe(data =>{
      const formValues = {
        name: data.name,
        description: data.description
      }
      this.validateForm.setValue(formValues);
    })
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

}
