import { Component, OnInit } from '@angular/core';
import { SubAdminService } from '../../sharedsub/sub-admin.service';

import { Router } from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homesub',
  templateUrl: './homesub.component.html',
  styleUrls: ['./homesub.component.css']
})
export class HomesubComponent implements OnInit {
  closeResult = '';

  constructor( public subAdminService :  SubAdminService , public router : Router ,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.subAdminService .deletToken();
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
