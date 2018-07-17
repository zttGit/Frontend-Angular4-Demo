import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Photo} from '../../models/photo';
import {PhotoService} from '../../services/photo.service';

@Component({
  selector: '`photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
  providers: [PhotoService]
})
export class PhotoListComponent implements OnInit {

  photos: Photo [ ] = [];
  selectedPhoto: Photo;
  public message: string;
  constructor(
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    const _self = this;
    this.photoService.getPhotos().subscribe(
      (data: any) => {
        this.photos = data;
        if (this.photos.length < 1) {
          this.message = '没有内容';
        }
        // this.photos = JSON.parse(JSON.parse(JSON.stringify(data))._body);
      },
      (error) => {
        this.message = '查询列表失败：' + error.errmsg;
        console.log(error); }
    );
  }
  onSelect(photo: Photo) {
    this.selectedPhoto = photo;
    this.router.navigate(['/image-detail', this.selectedPhoto.photoId]);
  }

}
