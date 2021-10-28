import {Component, OnInit} from '@angular/core';
import {PostCreateService} from '../post-create.service';
import {PostPayload} from '../post-create/post-payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  posts: PostPayload[];

  constructor(private postCreateService: PostCreateService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  private loadData() {
    this.postCreateService.getAllPosts().subscribe(data => {
      this.posts = data;
    });
  }
}
