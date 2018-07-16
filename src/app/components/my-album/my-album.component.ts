import { Component, OnInit } from '@angular/core';
import {Photo} from '../../models/photo';
import {PhotoService} from '../../services/photo.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-my-album',
  templateUrl: './my-album.component.html',
  styleUrls: ['./my-album.component.css'],
  providers: [PhotoService, UserService]
})
export class MyAlbumComponent implements OnInit {
  public photos: Photo[];
  private user;
  private selectedPhoto: Photo;
  constructor(private photoService: PhotoService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    const _self = this;
    this.userService.getUserByName(localStorage.getItem('currentUserName')).subscribe(
      (user) => {
        console.log(user);
        _self.user = user;
        _self.photoService.getPhotoByUser(_self.user).subscribe(
          (photos: any) => {
            _self.photos = photos;
          }
        );
      }, (error) => { console.log(error);
      }
    );
  }
  onSelect(photo: Photo) {
    this.selectedPhoto = photo;
    // this.router.navigate(['/image-detail', this.selectedPhoto.photoId]);
  }
}
