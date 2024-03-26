import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private authService: AuthService) {
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }

}
