import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperuserService } from 'src/app/shared/superuser.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public superUserService : SuperuserService , public router : Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  } 

}
