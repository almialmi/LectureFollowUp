import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { SubAdminService } from '../../sharedsub/sub-admin.service';

@Component({
  selector: 'app-logsub',
  templateUrl: './logsub.component.html',
  styleUrls: ['./logsub.component.css']
})
export class LogsubComponent implements OnInit {

  constructor(public subAdminService : SubAdminService , public router : Router) { }
  model = {
    email: '',
    password:'',

  };
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage: string;


  ngOnInit(): void {
  }
  onSubmit(form : NgForm){
    this.subAdminService.login(form.value).subscribe(
      res => {
       this.subAdminService.setToken(res['token']); 
        this.router.navigateByUrl('/homesub');
        console.log("good to go");

      },
      err => {
        this.serverErrorMessage  = "somthing went wrong";
        console.log("what the fuck");
        

      }
    );

  }




}
