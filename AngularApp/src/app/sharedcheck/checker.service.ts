import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Superuser  } from '../shared/superuser.=model';
import {RepeatedStaff} from './repeatedStaff.models'
import {Message} from '../sharedsubsub/message';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {
  selectedChecker:Superuser={
    _id: '',
   firstName : '',
   middleName: '',
   lastName:'',
   email : '',
   mobile: 0,
   university: '',
   password:'',
   isActive:true,
   role:'',

}
selectedRepeatedStaff:RepeatedStaff={
  _id:{
    firstName:'',
    middleName:'',
    lastName:'',
  },
  university:'',
  counter:0,
}

   
  checkers:Superuser[];
  RepeatedStaffs:RepeatedStaff[];
  
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};


  constructor(public http : HttpClient) { }

  putOwnProfile(id:String,user:Superuser){
    return this.http.put(environment.apiBaseUrl + '/updateOwnProfile' + `/${id}`,user);
  }

  findAndMatchUniversityStaff(firstName:string,middleName:string,lastName:string): Observable<any>{
    return this.http.get(`${environment.apiBaseUrl + '/findAndMatchUniversityStaff' }/${firstName}/${middleName}/${lastName}`)
  
  }
  showRepeatedUnivStaff(){
  return this.http.get(environment.apiBaseUrl + '/fetchDuplicatedUniversityStaff');
   }

  showUniversityStaff(){
    return this.http.get(environment.apiBaseUrl + '/fetchUniversityStaffAllForCheckerSearch');

  }
  setToken(token : string){
    localStorage.setItem('token' , token);
    
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deletToken(){
    localStorage.removeItem('token');
  }
  SearchUser(){
    return this.http.get(environment.apiBaseUrlchecker + '/registerdSubsubAdmins');
  }
  getUserPaylod(){
    var token = this.getToken();
    if (token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
  
    }
    else
      return null;
    }
  
    isLogedIn(){
      var userPayload = this.getUserPaylod();
      if(userPayload)
      return userPayload.exp > Date.now() / 1000;
      else {
        return false;
      }}




getUserId(){
  var token = this.getToken();
  if (token){
    var userPayload = atob(token.split('.')[1]);
    var user = JSON.parse(userPayload);
    var id = user.user_id;
    console.log(id);
    return id
   
}}

getPagableCustomers(pageNumber: number,  pageSize: number): Observable<Message> {
  // Initialize Params Object
  let params = new HttpParams();
  
  // Begin assigning parameters
  params = params.append('page', pageNumber.toString());
  params = params.append('size', pageSize.toString());
  return this.http.get<Message>(environment.apiBaseUrl + '/fetchUniversityStaffByChecker', { params: params })
  }


}
