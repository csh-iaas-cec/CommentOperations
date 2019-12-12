import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudPortalService {
  ROOT_URL : any;
  localhost_URL : any;

  constructor(public http: HttpClient) { 
  
    this.localhost_URL = 'http://150.136.179.134:3200';
    //this.localhost_URL = 'http://localhost:3200';
  }

  getAllMembers():  Observable<any>  {

    return this.http.get(`${this.localhost_URL}/api/getList`);

  }
  getEnOfUser(currentUser: any):  Observable<any>  {

    return this.http.get<any>(`${this.localhost_URL}/api/getEn/${currentUser}`);

  }
  submitComments(name:any,srNum:any,comment:any){
    var data = {"name":name,"SR":srNum,"comment":comment}
    console.log("submitting comments")
    return this.http.post(`${this.localhost_URL}/api/postComment`,data).toPromise().then((data:any) =>{
      console.log("data :", data);

    });

  }
}
