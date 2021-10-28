import { Component, OnInit } from '@angular/core';
import {UserService} from '../users/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserPayload} from '../users/user-payload';
import {PostPayload} from '../post-create/post-payload';
import {PostCreateService} from '../post-create.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  user: UserPayload;
  posts: PostPayload[];
  usernameLink: string;
  constructor(private userService: UserService, private router: ActivatedRoute, private postService: PostCreateService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.usernameLink = params.username;
    });

    const user = this.userService.getUser(this.usernameLink);
    const posts = this.postService.getUserPosts(this.usernameLink);

    forkJoin([user, posts]).subscribe(response => {
      this.user = response[0];
      this.posts = response[1];
    }, error => {
      console.log('Failure Response User', error);
    });
  }

  format(registerDate: string) {
    return new Date((parseInt(registerDate) * 1000)).toLocaleString();
  }
}
