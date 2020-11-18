import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Checker } from './checker.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {SubsubAdmin  } from '../sharedsubsub/subsub-admin.model';
import {SubAdmin  } from '../sharedsub/sub-admin.model';
@Injectable({
  providedIn: 'root'
})
export class CheckerService {
  selectedSuperuserr:  Checker;
  selectedSuperuser :  Checker = {
    _id: '',
    email : '',
    password:'',
   
};
    
   
  users : Checker[];
  
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};


  constructor(public http : HttpClient) { }



  login(authCredintials){
    return this.http.post(environment.apiBaseUrlchecker + '/authenticate' , authCredintials , this.noAuthHeader);
  
  }
  putProfile(id:String,user:Checker){
    return this.http.put(environment.apiBaseUrlchecker + '/updateProfile' + `/${id}`,user);
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


findAndMatch(firstName:string,middleName:string,lastName:string): Observable<any>{
  return this.http.get(`${environment.apiBaseUrlchecker + '/findSubsub' }/${firstName}/${middleName}/${lastName}`)

}

findAndMatchL(firstName:string,middleName:string,lastName:string): Observable<any>{
  return this.http.get(`${environment.apiBaseUrlchecker + '/findLecture' }/${firstName}/${middleName}/${lastName}`)

}

getUserId(){
  var token = this.getToken();
  if (token){
    var userPayload = atob(token.split('.')[1]);
    var user = JSON.parse(userPayload);
    var id = user._id;
    console.log(id);
    return id
   
}}
}
