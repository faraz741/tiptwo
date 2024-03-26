import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  onClassAdd(){
    document.querySelector('.ct_dropshow')?.classList.toggle('active')
  }

  onClassAddShow(){
    document.querySelector('#ct_droppshow_main12')?.classList.toggle('show2')

  }
  onClassAddShowTips(){
   
    document.getElementById('ct_droppshow_tips1')?.classList.add('show')
    document.getElementById('ct_droppshow_tips2')?.classList.add('show')

  }

}
