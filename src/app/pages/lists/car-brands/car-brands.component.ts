import { Component, OnInit } from '@angular/core';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.css']
})
export class CarBrandsComponent implements OnInit {

  listOfData = [];
  isAdmin: boolean;
  isAgent: boolean;
  isSimpleUser: boolean;
  brandName: any = '';
  brandCountry: any = '';

  private user: any;

  constructor(private carBrandService: CarBrandService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
    this.setupUser();
    this.setupUserRole();
  }

  private setupData(): void {
    this.carBrandService.getAllCarBrands().subscribe(data => {
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

  update(id): void {
    this.router.navigateByUrl(`dashboard/${id}/car-brand`);
  }

  delete(id): void {
    this.carBrandService.deleteCarBrand(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car brand.');
    });
    this.brandName = '';
    this.brandCountry = '';
  }

  search(): void {
    const filteredObject = {
      brandName: this.brandName,
      brandCountry: this.brandCountry
    }
    this.carBrandService.getCarBrandsWithFilter(filteredObject).subscribe(data => {
      this.listOfData = data;
    })
  }
}
