import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { CarBrandService } from 'src/app/services/car-brand.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;
  isUpdate: boolean;

  private id: any;
  isVisible: boolean;

  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private carBrandService: CarBrandService) {}

  ngOnInit(): void {
    this.isVisible = false;
    this.open();
    this.isValid = true;
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
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
        this.carBrandService.createCarBrand(this.validateForm.value).subscribe(() => {
          this.message.info('You have successfully created car brand.');
        }, error => {
          this.message.info('Please check your data again. You have entered pre-existing data.');
        });
      }else if(this.isUpdate){
        this.carBrandService.updateCarBrand(this.validateForm.value, this.route.snapshot.params.id).subscribe(() => {
          this.message.info('You have successfully updated car brand.');
        }, error => {
          this.message.info('Please check your data again. You have entered pre-existing data.');
        });
      }
    }
  }

  public getDetails(): void {
    this.isUpdate = true;
    this.carBrandService.getCarBrand(this.route.snapshot.params.id).subscribe(data =>{
      const formValues = {
        name: data.name,
        country: data.country
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

  handleCancel(): void {
    this.isVisible = false;
  }

  open() {
    this.isVisible = true;
  }
}
