import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl,NgForm } from '@angular/forms';
import { SuperuserService } from '../../shared/superuser.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;


  constructor(public superUserService : SuperuserService , public router : Router) { }
  ngOnInit(): void {
    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }
  RequestResetUser(form) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.superUserService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email successfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigateByUrl('/login');
          }, 3000);
        },
        err => {

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}


