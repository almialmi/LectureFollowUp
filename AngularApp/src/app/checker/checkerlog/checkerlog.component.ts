import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { CheckerService } from '../../sharedcheck/checker.service';


@Component({
  selector: 'app-checkerlog',
  templateUrl: './checkerlog.component.html',
  styleUrls: ['./checkerlog.component.css']
})
export class CheckerlogComponent implements OnInit {

  constructor(public checkerService :  CheckerService  , public router : Router) { }
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
    this.checkerService.login(form.value).subscribe(
      res => {
       this.checkerService.setToken(res['token']); 
        this.router.navigateByUrl('/homechecker');
        console.log("good to go");

      },
      err => {
        this.serverErrorMessage  = "somthing went wrong";
        console.log("what the fuck");
        

      }
    );

  }



}
