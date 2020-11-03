import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { SuperuserService } from '../../shared/superuser.service';// from superuser service class

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.css'],
  //providers : [SuperuserService],
})
export class SuperuserComponent implements OnInit {

  constructor( public superUserService : SuperuserService , public router : Router) { }


  model = {
    email: '',
    password:'',

  };
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage: string;

  ngOnInit(): void {
  }
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

  onSubmit(form : NgForm){
    this.superUserService.login(form.value).subscribe(
      res => {
       this.superUserService.setToken(res['token']); 
        this.router.navigateByUrl('/home');
        console.log("good to go");

      },
      err => {
        this.serverErrorMessage  = "somthing went wrong";
        

      }
    );

  }

}
