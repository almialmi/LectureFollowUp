import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';


import { SubsubAdmin } from './subsub-admin.model';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubsubAdminService {
  selectedStaff : SubsubAdmin = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    compass:'',
    educationStatus:'',
    role: '',
    study: '',
    educationField: '',
    department : '',

  };
    
   
  users :SubsubAdmin[];
  searchUser:SubsubAdmin[];
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};

  constructor(public http : HttpClient) { }

postUniversityStaff(user : SubsubAdmin){
  return  this.http.post(environment.apiBaseUrl + '/registerUniversityStaff' , user);

}
postFromExcelFile(user:SubsubAdmin){
  return  this.http.post(environment.apiBaseUrl + '/uploadFile' , user);


}

showUniversityStaff(university:string,compass:string){
  return this.http.get(environment.apiBaseUrl + '/fetchUniversityStaff' + `/${university}` + `/${compass}`);
}
deleteUniversityStaff(_id : string){
  return this.http.delete(environment.apiBaseUrl + '/deleteUniversityStaff' + `/${_id}`);


}
putUniversityStaff(user: SubsubAdmin) {
  return this.http.put(environment.apiBaseUrl + '/updateUniversityStaffProfile'  +`/${user._id}`, user);
}
putOwnProfile(id:String ,sub:SubsubAdmin){
  return this.http.put(environment.apiBaseUrl + '/updateOwnProfile'  +`/${id}`, sub);

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
   
}}
getUserUniversity(){
  var token = this.getToken();
  if (token){
    var userPayload = atob(token.split('.')[1]);
    var user = JSON.parse(userPayload);
    var university = user.university;
    console.log(university);
    return university
   
}
}

getUserCompass(){
  var token = this.getToken();
  if (token){
    var userPayload = atob(token.split('.')[1]);
    var user = JSON.parse(userPayload);
    var compass = user.compass;
    console.log(compass);
    return compass
   
}
}


}
