import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.css']
})
export class Section3Component {
  uploadedFiles!: File ;
  homeData:any[]=[];
  imageURl= API_URL.image;
  @ViewChild('closeModal') closeModal!:ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {
  }

  ngOnInit() {
    this.getSectionData()
  };

  
  PreviewImage() {
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview") as HTMLImageElement; // Assuming uploadPreview is an img element

    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };

    // Assuming you have an input element with the type 'file' where users can select an image
    var fileInputElement = document.getElementById("exampleInputFile") as HTMLInputElement;

    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }

  getSectionData(){
    this.appService.get(API_URL.getSection3).subscribe({
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

 

  onAdd(){
    let formData = new FormData();
       // Fetch the input element where the user uploads the image
       const fileInput = document.getElementById("exampleInputFile") as HTMLInputElement;
       var fileInput2 = document.getElementById("uploadPreview") as HTMLImageElement;

       if (fileInput.files && fileInput.files[0]) {
         const uploadedFile = fileInput.files[0];
         formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
       }
    this.appService.imagepost(API_URL.upload3, formData).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          fileInput.value = '';
          fileInput2.src = '';
          this.closeModal.nativeElement.click();
          Swal.fire(
            'Added Successfully',
            '',
            'success'
          )
          this.getSectionData()
         
        
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

  deleteData(id:number){
      var result = confirm("Are you sure to delete?");
      if(result){
        this.appService.get(API_URL.deleteSection3 + id).subscribe({
          next:(res:any)=>{
            console.log(res)
            // this.loader = false
            if(res.success == true){
              // formData.reset();
              this.router.navigate(['section3'])
              this.getSectionData()
              Swal.fire(
                'Deleted Successfully!',
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
}
