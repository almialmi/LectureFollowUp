import { Component, OnInit } from '@angular/core';
import { SuperuserService } from 'src/app/shared/superuser.service';
import { NgForm }  from '@angular/forms';
import { Router } from "@angular/router";
import { Universtiy } from "src/app/shared/universtiy.model";
import {University} from "src/app/shared/unive.models"
import { DataService } from './dataService';
import { State } from 'src/app/shared/state.model';

 

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.css'],
 // providers: [SuperuserService]
 providers: [DataService]

})
export class RegistorComponent implements OnInit {
  selectedCountry:Universtiy = new Universtiy(0, 'Ambo University'); 
  universtiys : Universtiy[];
  states: State[];
  type : any;
  options : any;

  constructor(public superuserservice : SuperuserService , public router : Router,private _dataService: DataService) {
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
    this.refreshUniveList();
  }
  onSelect(countryidd) {
    this.states = this._dataService.getStates()
                 .filter((item)=> item.countryname == countryidd);
  }
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

  refreshUniveList(){
    this.superuserservice.fetchUniversity().subscribe(res =>{
     this.superuserservice.universitys = res as University[];
 
   },
   err =>{
 
   }
    );
  }
 
  
  onSubmit(form : NgForm){
    console.log(form.value);
    this.superuserservice.postUnivAdmin(form.value).subscribe(
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
  onSubmitt(form : NgForm){
    console.log("i am here")
    this.superuserservice.postChecker(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        this.resetForm(form);
      },
      err => {
        if( err.status == 422){
          this.serverErrorMessage = err.error.join('<br>')
          
        }
        else
          this.serverErrorMessage = 'something went wrong'
      }
    );

  }
  resetForm(form : NgForm){
    this.superuserservice.selectedUnivAdmin = {
      _id : '',
      firstName : '',
      middleName: '',
      lastName: '',
      mobile:'',
      email : '',
      university : '',
      password : '',
      isActive:true,
      role:''
   };
    form.resetForm();
    this.serverErrorMessage = '';
  }

  onSubmitForm(form : NgForm){
    console.log(form.value);
    this.superuserservice.registerUniversity(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        this.resetFormUni(form);
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

  resetFormUni(form : NgForm){
    this.superuserservice.selectedUniversity = {
      _id : '',
      name : '',
      location: '',
      email : ''
   };
    form.resetForm();
    this.serverErrorMessage = '';
  }
 
  onLogout(){
    this.superuserservice.deletToken();
    this.router.navigate(['/login']);
  }

}
