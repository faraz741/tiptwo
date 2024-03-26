import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
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
  this.appService.get(API_URL.getContacts).subscribe({
    next:(res:any)=>{
      console.log(res)
      // this.loader = false
      if(res.success == true){
        this.homeData= res.data
    
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
