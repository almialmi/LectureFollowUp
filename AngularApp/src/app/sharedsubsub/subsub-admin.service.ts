import { Injectable,ElementRef } from '@angular/core';
import { HttpClient , HttpHeaders,HttpParams} from '@angular/common/http';


import { SubsubAdmin } from './subsub-admin.model';
import { Message } from './message';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class SubsubAdminService {
  selectedStaff : SubsubAdmin = {
    _id: '',
    firstName : '',
    middleName: '',
    lastName:'',
    gender:'',
    email : '',
    mobile: 0,
    university: '',
    compass:'',
    professionalTitle:'',
    role: '',
    study: '',
    educationField: '',
    department : '',
    isViewed:false,
    workExperience:0,
    certificate:'',
    researchArea:'',
    futureResearchInterest:'',
    numberOfPublications:'',
    homeBase:'',



  };
    
   
  users :SubsubAdmin[];
  searchUser:SubsubAdmin[];
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};

  

constructor(public http : HttpClient) { }

postUniversityStaff(user : SubsubAdmin){
  return  this.http.post(environment.apiBaseUrl + '/registerLectures' , user);

}
postFromExcelFile(Data:[]){
  return  this.http.post(environment.apiBaseUrl + '/registerFromExcel', Data);

}
downloadEmptyExcelFile(){
  return  this.http.get(environment.apiBaseUrl + '/downloadExcelFile',{ responseType: "blob" }) //set response Type properly (it is not part of headers)
  
}

showUniversityStaff(university:string,compass:string){
  return this.http.get(environment.apiBaseUrl + '/fetchAllUniversityStaffForExcel' + `/${university}` + `/${compass}`);
}
deleteUniversityStaff(_id : string){
  return this.http.delete(environment.apiBaseUrl + '/deleteUniversityStaff' + `/${_id}`);


}
putUniversityStaff(user: SubsubAdmin) {
  return this.http.put(environment.apiBaseUrl + '/updateUniversityStaffProfile'  +`/${user._id}`, user);
}
putViewedOrNot(_id:String,user:SubsubAdmin){
  return this.http.put(environment.apiBaseUrl + '/isViewedOrNot'  +`/${_id}`, user);

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

public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}

getPagableCustomers(university:string,compass:string,pageNumber: number,  pageSize: number): Observable<Message> {
// Initialize Params Object
let params = new HttpParams();

// Begin assigning parameters
params = params.append('page', pageNumber.toString());
params = params.append('size', pageSize.toString());
return this.http.get<Message>(environment.apiBaseUrl + '/fetchUniversityStaff' + `/${university}` + `/${compass}`, { params: params })
}


}

