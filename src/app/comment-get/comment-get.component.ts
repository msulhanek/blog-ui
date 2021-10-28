import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment-add/comment.service';
import {CommentPayload} from '../comment-add/comment-payload';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-comment-get',
  templateUrl: './comment-get.component.html'
})
export class CommentGetComponent implements OnInit {

  comments: CommentPayload[];

  private permaLink: number;

  constructor(private router: ActivatedRoute, private commentService: CommentService, private localStorageService: LocalStorageService) {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });
  }

  ngOnInit(): void {
    this.commentService.getPostComments(this.permaLink).subscribe(data => {
      this.comments = data;
    });
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  isOwner(username: string) {
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
