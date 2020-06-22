import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
  
  search(): void {
    this.router.navigateByUrl('dashboard/regular-search');
  }

  createCarBrand(): void {
    this.router.navigateByUrl('dashboard/car-brand');
  }

  createCarClass(): void {
    this.router.navigateByUrl('dashboard/car-class');
  }

  createCarModel(): void {
    this.router.navigateByUrl('dashboard/car-model');
  }

  createGearshiftType(): void {
    this.router.navigateByUrl('dashboard/gearshift-type');
  }

  createFuelType(): void {
    this.router.navigateByUrl('dashboard/fuel-type');
  }

}
