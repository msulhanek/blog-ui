import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PostPayload} from '../post-create/post-payload';
import {PostCreateService} from '../post-create.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.sass']
})
export class PostManageComponent implements OnInit {
  posts: Observable<Array<PostPayload>>;
  constructor(private postService: PostCreateService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.posts = this.postService.getUserPosts(this.localStorageService.retrieve('username'));
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  delete(post: PostPayload) {
    if (confirm('Delete post?')){
      this.postService.deletePost(post).subscribe( () => {
        window.location.reload();
      });
    }
  }
}
