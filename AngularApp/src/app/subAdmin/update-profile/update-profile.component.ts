import { Component, OnInit } from '@angular/core';
import {  SubAdminService } from 'src/app/sharedsub/sub-admin.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { SubAdmin } from '../../sharedsub/sub-admin.model';
import { Router } from "@angular/router";


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  providers : [SubAdminService]
})
export class UpdateProfileComponent implements OnInit {

  constructor(public subAdminService : SubAdminService , public router : Router  ,private modalService: NgbModal) {
    
   }
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage : string;
  showSucessMessage: boolean;

  ngOnInit(): void {
    this.subAdminService.getUserId();

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
    this.subAdminService.selectedSub = {
      _id: '',
      firstName : '',
      middleName: '',
      lastName:'',
      email : '',
      mobile: '',
      university: '',
      password:''

    };
    
    form.resetForm();
    this.serverErrorMessage = '';
  }

  
}
