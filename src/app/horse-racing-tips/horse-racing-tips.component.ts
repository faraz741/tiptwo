import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/apiRoute';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-horse-racing-tips',
  templateUrl: './horse-racing-tips.component.html',
  styleUrls: ['./horse-racing-tips.component.css']
})
export class HorseRacingTipsComponent {
  tipForm!:FormGroup;
  homeData:any[]=[];
  imageURl= API_URL.image
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {

  }
  ngOnInit() {
    this.tipForm = this.fb.group({
      heading1: ['', [Validators.required]],
      description1: ['', [Validators.required]],
      heading2: ['', [Validators.required]],
      heading3: ['', [Validators.required]],
      description2: ['', [Validators.required]],
      description3: ['', [Validators.required]],
     
    })
    this.getSectionData()
  };

  getSectionData(){
    this.appService.get(API_URL.getHorseRacingTips).subscribe({
      next:(res:any)=>{
      
        // this.loader = false
        if(res.success == true){
          this.homeData= res.data
          this.tipForm.get('heading1')?.patchValue(res.data[0].heading_1)
          this.tipForm.get('description1')?.patchValue(res.data[0].description_1)
          this.tipForm.get('description2')?.patchValue(res.data[0].description_2)
          this.tipForm.get('description3')?.patchValue(res.data[0].description_3)
          this.tipForm.get('heading2')?.patchValue(res.data[0].heading_2)
          this.tipForm.get('heading3')?.patchValue(res.data[0].heading_3)
        
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


onUpdate(data:any){

  data.markAllAsTouched();
  if (data.invalid) {
    return;
  }
  let formData = new URLSearchParams();
  formData.set('heading1', data.value.heading1);
  formData.set('heading2', data.value.heading2);
  formData.set('heading3', data.value.heading3);
  formData.set('description1', data.value.description1);
  formData.set('description2', data.value.description2);
  formData.set('description3', data.value.description3);

 
  
  this.appService.post(API_URL.update_horse_racing_tips, formData).subscribe({
    next:(res:any)=>{
      
      // this.loader = false
      if(res.success == true){
        // formData.reset();
        this.getSectionData()
        Swal.fire(
          res.message,
          '',
          'success'
        )
        // this.toastr.success('login successfully');
       
        
      }else{
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
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
}

}
