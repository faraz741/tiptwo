import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  raceId!: any;
  raceData: any[] = [];
  result: any[] = [];
  result_1:string=''
  result_2: string=''
  form!: FormGroup;
  allResult: any[] = [];
  submitBtn = true
  

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      tips: this.fb.array([
        this.createTip(), // Create the first row
        this.createTip()  // Create the second row
      ])
    });
  }

  // Helper function to create a tip FormGroup
  createTip() {
    return this.fb.group({
      id: ['', [Validators.required]],
      result: ['', [Validators.required]],

    });
  };

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.raceId = params['race_id']
    });
    this.getRaceDetails();
  };

  getRaceDetails() {
    this.appService.get(API_URL.getTipsByRaceId + this.raceId).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.raceData = res.data
          if(this.raceData[0].result != null){
            this.result_1 = this.raceData[0].result
            this.result_2 = this.raceData[1].result
            this.submitBtn = false
          }
          this.setInitialFormValues()
        } else {
          Swal.fire(
            res.message,
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
  };

  
  setInitialFormValues() {
    const tipsFormArray = this.form.get('tips') as FormArray;
    for (let i = 0; i < this.raceData.length; i++) {
      tipsFormArray.at(i).get('id')?.patchValue(this.raceData[i].id);
    }
  }

  onSubmit() {
    const formValue = this.form.value;
    console.log(this.form);
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

    this.appService.post(API_URL.resultdeclaration, (bodyPayload)).subscribe({
      next: (res: any) => {
        console.log(res)

        if (res.success == true) {
          this.form.reset();
          this.router.navigate(['todays_race'])
          Swal.fire(
            'Results updated successfully!',
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
