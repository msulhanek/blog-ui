import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment-add/comment.service';
import {Observable} from 'rxjs';
import {CommentPayload} from '../comment-add/comment-payload';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-comment-get',
  templateUrl: './comment-get.component.html',
  styles: [
  ]
})
export class CommentGetComponent implements OnInit {
  comments: Observable<Array<CommentPayload>>;
  private permaLink: number;

  constructor(private router: ActivatedRoute, private commentService: CommentService, private localStorageService: LocalStorageService) {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });
    this.comments = this.commentService.getPostComments(this.permaLink);
  }

  ngOnInit(): void {
    this.comments = this.commentService.getPostComments(this.permaLink);
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  isOwner(username: string){
    return username === this.localStorageService.retrieve('username');
  }

  delete(comment: CommentPayload) {
    if (confirm('Delete comment?')) {
      this.commentService.deleteComment(this.permaLink, comment).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
