import { Component, OnInit,TrackByFunction } from '@angular/core';
import {SubsubAdmin} from 'src/app/sharedsubsub/subsub-admin.model';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';
import { Router,ActivatedRoute } from "@angular/router";
import { CheckerService} from 'src/app/sharedcheck/checker.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-checkersearch',
  templateUrl: './checkersearch.component.html',
  styleUrls: ['./checkersearch.component.css']
})
export class CheckersearchComponent implements OnInit {
  firstName:'';
  middleName:'';
  lastName:'';
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';
  confirmClicked = true;
  cancelClicked = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;
  newRowIndex = 0;
  searchedKeyword: string;
  searchUser:SubsubAdmin[]=[];
  totalRecords : number;
  page:number = 1;
  closeResult = '';
  constructor(public subsubAdminService : SubsubAdminService ,public checkerservice : CheckerService, public router : Router, private activatedRouter:ActivatedRoute,private modalService: NgbModal) { }
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  showSucessMessage: boolean;

  ngOnInit(): void {
    this.refreshUserList()
    this.searchAndMatchL()
    
  }
  onLogout(){
    this.checkerservice.deletToken();
    this.router.navigate(['/login']);
  }
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

  onSubmit(form : NgForm){
   
    if(form.value._id == ""){
      this.subsubAdminService.postUniversityStaff(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshUserList();
      //  M.toast({html: 'saved successfull!' , class: 'rounded'});
      
  
      });
    }else{
      this.subsubAdminService.putUniversityStaff(form.value).subscribe((res) =>{
       // this.resetForm(form);
        this.refreshUserList();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
      //  M.toast({html: 'update successfull!' , class: 'rounded'});
  
      });
  
    }
   
  }

  
  refreshUserList(){
    this.checkerservice.showUniversityStaff().subscribe(
      res =>{
        this.newRowIndex++;
        this.subsubAdminService.users = res as SubsubAdmin[];

      }
    );

  }

  searchAndMatchL(){
    let firstName =this.activatedRouter.snapshot.params['firstName'].trim()
    let middleName=this.activatedRouter.snapshot.params['middleName'].trim()
    let lastName=this.activatedRouter.snapshot.params['lastName'].trim()
    console.log(firstName + " " + middleName + " " + lastName);
    
    this.checkerservice.findAndMatchUniversityStaff(firstName,middleName,lastName).subscribe(
      res =>{
        this.searchUser = res as SubsubAdmin[];
        console.log(res);
      });
  }

  ViewedOrtNotViewed(_id:string,user:SubsubAdmin) {
  
    if(user.isViewed === false){
      console.log(user.isViewed);
      if( this.confirmClicked == true){
        this.subsubAdminService.putViewedOrNot(_id,user).subscribe((res) => {
          this.refreshUserList();
          console.log(user.isViewed)
         });
      }
     }
    
    
  }
  onEdit(user : SubsubAdmin){
    this.subsubAdminService.selectedStaff = user;
  
  }


}

