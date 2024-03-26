import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  get(url:any):Observable<any>{
    return this.http.get(environment.baseUrl+ url);
  };

  post(url:any,data:any,):Observable<any>{
    const headers = new HttpHeaders()
    .set('content-type','application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');  
    ;  

    return this.http.post(environment.baseUrl + url, data,{'headers':headers})
  };
  imagepost(url:any,data:any,):Observable<any>{
    return this.http.post(environment.baseUrl + url, data)
  };
  
//   handleError(error: HttpErrorResponse) {
//     return throwError(error);
// }
}
