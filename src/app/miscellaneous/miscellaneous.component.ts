import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/apiRoute';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent {
  section1Form!:FormGroup;
  uploadedFiles!: File ;
  loader =false
  homeData:any[]=[]
  imageURl= API_URL.image
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {

  }

  ngOnInit() {
    this.getSectionData()
  };


getSectionData(){
  this.appService.get(API_URL.getMisc).subscribe({
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


PreviewImage(items:string) {
  if(items == 'horse'){
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview1") as HTMLImageElement; 
    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };
    var fileInputElement = document.getElementById("exampleInputFile1") as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }else if(items == 'tips'){
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview2") as HTMLImageElement; 
    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };
    var fileInputElement = document.getElementById("exampleInputFile2") as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }else if(items == 'venue'){
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview3") as HTMLImageElement; 
    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };
    var fileInputElement = document.getElementById("exampleInputFile3") as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }else if(items == 'races'){
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview4") as HTMLImageElement; 
    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };
    var fileInputElement = document.getElementById("exampleInputFile4") as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }else if(items  == 'contact'){
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview5") as HTMLImageElement; 
    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };
    var fileInputElement = document.getElementById("exampleInputFile5") as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }
}

onUpdate(){
  let formData = new FormData();
  // Fetch the input element where the user uploads the image
  const fileInput = document.getElementById("exampleInputFile1") as HTMLInputElement;
  const fileInput2 = document.getElementById("exampleInputFile2") as HTMLInputElement;
  const fileInput3 = document.getElementById("exampleInputFile3") as HTMLInputElement;
  const fileInput4 = document.getElementById("exampleInputFile4") as HTMLInputElement;
  const fileInput5 = document.getElementById("exampleInputFile5") as HTMLInputElement;

  if (fileInput.files && fileInput.files[0]) {
    const uploadedFile = fileInput.files[0];
    formData.append('horseImage', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
  }
  if (fileInput2.files && fileInput2.files[0]) {
    const uploadedFile = fileInput2.files[0];
    formData.append('tipsImage', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
  }
  if (fileInput3.files && fileInput3.files[0]) {
    const uploadedFile = fileInput3.files[0];
    formData.append('venueImage', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
  }
  if (fileInput4.files && fileInput4.files[0]) {
    const uploadedFile = fileInput4.files[0];
    formData.append('racesImage', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
  }
  if (fileInput5.files && fileInput5.files[0]) {
    const uploadedFile = fileInput5.files[0];
    formData.append('contactImage', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
  }
  
 
  this.appService.imagepost(API_URL.updateMisc, formData).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.loader = false
      if(res.success == true){
        Swal.fire(
          'Miscellaneous Page updated Successfully!',
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
};


}
