import { Component, OnInit,TrackByFunction,ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { SubsubAdmin } from '../../sharedsubsub/subsub-admin.model';
import {Message} from '../../sharedsubsub/message';

import {  SubsubAdminService } from 'src/app/sharedsubsub/subsub-admin.service';
import { NgForm } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

const pageSize:number = 3;
@Component({
  selector: 'app-showsubsub',
  templateUrl: './showsubsub.component.html',
  styleUrls: ['./showsubsub.component.css'],
  providers : [SubsubAdminService]
})
export class ShowsubsubComponent implements OnInit {
  currentSelectedPage:number = 0;
  totalPages: number = 0;
  subsubAdmins: Array<SubsubAdmin> = [];
  pageIndexes: Array<number> = [];
  data : Array<any>
  totalRecords : number
  page:number = 1
  names : any;
  firstName : '';
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
 // data: [][];
  @ViewChild('staffTable')staffTable: ElementRef;

  constructor(public subsubAdminService : SubsubAdminService , public router : Router  ,private modalService: NgbModal) { }

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
    this.subsubAdminService.deletToken();
    this.router.navigate(['/login']);
  }
  refreshuserlist(){
    var university = this.subsubAdminService.getUserUniversity();
    var compass= this.subsubAdminService.getUserCompass()
    this.subsubAdminService.showUniversityStaff(university,compass).subscribe(
      res =>{
      //  this.subsubAdminService.users = res as SubsubAdmin[];
        console.log( this.subsubAdminService.users)


       //const { data, totalRecords } = res;
       // this.data = data;
       // this.totalRecords = totalRecords;
        console.log(res);
        this.subsubAdminService.users = res as SubsubAdmin[];

      },
      err =>{

      }
    );

  }
  Search(){
    /*
    this.subAdminService.SearchUser().subscribe(
      res =>{
        this.subAdminService.users = res as SubsubAdmin[];

      },
      err =>{

      }
    )*/
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
  onDelete(_id: string){
    if( this.confirmClicked == true){
      this.subsubAdminService.deleteUniversityStaff(_id).subscribe((res) => {
        this.refreshuserlist();
       // M.toast({html: 'Deleted successfully' , classes: 'rounded'});
      });
    }

  }
  onEdit(user : SubsubAdmin){
    this.subsubAdminService.selectedStaff = user;

  }
  exportAsXLSX():void {
    this.subsubAdminService.exportAsExcelFile(this.subsubAdmins, 'UniversityStaff');
  }

  getPage(page: number){
    var university = this.subsubAdminService.getUserUniversity();
    var compass= this.subsubAdminService.getUserCompass()

    this.subsubAdminService.getPagableCustomers(university,compass,page, pageSize)
            .subscribe(
                (message: Message) => {
                  console.log(message);
                  this.subsubAdmins = message.subsubAdmins;
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


