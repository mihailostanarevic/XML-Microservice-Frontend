import { Component, OnInit } from '@angular/core';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-fuel-types',
  templateUrl: './fuel-types.component.html',
  styleUrls: ['./fuel-types.component.css']
})
export class FuelTypesComponent implements OnInit {

  listOfData = [];
  isAdmin: boolean;
  isAgent: boolean;
  isSimpleUser: boolean;
  fuelType: any = '';
  tankCapacity: any = '';

  private user: any;

  constructor(private fuelTypeService: FuelTypeService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
    this.setupUser();
    this.setupUserRole();
  }

  private setupData(): void {
    this.fuelTypeService.getAllFuelTypes().subscribe(data => {
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

  gas(gas): String {
    if(gas){
      return "has";
    }
    return "doesn't have";
  }

  delete(id): void {
    this.fuelTypeService.deleteFuelType(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    });
    this.fuelType = '';
    this.tankCapacity = '';
  }

  search(): void {
    const filteredObject = {
      type: this.fuelType,
      tankCapacity: this.tankCapacity
    }
    this.fuelTypeService.getFuelTypessWithFilter(filteredObject).subscribe(data => {
      this.listOfData = data;
    })
  }
}
