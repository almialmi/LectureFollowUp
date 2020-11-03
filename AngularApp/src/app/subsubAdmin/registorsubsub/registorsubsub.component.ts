import { Component, OnInit } from '@angular/core';
import {  SubsubAdminService } from 'src/app/sharedsubsub/subsub-admin.service';
import { NgForm }  from '@angular/forms';
import { Router } from "@angular/router";
import { Educstatus } from "src/app/sharedsub/educstatus.model";
import {Role} from "src/app/sharedsub/role.model";
import { Universtiy } from "src/app/shared/universtiy.model";
import { Study } from "src/app/sharedsub/study.model";
import { Educationalfield } from 'src/app/sharedsub/educationalfield.model';
import {Department} from 'src/app/sharedsub/department.model';
import { DataService } from 'src/app/subAdmin/registorsub/dataService';

@Component({
  selector: 'app-registorsubsub',
  templateUrl: './registorsubsub.component.html',
  styleUrls: ['./registorsubsub.component.css'],
 // providers: [SubsubAdminService]
 providers: [DataService]
})
export class RegistorsubsubComponent implements OnInit {
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

  constructor(public subsubAdminService : SubsubAdminService , public router : Router , private _dataService: DataService) {
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
  }
  onSelect(countryidd) {
    this.fields = this._dataService.getFields()
                 .filter((item)=> item.studyname == countryidd);
  }
  onSelectt(countryidd) {
    this.dept = this._dataService.getDepartment()
                 .filter((item)=> item.fieldname == countryidd);
  }
  onSubmit(form : NgForm){
    this.subsubAdminService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        this.resetForm(form);
       

        
       
      },
      err => {
        if( err.status == 422){
          this.serverErrorMessage = err.error.join('<br>');

          
          
        }
        else
          this.serverErrorMessage = 'something went wrong'
        
        

      }
    );

  }
  resetForm(form : NgForm){
    this.subsubAdminService.selectedSuperuser = {
      _id : '',
      firstName : '',
      middleName: '',
      lastName: '',
      mobile:'',
      email : '',
      university : '',
      password : '',
      educationStatus:'',
      role: '',
      study: '',
      educationField: '',
      department : '',
      isSelected:false
  

    };
    form.resetForm();
    this.serverErrorMessage = '';
  }

  onLogout(){
    this.subsubAdminService.deletToken();
    this.router.navigate(['/loginsubsub']);
  }




}



