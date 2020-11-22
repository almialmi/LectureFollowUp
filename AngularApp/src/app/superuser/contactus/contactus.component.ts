import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperuserService } from 'src/app/shared/superuser.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(public superUserService : SuperuserService , public router : Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  } 

}
