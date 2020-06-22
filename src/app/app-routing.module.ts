import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LightSearchComponent } from './pages/search-forms/light-search/light-search.component';
import { AgentRentComponent } from './pages/ad/agent-rent/agent-rent.component';
import { CreateAdComponent } from './pages/ad/create-ad/create-ad.component';
import { AgentRequestsComponent } from './pages/request/agent-requests/agent-requests.component';
import { SimpleUserRequestsComponent } from './pages/request/simple-user-requests/simple-user-requests.component';
import { CartComponent } from './pages/cart/cart.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/registration', component: RegistrationComponent},
  { path: 'auth/limit-redirect', component: LimitRedirectComponent},

  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: 'regular-search', component: LightSearchComponent},
      { path: 'agent-rent', component: AgentRentComponent},
      { path: 'create-ad', component: CreateAdComponent},
      { path: 'cart', component: CartComponent},
      { path: 'agent/requests', component: AgentRequestsComponent},
      { path: 'user/requests', component: SimpleUserRequestsComponent}
    ],

  },

 ];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
