import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SubsubAdmin } from '../../sharedsubsub/subsub-admin.model';
import {  SubAdminService } from 'src/app/sharedsub/sub-admin.service';
import {  SubsubAdminService } from 'src/app/sharedsubsub/subsub-admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profilesubsub',
  templateUrl: './update-profilesubsub.component.html',
  styleUrls: ['./update-profilesubsub.component.css']
})
export class UpdateProfilesubsubComponent implements OnInit {

  constructor(public subsubAdminService : SubsubAdminService ,public subadminservice :SubAdminService , public router : Router) { }
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
    this.subsubAdminService.deletToken();
    this.router.navigate(['/login']);
  }
  OnSubmit(form : NgForm){
    var id=this.subsubAdminService.getUserId();
    this.subsubAdminService.putOwnProfile (id ,form.value).subscribe(
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
  this.subadminservice.selectedUnivHr = {
    _id : '',
    firstName : '',
    middleName: '',
    lastName: '',
    mobile:0,
    email : '',
    university : '',
    compass : '',
    role: '',
    password:'',
    isActive:true
    
};
    
    form.resetForm();
    this.serverErrorMessage = '';
  }

}
