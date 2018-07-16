import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [LoginService]
})
export class NavBarComponent implements OnInit {

  constructor(public login1Service: LoginService) { }
  public currentUserName = '用户';
  ngOnInit() {
  }
  onClick() {
    if (this.login1Service.checkLogin()) {
      // this.currentUserName =  localStorage.getItem('currentUserName');
      this.login1Service.logout();
    }
  }
}
