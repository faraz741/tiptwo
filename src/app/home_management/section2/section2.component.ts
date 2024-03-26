import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.css']
})
export class Section2Component {
  section2!: FormGroup;
  homeData: any[] = []
  imageURl = API_URL.image
  uploadedFiles!: File;
  loader = false
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {

  }

  ngOnInit() {
    this.section2 = this.fb.group({
      heading_1: ['', [Validators.required]],
      sub_heading_1: ['', [Validators.required]],
      description_1: ['', [Validators.required]],
      heading_2: ['', [Validators.required]],
      sub_heading_2: ['', [Validators.required]],
      description_2: ['', [Validators.required]],
      heading_3: ['', [Validators.required]],
      sub_heading_3: ['', [Validators.required]],
      description_3: ['', [Validators.required]],
    })
    this.getSectionData()
  };

  getSectionData() {
    this.appService.get(API_URL.getSection2).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.homeData = res.data
          this.section2.get('heading_1')?.patchValue(res.data[0].heading_1)
          this.section2.get('sub_heading_1')?.patchValue(res.data[0].sub_heading_1)
          this.section2.get('description_1')?.patchValue(res.data[0].description_1)
          this.section2.get('heading_2')?.patchValue(res.data[0].heading_2)
          this.section2.get('sub_heading_2')?.patchValue(res.data[0].sub_heading_2)
          this.section2.get('description_2')?.patchValue(res.data[0].description_2)
          this.section2.get('heading_3')?.patchValue(res.data[0].heading_3)
          this.section2.get('sub_heading_3')?.patchValue(res.data[0].sub_heading_3)
          this.section2.get('description_3')?.patchValue(res.data[0].description_3)
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
    console.log(data)
    data.markAllAsTouched();
    if (data.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append('heading_1', data.value.heading_1);
    formData.append('sub_heading_1', data.value.sub_heading_1);
    formData.append('description_1', data.value.description_1);
    formData.append('heading_2', data.value.heading_2);
    formData.append('sub_heading_2', data.value.sub_heading_2);
    formData.append('description_2', data.value.description_2);
    formData.append('heading_3', data.value.heading_3);
    formData.append('sub_heading_3', data.value.sub_heading_3);
    formData.append('description_3', data.value.description_3);

    // Fetch the input element where the user uploads the image
    const fileInput = document.getElementById("exampleInputFile") as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const uploadedFile = fileInput.files[0];
      formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
    }

    this.appService.imagepost(API_URL.updatehomesection_2, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loader = false
        if (res.success == true) {
          fileInput.value = ''
          // formData.reset();
          this.getSectionData()
          Swal.fire(
            res.message,
            '',
            'success'
          )
          // this.toastr.success('login successfully');


        } else {
          fileInput.value = ''
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
