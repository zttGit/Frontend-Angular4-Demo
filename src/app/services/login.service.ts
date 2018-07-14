import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClientTestingBackend} from '@angular/common/http/testing/src/backend';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }
    sendCredentials(model) {
      const body = JSON.stringify(model);
      return this.http.post('/user/login', body);
        // const tokenUrl = 'http://localhost:8080/user/login';
        // const header1 = new Headers({'Content-Type': 'application/json'});
        //
        // return this.http.post(tokenUrl, JSON.stringify(model), {headers: header1});
    }

    sendToken(token) {
      return this.http.get('/rest/user/users');
        // const userUrl = 'http://localhost:8080/rest/user/users';
        // const header2 = new Headers({'Authorization': 'Bearer ' + token});
        //
        // return this.http.get(userUrl, {headers: header2});
    }

    checkLogin() {
        if (localStorage.getItem('currentUserName') && localStorage.getItem('token')) {
        return true;
        } else {
        return false;
        }
    }
    logout() {
        localStorage.setItem('token', '');
        localStorage.setItem('currentUserName', '');
        alert('you just logged out.');
    }
}
