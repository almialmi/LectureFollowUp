import { Component, OnInit } from '@angular/core';
import {SubAdmin  } from '../../sharedsub/sub-admin.model';
import {SubAdminService} from 'src/app/sharedsub/sub-admin.service';
import {SubsubAdmin} from 'src/app/sharedsubsub/subsub-admin.model';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';
import { Router } from "@angular/router";
import { CheckerService} from 'src/app/sharedcheck/checker.service';
@Component({
  selector: 'app-checkersearch',
  templateUrl: './checkersearch.component.html',
  styleUrls: ['./checkersearch.component.css']
})
export class CheckersearchComponent implements OnInit {
  searchedKeyword: string;

  constructor(public subuserservice : SubAdminService,public subsubuserservice : SubsubAdminService ,public checkerservice : CheckerService, public router : Router) { }

  ngOnInit(): void {
    this.searchuserlist()
  }
  onLogout(){
    this.subuserservice.deletToken();
    this.router.navigate(['/login']);
  }
  Search(){
    this.subuserservice.SearchUser().subscribe(
      res =>{
        this.subuserservice.users = res as SubAdmin[];

      },
      err =>{

      }
    )
  }



  searchuserlist(){
    this.subuserservice.SearchUser().subscribe(
      res =>{
        this.subuserservice.users = res as SubAdmin[];

      },
      err =>{

      }
    );

  }

}

