import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthGuard implements CanActivate {
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private authService:AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.getUser();
      if (isAuth) {
        this.router.navigate(['/todays_race']);
      } 

      return true;
  }
  
}
