import {Component, Input, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {UserService} from '../../services/user.service';
import {CommentService} from '../../services/comment.service';
import {User} from '../../models/user';
import {Photo} from '../../models/photo';
import { Comment } from './../../models/comment';
import {Router} from '@angular/router';

@Component({
  selector: 'image-comments',
  templateUrl: './image-comments.component.html',
  styleUrls: ['./image-comments.component.css'],
  providers: [CommentService, UserService, PhotoService]
})
export class ImageCommentsComponent implements OnInit {
  // <image-comments [photo]="photo"></image-comments> 将photo传值过来
  @Input('photo') photo: Photo;
  user: User = new User;
  newComment = new Comment();
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
    const _self = this;
    this.userService.getUserByName(localStorage.getItem('currentUserName')).subscribe(
      (user: any) => {
        _self.user = user;
      },
      (error) => { console.log(error);
      }
    );
  }
  onSubmit() {
    this.newComment.photo = this.photo;
    this.newComment.userName = this.user.username;
    this.newComment.photoId = this.photo.photoId;
    const _self = this;
    console.log(this.newComment);
    this.commentService.addComment(this.newComment).subscribe(
      (res: Response) => {
        this.getCommentsByPhotoId();
      },
      (error) => { console.log(error); }
    );
    this.newComment = new Comment();
    location.reload();
  }
  getCommentsByPhotoId() {
    this.photoService.getPhotoById(this.photo.photoId).subscribe(
      (photo) => this.photo = JSON.parse(JSON.parse(JSON.stringify(photo))),
      error => console.log(error)
    );
  }
}

