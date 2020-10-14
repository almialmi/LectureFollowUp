import { Component, OnInit } from '@angular/core';
import { SuperuserService } from 'src/app/shared/superuser.service';
import { NgForm }  from '@angular/forms';
import { Router } from "@angular/router";
import { Universtiy } from "src/app/shared/universtiy.model";
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
  }
  onSelect(countryidd) {
    this.states = this._dataService.getStates()
                 .filter((item)=> item.countryname == countryidd);
  }
  
  onSubmit(form : NgForm){
    this.superuserservice.postUser(form.value).subscribe(
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
    this.superuserservice.postchecker(form.value).subscribe(
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
    this.superuserservice.selectedSuperuser = {
      _id : '',
      firstName : '',
      middleName: '',
      lastName: '',
      mobile:'',
      email : '',
      university : '',
      password : '',

    };
    form.resetForm();
    this.serverErrorMessage = '';
  }

  onLogout(){
    this.superuserservice.deletToken();
    this.router.navigate(['/login']);
  }

}
