import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  addImage(uploadImageData: FormData) {
    return this.httpClient.post('http://localhost:8080/api/upload', uploadImageData);
  }

  getImage(imageName: string) {
    return this.httpClient.get('http://localhost:8080/api/upload/get/' + imageName);
  }
}
