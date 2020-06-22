import { Component, OnInit } from '@angular/core';
import { GearshiftTypeService } from 'src/app/services/gearshift-type.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-gearshift-types',
  templateUrl: './gearshift-types.component.html',
  styleUrls: ['./gearshift-types.component.css']
})
export class GearshiftTypesComponent implements OnInit {

  listOfData = [];
  isAdmin: boolean;
  isAgent: boolean;
  isSimpleUser: boolean;
  gearshiftType: any = '';
  numberOfGears: any = '';

  private user: any;

  constructor(private gearshiftTypeService: GearshiftTypeService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
    this.setupUser();
    this.setupUserRole();
  }

  private setupData(): void {
    this.gearshiftTypeService.getAllGearshiftTypes().subscribe(data => {
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
    this.gearshiftTypeService.deleteGearshiftType(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    });
    this.gearshiftType = '';
    this.numberOfGears = '';
  }

  search(): void {
    const filteredObject = {
      type: this.gearshiftType,
      numberOfGears: this.numberOfGears
    }
    this.gearshiftTypeService.getGearshiftTypessWithFilter(filteredObject).subscribe(data => {
      this.listOfData = data;
    })
  }
}
