import { Comment } from './../models/comment';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CommentService {

    constructor(private http: HttpClient) { }
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=GBK',
        'Authorization': 'Bearer ' + localStorage.getItem('token')  // 每次请求都要带上token
      })
    }
    addComment(comment: Comment) {
      return this.http.post('/api/rest/comment/add', JSON.stringify(comment), this.httpOptions);
    }

}
