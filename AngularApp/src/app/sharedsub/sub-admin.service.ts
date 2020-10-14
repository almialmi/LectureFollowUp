
import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';


import {SubAdmin } from './sub-admin.model';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubAdminService {
  selectedSuperuserr: SubAdmin;
  selectedSuperuser : SubAdmin = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    password:'',
    educationStatus : '',
    role : '',
    study : '',
    educationField : '',
    department : ''


  };
    
   
  users :SubAdmin[];
  searchUser: SubAdmin;
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};

  constructor(public http : HttpClient) { }

  postUser(user : SubAdmin){
    return  this.http.post(environment.apiBaseUrlsub + '/registersubsubAdmin' , user);

  }


  login(authCredintials){
    return this.http.post(environment.apiBaseUrlsub + '/autenticate' , authCredintials , this.noAuthHeader);

  }
  SearchUser(){
    return this.http.get(environment.apiBaseUrlchecker + '/registerdSubsubAdmins');
  }
  showuser(){
    return this.http.get(environment.apiBaseUrlsub + '/registersubsubAdmin');
  }
  deleteuser(_id : string){
    return this.http.delete(environment.apiBaseUrlsub + '/subSubAdmin' + `/${_id}`);
  

  }
  
  putUser(user: SubAdmin) {
    return this.http.put(environment.apiBaseUrlsub + '/subSuAdmin'  +`/${user._id}`, user);
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
  FindbyName(title): Observable<any>{
    return this.http.get(`${environment.apiBaseUrlchecker + '/registerdSubsubAdmins' }? = ${title}`)
  
  }
}


