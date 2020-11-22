import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperuserService } from '../../superuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public superUserService : SuperuserService , public router : Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  } 

}
