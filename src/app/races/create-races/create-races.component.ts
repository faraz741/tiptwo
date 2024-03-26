import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-races',
  templateUrl: './create-races.component.html',
  styleUrls: ['./create-races.component.css']
})
export class CreateRacesComponent {
  createRace!:FormGroup;
  loader =false;
  tipsData:any[]=[];
  cityData:any[]=[];
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {
  }

  ngOnInit() {
    this.createRace = this.fb.group({
      race_venue: [null, [Validators.required]],
      city: [null, [Validators.required]],
      race_date: ['', [Validators.required]],
      race_number: ['', [Validators.required]],
      race_time: ['', [Validators.required]],
      qualify: ['', ],
      points: ['', ],
      bet_number: ['', [Validators.required]],
    })
     this.getCities();
     this.getVenues()
  }

  onAdd(formData:any){
    console.log(formData)
    formData.markAllAsTouched();
    if (formData.invalid) {
      return;
    }
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('race_venue', formData.value.race_venue)
    bodyPayload.set('city', formData.value.city)
    bodyPayload.set('race_number', formData.value.race_number)
    bodyPayload.set('race_date', formData.value.race_date)
    bodyPayload.set('race_time', formData.value.race_time)
    bodyPayload.set('qualify', formData.value.qualify)
    bodyPayload.set('points', formData.value.points)
    bodyPayload.set('bet_number', formData.value.bet_number)

    this.appService.post(API_URL.create_race, bodyPayload.toString()).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.loader = false
        if(res.success == true){
          formData.reset();
          this.router.navigate(['todays_race'])
          Swal.fire(
            'Race Created Successfully!',
            '',
            'success'
          )
          // this.toastr.success('login successfully');
         
          
        }else{
          // this.toastr.error(res.message);
        }
      },
      error:err=>{
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };


  getVenues(){
    this.appService.get(API_URL.getVeneus).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          this.tipsData= res.data
        }else{
          // this.toastr.error(res.message);
        }
      },
      error:err=>{
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };

  
  getCities(){
    this.appService.get(API_URL.getCities).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          this.cityData= res.data
        }else{
          // this.toastr.error(res.message);
        }
      },
      error:err=>{
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };
}
