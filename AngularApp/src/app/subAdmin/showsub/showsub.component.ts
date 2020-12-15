import { Component, OnInit,TrackByFunction } from '@angular/core';
import { Router } from "@angular/router";
import { SubAdmin } from '../../sharedsub/sub-admin.model';
import {Message} from '../../sharedsub/message';

import {  SubAdminService } from 'src/app/sharedsub/sub-admin.service';
import { NgForm } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

const pageSize:number = 3;
@Component({
  selector: 'app-showsub',
  templateUrl: './showsub.component.html',
  styleUrls: ['./showsub.component.css'],
  providers : [SubAdminService]
})
export class ShowsubComponent implements OnInit {
  currentSelectedPage:number = 0;
  totalPages: number = 0;
  UnivHrs: Array<SubAdmin> = [];
  pageIndexes: Array<number> = [];
 data : Array<any>
 //data : SubAdmin[]
  totalRecords : number
  page:number = 1
  results = [];
  closeResult = '';
  userDetails;
  showModal: boolean;
 // signUpForm: FormGroup;
  submitted = false;
  searchedKeyword: string;
  newRowIndex = 0;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';
  confirmClicked = true;
  cancelClicked = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;


  constructor(public subAdminService : SubAdminService , public router : Router  ,private modalService: NgbModal) {
    this.data = new Array<any>()
   }

  
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
    this.getPage(0);
    
   
 }
  onLogout(){
    this.subAdminService.deletToken();
    this.router.navigate(['/login']);
  }
  refreshuserlist(){
    var university = this.subAdminService.getUserUniversity();
    this.subAdminService.showUnivHr(university).subscribe( res =>{
     // const { data, totalRecords } = res;
      //  this.data = data;
       // this.totalRecords = totalRecords;
          console.log(res);
          this.subAdminService.users= res as unknown as SubAdmin[];
    //  this.totalRecords = data.results.length
      
       // this.subAdminService.users = res as unknown as SubAdmin[];

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
      if(this.confirmClicked == true){
        this.subAdminService.putActivateDeactivate(_id,user).subscribe((res) => {
          this.refreshuserlist();
          console.log(user.isActive)
         });
      }
     }
     else{
      console.log(user.isActive);
      if(this.confirmClicked == true){
        this.subAdminService.putActivateDeactivate(_id,user).subscribe((res) => {
          this.refreshuserlist();
         console.log (user.isActive)
        });
      }

     }
    
    
  }

  getPage(page: number){
    var university = this.subAdminService.getUserUniversity();
    
    this.subAdminService.getPagableCustomers(university,page, pageSize)
            .subscribe(
                (message: Message) => {
                  console.log(message);
                  this.UnivHrs = message.UnivHrs;
                  this.totalPages = message.totalPages;
                  this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
                  this.currentSelectedPage = message.pageNumber;
                },
                (error) => {
                  console.log(error);
                }
            );
  }
  getPaginationWithIndex(index: number) {
    this.getPage(index);
  }
  nextClick(){
    if(this.currentSelectedPage < this.totalPages-1){
      this.getPage(++this.currentSelectedPage);
    }  
  }

  previousClick(){
    if(this.currentSelectedPage > 0){
      this.getPage(--this.currentSelectedPage);
    }  
  }
  active(index: number) {
    if(this.currentSelectedPage == index ){
      return {
        active: true
      };
    }
  }

}
