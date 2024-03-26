import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/apiRoute';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-venue-management',
  templateUrl: './venue-management.component.html',
  styleUrls: ['./venue-management.component.css']
})
export class VenueManagementComponent {
  section1Form!: FormGroup;
  uploadedFiles!: File;
  loader = false
  homeData: any[] = [];
  venueForm!: FormGroup;
  imageURl = API_URL.image;
  imagedata: any;
  @ViewChild('closeModal') closeModal!:ElementRef;
  @ViewChild('closeModal2') closeModal2!:ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {

  }

  ngOnInit() {
    this.venueForm = this.fb.group({
      id: ['',],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      venue: ['', [Validators.required]],
    })
    this.getSectionData()
  };

  PreviewImage(option: string) {
    if (option == 'add') {
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
    } else {
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
  };

  getSectionData() {
    this.appService.get(API_URL.getAllVenue).subscribe({
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

    const fileInput = document.getElementById("exampleInputFile") as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const uploadedFile = fileInput.files[0];
      formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
    }
    formData.append('location', data.value.location);
    formData.append('description', data.value.description);
    formData.append('venue', data.value.venue);
    this.appService.imagepost(API_URL.venueUpload, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.closeModal2.nativeElement.click();
          fileInput.value = ''
          this.venueForm.reset();
          this.getSectionData()
          // this.router.navigate(['section3'])
          Swal.fire(
            res.message,
            '',
            'success'
          )
        } else {
          this.closeModal2.nativeElement.click();
          fileInput.value = ''
          this.venueForm.reset()
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

  openUpdateModal(id: any) {
    this.venueForm.reset()

    this.appService.get(API_URL.get_venue_cms + id).subscribe({
      next: (res: any) => {
        this.loader = false
        if (res.success == true) {
          this.imagedata = res.data[0].image
          this.venueForm.patchValue(
            {
              id: res.data[0].id,
              location: res.data[0].location,
              venue: res.data[0].venue,
              description: res.data[0].description
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
  }


  onUpdate(data: any) {
    data.markAllAsTouched();
    if (data.invalid) {
      return;
    }
    let formData = new FormData();
    formData.append('id', data.value.id);
    // Fetch the input element where the user uploads the image
    const fileInput = document.getElementById("exampleInputFile2") as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      console.log("image hai ");
      const uploadedFile = fileInput.files[0];
      formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to the FormData object
    }
    formData.append('location', data.value.location);
    formData.append('description', data.value.description);
    formData.append('venue', data.value.venue);

    this.appService.imagepost(API_URL.updateVenue_Cms, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loader = false
        if (res.success == true) {
          this.closeModal.nativeElement.click();
          this.venueForm.reset()
          fileInput.value = ''
          this.imagedata = ''
          this.getSectionData()
          Swal.fire(
            res.message,
            '',
            'success'
          )
          // this.toastr.success('login successfully');


        } else {
          this.venueForm.reset();
          fileInput.value = ''
          Swal.fire(
            'Something went wrong',
            '',
            'error'
          )
        }
      },
      error: err => {
        this.venueForm.reset()
        Swal.fire(
          'Something went wrong',
          '',
          'error'
        )
      }
    })
  };

  resetForm() {
    this.venueForm.reset();
    this.imagedata = ''; // Assuming you want to reset the image data as well
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
        this.appService.get(API_URL.deleteVenue + id).subscribe({
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

  }

}
