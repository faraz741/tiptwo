import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-tips',
  templateUrl: './create-tips.component.html',
  styleUrls: ['./create-tips.component.css']
})
export class CreateTipsComponent {
  tipsForm!: FormGroup;
  secondForm!: FormGroup;
  form!: FormGroup;
  raceId: any;
  raceData:any[]=[]
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(res => {
      console.log(res)
      this.raceId = res['race_id']
      console.log(this.raceId)
    })
    this.form = this.fb.group({
      tips: this.fb.array([
        this.createTip(), // Create the first row
        this.createTip()  // Create the second row
      ])
    });
  };

  // Helper function to create a tip FormGroup
  createTip() {
    return this.fb.group({
      horse_name: ['',[Validators.required]],
      horse_number: ['',[Validators.required]],
      odds: ['',[Validators.required]],
      tipTwoRating: ['',[Validators.required]],
      tipTwoProbability: ['',[Validators.required]],
      currentPriceRandR: ['',[Validators.required]]
    });
  };


  ngOnInit() {
    this.getRaceById();
  }
  getRaceById() {
    this.appService.get(API_URL.getRaceById + this.raceId).subscribe({
      next: (res: any) => {
        console.log(res)

        if (res.success == true) {
          this.raceData = res.data
          // this.form.reset();
          // this.router.navigate(['todays_race'])
          // this.toastr.success('login successfully');


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

  // Getter for the form array
  get tips() {
    return this.form.get('tips') as FormArray;
  }


  onAdd() {
    const formValue = this.form.value;
    console.log("valyess",this.form);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      Swal.fire('Please fill all the fields')
      return;
    }
    let bodyPayload = new URLSearchParams();
    // Assuming formValue.tips is an array
    const serializedArray = JSON.stringify(formValue.tips);
    bodyPayload.set('data', serializedArray);
    bodyPayload.set('race_id', this.raceId);


    this.appService.post(API_URL.todays_tips, (bodyPayload)).subscribe({
      next: (res: any) => {
        console.log(res)

        if (res.success == true) {
          this.form.reset();
          this.router.navigate(['todaysTips'])
          Swal.fire(
            'Tips Created Successfully!',
            '',
            'success'
          )
        } else {
          Swal.fire(
            res.message,
            '',
            'warning'
          )
   
        }
      },
      error: err => {
        console.log(err)
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  }

}
