import { Component, OnInit } from '@angular/core';
import {PostCreateService} from '../post-create.service';
import {Observable} from 'rxjs';
import {PostPayload} from '../post-create/post-payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  posts: Observable<Array<PostPayload>>;

  constructor(private postCreateService: PostCreateService) { }

  ngOnInit(): void {
    this.posts = this.postCreateService.getAllPosts();
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  formatText(content: string) {
    if (content.length > 60){
      return content.slice(0, 60) + '...';
    }
    return content;
  }
}
