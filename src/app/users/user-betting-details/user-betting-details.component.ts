import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-betting-details',
  templateUrl: './user-betting-details.component.html',
  styleUrls: ['./user-betting-details.component.css']
})
export class UserBettingDetailsComponent {
  bettingData: any[] = [];
  userData: any[] = [];
  userId: any;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(res => {
      console.log(res)
      this.userId = res['id'];
      console.log(this.userId)
    })

  }
  ngOnInit() {
    this.getBettingdetails();
    this.getUserdetails()
    // Swal.fire('Hello world!');
  }


  getBettingdetails() {
    this.appService.get(API_URL.getBettingByUserId + this.userId).subscribe({
      next: (res: any) => {
        if (res.success == true) {
          this.bettingData = res.data
        } else {
          Swal.fire(
            res.message,
            '',
            'warning'
          )
        }
      },
      error: err => {
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };

  getUserdetails() {
    this.appService.get(API_URL.getUserDetailsId + this.userId).subscribe({
      next: (res: any) => {
        if (res.success == true) {
          this.userData = res.data
        } else {
          Swal.fire(
            res.message,
            '',
            'warning'
          )
        }
      },
      error: err => {
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };

}
