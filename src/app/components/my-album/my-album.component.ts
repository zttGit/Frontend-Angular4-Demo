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
    this.userService.getUserByName(localStorage.getItem('currentUserName')).subscribe(
      (user: any) => {
        this.user = user;
        this.photoService.getPhotoByUser(user).subscribe(
          (photos: any) => {
            console.log(photos);
            this.photos = photos;
          }
        );
      },
      (error) => { console.log(error);
      }
    );
  }
  onSelect(photo: Photo) {
    this.selectedPhoto = photo;
    this.router.navigate(['/image-detail', this.selectedPhoto.photoId]);
  }
}
