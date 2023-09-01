import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  modalRef?: BsModalRef;
  public getRole = sessionStorage.getItem('usersrole');

  constructor(private modalService: BsModalService, private toastr: ToastrService, private router: Router) { }

  logout() {
    sessionStorage.clear();
    if (sessionStorage.getItem('usersrole') == null) {
      this.toastr.error('', 'คุณได้ออกจากระบบแล้ว');
      this.router.navigate(['login']);
    }
  }

}
