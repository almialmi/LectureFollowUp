import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubsubAdminService } from '../../subsub-admin.service';

@Component({
  selector: 'app-headersubsub',
  templateUrl: './headersubsub.component.html',
  styleUrls: ['./headersubsub.component.css']
})
export class HeadersubsubComponent implements OnInit {

  constructor(public superUserService : SubsubAdminService , public router : Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  }
   

}
