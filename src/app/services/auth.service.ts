import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  constructor() { }

  localSave(){
    localStorage.setItem('ad_token','true')
  }

  getUser() {
    const user:any = localStorage.getItem("ad_token") 
    return JSON.parse(user);
  };

  isLoggedIn() {
    return this.getUser() !== null;
}

logout() {
  localStorage.removeItem("ad_token")
}

}
