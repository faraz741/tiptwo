import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/helper/apiRoute';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent {
tipsData:any[]=[]
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) {

  };

  ngOnInit() {
    this.getTips()
  }


  getTips(){
    this.appService.get(API_URL.getAllllAdminTips).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.loader = false
        if(res.success == true){
          this.tipsData= res.data
          // formData.reset();
          // this.router.navigate(['todays_race'])
          // this.toastr.success('login successfully');
         
          
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
  }
}
