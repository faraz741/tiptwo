import { Component, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-todays-races',
  templateUrl: './todays-races.component.html',
  styleUrls: ['./todays-races.component.css']
})
export class TodaysRacesComponent {
  raceData:any[]=[];
  title = 'angular';
  public Editor = ClassicEditor;
  constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {

  }
  ngOnInit() {
    this.getRace();

  }
  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   alert('By refreshing this page you may lost all data.');
  //   window.onhashchange
  //   // window.opener.location.reload();
  // }
  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event:Event) {
  //     alert('By refreshing this page you may lost all data.');
  // }
  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   event.preventDefault();
  //   // event.returnValue = ''; // For older browsers
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to retrieve the data again!",
  //     icon: 'error',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Reload'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Perform actions if user confirms (in this case, reload the page)
  //       window.opener.location.reload();
  //     }
  //   });
  // }



  getRace(){
    this.appService.get(API_URL.get_AllRaces).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          this.raceData= res.data
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
  


}
