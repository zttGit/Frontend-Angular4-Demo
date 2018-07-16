import { Component, OnInit } from '@angular/core';
import {Photo} from '../../models/photo';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {PhotoService} from '../../services/photo.service';
import {UploadPhotoService} from '../../services/upload-photo.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'],
  providers: [UploadPhotoService, PhotoService, UserService]
})
export class AddPhotoComponent implements OnInit {

  newPhoto: Photo = new Photo();
  photoAdded = false;
  user: User;
  constructor(
    public uploadPhotoService: UploadPhotoService,
    private addPhotoService: PhotoService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    const _self = this;
    this.userService.getUserByName(localStorage.getItem('currentUserName')).subscribe(
      (user: any) => {
        _self.user = user;
        _self.newPhoto.user = _self.user;
        _self.addPhotoService.sendPhoto(_self.newPhoto).subscribe(
          (data) => {
            _self.photoAdded = true;
            _self.newPhoto = new Photo();
          }, (error) => { console.log(error);
          }
        );
      }, (error) => { console.log(error);
      }
    );
  }
}
