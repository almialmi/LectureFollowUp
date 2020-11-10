import { Component, OnInit } from '@angular/core';
import { CheckerService} from 'src/app/sharedcheck/checker.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile-checker',
  templateUrl: './update-profile-checker.component.html',
  styleUrls: ['./update-profile-checker.component.css']
})
export class UpdateProfileCheckerComponent implements OnInit {

  constructor(public checkerservice : CheckerService, public router : Router) { }
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  serverErrorMessage : string;
  showSucessMessage: boolean;

  ngOnInit(): void {
  }
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

  onLogout(){
    this.checkerservice.deletToken();
    this.router.navigate(['/logchecker']);
  }

  OnSubmit(form : NgForm){
    var id=this.checkerservice.getUserId();
    this.checkerservice.putProfile(id,form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        this.resetForm(form);
      },
      err => {
        if( err.status == 422){
          this.serverErrorMessage = err.error.join('<br>');
        }
        else
          this.serverErrorMessage = 'something went wrong'
        }
    );

  }
  resetForm(form : NgForm){
    this.checkerservice.selectedSuperuser = {
      _id: '',
      email : '',
      password:''

    };
    
    form.resetForm();
    this.serverErrorMessage = '';
  }

}


