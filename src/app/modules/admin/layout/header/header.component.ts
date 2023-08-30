import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  modalRef?: BsModalRef;

  constructor(private modalService:BsModalService){}

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);

  }
}
