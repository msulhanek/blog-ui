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

  formatText(content: string) {
    if (content.length > 60) {
      return content.slice(0, 60) + '...';
    }
    return content;
  }

  private loadData() {
    this.postCreateService.getAllPosts().subscribe(data => {
      this.posts = data;
    });
  }
}
