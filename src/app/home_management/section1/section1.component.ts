import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.css']
})
export class Section1Component {
  section1Form!: FormGroup;
  uploadedFiles!: File;
  loader = false
  homeData: any[] = []
  imageURl = API_URL.image
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {

  }

  ngOnInit() {
    this.section1Form = this.fb.group({
      title: ['', [Validators.required]],
      join_link: ['', [Validators.required]],
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
  getSectionData() {
    this.appService.get(API_URL.getSection1).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.homeData = res.data
          this.section1Form.get('title')?.patchValue(this.homeData[0].title)
          this.section1Form.get('join_link')?.patchValue(this.homeData[0].join_link)
        } else {
          // this.toastr.error(res.message);
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

  onUpdate(data: any) {
    console.log(data.value.title)
    data.markAllAsTouched();
    if (data.invalid) {
      return;
    }
    let formData = new FormData();
    formData.append('title', data.value.title);
    formData.append('join_link', data.value.join_link);

    // Fetch the input element where the user uploads the image
    const fileInput = document.getElementById("exampleInputFile") as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const uploadedFile = fileInput.files[0];
      formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
    }


    this.appService.imagepost(API_URL.updatehomesection_1, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loader = false
        if (res.success == true) {
          // formData.reset();
          this.getSectionData()
          fileInput.value = ''
          Swal.fire(
            res.message,
            '',
            'success'
          )
          // this.toastr.success('login successfully');


        } else {
          Swal.fire(
            'Something went wrong',
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
  }


}