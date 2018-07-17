import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public model = { 'username': '', 'password': '' };
  public currentUserName;
  constructor(public loginService: LoginService, private router: Router ) { }

  ngOnInit() {
  }
  onSubmit() {
    const _self = this;
    console.log('开始');
    this.loginService.sendCredentials(this.model).subscribe(
      (data: any) => {
        // localStorage.setItem('token',  JSON.parse(JSON.stringify(data)).data); // sendCredentials返回token字符串，并存储到本地
        localStorage.setItem('token', JSON.parse(JSON.stringify(data.token))); // 出错
        console.log(localStorage.getItem('token'));
        _self.loginService.sendToken(localStorage.getItem('token')).subscribe(
          (data1) => { // 服务端返回授权信息 return "Login Successful!";
            console.log(data1);
            _self.currentUserName = _self.model.username;
            localStorage.setItem('currentUserName', _self.model.username);
            _self.model.username = '';
            _self.model.password = '';
          }
        );
        // setTimeout(() => { // 登陆成功，0.5秒后跳转至用于主页
        //   this.router.navigate(['/my-album']);
        // }, 500);
      },
      (error) => {
        console.log(error);
      });
  }
}
