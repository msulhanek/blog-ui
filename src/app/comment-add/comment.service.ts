import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentPayload} from './comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  addComment(permaLink: number, commentDto: CommentPayload){
    return this.httpClient.post('http://localhost:8080/api/posts/get/' + permaLink, commentDto);
  }

  getPostComments(permaLink: number): Observable<Array<CommentPayload>>{
    return this.httpClient.get<Array<CommentPayload>>('http://localhost:8080/api/posts/get/' + permaLink + '/comments');
  }

  deleteComment(permaLink: number, commentDto: CommentPayload) {
    return this.httpClient.delete('http://localhost:8080/api/posts/get/' + permaLink + '/delete/' + commentDto.id);
  }
}
