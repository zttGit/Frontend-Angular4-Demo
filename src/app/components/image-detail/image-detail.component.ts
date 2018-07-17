import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Photo} from '../../models/photo';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PhotoService} from '../../services/photo.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
  providers: [PhotoService, UserService]
})
export class ImageDetailComponent implements OnInit {
  photo: Photo = new Photo;
  user: User;
  like: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      const photoId = +params['id'];  // 获取路由里的photoId参数
      const _self = this;
      this.photoService.getPhotoById(photoId).subscribe(
        (photo: any) => {
          _self.photo = photo; // 查到照片信息
          _self.userService.getUserByName(localStorage.getItem('currentUserName')).subscribe(
            (user: any) => {
              _self.user = user; // 查到用户信息
              if (_self.user.likedPhotoList.filter((photo) => {
                photo.photoId == _self.photo.photoId;
              })[0]) {
                _self.like = 'Unlike';
              } else {
                _self.like = 'Like';
              }
            }, (error) => { console.log(error);
            }
          );
        }, (error) => { console.log(error);
        }
      );
    });
  }
  goBack() {
    window.history.back();
  }

  likeDisplay() {
    if (this.like === 'Like') {
      this.like = 'Unlike';
      this.user.likedPhotoList.push(this.photo);
      this.photo.likes += 1;
    } else {
      this.like = 'Like';
      for (let i = 0; i < this.user.likedPhotoList.length; i++) {
        if (this.user.likedPhotoList[i].photoId === this.photo.photoId) {
          this.user.likedPhotoList.splice(i, 1);
        }
      }
      this.photo.likes -= 1;
    }
    this.userService.updateUser(this.user).subscribe();
    this.photoService.updatePhoto(this.photo).subscribe();
  }
}
