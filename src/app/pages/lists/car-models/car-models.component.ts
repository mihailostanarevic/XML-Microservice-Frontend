import { Component, OnInit } from '@angular/core';
import { CarModelService } from 'src/app/services/car-model.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: ['./car-models.component.css']
})
export class CarModelsComponent implements OnInit {

  listOfData = [];
  isAdmin: boolean;
  isAgent: boolean;
  isSimpleUser: boolean;
  brandName: any = '';
  className: any = '';

  private user: any;

  constructor(private carModelService: CarModelService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
    this.setupUser();
    this.setupUserRole();
  }

  private setupData(): void {
    this.carModelService.getAllCarModels().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private setupUserRole(): void {
    if(this.user.userRole === 'ADMIN_ROLE'){
        this.isAdmin = true;
        this.isAgent = false;
        this.isSimpleUser = false;
    }else if(this.user.userRole === 'AGENT_ROLE'){
      this.isAdmin = false;
      this.isAgent = true;
      this.isSimpleUser = false;
    }else if(this.user.userRole === 'SIMPLE_USER_ROLE'){
      this.isAdmin = false;
      this.isAgent = false;
      this.isSimpleUser = true;
    }
  }

  delete(id): void {
    this.carModelService.deleteCarModel(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
      this.brandName = '';
      this.className = '';
    })
  }

  search(): void {
    const filteredObject = {
      brandName: this.brandName,
      className: this.className
    }
    this.carModelService.getCarModelsWithFilter(filteredObject).subscribe(data => {
      this.listOfData = data;
    })
  }
}
