import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CheckerService} from 'src/app/sharedcheck/checker.service';
import {RepeatedStaff} from 'src/app/sharedcheck/repeatedStaff.models';
import {SubAdminService} from 'src/app/sharedsub/sub-admin.service';
import {SubsubAdmin} from 'src/app/sharedsubsub/subsub-admin.model';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';

@Component({
  selector: 'app-show-repeated-staff',
  templateUrl: './show-repeated-staff.component.html',
  styleUrls: ['./show-repeated-staff.component.css']
})
export class ShowRepeatedStaffComponent implements OnInit {
  data : Array<any>
  totalRecords : number
  page:number = 1
  newRowIndex = 0;
  searchedKeyword: string;

  constructor(public subuserservice : SubAdminService,public subsubuserservice : SubsubAdminService,public checkerservice : CheckerService, public router : Router) { }

  ngOnInit(): void {
    this.refreshuserlist();
  }

  onLogout(){
    this.subuserservice.deletToken();
    this.router.navigate(['/login']);
  }
  searchAndMatchL(selectedUser:SubsubAdmin){
    let url = `/checkersearch/${selectedUser.firstName}/${selectedUser.middleName}/${selectedUser.lastName}`
   this.router.navigate([url])
}

refreshuserlist(){
  this.checkerservice.showRepeatedUnivStaff().subscribe(
    res =>{
      this.newRowIndex++;
      this.checkerservice.RepeatedStaffs = res as RepeatedStaff[];
      console.log(res);

    }
   
  );

}
  

}
