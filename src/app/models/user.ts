import { Photo } from './photo';
export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public created_time: Date;
    public photoList: Photo[];
    public likedPhotoList: Photo[];
}
