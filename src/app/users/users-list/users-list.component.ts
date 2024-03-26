import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
 
  userData:any[]=[]
    constructor(private fb: FormBuilder, private router: Router, private appService:AppService) {
  
    }
    ngOnInit() {
      this.getUserdetails();
      // Swal.fire('Hello world!');
    }
  
  
    getUserdetails(){
      this.appService.get(API_URL.getALLUserdetails).subscribe({
        next:(res:any)=>{
          console.log(res)
          // this.loader = false
          if(res.success == true){
            this.userData= res.data
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
