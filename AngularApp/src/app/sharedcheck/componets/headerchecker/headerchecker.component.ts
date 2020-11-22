import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckerService } from '../../checker.service';

@Component({
  selector: 'app-headerchecker',
  templateUrl: './headerchecker.component.html',
  styleUrls: ['./headerchecker.component.css']
})
export class HeadercheckerComponent implements OnInit {

  constructor(public superUserService :  CheckerService , public router : Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  } 

}
