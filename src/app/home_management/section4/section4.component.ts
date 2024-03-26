import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.css']
})
export class Section4Component {
  section4Form!:FormGroup
  homeData:any[]=[];
  imageURl= API_URL.image
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {

  }
  ngOnInit() {
    this.section4Form = this.fb.group({
      heading: ['', [Validators.required]],
      description1: ['', [Validators.required]],
      description2: ['', [Validators.required]],
      description3: ['', [Validators.required]],
      description4: ['', [Validators.required]],
      description5: ['', [Validators.required]],
      description6: ['', [Validators.required]],
      description7: ['', [Validators.required]],
      description8: ['', [Validators.required]],
    })
    this.getSectionData()
  };

  getSectionData(){
    this.appService.get(API_URL.getSection4).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          this.homeData= res.data
          this.section4Form.get('heading')?.patchValue(res.data[0].heading)
          this.section4Form.get('description1')?.patchValue(res.data[0].description1)
          this.section4Form.get('description2')?.patchValue(res.data[0].description2)
          this.section4Form.get('description3')?.patchValue(res.data[0].description3)
          this.section4Form.get('description4')?.patchValue(res.data[0].description4)
          this.section4Form.get('description5')?.patchValue(res.data[0].description5)
          this.section4Form.get('description6')?.patchValue(res.data[0].description6)
          this.section4Form.get('description7')?.patchValue(res.data[0].description7)
          this.section4Form.get('description8')?.patchValue(res.data[0].description8)
       
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
  console.log(data)
  data.markAllAsTouched();
  if (data.invalid) {
    return;
  }
  let formData = new URLSearchParams();
  formData.set('heading', data.value.heading);
  formData.set('description1', data.value.description1);
  formData.set('description2', data.value.description2);
  formData.set('description3', data.value.description3);
  formData.set('description4', data.value.description4);
  formData.set('description5', data.value.description5);
  formData.set('description6', data.value.description6);
  formData.set('description7', data.value.description7);
  formData.set('description8', data.value.description8);
 
  
  this.appService.post(API_URL.updatehomesection_4, formData).subscribe({
    next:(res:any)=>{
      console.log(res)
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
