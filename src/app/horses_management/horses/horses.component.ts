import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.css']
})
export class HorsesComponent {
  horsesForm!: FormGroup;
  uploadedFiles!: File;
  loader = false
  homeData: any[] = [];
  imageURl = API_URL.image;
  imagedata:any;
  @ViewChild('closeModal') closeModal!:ElementRef;
  @ViewChild('closeModal2') closeModal2!:ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {

  }

  ngOnInit() {
    this.horsesForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      age: ['', [Validators.required]],
      color: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    this.getSectionData()
  };


  getSectionData() {
    this.appService.get(API_URL.getHorsesManagement).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.homeData = res.data
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




  onAdd(data: any) {
    let formData = new FormData();
    // Fetch the input element where the user uploads the image
    const fileInput = document.getElementById("exampleInputFile") as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const uploadedFile = fileInput.files[0];
      formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
    }

    formData.append('name', data.value.name);
    formData.append('origin', data.value.origin);
    formData.append('sex', data.value.sex);
    formData.append('color', data.value.color);
    formData.append('age', data.value.age);
    formData.append('description', data.value.description);
    this.appService.imagepost(API_URL.horses_cms, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.closeModal2.nativeElement.click();
          fileInput.value = ''
          Swal.fire(
            res.message,
            '',
            'success'
          )
          this.horsesForm.reset();
          this.getSectionData()
       
        } else {
          this.closeModal2.nativeElement.click();
          fileInput.value = ''
          Swal.fire(
            res.message,
            '',
            'error'
          )
        }
      },
      error: err => {
        this.closeModal2.nativeElement.click();
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };

  openUpdateModal(id: any) {
    this.horsesForm.reset()
    // let bodyPayload = new URLSearchParams();
    // bodyPayload.set('date', data.value.date)
    this.appService.get(API_URL.get_horses_cms + id).subscribe({
      next: (res: any) => {
        
        this.loader = false
        if (res.success == true) {
          this.imagedata = res.data[0].image
          this.horsesForm.patchValue(
            {
              id: res.data[0].id,
              name: res.data[0].name,
              origin: res.data[0].origin,
              description: res.data[0].description,
              sex: res.data[0].sex,
              color: res.data[0].color,
              age: res.data[0].age
            }
          )
          
          // this.tipsForm.get('date')?.setValue(res.data[0].date)
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
  };


  onUpdate(data: any) {
    console.log(data)
    data.markAllAsTouched();
    if (data.invalid) {
      return;
    }
    let formData = new FormData();
    // Fetch the input element where the user uploads the image
    const fileInput = document.getElementById("exampleInputFile2") as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const uploadedFile = fileInput.files[0];
      formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
    }
    formData.append('id', data.value.id);
    formData.append('name', data.value.name);
    formData.append('origin', data.value.origin);
    formData.append('sex', data.value.sex);
    formData.append('age', data.value.age);
    formData.append('color', data.value.color);
    formData.append('description', data.value.description);

    this.appService.imagepost(API_URL.updateHorses_cms, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loader = false
        if (res.success == true) {
          this.closeModal.nativeElement.click();
          fileInput.value = ''
          // formData.reset();
          this.getSectionData()
          Swal.fire(
            res.message,
            '',
            'success'
            )
            this.horsesForm.reset()
        } else {
          this.closeModal.nativeElement.click();
          fileInput.value = ''
          this.horsesForm.reset()
          Swal.fire(
            res.message,
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
  };

  resetForm() {
    console.log("update home")
    this.horsesForm.reset();
    this.imagedata = ''; // Assuming you want to reset the image data as well
  }



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
  PreviewImage2() {
    var fileReader = new FileReader();
    var fileInput = document.getElementById("uploadPreview2") as HTMLImageElement; // Assuming uploadPreview is an img element

    fileReader.onload = function (fileEvent) {
      if (fileEvent.target && fileEvent.target.result) {
        fileInput.src = fileEvent.target.result as string;
      }
    };

    // Assuming you have an input element with the type 'file' where users can select an image
    var fileInputElement = document.getElementById("exampleInputFile2") as HTMLInputElement;

    if (fileInputElement.files && fileInputElement.files[0]) {
      fileReader.readAsDataURL(fileInputElement.files[0]);
    }
  }


  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.get(API_URL.delete_horses_cms + id).subscribe({
          next: (res: any) => {
            console.log(res)
            // this.loader = false
            if (res.success == true) {
              // formData.reset();

              this.getSectionData()
              Swal.fire(
                'Deleted Successfully!',
                '',
                'success'
              )
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
    })

  };
}
