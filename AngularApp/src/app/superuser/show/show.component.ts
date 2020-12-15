import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from "@angular/router";
import {Superuser } from '../../shared/superuser.=model';
import {University} from '../../shared/unive.models';

import { SuperuserService } from '../../shared/superuser.service';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {Message} from '../../shared/message';
import {MessageC} from '../../shared/messageC';
import {MessageU} from '../../shared/messageU';

declare var M:any;
const pageSize:number = 3;
@Component({

  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers : [SuperuserService]
})
export class ShowComponent implements OnInit {
  currentSelectedPage:number = 0;
  totalPages: number = 0;
  UnivAdmins: Array<Superuser> = [];
  Checkers: Array<Superuser> = [];
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
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';
  confirmClicked = true;
  cancelClicked = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;



 
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
    this.refreshUniveList();
    this.getPage(0);
    this.getPageC(0);
 }
  onLogout(){
    this.superuserservice.deletToken();
    this.router.navigate(['/login']);
  }
  refreshuserlist(){
    this.superuserservice.showUnivAdmin().subscribe(
      res =>{
        this.superuserservice.UnivAdmins = res as Superuser[];

      },
      err =>{

      }
    );

  }
 refreshUniveList(){
   this.superuserservice.fetchUniversity().subscribe(res =>{
    this.superuserservice.universitys = res as University[];

  },
  err =>{

  }
   );
 }

  //show users for checker
  refreshuserlistchecker(){
    this.superuserservice.showChecker().subscribe(
      res =>{
        this.superuserservice.checkers = res as Superuser[];

      },
      err =>{

      }
    );

  }

  onSubmitUnivForm(form : NgForm){
   
    if(form.value._id == ""){
      this.superuserservice.registerUniversity(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshUniveList();
       });
    }else{
      this.superuserservice.updateUniversity(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshUniveList();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
  
      });
  
    }
   
  }


  
  onSubmit(form : NgForm){
   
    if(form.value._id == ""){
      this.superuserservice.postUnivAdmin(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
       
      
  
      });
    }else{
      this.superuserservice.putAllUser(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlist();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
       
  
      });
  
    }
   
  }
  onSubmitchecker(form : NgForm){
   
    if(form.value._id == ""){
      this.superuserservice.postChecker(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlistchecker();
        
      
  
      });
    }else{
      this.superuserservice.putAllUser(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshuserlistchecker();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
       
  
      });
  
    }
   
  }
 
  onDeletechecker(_id: string){
    if( this.confirmClicked == true){
      this.superuserservice.deleteChecker(_id).subscribe((res) => {
        this.refreshuserlistchecker();
       
      });
    }

  }

  onEdit(user : Superuser){
    this.superuserservice.selectedUnivAdmin = user;

  }

  onEditU(univ : University){
    this.superuserservice.selectedUniversity = univ;

  }
  
  

 // active: boolean = true;

  activateDeactivateUnivAdmin(_id:string,user:Superuser) {
  
    if(user.isActive === true){
      console.log(user.isActive);
      if(this.confirmClicked == true){
        this.superuserservice. putActivateDeactivateUser(_id,user).subscribe((res) => {
          console.log("confirm clicked")
          this.refreshuserlist();
          console.log(user.isActive)
         });
      }
     }
     else{
      console.log(user.isActive);
      if(this.confirmClicked == true){
        this.superuserservice. putActivateDeactivateUser(_id,user).subscribe((res) => {
          this.refreshuserlist();
         console.log (user.isActive)
        });
      }

     }
    
    
  }

  activateDeactivate(_id:string,user:Superuser) {
  
    if(user.isActive === true){
      console.log(user.isActive);
      if(this.confirmClicked == true){
        this.superuserservice. putActivateDeactivateUser(_id,user).subscribe((res) => {
          this.refreshuserlistchecker();
          console.log(user.isActive)
         });
      }
     }
     else{
      console.log(user.isActive);
      if(this.confirmClicked == true){
        this.superuserservice. putActivateDeactivateUser(_id,user).subscribe((res) => {
          this.refreshuserlistchecker();
         console.log (user.isActive)
        });
      }

     }
    
    
  }

//for UnivAdmins

  getPage(page: number){
    
    this.superuserservice.getPagableCustomers(page, pageSize)
            .subscribe(
                (message: Message) => {
                  console.log(message);
                  this.UnivAdmins = message.UnivAdmins;
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


  //for checker 
  getPageC(page: number){
    
    this.superuserservice.getPagableCustomersChecker(page, pageSize)
            .subscribe(
                (message: MessageC) => {
                  console.log(message);
                  this.Checkers = message.Checkers;
                  this.totalPages = message.totalPages;
                  this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
                  this.currentSelectedPage = message.pageNumber;
                },
                (error) => {
                  console.log(error);
                }
            );
  }
  getPaginationWithIndexChecker(index: number) {
    this.getPageC(index);
  }
  nextClickChecker(){
    if(this.currentSelectedPage < this.totalPages-1){
      this.getPageC(++this.currentSelectedPage);
    }  
  }

  previousClickChecker(){
    if(this.currentSelectedPage > 0){
      this.getPageC(--this.currentSelectedPage);
    }  
  }
  activeChecker(index: number) {
    if(this.currentSelectedPage == index ){
      return {
        active: true
      };
    }
  }
  
  
  


}


