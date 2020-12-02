
import { Component, OnInit } from '@angular/core';
import {  SubAdminService } from 'src/app/sharedsub/sub-admin.service';
import { NgForm }  from '@angular/forms';
import { Router } from "@angular/router";
import { Educstatus } from "src/app/sharedsub/educstatus.model";
import {Role} from "src/app/sharedsub/role.model";
import { Universtiy } from "src/app/shared/universtiy.model";
import { DataService } from './dataService';
import { Study } from "src/app/sharedsub/study.model";
import { Educationalfield } from 'src/app/sharedsub/educationalfield.model';
import {Department} from 'src/app/sharedsub/department.model';
 


@Component({
  selector: 'app-registorsub',
  templateUrl: './registorsub.component.html',
  styleUrls: ['./registorsub.component.css'],
 // providers: [SubAdminService]
providers: [DataService]
})
export class RegistorsubComponent implements OnInit {
  selectedStudy:Study = new Study(0, 'Natural'); 
  selectedStudyy:Educationalfield= new Educationalfield(0 ,"Natural", "medicine") ;
  studys : Study[];
  fields: Educationalfield [];

  dept:  Department[];
  selectedCountry:Universtiy = new Universtiy(0, 'Ambo University'); 
  universtiys : Universtiy[];


  status:  Educstatus[] = [
      { name: "Bachelor"},
      { name: "MBA"},
      { name: "Master"},
      { name: "PhD"},
      { name: "PostDoc"},
  
     
  ];
  rol : Role[] = [
    { name: "Teacher"},
    { name: "DepartmentHead"},
    { name: "Both"},

  ];


  constructor(public subAdminService : SubAdminService , public router : Router ,private _dataService: DataService) {
    this.studys = this._dataService.getStudy();
    this.universtiys = this._dataService.getCountries();
   }
  model = {
    firstName: '',
    middlename:'',
    lastname: '',
    mobile:'',
    email: '',
    universtiy:'',
    

  };
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  showSucessMessage: boolean;
  serverErrorMessage : string;

  ngOnInit(): void {
    this.subAdminService.getUserUniversity();
  }
  onSelect(countryidd) {
    this.fields = this._dataService.getFields()
                 .filter((item)=> item.studyname == countryidd);
  }
  onSelectt(countryidd) {
    this.dept = this._dataService.getDepartment()
                 .filter((item)=> item.fieldname == countryidd);
  }
  univ:string = '';
  myUniversity(){
    this.univ = this.subAdminService.getUserUniversity();
    console.log(this.univ)
  }

  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
  
  onSubmit(form : NgForm){
    this.subAdminService.postUnivHr(form.value).subscribe(
      res => {
        console.log(res);
        this.showSucessMessage = true;
        console.log("yaaaayyyy")
        console.log(form.value)
        setTimeout(() => this.showSucessMessage = false,4000);
        this.resetForm(form);
       

        
       
      },
      err => {
        // if( err.status == 422){
        //   this.serverErrorMessage = err.error.join('<br>');

          
          
        // }
        if(err.status==500){
          console.log(form.value)
       console.log(err)
      
        }
        else
          this.serverErrorMessage = 'something went wrong'
          console.log("yaaaayyyy")
        
        

      }
    );

  }
  resetForm(form : NgForm){
    this.subAdminService.selectedUnivHr = {
      _id : '',
      firstName : '',
      middleName: '',
      lastName: '',
      mobile:'',
      email : '',
      university : '',
      compass:'',
      role : '',
      password : '',
      isActive:true

    };
    form.resetForm();
    this.serverErrorMessage = '';
  }

  onLogout(){
    this.subAdminService.deletToken();
    this.router.navigate(['/login']);
  }




}
