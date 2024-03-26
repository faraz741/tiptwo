import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { API_URL } from '../helper/apiRoute';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venue-city-management',
  templateUrl: './venue-city-management.component.html',
  styleUrls: ['./venue-city-management.component.css']
})
export class VenueCityManagementComponent {
  cityAdd!:FormGroup;
  venueAdd!:FormGroup;
  tipsData:any[]=[];
  cityData:any[]=[];

  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {
  }

  ngOnInit() {
    this.cityAdd = this.fb.group({
      city: ['', [Validators.required]],
    })
    this.venueAdd = this.fb.group({
      venue: ['', [Validators.required]],
    })
    this.getVenues();
    this.getCities()
  }

  onCityAdd(cityFormData:any){
    console.log(cityFormData)
    cityFormData.markAllAsTouched();
    if (cityFormData.invalid) {
      return;
    }
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('city', cityFormData.value.city)


    this.appService.post(API_URL.upload_cities, bodyPayload.toString()).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          cityFormData.reset();
          this.getCities()
          Swal.fire(
            'City Created Successfully!',
            '',
            'success'
          )
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

  onVenueAdd(formData:any){
    console.log(formData)
    formData.markAllAsTouched();
    if (formData.invalid) {
      return;
    }
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('venue', formData.value.venue)


    this.appService.post(API_URL.upload_venues, bodyPayload.toString()).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          formData.reset();
          this.getVenues()
          Swal.fire(
            'Venue Created Successfully!',
            '',
            'success'
          )
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
