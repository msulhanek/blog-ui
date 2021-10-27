import {Component, OnInit} from '@angular/core';
import {PostPayload} from '../post-create/post-payload';
import {ActivatedRoute, Router} from '@angular/router';
import {PostCreateService} from '../post-create.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.sass']
})
export class PostDetailComponent implements OnInit {
  post: PostPayload;
  permaLink: number;

  constructor(private routerActive: ActivatedRoute,
              private postService: PostCreateService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.routerActive.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
    }, (err: any) => {
      console.log('Failure Response Post', err);
    });
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  isOwner() {
    return this.post.username === this.localStorageService.retrieve('username');
  }

  delete(post: PostPayload) {
    if (confirm('Delete post?')) {
      this.postService.deletePost(post).subscribe(() => {
        this.router.navigateByUrl('/posts');
      });
    }
  }
}
