import { User } from './../models/user';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')  // 每次请求都要带上token
      })
    };
    getUserByName(userName: string) {
      return this.http.post(`/api/rest/user/userName`, JSON.stringify(userName), this.httpOptions);
    }

    updateUser(user: User) {
        // const url = 'http://localhost:8080/rest/user/update';
        // const header = new Headers({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // });
        // return this.http.post(url, JSON.stringify(user), {headers: header});
    }
}
