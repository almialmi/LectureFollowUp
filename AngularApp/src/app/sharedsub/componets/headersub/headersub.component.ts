import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubAdminService } from '../../sub-admin.service';

@Component({
  selector: 'app-headersub',
  templateUrl: './headersub.component.html',
  styleUrls: ['./headersub.component.css']
})
export class HeadersubComponent implements OnInit {

  constructor(public superUserService : SubAdminService , public router : Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  } 


}
