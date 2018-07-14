import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public model = { 'username': '', 'password': '' };
  public currentUserName;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }
  onSubmit() {
    const _self = this;
    this.loginService.sendCredentials(this.model).subscribe(
      (data) => {
        localStorage.setItem('token', JSON.parse(JSON.stringify(data))._body);
        _self.loginService.sendToken(localStorage.getItem('token')).subscribe(
          (data1) => {
            _self.currentUserName = _self.model.username;
            localStorage.setItem('currentUserName', _self.model.username);
            _self.model.username = '';
            _self.model.password = '';
          }
        );
      }, (error) => {
        console.log(error);
      }
    );
  }
}
