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
        console.log(JSON.parse(JSON.stringify(data))); // 将对象转化为string，再将string转为对象
        localStorage.setItem('token',  JSON.parse(JSON.stringify(data))); // sendCredentials返回token字符串，并存储到本地
        // localStorage.setItem('token', JSON.parse(JSON.stringify(data))._body); // 出错
        _self.loginService.sendToken(localStorage.getItem('token')).subscribe(
          (data1) => { // 服务端返回授权信息
            console.log(data1);
            _self.currentUserName = _self.model.username;
            console.log(_self.currentUserName);
            localStorage.setItem('currentUserName', _self.model.username);
            _self.model.username = '';
            _self.model.password = '';
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
