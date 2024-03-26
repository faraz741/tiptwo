import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tips-management',
  templateUrl: './tips-management.component.html',
  styleUrls: ['./tips-management.component.css']
})
export class TipsManagementComponent {
  section1Form!: FormGroup;
  uploadedFiles!: File;
  loader = false
  homeData: any[] = [];
  tipsForm!: FormGroup;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModal2') closeModal2!: ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {

  }

  ngOnInit() {
    this.tipsForm = this.fb.group({
      id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      heading: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    this.getSectionData()
  };


  getSectionData() {
    this.appService.get(API_URL.getTipsManagement).subscribe({
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


  fileChange(element: any) {
    this.uploadedFiles = element.target.files[0];
  };




  onAdd(data: any) {
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('date', data.value.date)
    bodyPayload.set('heading', data.value.heading)
    bodyPayload.set('description', data.value.description)
    this.appService.post(API_URL.createTips, bodyPayload.toString()).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.closeModal2.nativeElement.click();
          Swal.fire(
            res.message,
            '',
            'success'
          )
          this.tipsForm.reset();
          this.getSectionData()
          // this.router.navigate(['section3'])
        } else {
          this.closeModal2.nativeElement.click();
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
    this.tipsForm.reset()
    // let bodyPayload = new URLSearchParams();
    // bodyPayload.set('date', data.value.date)
    this.appService.get(API_URL.get_tips_cms + id).subscribe({
      next: (res: any) => {
        this.loader = false
        if (res.success == true) {
          this.tipsForm.patchValue(
            {
              id: res.data[0].id,
              date: res.data[0].date,
              heading: res.data[0].heading,
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
  };

  resetForm() {
    this.tipsForm.reset()
  }


  onUpdate(data: any) {
    console.log(data)
    data.markAllAsTouched();
    if (data.invalid) {
      return;
    }
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('id', data.value.id)
    bodyPayload.set('date', data.value.date)
    bodyPayload.set('heading', data.value.heading)
    bodyPayload.set('description', data.value.description)


    this.appService.post(API_URL.updateTipsCms, bodyPayload).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loader = false
        if (res.success == true) {
          this.tipsForm.reset();
          this.closeModal.nativeElement.click();
          this.getSectionData()
          Swal.fire(
            res.message,
            '',
            'success'
          )
          // this.toastr.success('login successfully');
        } else {
          this.closeModal.nativeElement.click();
          this.tipsForm.reset();
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
        this.appService.get(API_URL.deleteTips + id).subscribe({
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
