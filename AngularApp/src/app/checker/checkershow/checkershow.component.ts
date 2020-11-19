import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {SubAdmin  } from '../../sharedsub/sub-admin.model';
import {SubAdminService} from 'src/app/sharedsub/sub-admin.service';
import {SubsubAdmin} from 'src/app/sharedsubsub/subsub-admin.model';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';
import { CheckerService} from 'src/app/sharedcheck/checker.service';

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
  names : any;
  title : '';
  firstName:'';
  middleName:'';
  lastName:'';
  newRowIndex = 0;


  constructor(public subuserservice : SubAdminService,public subsubuserservice : SubsubAdminService ,public checkerservice : CheckerService, public router : Router) { }
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  showSucessMessage: boolean;
  

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
        this.subsubuserservice.users = res as SubsubAdmin[];

      }
     
    );

  }
  
  
  
  searchAndMatchL(selectedUser:SubsubAdmin){
     let url = `/checkersearch/${selectedUser.firstName}/${selectedUser.middleName}/${selectedUser.lastName}`
    this.router.navigate([url])
}
}
