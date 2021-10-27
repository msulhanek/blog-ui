import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './post-create/post-payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostCreateService {


  constructor(private httpClient: HttpClient) { }

  addPost(postPayload: PostPayload){
    return this.httpClient.post('http://localhost:8080/api/posts/', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/');
  }

  getPost(permaLink: number): Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }

  deletePost(postPayload: PostPayload){
    return this.httpClient.delete('http://localhost:8080/api/posts/get/' + postPayload.id);
  }

  editPost(permaLink: number, post: PostPayload) {
    return this.httpClient.put('http://localhost:8080/api/posts/get/' + permaLink + '/edit', post);
  }

  getUserPosts(username: string): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/' + username);
  }

}
