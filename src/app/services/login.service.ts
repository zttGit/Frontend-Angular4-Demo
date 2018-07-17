import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClientTestingBackend} from '@angular/common/http/testing/src/backend';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

    sendCredentials(model) {
      const body = JSON.stringify(model);
      return this.http.post('/api/user/login', body, this.httpOptions);
    }

    sendToken(token) {
     const httpOptions2 = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
        })
      };
      return this.http.get('/api/rest/user/users', httpOptions2);
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
