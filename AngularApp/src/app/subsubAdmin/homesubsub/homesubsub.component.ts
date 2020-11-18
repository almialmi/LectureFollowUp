import { Component, OnInit } from '@angular/core';
import { SubsubAdminService } from '../../sharedsubsub/subsub-admin.service';

import { Router } from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-homesubsub',
  templateUrl: './homesubsub.component.html',
  styleUrls: ['./homesubsub.component.css']
})
export class HomesubsubComponent implements OnInit {
  closeResult = '';

  constructor(public subsubAdminService :   SubsubAdminService , public router : Router , private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.subsubAdminService .deletToken();
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
