import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentPayload} from './comment-payload';
import {LocalStorageService} from 'ngx-webstorage';
import {CommentService} from './comment.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styles: []
})
export class CommentAddComponent implements OnInit {
  commentPost: FormGroup;
  commentPayload: CommentPayload;
  private permaLink: number;
  comment: boolean;

  constructor(private localStorageService: LocalStorageService,
              private commentService: CommentService,
              private actRouter: ActivatedRoute) {
    this.actRouter.params.subscribe(params => {
      this.permaLink = params['id'];
    });
    this.comment = false;
    this.commentPost = new FormGroup({
      body: new FormControl('')
    });

    this.commentPayload = {
      id: '',
      body: '',
      user: '',
      post: '',
      createdAt: '',
    };
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.commentPost.get('body').value.length < 5) {
      this.comment = true;
      return;
    }

    this.commentPayload.body = this.commentPost.get('body').value;
    this.commentPayload.user = this.localStorageService.retrieve('username');

    this.commentService.addComment(this.permaLink, this.commentPayload).subscribe(() => {
      this.commentPost.reset();
      window.location.reload();
    }, () => {
      alert('Comment posting failed');
    });
  }
}
