
import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';


import {SubAdmin } from './sub-admin.model';

import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubAdminService {
 
  selectedUnivHr : SubAdmin = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    compass:'',
    password:'',
    role : '',
    isActive: true

};

    
   
  users :SubAdmin[];
  searchUser: SubAdmin[];
 
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};

  constructor(public http : HttpClient) { }

  postUnivHr(user : SubAdmin){
    return  this.http.post(environment.apiBaseUrl + '/univHrRegister' , user);

  }
  showUnivHr(university:string){
    return this.http.get(environment.apiBaseUrl + '/fetchUnivHr'+ `/${university}`);
  }
  
  putUnivHr(user: SubAdmin) {
    return this.http.put(environment.apiBaseUrl + '/updateProfile'  +`/${user._id}`, user);
  }
  putOwnProfile(id:String ,sub:SubAdmin){
    return this.http.put(environment.apiBaseUrl + '/updateOwnProfile'  +`/${id}`, sub);

  }
  putActivateDeactivate(_id:String,user:SubAdmin){
    return this.http.put(environment.apiBaseUrl + '/ActivateDeactivate' + `/${_id}`,user);

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
      }
  }
  getUserId(){
    var token = this.getToken();
    if (token){
      var userPayload = atob(token.split('.')[1]);
      var user = JSON.parse(userPayload);
      var id = user.user_id;
      console.log(id);
      return id
     
  }
  
}
getUserUniversity(){
  var token = this.getToken();
  if(token){
    var userPayload = atob(token.split('.')[1]);
    var user = JSON.parse(userPayload);
    var university = user.university;
   // console.log(university)
    return university;

  }
}


}