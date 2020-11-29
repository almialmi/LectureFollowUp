import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';


import {Superuser } from './superuser.=model';
import{University} from './unive.models'
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SuperuserService {

  selectedUnivAdmin : Superuser = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    password:'',
    isActive:true,
    role:'',
};
selectedChecker:Superuser={
     _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    password:'',
    isActive:true,
    role:'',

}
selectedUniversity:University={
  _id:'',
  name:'',
  location:'',
  email:'',

}


  
UnivAdmins :Superuser[];
UnivHr:Superuser[];
checkers:Superuser[];
universitys:University[];


noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};
constructor(public http : HttpClient) { }


  postUnivAdmin(user : Superuser){
    return  this.http.post(environment.apiBaseUrl + '/registerUnivAdmin' , user);

  }
  postChecker(user : Superuser){
    return  this.http.post(environment.apiBaseUrl + '/checkerRegister' , user);

  }

  login(authCredintials){
    return this.http.post(environment.apiBaseUrl + '/login' , authCredintials , this.noAuthHeader);

  }
  showUnivAdmin(){
    return this.http.get(environment.apiBaseUrl + '/fetchUnivAdmin');
  }
  showChecker(){
    return this.http.get(environment.apiBaseUrl + '/fetchChecker');

  }
  
  deleteChecker(_id : String){
    return this.http.delete(environment.apiBaseUrl + '/deleteChecker' + `/${_id}`);

  }
  putAllUser(user: Superuser) {
    return this.http.put(environment.apiBaseUrl + '/updateProfile'  +`/${user._id}`, user);
  }
  
  putActivateDeactivateUser(_id:String,user:Superuser){
    return this.http.put(environment.apiBaseUrl + '/ActivateDeactivate' + `/${_id}`,user);

  }
  
  putOwnProfile(id:String,user:Superuser){
    return this.http.put(environment.apiBaseUrl + '/updateOwnProfile' + `/${id}`,user);
  }

  requestReset(body): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/req-reset-password', body);
  }

  newPassword(body): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/new-password', body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.http.post(environment.apiBaseUrl +'/valid-password-token', body);
  }

  registerUniversity(univ:University){
    return  this.http.post(environment.apiBaseUrl + '/registerUniversity' , univ);

  }

  fetchUniversity(){
    return this.http.get(environment.apiBaseUrl + '/fetchUniversity');

  }

  updateUniversity(univ:University){
    return this.http.put(environment.apiBaseUrl + '/updateUniversity'  +`/${univ._id}`, univ);

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
    if(token){
      var userPayload = atob(token.split('.')[1]);
      var user = JSON.parse(userPayload);
      var id=user.user_id;
      console.log(id)
      return id;

    }
  }
  getUserRole(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      var user = JSON.parse(userPayload);
      var role=user.role;
      console.log(role)
      return role;

    }
      
  }
  getUserUniversity(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      var user = JSON.parse(userPayload);
      var university = user.university;
      console.log(university)
      return university;

    }
  }
  getUserCompass(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      var user = JSON.parse(userPayload);
      var compass = user.compass;
      console.log(compass)
      return compass;

    }
  }
}
