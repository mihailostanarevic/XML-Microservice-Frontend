import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularSplitModule } from 'angular-split';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule, NZ_ICONS, NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd/icon';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthEffects } from './auth/store/auth.effects';
import { AdCardComponent } from './pages/ad-card/ad-card.component';
import { AgentRentComponent } from './pages/ad/agent-rent/agent-rent.component';
import { CreateAdComponent } from './pages/ad/create-ad/create-ad.component';
import { CartComponent } from './pages/cart/cart.component';
import { CarBrandComponent } from './pages/create-forms/car-brand/car-brand.component';
import { CarClassComponent } from './pages/create-forms/car-class/car-class.component';
import { CarModelComponent } from './pages/create-forms/car-model/car-model.component';
import { FuelTypeComponent } from './pages/create-forms/fuel-type/fuel-type.component';
import { GearshiftTypeComponent } from './pages/create-forms/gearshift-type/gearshift-type.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdDetailsComponent } from './pages/details/ad-details/ad-details.component';
import { AgentRequestsComponent } from './pages/request/agent-requests/agent-requests.component';
import { SimpleUserRequestsComponent } from './pages/request/simple-user-requests/simple-user-requests.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { LightSearchComponent } from './pages/search-forms/light-search/light-search.component';
import * as fromApp from './store/app.reducer';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LimitRedirectComponent,
    DashboardComponent,
    LightSearchComponent,
    AdCardComponent,
    AdDetailsComponent,
    ReservationsComponent,
    CarBrandComponent,
    CarModelComponent,
    FuelTypeComponent,
    GearshiftTypeComponent,
    CarClassComponent,
    CreateAdComponent,
    AgentRentComponent,
    CartComponent,
    AgentRequestsComponent,
    SimpleUserRequestsComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    NzFormModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzIconModule,
    AngularSplitModule.forRoot(),
    CommonModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, AuthEffects])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
  { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
