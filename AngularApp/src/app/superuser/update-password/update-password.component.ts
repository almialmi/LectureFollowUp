import { Component, OnInit } from '@angular/core';
import {Superuser } from '../../shared/superuser.=model';
import { SuperuserService } from '../../shared/superuser.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var M:any;
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  providers : [SuperuserService]
})

export class UpdatePasswordComponent implements OnInit {

  constructor(public superuserservice : SuperuserService , public router : Router  ,private modalService: NgbModal) { }

  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage : string;
  showSucessMessage: boolean;
  ngOnInit(): void {
   // this.superuserservice.getUserPaylod();
    this.superuserservice.getUserId();
  }

  onLogout(){
    this.superuserservice.deletToken();
    this.router.navigate(['/login']);
  }
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

  OnSubmit(form : NgForm){
    var id=this.superuserservice.getUserId();
    this.superuserservice.putPassword(id,form.value).subscribe(
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
    this.superuserservice.selectedUser = {
      _id: '',
      email : '',
      password:''

    };
    
    form.resetForm();
    this.serverErrorMessage = '';
  }

}
