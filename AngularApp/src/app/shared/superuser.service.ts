import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';


import {Superuser } from './superuser.=model';
import {Checker } from './checker.model';
import { User} from './user.model';
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
    password:'',
    isActive:true,
};
  selectedUser:User={
    _id:'',
    email:'',
    password:''
  }

  selectedChecker:Checker={
    _id:'',
    email:'',
    isActive:true

  }

  users :Superuser[];
  userchecker : Checker[];
  superUser:User[];
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};
  constructor(public http : HttpClient) { }


  postUser(user : Superuser){
    return  this.http.post(environment.apiBaseUrl + '/subAdminRegister' , user);

  }
  postchecker(user : Superuser){
    return  this.http.post(environment.apiBaseUrl + '/registerChecker' , user);

  }

  login(authCredintials){
    return this.http.post(environment.apiBaseUrl + '/authenticate' , authCredintials , this.noAuthHeader);

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
  putActivateDeactivate(_id:String ,user:Checker){
    return this.http.put(environment.apiBaseUrl + '/activateDeactivate' + `/${_id}`,user);
  }
  putActivateDeactivateSub(_id:String,user:Superuser){
    return this.http.put(environment.apiBaseUrl + '/activateDeactivateSub' + `/${_id}`,user);

  }
  
  putUser(user: Superuser) {
    return this.http.put(environment.apiBaseUrl + '/subAdmin'  +`/${user._id}`, user);
  }
  putPassword(id:String,user:User){
    return this.http.put(environment.apiBaseUrl + '/updateProfile' + `/${id}`,user);
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
    //  console.log(userPayload);
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
        var id = user._id;
        console.log(id);
        return id
       
    }
}
}
