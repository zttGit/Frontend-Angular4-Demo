import { Photo } from './../models/photo';
import { Headers } from '@angular/http';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
    getPhotoByUser(user: User) {
      return this.http.get(`/rest/photo/user`);
        // const url = 'http://localhost:8080/rest/photo/user';
        // const header = new Headers({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // });
        // return this.http.post(url, JSON.stringify(user), { headers: header });
    }

    getPhotoById(photoId: number) {
      return this.http.get(`/rest/photo/photoId/${photoId}`);
        // const url = 'http://localhost:8080/rest/photo/photoId';
        // const header = new Headers({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // });
        // return this.http.post(url, JSON.stringify(photoId), { headers: header });
    }

    updatePhoto(photo: Photo) {
      const body = JSON.stringify(photo);
      return this.http.post(`/rest/photo/update`, body);
        // const url = 'http://localhost:8080/rest/photo/update';
        // const header = new Headers({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // });
        // return this.http.post(url, JSON.stringify(photo), { headers: header });
    }

    getPhotos() {
        const url = 'http://localhost:8080/photo/allPhotos';
        return this.http.get(url);
    }

}
