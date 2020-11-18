import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SubsubAdmin } from '../../sharedsubsub/subsub-admin.model';;

import {  SubsubAdminService } from 'src/app/sharedsubsub/subsub-admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profilesubsub',
  templateUrl: './update-profilesubsub.component.html',
  styleUrls: ['./update-profilesubsub.component.css']
})
export class UpdateProfilesubsubComponent implements OnInit {

  constructor(public subAdminService : SubsubAdminService , public router : Router) { }
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage : string;
  showSucessMessage: boolean;


  ngOnInit(): void {
  }
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
  onLogout(){
    this.subAdminService.deletToken();
    this.router.navigate(['/login']);
  }
  OnSubmit(form : NgForm){
    var id=this.subAdminService.getUserId();
    this.subAdminService.putProfile (id ,form.value).subscribe(
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
    this.subAdminService.selectedSuperuser = {
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
    
    form.resetForm();
    this.serverErrorMessage = '';
  }

}
