import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarClassService } from 'src/app/services/car-class.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.css']
})
export class CarModelComponent implements OnInit {

  listOfData = [];

  listOfData2 = [];

  brandId: any;

  classId: any;

  name: any;

  isVisible: boolean;

  constructor(private router: Router, private message: NzMessageService, private carModelService: CarModelService, private carBrandService: CarBrandService, private carClassService: CarClassService) { }

  ngOnInit(): void {
    this.isVisible = false;
    this.open();
    this.setupData();
  }

  open() {
    this.isVisible = true;
  }

  private setupData(): void {
    this.carBrandService.getAllCarBrands().subscribe(data => {
      this.listOfData = data;
    });
    this.carClassService.getAllCarClasses().subscribe(data => {
      this.listOfData2 = data;
    });
  }

  create(): void {
    const body = {
      name: this.name,
      brandId: this.brandId,
      classId: this.classId
    }
    this.carModelService.createCarModel(body).subscribe(() => {
      this.message.info('You have successfully created car model.');
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
