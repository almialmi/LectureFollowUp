import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SubAdmin } from '../../sharedsub/sub-admin.model';

import {  SubAdminService } from 'src/app/sharedsub/sub-admin.service';
import { NgForm } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-showsub',
  templateUrl: './showsub.component.html',
  styleUrls: ['./showsub.component.css'],
  providers : [SubAdminService]
})
export class ShowsubComponent implements OnInit {
  closeResult = '';
  userDetails;
  showModal: boolean;
 // signUpForm: FormGroup;
  submitted = false;
  searchedKeyword: string;
  newRowIndex = 0;


  constructor(public subAdminService : SubAdminService , public router : Router  ,private modalService: NgbModal) { }

  
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  showSucessMessage: boolean;
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  ngOnInit(): void {
    this.refreshuserlist();
    
   
 }
  onLogout(){
    this.subAdminService.deletToken();
    this.router.navigate(['/login']);
  }
  refreshuserlist(){
    var university = this.subAdminService.getUserUniversity();
    this.subAdminService.showUnivHr(university).subscribe(
      res =>{
        this.subAdminService.users = res as SubAdmin[];

      },
      err =>{

      }
    );

  }
  
  onSubmit(form : NgForm){
   
    if(form.value._id == ""){
      this.subAdminService.postUnivHr(form.value).subscribe((res) =>{
       // this.resetForm(form);
       this.newRowIndex++;
        this.refreshuserlist();
      //  M.toast({html: 'saved successfull!' , class: 'rounded'});
      
  
      });
    }else{
      this.subAdminService.putUnivHr(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
      //  M.toast({html: 'update successfull!' , class: 'rounded'});
  
      });
  
    }
   
  }
 
  onEdit(user : SubAdmin){
    this.subAdminService.selectedUnivHr = user;

  }

  activateDeactivateSubsub(_id:string,user:SubAdmin) {
  
    if(user.isActive === true){
      console.log(user.isActive);
      if(confirm('Are you sure you want to lock this record?') == true){
        this.subAdminService.putActivateDeactivate(_id,user).subscribe((res) => {
          this.refreshuserlist();
          console.log(user.isActive)
         });
      }
     }
     else{
      console.log(user.isActive);
      if(confirm('Are you sure you want to unlock this record?') == true){
        this.subAdminService.putActivateDeactivate(_id,user).subscribe((res) => {
          this.refreshuserlist();
         console.log (user.isActive)
        });
      }

     }
    
    
  }

}
