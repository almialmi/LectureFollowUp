import { Component, OnInit,TrackByFunction } from '@angular/core';
import { Router } from "@angular/router";
import {SubAdmin  } from '../../sharedsub/sub-admin.model';
import {SubAdminService} from 'src/app/sharedsub/sub-admin.service';
import {SubsubAdmin} from 'src/app/sharedsubsub/subsub-admin.model';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';
import { CheckerService} from 'src/app/sharedcheck/checker.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { SuperuserService } from '../../shared/superuser.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Superuser } from 'src/app/shared/superuser.=model';


@Component({
  selector: 'app-checkershow',
  templateUrl: './checkershow.component.html',
  styleUrls: ['./checkershow.component.css']
})
export class CheckershowComponent implements OnInit {
  submitted = false;
  searchedKeyword: string;
  totalRecords : number
  page:number = 1
  names : any;
  title : '';
  firstName:'';
  middleName:'';
  lastName:'';
  closeResult = '';
  newRowIndex = 0;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';
  confirmClicked = true;
  cancelClicked = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;



  constructor(public subuserservice : SubAdminService,public subsubAdminService : SubsubAdminService ,public checkerservice : CheckerService, public router : Router,private modalService: NgbModal) { }
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
    this.subuserservice.deletToken();
    this.router.navigate(['/login']);
  }
  
  refreshuserlist(){
    this.checkerservice.showUniversityStaff().subscribe(
      res =>{
        this.newRowIndex++;
        this.subsubAdminService.users = res as SubsubAdmin[];

      }
     
    );

  }
  onSubmit(form : NgForm){
   
    if(form.value._id == ""){
      this.subsubAdminService.postUniversityStaff(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
      //  M.toast({html: 'saved successfull!' , class: 'rounded'});
      
  
      });
    }else{
      this.subsubAdminService.putUniversityStaff(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
      //  M.toast({html: 'update successfull!' , class: 'rounded'});
  
      });
  
    }
   
  }
  
  
  
searchAndMatchL(selectedUser:SubsubAdmin){
    let url = `/checkersearch/${selectedUser.firstName}/${selectedUser.middleName}/${selectedUser.lastName}`
    this.router.navigate([url])
}


ViewedOrtNotViewed(_id:string,user:SubsubAdmin) {
  
  if(user.isViewed === false){
    console.log(user.isViewed);
    if( this.confirmClicked == true){
      this.subsubAdminService.putViewedOrNot(_id,user).subscribe((res) => {
        this.refreshuserlist();
        console.log(user.isViewed)
       });
    }
   }
  
  
}
onEdit(user : SubsubAdmin){
  this.subsubAdminService.selectedStaff = user;

}


}
