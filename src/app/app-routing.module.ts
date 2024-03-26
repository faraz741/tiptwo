import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodaysRacesComponent } from './races/todays-races/todays-races.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRacesComponent } from './races/create-races/create-races.component';
import { CreateTipsComponent } from './tips/create-tips/create-tips.component';
import { TipsComponent } from './tips/tips/tips.component';
import { TodaysTipsComponent } from './tips/todays-tips/todays-tips.component';
import { ResultsComponent } from './races/results/results.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helper/auth.guard';
import { Section1Component } from './home_management/section1/section1.component';
import { Section2Component } from './home_management/section2/section2.component';
import { Section3Component } from './home_management/section3/section3.component';
import { Section4Component } from './home_management/section4/section4.component';
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
import {HomeAuthGuard} from './helper/home-auth.guard';
import { TheSystemComponent } from './how_it_works/the-system/the-system.component';
import { OnTheDayComponent } from './how_it_works/on-the-day/on-the-day.component';
import { HorseRacingTipsComponent } from './horse-racing-tips/horse-racing-tips.component';
import { FAQComponent } from './how_it_works/faq/faq.component';
import { VenueCityManagementComponent } from './venue-city-management/venue-city-management.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
const routes: Routes = [
  {path:'home',canActivate:[HomeAuthGuard], component:LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'todays_race', component:TodaysRacesComponent, canActivate:[AuthGuard]},
  {path:'create_races', component:CreateRacesComponent, canActivate:[AuthGuard]},
  {path:'addTips/:race_id', component:CreateTipsComponent, canActivate:[AuthGuard]},
  {path:'allTips', component:TipsComponent, canActivate:[AuthGuard]},
  {path:'todaysTips', component:TodaysTipsComponent, canActivate:[AuthGuard]},
  {path:'result/:race_id', component:ResultsComponent, canActivate:[AuthGuard]},
  {path:'section1', component:Section1Component, canActivate:[AuthGuard]},
  {path:'section2', component:Section2Component, canActivate:[AuthGuard]},
  {path:'section3', component:Section3Component, canActivate:[AuthGuard]},
  {path:'section4', component:Section4Component, canActivate:[AuthGuard]},
  {path:'horses', component:HorsesComponent, canActivate:[AuthGuard]},
  {path:'tips_manage', component:TipsManagementComponent, canActivate:[AuthGuard]},
  {path:'venue_manage', component:VenueManagementComponent, canActivate:[AuthGuard]},
  {path:'contact_us', component:ContactManagementComponent, canActivate:[AuthGuard]},
  {path:'contacts', component:ContactsComponent, canActivate:[AuthGuard]},
  {path:'misc', component:MiscellaneousComponent, canActivate:[AuthGuard]},
  {path:'racesManage', component:RacesManagementComponent, canActivate:[AuthGuard]},
  {path:'users', component:UsersListComponent, canActivate:[AuthGuard]},
  {path:'usersBettingDetails/:id', component:UserBettingDetailsComponent, canActivate:[AuthGuard]},
  {path:'usertransactionDetails/:id', component:TransactionsComponent, canActivate:[AuthGuard]},
  {path:'system', component:TheSystemComponent, canActivate:[AuthGuard]},
  {path:'theDay', component:OnTheDayComponent, canActivate:[AuthGuard]},
  {path:'horseRacingTips', component:HorseRacingTipsComponent, canActivate:[AuthGuard]},
  {path:'FAQ', component:FAQComponent, canActivate:[AuthGuard]},
  {path:'venueCity', component:VenueCityManagementComponent, canActivate:[AuthGuard]},
  {path:'terms_Conditions', component:TermsConditionsComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
