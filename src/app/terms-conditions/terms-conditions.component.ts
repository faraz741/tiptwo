import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/apiRoute';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent {

  public Editor = ClassicEditor;
  public editorData: string = '<p>Hello, world!</p>';
  htmlData:any;
  data:string="dsg";
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {

  }

  ngOnInit(){
    this.getSectionData()
  }

  onEditorChange(event: any) {
    this.editorData = event.editor.getData();
  };

  submitEditorContent(){
    console.log(this.editorData)
    if (this.editorData === '') {
      return;
    }
  
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('html',this.editorData)
    this.appService.post(API_URL.updateTermsConditionsData, bodyPayload).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          this.getSectionData()
          Swal.fire(
            res.message,
            '',
            'success'
          )
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })

          // this.loader = false
        }
      },
      error: err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title:'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        })

        // this.toastr.error('Something went wrong');
        // this.loader = false
      }
    })
  };

  getSectionData() {
    this.appService.get(API_URL.getHowitWorks).subscribe({
      next: (res: any) => {
        console.log(res)
        // this.loader = false
        if (res.success == true) {
          // this.homeData = res.data
          this.data = res.data[0].terms_conditions
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
}
