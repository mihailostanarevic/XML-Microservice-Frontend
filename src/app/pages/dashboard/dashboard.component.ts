import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions';
import * as CartActions from '../../cart/store/cart.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private user: any;
  public isAdmin: boolean;
  public isAgent: boolean;
  public isSimpleUser: boolean;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupUserRole();
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

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
    this.store.dispatch(new CartActions.ClearCart());
    this.router.navigateByUrl('auth/login');
  }

  search(): void {
    this.router.navigateByUrl('dashboard/regular-search');
  }

  carBrands(): void {
    this.router.navigateByUrl('dashboard/car-brands');
  }

  carClasses(): void {
    this.router.navigateByUrl('dashboard/car-classes');
  }

  carModels(): void {
    this.router.navigateByUrl('dashboard/car-models');
  }

  gearshiftTypes(): void {
    this.router.navigateByUrl('dashboard/gearshift-types');
  }

  fuelTypes(): void {
    this.router.navigateByUrl('dashboard/fuel-types');
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

  createAd(): void {
    this.router.navigateByUrl('dashboard/create-ad');
  }

  changeAvailability(): void {
    this.router.navigateByUrl('dashboard/agent-rent');
  }

  showCart(): void {
    this.router.navigateByUrl('dashboard/cart');
  }

  agentRequests(): void {
    this.router.navigateByUrl('dashboard/agent/requests');
  }

  simpleUserRequests(): void {
    this.router.navigateByUrl('dashboard/user/requests');
  }

  commentRequests(): void {
    this.router.navigateByUrl('dashboard/pending-comments');
  }

  reservations(): void {
    this.router.navigateByUrl('dashboard/reservations');
  }

  adminRoleList(): void {
    this.router.navigateByUrl('dashboard/admin-role-list');
  }

  simpleUserCreateAd(): void {
    this.router.navigateByUrl('dashboard/create-ad');
  }
}
