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
  selectedSuperuserr: SubsubAdmin;
  selectedSuperuser : SubsubAdmin = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    email : '',
    mobile: '',
    university: '',
    password:'',
    educationStatus:'',
    role: '',
    study: '',
    educationField: '',
    department : '',
    isSelected:false


  };
    
   
  users :SubsubAdmin[];
  searchUser:SubsubAdmin[];
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};

  constructor(public http : HttpClient) { }

postUser(user : SubsubAdmin){
  return  this.http.post(environment.apiBaseUrlsubsub + '/registerLecture' , user);

}


login(authCredintials){
  return this.http.post(environment.apiBaseUrlsubsub + '/autenticate' , authCredintials , this.noAuthHeader);

}
SearchUser(){
  return this.http.get(environment.apiBaseUrlsubsub + '/subAdmin' + '/selectedSuperuser.firstName');
}
showuser(){
  return this.http.get(environment.apiBaseUrlsubsub + '/registerLecture');
}
deleteuser(_id : string){
  return this.http.delete(environment.apiBaseUrlsubsub + '/lecture' + `/${_id}`);


}
putUser(user: SubsubAdmin) {
  return this.http.put(environment.apiBaseUrlsubsub + '/lecture'  +`/${user._id}`, user);
}
putProfile(id:String ,sub:SubsubAdmin){
  return this.http.put(environment.apiBaseUrlsubsub + '/selectiveUpdateProfile'  +`/${id}`, sub);

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
FindbyName(firstName): Observable<any>{
  return this.http.get(`${environment.apiBaseUrlsubsub + '/lecture/'}${firstName}`)
  //return this.http.get(`${environment.apiBaseUrlsubsub + '/lecture' }? = ${title}`)

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
