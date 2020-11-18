import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Superuser } from '../../shared/superuser.=model';
import {Checker  } from '../../shared/checker.model';

import { SuperuserService } from '../../shared/superuser.service';
import { NgForm } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var M:any;

@Component({

  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers : [SuperuserService]
})
export class ShowComponent implements OnInit {
  closeResult = '';
  userDetails;
  showModal: boolean;
 // signUpForm: FormGroup;
  submitted = false;
  searchedKeyword: string;



 
  constructor(public superuserservice : SuperuserService , public router : Router  ,private modalService: NgbModal) { }
  
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
    this.refreshuserlistchecker();
    this.refreshuserlist();
   
    
   
 }
  onLogout(){
    this.superuserservice.deletToken();
    this.router.navigate(['/login']);
  }
  refreshuserlist(){
    this.superuserservice.showuser().subscribe(
      res =>{
        this.superuserservice.users = res as Superuser[];

      },
      err =>{

      }
    );

  }
  //show users for checker
  refreshuserlistchecker(){
    this.superuserservice.showchecker().subscribe(
      res =>{
        this.superuserservice.userchecker = res as Checker[];

      },
      err =>{

      }
    );

  }
  Search(){
    this.superuserservice.SearchUser().subscribe(
      res =>{
        this.superuserservice.users = res as Superuser[];

      },
      err =>{

      }
    )
  }
  
  onSubmit(form : NgForm){
   
    if(form.value._id == ""){
      this.superuserservice.postUser(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
        M.toast({html: 'saved successfull!' , class: 'rounded'});
      
  
      });
    }else{
      this.superuserservice.putUser(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        M.toast({html: 'update successfull!' , class: 'rounded'});
  
      });
  
    }
   
  }
  onSubmitchecker(form : NgForm){
   
    if(form.value._id == ""){
      this.superuserservice.postchecker(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlistchecker();
        M.toast({html: 'saved successfull!' , class: 'rounded'});
      
  
      });
    }else{
      this.superuserservice.putChecker(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlistchecker();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        M.toast({html: 'update successfull!' , class: 'rounded'});
  
      });
  
    }
   
  }
  onDelete(_id: string){
    if(confirm('Are you sure you want to delete this record?') == true){
      this.superuserservice.deleteuser(_id).subscribe((res) => {
        this.refreshuserlist();
        M.toast({html: 'Deleted successfully' , classes: 'rounded'});
      });
    }

  }

  onDeletechecker(_id: string){
    if(confirm('Are you sure you want to delete this record?') == true){
      this.superuserservice.deletechecker(_id).subscribe((res) => {
        this.refreshuserlistchecker();
        M.toast({html: 'Deleted successfully' , classes: 'rounded'});
      });
    }

  }

  onEdit(user : Superuser){
    this.superuserservice.selectedSuperuser = user;

  }

  active: boolean = true;

  activateDeactivate(_id:string,user:Checker) {
  
    if(user.isActive === true){
      console.log(user.isActive);
      if(confirm('Are you sure you want to lock this record?') == true){
        this.superuserservice.putActivateDeactivate(_id,user).subscribe((res) => {
          this.refreshuserlistchecker();
          console.log(user.isActive)
         });
      }
     }
     else{
      console.log(user.isActive);
      if(confirm('Are you sure you want to unlock this record?') == true){
        this.superuserservice.putActivateDeactivate(_id,user).subscribe((res) => {
          this.refreshuserlistchecker();
         console.log (user.isActive)
        });
      }

     }
    
    
  }

  activateDeactivateSub(_id:string,user:Superuser) {
  
    if(user.isActive === true){
      console.log(user.isActive);
      if(confirm('Are you sure you want to lock this record?') == true){
        this.superuserservice.putActivateDeactivateSub(_id,user).subscribe((res) => {
          this.refreshuserlist();
          console.log(user.isActive)
         });
      }
     }
     else{
      console.log(user.isActive);
      if(confirm('Are you sure you want to unlock this record?') == true){
        this.superuserservice.putActivateDeactivateSub(_id,user).subscribe((res) => {
          this.refreshuserlist();
         console.log (user.isActive)
        });
      }

     }
    
    
  }

}


