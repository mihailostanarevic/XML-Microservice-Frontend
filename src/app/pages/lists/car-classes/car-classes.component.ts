import { Component, OnInit } from '@angular/core';
import { CarClassService } from 'src/app/services/car-class.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car-classes',
  templateUrl: './car-classes.component.html',
  styleUrls: ['./car-classes.component.css']
})
export class CarClassesComponent implements OnInit {

  listOfData = [];
  isAdmin: boolean;
  isAgent: boolean;
  isSimpleUser: boolean;
  className: any = '';

  private user: any;

  constructor(private carClassService: CarClassService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
    this.setupUser();
    this.setupUserRole();
  }

  private setupData(): void {
    this.carClassService.getAllCarClasses().subscribe(data => {
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
    this.router.navigateByUrl(`dashboard/${id}/car-class`);
  }

  delete(id): void {
    this.carClassService.deleteCarClass(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    });
    this.className = '';
  }

  search(): void {
    const filteredObject = {
      className: this.className
    }
    this.carClassService.getCarClassesWithFilter(filteredObject).subscribe(data => {
      this.listOfData = data;
    })
  }
}
