import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { SubsubAdminService } from '../../sharedsubsub/subsub-admin.service';

@Component({
  selector: 'app-logsubsub',
  templateUrl: './logsubsub.component.html',
  styleUrls: ['./logsubsub.component.css']
})
export class LogsubsubComponent implements OnInit {

  constructor(public subsubAdminService : SubsubAdminService  , public router : Router) { }
  model = {
    email: '',
    password:'',

  };
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage: string;


  ngOnInit(): void {
  }
  onSubmit(form : NgForm){
    this.subsubAdminService.login(form.value).subscribe(
      res => {
       this.subsubAdminService.setToken(res['token']); 
        this.router.navigateByUrl('/homesubsub');
        console.log("good to go");

      },
      err => {
        this.serverErrorMessage  = "somthing went wrong";
        console.log("what the fuck");
        

      }
    );

  }




}



