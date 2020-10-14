import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';


import {Superuser } from './superuser.=model';
import {Checker } from './checker.model'
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class SuperuserService {
  selectedSuperuserr: Superuser;
 selectedSuperuser : Superuser = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    password:''


  };

    
   
  users :Superuser[];
  userchecker : Checker[];
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};
  constructor(public http : HttpClient) { }


  postUser(user : Superuser){
    return  this.http.post(environment.apiBaseUrl + '/subAdminRegister' , user);

  }
  postchecker(user : Superuser){
    return  this.http.post(environment.apiBaseUrl + '/registerChecker' , user);

  }


  login(authCredintials){
    return this.http.post(environment.apiBaseUrl + '/autenticate' , authCredintials , this.noAuthHeader);

  }
  SearchUser(){
    return this.http.get(environment.apiBaseUrl + '/subAdmin' + '/selectedSuperuser.firstName');
  }
  showuser(){
    return this.http.get(environment.apiBaseUrl + '/subAdminRegister');
  }
  showchecker(){
    return this.http.get(environment.apiBaseUrl + '/registeredChecker');

  }
  deleteuser(_id : string){
    return this.http.delete(environment.apiBaseUrl + '/subAdmin' + `/${_id}`);
  

  }
  deletechecker(_id : String){
    return this.http.delete(environment.apiBaseUrl + '/CheckerDelete' + `/${_id}`);

  }
  putChecker(user: Superuser) {
    return this.http.put(environment.apiBaseUrl + '/CheckerUpdate'  +`/${user._id}`, user);
  }
  
  putUser(user: Superuser) {
    return this.http.put(environment.apiBaseUrl + '/subAdmin'  +`/${user._id}`, user);
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
}
