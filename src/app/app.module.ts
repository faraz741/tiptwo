import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TodaysRacesComponent } from './races/todays-races/todays-races.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRacesComponent } from './races/create-races/create-races.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TipsComponent } from './tips/tips/tips.component';
import { CreateTipsComponent } from './tips/create-tips/create-tips.component';
import { TodaysTipsComponent } from './tips/todays-tips/todays-tips.component';
import { ResultsComponent } from './races/results/results.component';
import { Section1Component } from './home_management/section1/section1.component';
import { Section2Component } from './home_management/section2/section2.component';
import { Section4Component } from './home_management/section4/section4.component';
import { Section3Component } from './home_management/section3/section3.component';
import { HorsesComponent } from './horses_management/horses/horses.component';
import { TipsManagementComponent } from './tips_management/tips-management/tips-management.component';
import { VenueManagementComponent } from './venue-management/venue-management.component';
import { ContactManagementComponent } from './contactUs_management/contact-management/contact-management.component';
import { ContactsComponent } from './contactUs_management/contacts/contacts.component';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { RacesManagementComponent } from './races-management/races-management.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserBettingDetailsComponent } from './users/user-betting-details/user-betting-details.component';
import { TransactionsComponent } from './users/transactions/transactions.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TheSystemComponent } from './how_it_works/the-system/the-system.component';
import { OnTheDayComponent } from './how_it_works/on-the-day/on-the-day.component';
import { HorseRacingTipsComponent } from './horse-racing-tips/horse-racing-tips.component';
import { FAQComponent } from './how_it_works/faq/faq.component';
import { VenueCityManagementComponent } from './venue-city-management/venue-city-management.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    TodaysRacesComponent,
    DashboardComponent,
    CreateRacesComponent,
    TipsComponent,
    CreateTipsComponent,
    TodaysTipsComponent,
    ResultsComponent,
    Section1Component,
    Section2Component,
    Section4Component,
    Section3Component,
    HorsesComponent,
    TipsManagementComponent,
    VenueManagementComponent,
    ContactManagementComponent,
    ContactsComponent,
    MiscellaneousComponent,
    RacesManagementComponent,
    UsersListComponent,
    UserBettingDetailsComponent,
    TransactionsComponent,
    TheSystemComponent,
    OnTheDayComponent,
    HorseRacingTipsComponent,
    FAQComponent,
    VenueCityManagementComponent,
    TermsConditionsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule, HttpClientModule,CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
