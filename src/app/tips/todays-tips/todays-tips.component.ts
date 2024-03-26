import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todays-tips',
  templateUrl: './todays-tips.component.html',
  styleUrls: ['./todays-tips.component.css']
})

export class TodaysTipsComponent {
  tipsData: any[] = [];
  editData: any;
  updateTips!: FormGroup;
  @ViewChild('closeModal') private closeModal!: ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) {

  };

  ngOnInit() {
    this.getTips();
    this.updateTips = this.fb.group({
      id: ['', [Validators.required]],
      horse_name: ['', [Validators.required]],
      odds: ['', [Validators.required]],
      tipTwoRating: ['', [Validators.required]],
      tipTwoProbability: ['', [Validators.required]],
      currentPriceRandR: ['', [Validators.required]],

    })
  }


  getTips() {
    this.appService.get(API_URL.get_todaystips).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.tipsData = res.data
      
        } else {
          // this.toastr.error(res.message);
        }
      },
      error: err => {
        // this.toastr.error('Something went wrong');
        // this.loader = false
      }
    })
  };

  onEditTips(tipId: any) {
    this.appService.get(API_URL.getTipsById + tipId

    ).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.editData = res.data[0]
          this.updateTips.patchValue(
            {
              horse_name: this.editData.horse_name,
              tipTwoRating: this.editData.tipTwoRating,
              odds: this.editData.odds,
              id: this.editData.id,
              tipTwoProbability: this.editData.tipTwoProbability,
              currentPriceRandR: this.editData.currentPriceRandR
            }
          )


        } else {
          // this.toastr.error(res.message);
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

  onUpdateTips(data: any) {
    this.updateTips.markAllAsTouched();
    if (this.updateTips.invalid) {
      return;
    }
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('id', data.value.id)
    bodyPayload.set('horse_name', data.value.horse_name)
    bodyPayload.set('odds', data.value.odds)
    bodyPayload.set('tipTwoRating', data.value.tipTwoRating)
    bodyPayload.set('tipTwoProbability', data.value.tipTwoProbability)
    bodyPayload.set('currentPriceRandR', data.value.currentPriceRandR)
  
    this.appService.post(API_URL.updateTip, bodyPayload.toString()).subscribe({
      next: (res: any) => {
      
        // this.loader = false
        if (res.success == true) {
          this.updateTips.reset();
          
          Swal.fire(
            'Tip updated Successfully!',
            '',
            'success'
          )
          this.closeModal.nativeElement.click(); 
          this.getTips();
        } else {
          Swal.fire(
            'Unable to update tips',
            '',
            'error'
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

  }




}
