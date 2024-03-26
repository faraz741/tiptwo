import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent {
  contactUsForm!:FormGroup;
  uploadedFiles!: File ;
  loader =false
  homeData:any[]=[]
  imageURl= API_URL.image
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {

  }

  ngOnInit() {
    this.contactUsForm = this.fb.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
    this.getSectionData()
  };

//   onUpdate(formData:any){
//     console.log(formData)
//     formData.markAllAsTouched();
//     if (formData.invalid) {
//       return;
//     }

// };
getSectionData(){
  this.appService.get(API_URL.getContactManagement).subscribe({
    next:(res:any)=>{
      console.log(res)
      // this.loader = false
      if(res.success == true){
        this.homeData= res.data
        this.contactUsForm.get('id')?.patchValue(this.homeData[0].id)
        this.contactUsForm.get('email')?.patchValue(this.homeData[0].email)
        this.contactUsForm.get('phone')?.patchValue(this.homeData[0].phone)
        this.contactUsForm.get('address')?.patchValue(this.homeData[0].address)
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


fileChange(element:any) {
  this.uploadedFiles = element.target.files[0];
}

onUpdate(data:any){
  console.log(data.value.id)
  data.markAllAsTouched();
  if (data.invalid) {
    return;
  }
  let bodyPayload = new URLSearchParams();
  bodyPayload.set('id', data.value.id)
  bodyPayload.set('email', data.value.email)
  bodyPayload.append('phone', data.value.phone);
  bodyPayload.append('address', data.value.address);
 
  this.appService.post(API_URL.updateContactCms, bodyPayload.toString()).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.loader = false
      if(res.success == true){
        // formData.reset();
       
        Swal.fire(
          'Updated Successfully!',
          '',
          'success'
        )
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
