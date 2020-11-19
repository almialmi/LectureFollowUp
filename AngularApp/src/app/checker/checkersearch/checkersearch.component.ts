import { Component, OnInit } from '@angular/core';
import {SubsubAdmin} from 'src/app/sharedsubsub/subsub-admin.model';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';
import { Router,ActivatedRoute } from "@angular/router";
import { CheckerService} from 'src/app/sharedcheck/checker.service';
@Component({
  selector: 'app-checkersearch',
  templateUrl: './checkersearch.component.html',
  styleUrls: ['./checkersearch.component.css']
})
export class CheckersearchComponent implements OnInit {
  searchedKeyword: string;
  searchUser:SubsubAdmin[]=[];
  constructor(public subsubuserservice : SubsubAdminService ,public checkerservice : CheckerService, public router : Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    //this.searchuserlist()
    this.searchAndMatchL()
  }
  onLogout(){
    this.checkerservice.deletToken();
    this.router.navigate(['/login']);
  }

  Search(){}

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


}

