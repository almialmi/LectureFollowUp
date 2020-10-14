import { Component, OnInit } from '@angular/core';
import { CheckerService  } from 'src/app/sharedcheck/checker.service';

import { Router } from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkerhome',
  templateUrl: './checkerhome.component.html',
  styleUrls: ['./checkerhome.component.css']
})
export class CheckerhomeComponent implements OnInit {
  closeResult = '';

  constructor( public superUserService : CheckerService , public router : Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.superUserService.deletToken();
    this.router.navigate(['/login']);
  } 
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
